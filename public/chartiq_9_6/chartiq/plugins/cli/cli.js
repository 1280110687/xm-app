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



import { CIQ as _CIQ } from "../../js/componentUI.js";
import { Executor } from "./Executor.js";
import { registry } from "./registry.js";
/**
 * @timport { CIQ } from "../../js/componentUI.js";
 * @tsmodule ../../js/chartiq.js
 */
const CIQ = typeof _CIQ !== "undefined" ? _CIQ : {}.CIQ;
const config = {};

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./cli.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./cli.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(new URL("./cli.css", import.meta.url).href, resolve);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "cli")); // a framework, such as Angular, may require style addition

/**
 *  @classdesc
 *
 * Command Line Interface (CLI) component. This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-cli&gt;</h4>
 *
 * The CLI allows users to interact with the chart using a command line
 * interface. The CLI appears at the bottom of the chart. It is activated by
 * clicking on the CLI icon in the toolbar or by pressing SHIFT + /. The CLI
 * provides a list of available commands that can be executed on the chart. The
 * user can type in the command line to filter the list of available commands.
 * The user can then select a command from the list to execute it. The CLI also
 * provides a history of the most recent commands that have been executed.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "filter"|
 * | action | "click" |
 * | category | _Filter name_ |
 *
 * @alias WebComponents.CLI
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 *
 * @since 9.6.0
 */

class CLI extends CIQ.UI.ContextTag {
	/**
	 * Creates an instance of the component.  Initializes the command history.
	 */
	constructor() {
		super();
		this.CIQ = CIQ;
		this.commandHistory = [];
		this.historyIndex = -1;

		const savedHistory = localStorage.getItem("commandHistory");
		if (savedHistory) {
			this.commandHistory = JSON.parse(savedHistory);
			this.historyIndex = this.commandHistory.length;
		}

		this.activate = this.activate.bind(this);
		this.echo = this.echo.bind(this);
		this.log = this.log.bind(this);
	}

