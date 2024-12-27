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
import PluginBootstrap from "./bootstrap.js";

/**
 *	Generic Plugin
 *
 * Contains the template code to include your own plugin in a sidebar of the chart.
 *
 * To use:
 * 1. Rename the parent folder of this file to the name you want to use for the plugin.
 * 2. Rename the `genericPlugin` configuration from the default configuration with your new plugin name.
 * 	- Customize the `toggleMarkup` property.
 *  - Set the `location` property to "top" or "right".
 *  - You may add extra properties if you wish.  They will be available in the render and unrender functions (see below).
 * 3. Import this file (plugin.js) into your template.
 * 4. Add your custom code, images and css.  You should not need to modify ./bootstrap.js in any way.
 * 	- in class `ThisPlugin` below, `render` method is called when the panel is revealed.
 *  - in class `ThisPlugin` below, `unrender` method is called when the panel is hidden.
 *  - Both functions have instance properties available for access:
 * 		- Place your markup in `this.node`.
 * 		- `this.params` contains the properties from default configuration.
 * 			- `container`: location of toggle button.
 * 			- `location`: whether to put the plugin area on the top or the side of the chart.
 * 			- `toggleMarkup`: HTML markup for the toggle button.
 * 			- `stx`: the ChartEngine object.
 * 			- `context`: the chart user interface context.
 * 		- `this.pluginName` is the name of your component.
 *  - `ThisPlugin` ships with demo render and unrender functionality.
 * 5. Replace the string "genericPlugin" in the style names in the css file (ui.css) with your plugin name.
 *
 * You can add more than one custom plugin.  Just copy the genericPlugin and follow the same pattern above.
 *
 */

class ThisPlugin extends PluginBootstrap.ClassDefinition {
	/** This function is called when the panel is revealed. You will need to customize this function to render your markup. */
	render() {
		console.log(
			`You must implement the render function for plugin ${this.pluginName}.  Sample markup used.`
		);
		if (!this.node.childNodes.length) {
			this.node.style.fontSize = "36px";
			this.node.style.textAlign = "center";
			if (this.params.location === "right")
				this.node.style.writingMode = "vertical-rl";
			this.node.innerHTML = "Your Plugin Markup Here";
		}
	}

	/** This function is called when the panel is hidden. If you have any takedown requirements they should be placed here. */
	unrender() {
		console.log(
			`You must implement the unrender function for plugin ${this.pluginName}.`
		);
	}
}

// Leave this line alone
CIQ[CIQ.capitalize(PluginBootstrap.Name)] = ThisPlugin;
