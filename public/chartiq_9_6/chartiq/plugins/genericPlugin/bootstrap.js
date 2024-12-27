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


import { CIQ } from "../../js/componentUI.js";

/**** THIS CODE IS GENERALLY NOT CUSTOMIZED.  SEE plugin.js FOR INSTRUCTIONS ****/

const PLUGIN_NAME = import.meta.url.split("/").reverse()[1];

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ `./ui.css`).then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define([`./ui.css`], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(new URL(`./ui.css`, import.meta.url).href, resolve);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, PLUGIN_NAME)); // a framework, such as Angular, may require style addition

class ClassDefinition extends CIQ.UI.SidePanelPlugin {
	constructor(params) {
		super(params, PLUGIN_NAME);
	}
}

const PluginBootstrap = { ClassDefinition, Name: PLUGIN_NAME };

export default PluginBootstrap;