	/**
	 * Called when the component is adopted into a new document.
	 * Sets up inheritance and constructor.
	 *
	 * @tsmember WebComponents.CLI
	 */
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, CLI);
		this.constructor = CLI;
	}

	/**
	 * Called when the component is disconnected from the document.
	 * Removes the claim and calls the parent method.
	 *
	 * @tsmember WebComponents.CLI
	 */
	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.CLI
	 */
	setContext(context) {
		this.context = context;
		Object.assign(config, context.config.plugins.cli);
		queueMicrotask(() => {
			const layout = this.context.getAdvertised("Layout");
			layout.toggleCLI = () => {
				this.initialize();
				this.activate();
			};
			if (CIQ.UI) {
				CIQ.UI.KeystrokeHub.addHotKeyHandler(
					"cli",
					() => {
						this.initialize();
						this.activate();
					},
					this.context.stx
				);
			}
		});
	}

	/**
	 * Initializes the component the first time it has been opened.
	 * Sets all the default markup and adds listeners.
	 *
	 * @tsmember WebComponents.CLI
	 */
	initialize() {
		if (this.initialized) {
			return;
		}
		if (CIQ.isMobile) {
			return;
		}

		this.addDefaultMarkup();
		this.toggle = this.context.topNode.querySelector(
			"cq-toggle[feature='cli']"
		);
		this.input = this.querySelector("input");
		this.output = this.querySelector(".ciq-output ul");
		this.output.style.maxHeight = "200px";
		this.executor = Executor.bind(this)(registry);

		this.buildCmdList();

		this.input.addEventListener("click", () => {
			this.clear();
			this.filterCommands();
			this.showOutput();
		});

		this.input.addEventListener("keyup", (e) => {
			e.preventDefault();
			switch (e.key) {
				case "Enter": {
					const command = this.input.value.trim();
					if (!this.checkCommand(command)) {
						this.clearInput();
						this.hideOutput();
						this.selected?.click();
					} else {
						this.clear();
						this.processCommand(command);
					}
					break;
				}
				case "Escape":
					this.deactivate();
					break;
				case "ArrowDown":
					switch (config.arrow_nav) {
						case "pallet":
							this.selectNext();
							break;
						case "history":
							if (this.historyIndex < this.commandHistory.length - 1) {
								this.historyIndex += 1;
								const cmd = this.commandHistory[this.historyIndex];
								this.input.value = typeof cmd === "object" ? cmd.label : cmd;
							} else {
								this.historyIndex = this.commandHistory.length;
								this.input.value = "";
							}
							break;
						default:
							throw new Error("Invalid configuration: ARROW_NAV");
					}
					break;
				case "ArrowUp":
					switch (config.arrow_nav) {
						case "pallet":
							this.selectPrevious();
							break;
						case "history":
							if (this.historyIndex > 0) {
								this.historyIndex -= 1;
								const cmd = this.commandHistory[this.historyIndex];
								this.input.value = typeof cmd === "object" ? cmd.label : cmd;
							}
							break;
						default:
							throw new Error("Invalid configuration: ARROW_NAV");
					}
					break;
				case "Shift":
					// FIXME this is nonsense
					// why can't I use keypress
					break;
				default: {
					const command = this.input.value.trim();
					if (command === "?") {
						this.clear();
						this.echo(
							"<b>Command Line Interface:</b>\n\nTyping in this field will perform a search of available actions that can be performed on the chart."
						);
					} else {
						this.showOutput();
						this.filterCommands(command);
					}
				}
			}
		});
		this.ownerDocument.body.addEventListener("stxtap", (e) => {
			if (
				!e.target.closest("cq-cli") &&
				!e.target.closest("cq-toggle") &&
				!e.target.closest("cq-item")
			) {
				this.deactivate();
			}
		});

		this.initialized = this;
	}

	/**
	 * Verifies if a command is valid.
	 * @param {string} command The command to check.
	 * @return {boolean} True if the command exists, false otherwise.
	 *
	 * @tsmember WebComponents.CLI
	 */
	checkCommand(command) {
		return Object.keys(registry).includes(
			command.replace(/^\s*(\w+).*$/, "$1")
		);
	}

	/**
	 * Processes a command entered by the user.
	 *
	 * @param {string} command The command to process.
	 *
	 * @tsmember WebComponents.CLI
	 */
	async processCommand(command) {
		try {
			const status = await this.executor(command);
			switch (status) {
				case Executor.OK:
					// this.log("Command executed successfully");
					this.addHistory(command);
					this.emitCustomEvent({
						effect: "cli-execute",
						detail: {
							command,
							status
						}
					});
					break;
				case Executor.ENOTFOUND:
					this.log("Command not found");
					break;
				case Executor.ECMDERR:
					this.log("Command error");
					break;
				case Executor.EBADARGS:
					this.log("Command has invalid arguments");
					break;
				default:
					this.log("Command failed");
			}
		} catch (e) {
			this.log(e.message);
		}
	}

	/**
	 * Adds a command to the command history.
	 * @param {string} command The command to add.
	 *
	 * @tsmember WebComponents.CLI
	 */
	addHistory(command) {
		if (command !== this.commandHistory[this.commandHistory.length - 1]) {
			this.commandHistory.push(command);
			if (this.commandHistory.length > config.max_history) {
				this.commandHistory.shift();
			}
			localStorage.setItem(
				"commandHistory",
				JSON.stringify(this.commandHistory)
			);
		}
		this.historyIndex = this.commandHistory.length;
	}

	/**
	 * Activates and shows the CLI.
	 *
	 * @tsmember WebComponents.CLI
	 */
	activate() {
		this.style.display = "block";
		this.toggle.style.display = "none";
		this.clear();
		this.filterCommands();
		this.showOutput();
		this.input.focus();
	}

	/**
	 * Deactivates and hides the CLI.
	 *
	 * @tsmember WebComponents.CLI
	 */
	deactivate() {
		this.style.display = "none";
		this.toggle.style.display = "block";
		this.clear();
	}

	/**
	 * Clears the input and output fields.
	 *
	 * @tsmember WebComponents.CLI
	 */
	clear() {
		this.hideOutput();
		this.input.value = "";
		this.output.innerHTML = "";
	}

	/**
	 * Clears the input field.
	 *
	 * @tsmember WebComponents.CLI
	 */
	clearInput() {
		this.input.value = "";
	}

	/**
	 * Hides the output.
	 *
	 * @tsmember WebComponents.CLI
	 */
	hideOutput() {
		this.output.style.display = "none";
	}

	/**
	 * Shows the output.
	 *
	 * @tsmember WebComponents.CLI
	 */
	showOutput() {
		this.output.style.display = "inherit";
	}

	/**
	 * Echoes text to the output.  If an object is passed, it is stringified.
	 *
	 * @param {string|Object} text The text or object to display.
	 *
	 * @tsmember WebComponents.CLI
	 */
	echo(text) {
		this.showOutput();
		this.output.innerHTML += `<div>${
			typeof text === "object" ? JSON.stringify(text, null, 2) : text
		}</div>`;
	}

	/**
	 * Logs text to the console.
	 * @param {string} text The text to log.
	 *
	 * @tsmember WebComponents.CLI
	 */
	log(text) {
		console.dir(text);
	}

	/**
	 * Filters the commands based on the user input.
	 * @param {string} command The search string.
	 *
	 * @tsmember WebComponents.CLI
	 */
	filterCommands(command = "") {
		this.output.innerHTML = "";
		const filteredCmds = [...this.recentCmds, ...this.commands].filter((cmd) =>
			cmd.label.toLowerCase().includes(command.toLowerCase())
		);
		// TODO once we expose the CLI cmds, use checkCommand to include matching commands
		if (filteredCmds.length === 0) {
			this.echo("No results found");
		} else {
			filteredCmds.forEach((cmd) => {
				this.output.append(cmd.cmd);
			});
			this.selectFirst();
		}
	}

	/**
	 * Updates the selected command; if next is true, the next command is selected,
	 * otherwise the previous command is selected.
	 * @param {boolean} [next=true] True to select the next command, false to select the previous command.
	 *
	 * @tsmember WebComponents.CLI
	 */
	selectCommand(next = true) {
		const found = [...this.querySelectorAll("cq-cli cq-item")].some(
			(el, i, arr) => {
				if (!el.hasAttribute("cq-focused")) {
					return;
				}
				el.removeAttribute("cq-focused");
				let index = next ? i + 1 : i - 1;
				if (index < 0) {
					index = arr.length - 1;
				}
				if (index > arr.length - 1) {
					index = 0;
				}
				arr[index].setAttribute("cq-focused", "");
				arr[index].scrollIntoView?.({ block: "center", behavior: "auto" });
				return true;
			}
		);
		if (!found) {
			this.querySelector("cq-cli cq-item")?.setAttribute("cq-focused", "");
		}
	}

	/**
	 * Selects the first command in the list.
	 *
	 * @tsmember WebComponents.CLI
	 */
	selectFirst() {
		this.querySelectorAll("cq-cli cq-item[cq-focused]").forEach((el) => {
			el.removeAttribute("cq-focused");
		});
		this.querySelector("cq-cli cq-item").setAttribute("cq-focused", "");
	}

	/**
	 * Selects the next command in the list.
	 *
	 * @tsmember WebComponents.CLI
	 */
	selectNext() {
		this.selectCommand();
	}

	/**
	 * Selects the previous command in the list.
	 *
	 * @tsmember WebComponents.CLI
	 */
	selectPrevious() {
		this.selectCommand(false);
	}

	/**
	 * Returns the selected command.
	 * @return {HTMLElement | null} the selected command.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public selected: HTMLElement | null;
	 */
	get selected() {
		return this.querySelector("cq-cli cq-item[cq-focused]");
	}

	/**
	 * Scrapes the chart for available drawing commands.
	 * @return {object[]} The drawing commands.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public drawingCmds: object[];
	 */
	get drawingCmds() {
		return this.commands.filter((cmd) => cmd.type === "Drawing");
	}

	/**
	 * Scrapes the chart for available periodicity commands.
	 * @return {object[]} The periodicity commands.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public periodicityCmds: object[];
	 */
	get periodicityCmds() {
		return this.commands.filter((cmd) => cmd.type === "Periodicity");
	}

	/**
	 * Scrapes the chart for available range commands.
	 * @return {object[]} The range commands.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public rangeCmds: object[];
	 */
	get rangeCmds() {
		return this.commands.filter((cmd) => cmd.type === "Range");
	}

	/**
	 * Returns the most recent commands.  The number of commands is determined by the SHOW_RECENT constant.
	 * @return {object[]} The most recent commands.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public recentCmds: object[];
	 */
	get recentCmds() {
		// NOTE for AI Ready: we can use this pattern to allow AI to create dynamic commands
		return this.commandHistory
			.slice(-config.show_recent)
			.map((cmd) => {
				const recent = {
					cmd: document.createElement("li")
				};
				if (typeof cmd === "string") {
					recent.label = cmd;
				} else {
					recent.label = cmd.label;
				}

				recent.cmd.classList.add("result");
				recent.cmd.innerHTML = `<cq-item tabindex="0">
						<span><b>${recent.label}</b></span>
						<span>Recent</span>
						<span style="color:#388dff">RECENT</span>
					</cq-item>`;
				CIQ.UI.stxtap(recent.cmd.firstElementChild, () => {
					this.clear();
					if (typeof cmd === "string") {
						this.processCommand(cmd);
					} else {
						this.commands[cmd.id]?.el.click();
					}
				});

				return recent;
			})
			.reverse();
	}

	/**
	 * Scrapes the chart for available study commands.
	 * @return {object[]} The study commands.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public studyCmds: object[];
	 */
	get studyCmds() {
		return this.commands.filter((cmd) => cmd.type === "Study");
	}

	/**
	 * Scrapes the chart for available type commands.
	 * @return {object[]} The type commands.
	 *
	 * @tsmember WebComponents.CLI
	 * @tsdeclaration
	 * public typeCmds: object[];
	 */
	get typeCmds() {
		return this.commands.filter((cmd) => cmd.type === "Type");
	}

	/**
	 * Builds a list of available commands from the chart.
	 *
	 * @tsmember WebComponents.CLI
	 */
	buildCmdList() {
		const contextEl = this.context.topNode;
		const commands = {};

		contextEl.querySelectorAll("cq-menu[reader='Display'] li").forEach((el) => {
			const label = (
				(el.querySelector("[label]") || {}).innerText || ""
			).trim();
			if (!label) {
				return;
			}
			const id = `Type ${label}`;
			commands[id] = { type: "Type", label, el };
		});

		contextEl
			.querySelectorAll("[stxtap], cq-studies cq-item[role]")
			.forEach((el) => {
				if (el.closest("cq-toolbar-settings")) {
					return;
				}
				if (el.closest("[cq-tool]")) {
					const label = (el.querySelector("[label]") || {}).innerText;
					const favorite = !!el.closest("[cq-tool-group*=favorite]");
					const id = `Drawing ${label}`;
					// commands[id] = { type: "Drawing", label, el, favorite };
					return;
				}
				if (el.closest("cq-studies")) {
					const label = el.innerText.trim();
					const favorite = el.classList.contains("ciq-favorite");
					const id = `Study ${label}`;
					commands[id] = { type: "Study", label, el /*favorite*/ };
				}
				const label = el.innerText.trim();
				let commandType = el.closest("cq-show-range") ? "Range" : "";
				if (el.closest("cq-dropdown[config=period]")) {
					commandType = "Periodicity";
				}
				if (commandType) {
					const id = `${commandType} ${label}`;
					commands[id] = { type: commandType, label, el };
				}
			});

		this.commands = Object.values(commands)
			.reduce((acc, cur) => {
				const { type, label, el, favorite } = cur;
				const id = `${label} ${type}`.replace(/\s+/g, "-");
				const sortType = favorite ? "FAV" : "";
				const cmd = document.createElement("li");
				cmd.classList.add("result");
				cmd.innerHTML = `<cq-item tabindex="0" ${
					!sortType ? " style='opacity: 0.7'" : ""
				}>
						<span><b>${label}</b></span>
						<span>${type.replace("Type", "Display <b>T</b>ype")}</span>
						<span${sortType ? " style='color:#388dff'>" + sortType : ">CMD"}</span>
					</cq-item>`;
				CIQ.UI.stxtap(cmd.firstElementChild, () => {
					this.clear();
					el.click();
					this.addHistory({ id, label });
					this.emitCustomEvent({
						effect: "cli-palette",
						detail: {
							label
						}
					});
				});
				const builtCmd = { cmd, el, id, label, type };
				acc.push(builtCmd);
				acc[id] = builtCmd; // storing by index and key
				return acc;
			}, [])
			.sort((a, b) => {
				if (a.favorite && !b.favorite) return -1;
				else if (b.favorite && !a.favorite) return 1;
				return a - b;
			});
	}
}

