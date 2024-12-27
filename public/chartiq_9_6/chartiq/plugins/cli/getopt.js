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


// https://blog.fpmurphy.com/2010/02/javascript-shell-command-line-processing.html
//
// Changelog:
// - implemented print
// - renamed print to printE

//
//  getopt.js    Finnbarr P. Murphy March 2010
//
//  Based on BSD getopt.c  Use subject to BSD license.
//
//  For details of how to use this function refer to
//  the BSD man page for getopt(3). GNU-style long
//  options are not supported.
//

const printE = function (str) {
	console.error(str);
};

export const getopt = function (nargv, ostr) {
	if (typeof getopt.place === "undefined") {
		getopt.place = ""; // static string, option letter processing
		getopt.iplace = 0; // index into string
	}

	let oli; // option letter list index

	if (getopt.optreset > 0 || getopt.iplace === getopt.place.length) {
		getopt.optreset = 0;
		getopt.place = nargv[getopt.optind];
		getopt.iplace = 0;
		if (
			getopt.optind >= nargv.length ||
			getopt.place.charAt(getopt.iplace++) !== "-"
		) {
			// argument is absent or is not an option
			getopt.place = "";
			getopt.iplace = 0;
			return "";
		}
		getopt.optopt = getopt.place.charAt(getopt.iplace++);
		if (getopt.optopt === "-" && getopt.iplace === getopt.place.length) {
			// '--' => end of options
			++getopt.optind;
			getopt.getopt.place = "";
			getopt.getopt.iplace = 0;
			return "";
		}
		if (getopt.optopt === 0) {
			// Solitary '-', treat as a '-' option
			getopt.place = "";
			getopt.iplace = 0;
			if (ostr.indexOf("-") === -1) {
				return "";
			}
			getopt.optopt = "-";
		}
	} else {
		getopt.optopt = getopt.place.charAt(getopt.iplace++);
	}

	// see if option letter is what is wanted
	if (getopt.optopt === ":" || (oli = ostr.indexOf(getopt.optopt)) === -1) {
		if (getopt.iplace === getopt.place.length) {
			++getopt.optind;
		}
		if (getopt.opterr && ostr.charAt(0) !== ":") {
			printE("illegal option -- " + getopt.optopt);
		}
		return "?";
	}

	// does this option require an argument?
	if (ostr.charAt(oli + 1) !== ":") {
		// does not need argument
		getopt.optarg = null;
		if (getopt.iplace === getopt.place.length) {
			++getopt.optind;
		}
	} else {
		//  Option-argument is either the rest of this argument or the entire next argument.
		if (getopt.iplace < getopt.place.length) {
			getopt.optarg = getopt.place.substr(getopt.iplace);
		} else if (nargv.length > ++getopt.optind) {
			getopt.optarg = nargv[getopt.optind];
		} else {
			// option argument absent
			getopt.place = "";
			getopt.iplace = 0;
			if (ostr.charAt(0) === ":") {
				return ":";
			}
			if (getopt.opterr) {
				printE("option requires an argument -- " + getopt.optopt);
				return ":";
			}
			return "?";
		}
		getopt.place = "";
		getopt.iplace = 0;
		++getopt.optind;
	}

	return getopt.optopt;
};

getopt.opterr = 1; // print error message
getopt.optind = 0; // index into parent argv array
getopt.optopt = ""; // character checked for validity
getopt.optreset = 0; // reset getopt
getopt.optarg = ""; // option argument
