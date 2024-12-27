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


/**
 * CLI command registry
 * @desc A collection of commands for the CLI.
 * @typedef {Object} Registry
 * @property {Object} commandName - The specification for a command.
 * @property {Function} commandName.func - The function to execute for the command.
 * @property {string} [commandName.man] - The cmd documentation, "manpage"
 * @property {string} [commandName.opts] - Command line options for the command. Use a colon to indicate an option that requires a value.
 * @property {string} [commandName.usage] - Usage string for the command.
 * @example
 * {
 *   func: function func() {
 *     if (func.opts.e) {
 *       this.echo("Example option");
 *     }
 *     this.echo("Example command");
 *   },
 *   man: "Example command description",
 *   opts: "e",
 *   usage: "example [-e]"
 * }
 */
export const registry = Object.freeze({
	cmdlist: {
		func: function () {
			this.echo("Available commands:");
			Object.keys(registry).forEach((cmd) => this.echo(cmd));
		},
		man: "List available commands"
	},
	customer: {
		func: function () {
			this.echo(this.CIQ.packageInfo.clientName);
		}
	},
	// drawing: {
	// 	func: function (drawing) {
	// 		this.drawingCmds.filter((cmd) => cmd.label === drawing)[0]?.el.click();
	// 	},
	// 	man: "Add a drawing",
	// 	usage: "drawing &lt;drawingName&gt;"
	// },
	export: {
		func: function () {
			// drawings, layout, preferences
			const drawings = this.context.stx.exportDrawings();
			const layout = this.context.stx.exportLayout();
			const preferences = this.context.stx.exportPreferences();
			this.log(JSON.stringify({ drawings, layout, preferences }, null, 2));
		},
		man: "Export drawings, layout, and preferences"
	},
	help: {
		func: function func(command) {
			if (func.opts.l) {
				registry.cmdlist.func.apply(this);
				return;
			}
			if (command in registry) {
				this.echo(`Help for ${command}:`);
				this.echo(registry[command].man || "No help available");
			} else {
				this.echo("How to use help:");
				this.echo(registry.help.usage);
				this.echo(registry.help.man);
			}
		},
		man: `Displays help information for a command; use the -l option to list all commands\n\nShow usage:\n[command] -h`,
		opts: "l",
		usage: "help [-l] [command]"
	},
	home: {
		func: function () {
			this.context.stx.home();
		}
	},
	info: {
		func: function (field) {
			const info = Object.entries(this.CIQ.packageInfo);
			if (field in this.CIQ.packageInfo) {
				const value = this.CIQ.packageInfo[field];
				this.echo(`${field}: ${value}`);
			} else {
				info.forEach(([key, value]) => {
					this.echo(`${key}: ${value}`);
				});
			}
		},
		man: "Display package information",
		usage: "info [field]"
	},
	layout: {
		func: function (field) {
			const layout = this.context.stx.layout;
			if (field in layout) {
				this.echo(`${field}: ${Object.keys(layout[field])}`);
			} else {
				this.log(layout);
			}
		},
		man: "Display the chart layout object",
		usage: "layout [field]"
	},
	periodicity: {
		func: function (periodicity) {
			const cmd = this.periodicityCmds.filter(
				(cmd) => cmd.label === periodicity
			)[0];
			if (cmd) {
				cmd.el.click();
			} else {
				this.echo(`Invalid chart periodicity: ${periodicity}`);
			}
		},
		man: "Change the chart periodicity",
		usage: "periodicity &lt;periodicity&gt;"
	},
	polling: {
		func: function previous(cmd) {
			const stx = this.context.stx;
			switch (cmd) {
				case "start":
					if (stx.quoteDriver.behavior.refreshInterval === 0) {
						stx.quoteDriver.resetRefreshInterval(previous.value ?? 1);
					}
					break;
				case "stop":
					previous.value = stx.quoteDriver.behavior.refreshInterval;
					stx.quoteDriver.resetRefreshInterval(0);
					break;
				default:
					this.echo(
						`Polling interval: ${stx.quoteDriver.behavior.refreshInterval}`
					);
					return;
			}
		},
		man: "Pause/Resume quoteFeed polling",
		usage: "polling [start|stop]"
	},
	preferences: {
		func: function func(pref) {
			const prefs = this.context.stx.preferences;
			if (func.opts.s && pref in prefs) {
				prefs[pref] = func.opts.s;
				this.context.stx.changeOccurred("preferences change"); // suggested by copilot; verify!!
			}
			if (pref in prefs) {
				this.echo(`${pref}: ${prefs[pref]}`);
			} else {
				Object.entries(prefs).forEach(([key, value]) => {
					this.echo(
						`${key}: ${
							typeof value === "object" ? JSON.stringify(value, null, 2) : value
						}`
					);
				});
			}
		},
		man: "Get or set user preferences; no argument will list all preferences; use the -s option to set a preference",
		opts: "s:",
		usage: "preferences [-s value] [pref]"
	},
	range: {
		func: function (range) {
			if (arguments.length === 1 && typeof arguments[0] === "string") {
				const cmd = this.rangeCmds.filter((cmd) => cmd.label === range)[0];
				if (cmd) {
					cmd.el.click();
				} else {
					this.echo(`Invalid chart range: ${range}`);
				}
			} else {
				this.context.stx.setRange({
					dtLeft: arguments[0],
					dtRight: arguments[1]
				});
			}
		},
		man: "Change the chart range",
		usage: "range &lt;range&gt; | &lt;start date&gt; &lt;end date&gt;"
	},
	reset: {
		func: function reset() {
			if (reset.opts.f) {
				localStorage.clear();
				location.reload();
			} else {
				this.echo(
					"To reset the chart to defaults, use the -f option to clear local storage and reload the page."
				);
			}
		},
		man: "Reset the chart to defaults",
		opts: "f",
		usage: "reset -f"
	},
	series: {
		func: function func(symbol, color = "blue") {
			if (func.opts.r) {
				// this.log(`Removing series: ${symbol}`);
				this.context.stx.removeSeries(symbol);
				return;
			}
			if (func.opts.x) {
				// this.log("Removing all series");
				Object.values(this.context.stx.chart.series).forEach((series) =>
					this.context.stx.removeSeries(series)
				);
				return;
			}
			if (symbol === undefined) {
				Object.keys(this.context.stx.chart.series).forEach((series) =>
					this.echo(series)
				);
			} else {
				this.context.stx.addSeries(symbol, {
					color,
					isComparison: func.opts.c
				});
			}
		},
		man: "Add or remove a series; use the -c option to add as a comparison series, and the -r option to remove (or -x to remove all)",
		opts: "crx",
		usage: "series [-c] [-rx] &lt;symbol&gt; [color]"
	},
	study: {
		func: function func(study) {
			const studies = this.context.stx.layout.studies;
			if (func.opts.l) {
				Object.values(this.CIQ.Studies.studyLibrary)
					.sort((a, b) => {
						if (a.name < b.name) {
							return -1;
						}
						if (a.name > b.name) {
							return 1;
						}
						return 0;
					})
					.forEach((study) => this.echo(`${study.name}`));
				return;
			}
			if (func.opts.r) {
				Object.entries(studies).forEach(([name, sd]) => {
					if (name.replace(/\u200C/g, "") == study.replace(/\u200C/g, "")) {
						this.CIQ.Studies.removeStudy(this.context.stx, sd);
					}
				});
				return;
			}
			if (func.opts.x) {
				Object.entries(studies).forEach(([name, sd]) =>
					this.CIQ.Studies.removeStudy(this.context.stx, sd)
				);
				return;
			}

			if (study === undefined) {
				Object.entries(studies).forEach(([k, v]) =>
					this.echo(`${v.type}: ${k}`)
				);
				return;
			}

			if (arguments.length === 1 && typeof arguments[0] === "string") {
				const cmd = this.studyCmds.filter((cmd) => cmd.label === study)[0];
				if (cmd) {
					cmd.el.click();
				} else {
					this.echo(`Invalid study: ${study}`);
				}
			} else {
				const config = {};
				const [_, ...args] = Array.from(arguments);
				args.map((arg) => {
					const terms = arg.split(/=/);
					config[terms[0]] = terms[1];
				});
				this.log(
					`Adding study: ${study} with config: ${JSON.stringify(config)}`
				);
				this.CIQ.Studies.addStudy(this.context.stx, study, config);
			}
		},
		man: `Add or remove a study; use the -l option to list available studies, and the -r option to remove (or -x to remove all); no argument will list current studies.\n\nAdd a study with parameters:\n[study] [param1=value1 param2=value2 ...]`,
		opts: "lrx",
		usage:
			"study [-l] [-rx] &lt;study name&gt; [param1=value1 param2=value2 ...]"
	},
	symbol: {
		func: function (symbol) {
			if (symbol === undefined) {
				this.echo(this.context.stx.chart.symbol);
				return;
			}
			this.context.stx.loadChart(symbol);
		},
		man: "Change the chart symbol",
		usage: "symbol &lt;symbol&gt;"
	},
	type: {
		func: function (type) {
			const cmd = this.typeCmds.filter((cmd) => cmd.label === type)[0];
			if (cmd) {
				cmd.el.click();
			} else {
				this.echo(`Invalid chart type: ${type}`);
			}
		},
		man: "Change the chart type",
		usage: "type &lt;chartType&gt;"
	},
	version: {
		func: function () {
			this.echo(this.CIQ.packageInfo.version);
		}
	}
});
