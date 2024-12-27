/**!
 *	9.6.0
 *	Generation date: 2024-12-12T14:37:46.880Z
 *	Package Type: Core alacarte
 *	Build descriptor: v9.6.0-0-g23f1744fc
 */

/***********************************************************!
 * Copyright © 2024 S&P Global All rights reserved
*************************************************************/
/*************************************! DO NOT MAKE CHANGES TO THIS LIBRARY FILE!! !*************************************
* If you wish to overwrite default functionality, create a separate file with a copy of the methods you are overwriting *
* and load that file right after the library has been loaded, but before the chart engine is instantiated.              *
* Directly modifying library files will prevent upgrades and the ability for ChartIQ to support your solution.          *
*************************************************************************************************************************/
/* eslint-disable no-extra-parens */


import { getopt } from "./getopt.js";

/**
 * Executor — a command interpreter for string input.
 * @name Executor
 * @function
 * @param {object} registry command registry; can be a function that overrides the default executor
 * @param {object} [rpcClient] JSON-RPC client; optional.  If not passed in the executor will not be able to execute RPC commands.
 * @return {function} a function that interprets string input and executes commands
 * @since 9.6.0
 */
function Executor(registry, rpcClient) {
	// if (typeof registry === "function") {
	// 	return function () {
	// 		return registry.apply(this, arguments) || Executor.OK;
	// 	};
	// }

	const env = this;
	const rpcList = [];

	// https://regex101.com/r/o2zM18/1
	const wordSplitPat = /"([^"]*)"|'([^']*)'|\S+/g;
	const executor = async function (input) {
		if (typeof input !== "string") {
			this.log("Input must be a string");
			return Executor.ECMDERR;
		}
		const terms = input
			.match(wordSplitPat)
			.map((term) => term.replace(/^['"]|['"]$/g, ""));
		const cmd = terms.shift();
		const entry = registry[cmd];

		if (entry === undefined) {
			if (rpcList.includes(cmd)) {
				try {
					const result = JSON.stringify(await rpcClient(input));
					env.echo(result);
					return Executor.OK;
				} catch (e) {
					env.echo(e);
					return Executor.ECMDERR;
				}
			}
			env.echo(`${cmd}: no such command`);
			return Executor.ENOTFOUND;
		}

		const { func, opts, usage } = entry;
		let ostr = opts;
		if (usage) {
			ostr = ostr ? `${ostr}h` : "h";
		}
		if (ostr !== undefined) {
			const switches = {};
			let opt;

			getopt.optreset = 1;
			getopt.optind = 0;
			while ((opt = getopt(terms, ostr)) !== "") {
				switch (opt) {
					case "h":
						env.echo(`Usage: ${usage}`);
						return Executor.OK;
					case ":":
						env.echo(`${getopt.optopt}: option needs a value`);
						return Executor.EBADARGS;
					case "?":
						env.echo(`${getopt.optopt}: no such option`);
						return Executor.EBADARGS;
					default:
						switches[opt] = getopt.optarg || true;
				}
			}
			func.opts = switches;
		} else {
			getopt.optind = 0;
		}
		return (await func.apply(this, terms.slice(getopt.optind))) ?? Executor.OK;
	};

	if (rpcClient !== undefined) {
		queueMicrotask(async function () {
			const result = await rpcClient("system.describe");
			JSON.parse(result).procs.forEach((proc) => rpcList.push(proc));
			registry.help.rpcList = rpcList; // ugh, don't like tightly coupling to registry

			Object.defineProperties(executor, {
				login: {
					value: async function (username, password) {
						try {
							const token = await rpcClient(`login ${username} ${password}`);
							if (token === false) {
								env.echo("Login failed");
								return Executor.NOTOKEN;
							}
							const originalClient = rpcClient;
							if (executor.exit === undefined) {
								Object.defineProperty(executor, "exit", {
									value: async function () {
										rpcClient = originalClient;
										env.authState = Executor.NOTOKEN;
										env.dispatchEvent(
											new CustomEvent("terminal-reset", {
												detail: { clear: true }
											})
										);
									}
								});
							}
							rpcClient = new Proxy(rpcClient, {
								apply: function (target, thisArg, argumentsList) {
									return target(argumentsList[0], token);
								}
							});
							return Executor.OK;
						} catch (e) {
							return e;
						}
					}
				}
			});
		});
	}

	return executor;
}

export { Executor };

let signal = 0;
Object.defineProperties(Executor, {
	OK: {
		value: signal++
	},
	ENOTFOUND: {
		value: signal++
	},
	ECMDERR: {
		value: signal++
	},
	EBADARGS: {
		value: signal++
	},
	NOTOKEN: {
		value: signal++
	}
});

/**
 * JSONRPCClient — sends a JSON-RPC request to the server.
 * @function
 * @param {object} client APIClient instance
 * @return {function} a function that sends a JSON-RPC request to the server
 * @private
 * @since 9.6.0
 */
function JSONRPCClient(client) {
	let id = 0;

	return function (input, token) {
		try {
			const terms = input.trim().split(/\s+/);
			const method = terms.shift();
			let params = terms;
			if (token) {
				params = {
					token,
					params
				};
			}

			try {
				return client.jsonrpc({ id: id++, method, params }).then((response) => {
					const parsed = JSON.parse(response);
					if (parsed.error) {
						throw new Error(parsed.error.message);
					}
					return parsed.result;
				});
			} catch (e) {
				return e;
			}
		} catch (e) {
			return e;
		}
	};
}
