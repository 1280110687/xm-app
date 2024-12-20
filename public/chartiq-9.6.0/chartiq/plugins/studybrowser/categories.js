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


import { CIQ } from "../../js/standard.js";

/**
 *
 * @timport "../../js/standard.js";
 * @tsmodule ../../js/chartiq.js
 */

/**
 * Contains classifications of studies into different categories.
 *
 * @name CIQ.Studies.Categories
 * @namespace
 */
CIQ.Studies.Categories = {
	/**
	 * Often-used studies
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 */
	Popular: [
		"ADX/DMS",
		"Bollinger Bands",
		"Commodity Channel Index",
		"Ichimoku Clouds",
		"MACD",
		"Moving Average",
		"Moving Average Cross",
		"Parabolic SAR",
		"Projected Volume at Time",
		"RSI",
		"Stochastics"
	],
	/**
	 * Studies used to analyze trend
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 * @tsdeclaration
	 * let "Trend Analysis": string[]
	 */
	"Trend Analysis": [
		"Accumulation/Distribution",
		"Accumulative Swing Index",
		"ADX/DMS",
		"Aroon",
		"Choppiness Index",
		"Detrended Price Oscillator",
		"Elder Impulse System",
		"Fractal Chaos Bands",
		"GoNoGo - Trend",
		"Linear Reg R2",
		"Moving Average Cross",
		"Negative Volume Index",
		"Parabolic SAR",
		"Performance Index",
		"Positive Volume Index",
		"Prime Number Oscillator",
		"Psychological Line",
		"QStick",
		"Shinohara Intensity Ratio",
		"Supertrend",
		"Swing Index",
		"Ulcer Index",
		"Vertical Horizontal Filter",
		"Vortex Indicator",
		"ZigZag"
	],
	/**
	 * Studies used to analyze volume changes
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 * @tsdeclaration
	 * let "Money Flow": string[]
	 */
	"Money Flow": [
		"Accumulation/Distribution",
		"Chaikin Money Flow",
		"Ease of Movement",
		"Elder Force Index",
		"Klinger Volume Oscillator",
		"Market Facilitation Index",
		"Money Flow Index",
		"Negative Volume Index",
		"On Balance Volume",
		"Positive Volume Index",
		"Price Volume Trend",
		"Trade Volume Index",
		"Twiggs Money Flow"
	],
	/**
	 * Studies used to analyze momentum
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 * @tsdeclaration
	 * let "Momentum/Oscillator": string[]
	 */
	"Momentum/Oscillator": [
		"ADX/DMS",
		"Aroon Oscillator",
		"Awesome Oscillator",
		"Balance of Power",
		"Bollinger %b",
		"Center Of Gravity",
		"Chande Forecast Oscillator",
		"Chande Momentum Oscillator",
		"Commodity Channel Index",
		"Coppock Curve",
		"Disparity Index",
		"Ease of Movement",
		"Ehler Fisher Transform",
		"Elder Force Index",
		"Elder Ray Index",
		"Fractal Chaos Oscillator",
		"Gator Oscillator",
		"Intraday Momentum Index",
		"Linear Reg Slope",
		"MACD",
		"Momentum Indicator",
		"Money Flow Index",
		"Moving Average Deviation",
		"Pretty Good Oscillator",
		"Price Momentum Oscillator",
		"Price Oscillator",
		"Price Rate of Change",
		"Pring's Know Sure Thing",
		"Pring's Special K",
		"Rainbow Oscillator",
		"RAVI",
		"Relative Vigor Index",
		"RSI",
		"Schaff Trend Cycle",
		"Stochastic Momentum Index",
		"Stochastics",
		"Swing Index",
		"Trend Intensity Index",
		"TRIX",
		"Ultimate Oscillator",
		"Volume Oscillator",
		"Williams %R"
	],
	/**
	 * Studies used to compute averages
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 * @tsdeclaration
	 * let "Averages/Bands": string[]
	 */
	"Averages/Bands": [
		"Alligator",
		"Anchored VWAP",
		"ATR Bands",
		"Bollinger Bands",
		"Donchian Channel",
		"Fractal Chaos Bands",
		"Guppy Multiple Moving Average",
		"High Low Bands",
		"Highest High Value",
		"Ichimoku Clouds",
		"Keltner Channel",
		"Linear Reg Forecast",
		"Linear Reg Intercept",
		"Lowest Low Value",
		"Median Price",
		"Moving Average",
		"Moving Average Cross",
		"Moving Average Envelope",
		"Prime Number Bands",
		"Rainbow Moving Average",
		"STARC Bands",
		"Time Series Forecast",
		"Typical Price",
		"Valuation Lines",
		"VWAP",
		"Weighted Close"
	],
	/**
	 * Studies used to analyze volume
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 */
	Volume: [
		"Anchored VWAP",
		"Depth of Market",
		"Market Facilitation Index",
		"On Balance Volume",
		"Option Sentiment by Strike",
		"Projected Aggregate Volume",
		"Projected Volume at Time",
		"Twiggs Money Flow",
		"Volume Chart",
		"Volume Oscillator",
		"Volume Profile",
		"Volume Rate of Change",
		"Volume Underlay",
		"VWAP"
	],
	/**
	 * Studies used to analyze support and resistance
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 * @tsdeclaration
	 * let "Support/Resistance": string[]
	 */
	"Support/Resistance": [
		"ATR Trailing Stop",
		"Darvas Box",
		"Option Sentiment by Strike",
		"Parabolic SAR",
		"Pivot Points",
		"Prime Number Bands",
		"Supertrend",
		"Volume Profile"
	],
	/**
	 * Studies used to analyze volatility
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 */
	Volatility: [
		"ATR Trailing Stop",
		"Average True Range",
		"Beta",
		"Bollinger Bands",
		"Bollinger Bandwidth",
		"Chaikin Volatility",
		"Choppiness Index",
		"Donchian Width",
		"Gopalakrishnan Range Index",
		"High Minus Low",
		"Historical Volatility",
		"Mass Index",
		"Relative Volatility",
		"STARC Bands",
		"True Range",
		"Ulcer Index",
		"Volatility Cone"
	],
	/**
	 * Studies used to compare against a benchmark
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 */
	Compare: [
		"Beta",
		"Correlation Coefficient",
		"Performance Index",
		"Price Relative"
	],
	/**
	 * Studies used to compute statistical values
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 */
	Statistical: [
		"Correlation Coefficient",
		"High Low Bands",
		"Highest High Value",
		"Historical Volatility",
		"Linear Reg Forecast",
		"Linear Reg Intercept",
		"Linear Reg R2",
		"Linear Reg Slope",
		"Lowest Low Value",
		"Median Price",
		"Prime Number Oscillator",
		"Random Walk Index",
		"Standard Deviation",
		"Time Series Forecast",
		"Valuation Lines"
	],
	/**
	 * Studies used to predict the future
	 *
	 * @type {string[]}
	 * @memberof CIQ.Studies.Categories
	 */
	Projection: [
		"Ichimoku Clouds",
		"Projected Aggregate Volume",
		"Projected Volume at Time",
		"Volatility Cone"
	]
};