CLI.markup = `
	<style>
		cq-cli > div {
			float: left;
			margin-left: 12px;
			position: relative;
			z-index: 1;
		}
		cq-cli .ciq-output {
			position: absolute;
			background: #f1f3f3;
			bottom: 34px;
			left: -10px
		}

		.ciq-night cq-cli .ciq-output {
			background: #151f28;
		}
		cq-cli .ciq-output ul {
			width: 420px;
			list-style-type: none;
			margin: 6px 4px 6px 6px;
			max-height: 200px;
			overflow-y: auto;
			padding: 0;
		}
		cq-cli .ciq-output li {
			margin: 0;
		}
		cq-cli .ciq-output ul div {
			padding: 4px;
			text-align: left;
			white-space: pre-wrap;
		}
		cq-cli input[type=text] {
			margin-top: 10px;
			padding: 4px;
			width: 160px;
		}

		cq-cli cq-item {
			display: table-row;
			cursor: pointer;
			white-space: normal;
		}
		cq-cli cq-item span {
			text-align: left;
			padding: 0 8px;
			display: table-cell;
		}

		cq-cli cq-item span:nth-of-type(1) {
			width: 65%;
		}
		cq-cli cq-item span:nth-of-type(2) {
			width: 80px;
		}
		cq-cli cq-item span:nth-of-type(3) {
			font-size: 10px;
			min-width: 40px;
			text-align: right;
		}
	</style>
	<div>
		<div class="ciq-output">
			<ul style="display: none"></ul>
		</div>
		<input type="text" placeholder="Enter ? for help" />
	</div>`;

CIQ.UI.addComponentDefinition("cq-cli", CLI);

CIQ.CLI = function (params) {
	const { container: selector, context, toggleMarkup: markup } = params;

	const {
		topNode,
		topNode: { multiChartContainer }
	} = context;
	const container = multiChartContainer || topNode;

	if (!container.querySelector("cq-cli")) {
		const node = document.createElement("div");
		node.innerHTML = markup;

		let pluginContainer = container.querySelector(selector);
		if (!pluginContainer) {
			pluginContainer = document.createElement("div");
			container.appendChild(pluginContainer);
		}
		pluginContainer.appendChild(node);
	}
};
