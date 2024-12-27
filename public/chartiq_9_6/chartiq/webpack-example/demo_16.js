// This inline script acts as the entry point, without creating a separate external file.

import './js/advanced.js';
import './js/addOns.js';
import { CIQ } from './js/components.js';

import getLicenseKey from './key.js';
getLicenseKey(CIQ);

/* Uncomment the following to access deprecated functions and namespaces. */
//import "./js/deprecated.js";

/* Uncomment the following lines if you are using these plug-ins. */
//import "./plugins/activetrader/cryptoiq.js";
//import "./plugins/analystviews/components.js";
//import "./plugins/genericPlugin/plugin.js";
//import "./plugins/gonogo/goNoGo.js";
//import "./plugins/scriptiq/scriptiq.js";
import './plugins/signaliq/signaliqDialog.js';
import './plugins/signaliq/signaliq-marker.js';
import './plugins/signaliq/signaliq-paintbar.js';
import './plugins/studybrowser/index.js';
//import "./plugins/technicalinsights/components.js";
//import "./plugins/tfc/tfc-loader.js";
//import "./plugins/timespanevent/timespanevent.js";
//import "./plugins/visualearnings/visualearnings.js";

/* Uncomment the following for the L2 simulator (required for the activetrader sample). */
//import "./examples/feeds/L2_simulator.js";

/* Template-specific imports */
import getDefaultConfig from './js/defaultConfiguration.js';

//import "./examples/help/helpContent.js";

import PerfectScrollbar from './js/thirdparty/perfect-scrollbar.esm.js';
import EmojiPopover from './js/thirdparty/emoji-popover.es.js';

import quotefeed from './examples/feeds/quoteFeedSimulator.js';
import './examples/feeds/symbolLookupChartIQ.js';

import './examples/markets/marketDefinitionsSample.js';
import './examples/markets/marketSymbologySample.js';
import './examples/markets/timezones.js';

import marker from './examples/markers/markersSample.js';
import './examples/markers/tradeAnalyticsSample.js';
import './examples/markers/videoSample.js';

import './examples/translations/translationSample.js';

/* Remove if not using the forecasting simulator (required for the forecasting sample). */
import forecastfeed from './examples/feeds/quoteFeedForecastSimulator.js';


const config = getDefaultConfig({
  // markerFeed: marker.MarkersSample,
  // scrollStyle: PerfectScrollbar,
  // emojiPicker: EmojiPopover,
  // quoteFeed: quotefeed,
  // forecastQuoteFeed: forecastfeed,
  // nameValueStore: CIQ.NameValueStore,

  markerFeed: marker.MarkersSample,
  scrollStyle: PerfectScrollbar,
  quoteFeed: quotefeed,
});

config.addOns.tableView.coverContainer = '.ciq-chart-area';
config.enabledAddOns = {
  animation: true,
  inactivityTimer: true,
  rangeSlider: true,
  shortcuts: true,
  tableView: true,
  tooltip: true,
};

config.initialSymbol = '^BTCUSD';

config.plugins.marketDepth = false;

let stxx = config.createChart();


window.CIQ = CIQ
window.stxx = stxx

stxx.setChartType('mountain');
stxx.setPeriodicity({ period: 1, timeUnit: 'second' });

stxx.loadChart('ETHUSD')


CIQ.Studies.addStudy(stxx, "EMC");

