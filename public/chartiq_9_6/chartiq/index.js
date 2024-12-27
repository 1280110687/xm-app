

// This inline script acts as the entry point, without creating a separate external file.

import './js/advanced.js';
import './js/addOns.js';
import { CIQ } from './js/components.js';

import getLicenseKey from './key.js';
getLicenseKey(CIQ);

/* Uncomment the following to access deprecated functions and namespaces. */
//import "./js/deprecated.js";

/* Uncomment the following lines if you are using these plug-ins. */
import './plugins/cli/cli.js';
// import "./plugins/activetrader/cryptoiq.js";
// import "./plugins/technicalviews/components.js";
//import "./plugins/chartexplainer/plugin.js";
//import "./plugins/genericPlugin/plugin.js";
//import "./plugins/gonogo/goNoGo.js";
//import "./plugins/lowfrequency/index.js";
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
// import forecastfeed from './examples/feeds/quoteFeedForecastSimulator.js';

/* Uncomment the following import statement to enable the Option Sentiment by Strike study. */
//import "./plugins/crosssection/studies/sentimentByStrike.js";

/*
 * Uncomment the following import statement to access the option chain simulator for option-based
 * functionality, such as the Option Sentiment By Strike study.
 *
 * Make the option chain simulator the chart data source by setting the quoteFeed property (in
 * the object parameter of the getDefaultConfig function call below) to the optionfeed variable,
 * for example:
 *
 *     const config = getDefaultConfig({
 * markerFeed: marker.MarkersSample,
*         scrollStyle: PerfectScrollbar,
*         quoteFeed: optionfeed,  // Provides simulated quote data and option data.
*         forecastQuoteFeed: forecastfeed,
*         nameValueStore: CIQ.NameValueStore
 *     });
*/
// import optionfeed from "./examples/feeds/optionChainSimulator.js";

// Create and customize default configuration

const config = getDefaultConfig({
  // 标记数据源 这为图表上的标记（如图标、注释）提供数据源。
  markerFeed: marker.MarkersSample,
  // 滚动样式 使用 PerfectScrollbar 组件来定制滚动条的样式。
  scrollStyle: PerfectScrollbar,
  // 表情选择器 添加一个表情选择器组件（EmojiPopover），可能用于某些可交互功能中。
  emojiPicker: EmojiPopover,
  quoteFeed: quotefeed,
  // quoteFeed: optionfeed, // Provides simulated quote data and option data. 使用期权模拟器作为数据源
  // 预测数据源 使用 forecastfeed 作为预测行情的数据源。
  // forecastQuoteFeed: forecastfeed,
  // nameValueStore: CIQ.NameValueStore,
});
config.enabledAddOns = {
  animation: true, // 动画
  continuousZoom: true, // 连续缩放
  forecasting: true, // 预测功能
  outliers: false, // 异常值
  dataLoader: true, // 数据加载器
  extendedHours: true, // 延长时间
  fullScreen: true, // 全屏
  inactivityTimer: true, // 不活动计时器
  rangeSlider: true, // 范围滑块
  shortcuts: true, // 快捷键
  tableView: true, // 表格视图
  tooltip: true, // 工具提示
}

// Use dynamic load on demand as an alternative to static import
// config.plugins.tfc.load = () => import("./plugins/tfc/tfc-loader.js");

// config.plugins.technicalInsights.token = ""; // custom token for plugin
// config.plugins.technicalInsights.load = () =>
// 	import("./plugins/technicalinsights/components.js");

// config.plugins.technicalViews.token = ""; // custom token for plugin
// config.plugins.technicalViews.load = () =>
// 	import("./plugins/technicalviews/components.js");

// Create the chart...
// let stxx = config.createChart();
// Simulate L2 data
// In your implementation, you must instead load L2 data
// using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
// CIQ.simulateL2({ stx: stxx, onInterval: 1300, onTrade: true });

//...then add whatever code you wish!


window.addEventListener("load", () => {

  // const stxx = config.createChart();
  // // 加载 ETHUSDT 图表，并执行回调函数
  // stxx.loadChart("ETHUSDT", null, function (err) {

  //   stxx.chart.yAxis.position = 'right';
  //   stxx.layout.candleWidth = 80;
  //   stxx.preferences.currentPriceLine = true;
  //   stxx.preferences.whitespace = 100;

  //   if (err) {
  //     console.error("Error loading chart:", err);
  //   } else {
  //     stxx.setChartType('mountain');
  //     stxx.setPeriodicity({ period: 1, interval: 1, timeUnit: "second" }, function () {

  //     });
  //     stxx.draw()
  //     setTimeout(() => {
  //       // stxx.layout.candleWidth = 180;
  //       // stxx.preferences.whitespace = 100;
  //       // stxx.layout.flipped = true;
  //     }, 5000);
  //   }
  // });

  // stxx.layout.chartType = "mountain";
  // stxx.layout.candleWidth = 80;
  // stxx.chart.yAxis.position = 'right';
  // stxx.preferences.whitespace = 100;
  // stxx.preferences.currentPriceLine = true;

  // Declare a CIQ.ChartEngine object. This is the main object for drawing charts.
  const stxx = new CIQ.ChartEngine({
    container: document.querySelector(".chartContainer"),
    allowScroll: false,
    allowSideswipe: false,
    allowThreeFingerTouch: false,
    allowDrawingZoom: true,
    allowZoom: false,
    layout: {
      chartType: 'mountain',
      crosshair: true,
      period: 1,
      interval: 'millisecond',
      candleWidth: 30,
    },
    preferences: {
      "currentPriceLine": true,
      "whitespace": 180,
    },
    chart: {
      yAxis: {
        position: 'right',
      },
      xAxis: {
        position: 'right'
      }
    },

  });

  // Link an animator to each chart you want to animate by adding a line like this:
  new CIQ.Animation(stxx, {
    tension: 0.3
  })
  // new CIQ.Animation({ stx: stxx, animationParameters: { tension: 0.3 } });
  // Set tension if you want to soften the curves on a line or mountain chart.

  stxx.chart.xAxis.timeUnit = CIQ.MILLISECOND;
  stxx.chart.xAxis.futureTicks = true;

  console.warn(stxx.chart, "stxx.chart");

  let now = new Date();
  var sampleData = [
    {
      "DT": new Date(now.setMilliseconds(8)),
      "Open": 152.13,
      "High": 152.19,
      "Low": 152.08,
      "Close": 152.11,
      "Volume": 4505569
    },
    {
      "DT": new Date(now.setMilliseconds(60)),
      "Open": 151.76,
      "High": 151.83,
      "Low": 151.65,
      "Close": 151.79,
      "Volume": 2799990
    },
    {
      "DT": new Date(now.setMilliseconds(102)),
      "Open": 151.79,
      "High": 151.8,
      "Low": 151.6,
      "Close": 151.75,
      "Volume": 1817706
    },
    {
      "DT": new Date(now.setMilliseconds(103)),
      "Open": 151.74,
      "High": 151.96,
      "Low": 151.74,
      "Close": 151.84,
      "Volume": 2127911
    },
    {
      "DT": new Date(now.setMilliseconds(104)),
      "Open": 151.84,
      "High": 152.03,
      "Low": 151.79,
      "Close": 151.95,
      "Volume": 1640306
    },
    {
      "DT": new Date(now.setMilliseconds(105)),
      "Open": 151.95,
      "High": 152.09,
      "Low": 151.84,
      "Close": 152.07,
      "Volume": 1420396
    },
    {
      "DT": new Date(now.setMilliseconds(106)),
      "Open": 152.07,
      "High": 152.08,
      "Low": 151.87,
      "Close": 151.91,
      "Volume": 1312368
    },
    {
      "DT": new Date(now.setMilliseconds(107)),
      "Open": 151.92,
      "High": 152.02,
      "Low": 151.88,
      "Close": 151.95,
      "Volume": 1351448
    },
    {
      "DT": new Date(now.setMilliseconds(108)),
      "Open": 151.95,
      "High": 152.02,
      "Low": 151.87,
      "Close": 151.98,
      "Volume": 1171601
    },
    {
      "DT": new Date(now.setMilliseconds(109)),
      "Open": 151.97,
      "High": 151.99,
      "Low": 151.72,
      "Close": 151.73,
      "Volume": 1340956
    },
    {
      "DT": new Date(now.setMilliseconds(110)),
      "Open": 151.73,
      "High": 151.85,
      "Low": 151.71,
      "Close": 151.82,
      "Volume": 931909
    },
    {
      "DT": new Date(now.setMilliseconds(111)),
      "Open": 151.81,
      "High": 151.87,
      "Low": 151.68,
      "Close": 151.75,
      "Volume": 864346
    },
    {
      "DT": new Date(now.setMilliseconds(112)),
      "Open": 151.74,
      "High": 151.81,
      "Low": 151.69,
      "Close": 151.73,
      "Volume": 1070323
    },
    {
      "DT": new Date(now.setMilliseconds(113)),
      "Open": 151.73,
      "High": 151.85,
      "Low": 151.71,
      "Close": 151.82,
      "Volume": 789665
    },
    {
      "DT": new Date(now.setMilliseconds(114)),
      "Open": 151.82,
      "High": 151.84,
      "Low": 151.68,
      "Close": 151.84,
      "Volume": 868275
    },
    {
      "DT": new Date(now.setMilliseconds(115)),
      "Open": 151.84,
      "High": 152.01,
      "Low": 151.83,
      "Close": 151.95,
      "Volume": 1160535
    },
    {
      "DT": new Date(now.setMilliseconds(116)),
      "Open": 151.95,
      "High": 152.07,
      "Low": 151.95,
      "Close": 152.03,
      "Volume": 1008658
    },
    {
      "DT": new Date(now.setMilliseconds(117)),
      "Open": 152.03,
      "High": 152.13,
      "Low": 151.99,
      "Close": 152.03,
      "Volume": 974990
    },
    {
      "DT": new Date(now.setMilliseconds(118)),
      "Open": 152.02,
      "High": 152.03,
      "Low": 151.91,
      "Close": 152.01,
      "Volume": 737028
    },
    {
      "DT": new Date(now.setMilliseconds(119)),
      "Open": 152.02,
      "High": 152.03,
      "Low": 151.91,
      "Close": 152.01,
      "Volume": 737028
    },
    {
      "DT": new Date(now.setMilliseconds(120)),
      "Open": 152.13,
      "High": 152.19,
      "Low": 152.08,
      "Close": 152.11,
      "Volume": 4505569
    },
    {
      "DT": new Date(now.setMilliseconds(121)),
      "Open": 151.76,
      "High": 151.83,
      "Low": 151.65,
      "Close": 151.79,
      "Volume": 2799990
    },
    {
      "DT": new Date(now.setMilliseconds(122)),
      "Open": 151.79,
      "High": 151.8,
      "Low": 151.6,
      "Close": 151.75,
      "Volume": 1817706
    },
    {
      "DT": new Date(now.setMilliseconds(123)),
      "Open": 151.74,
      "High": 151.96,
      "Low": 151.74,
      "Close": 151.84,
      "Volume": 2127911
    },
    {
      "DT": new Date(now.setMilliseconds(124)),
      "Open": 151.84,
      "High": 152.03,
      "Low": 151.79,
      "Close": 151.95,
      "Volume": 1640306
    },
    {
      "DT": new Date(now.setMilliseconds(125)),
      "Open": 151.95,
      "High": 152.09,
      "Low": 151.84,
      "Close": 152.07,
      "Volume": 1420396
    },
    {
      "DT": new Date(now.setMilliseconds(126)),
      "Open": 152.07,
      "High": 152.08,
      "Low": 151.87,
      "Close": 151.91,
      "Volume": 1312368
    },
    {
      "DT": new Date(now.setMilliseconds(127)),
      "Open": 151.92,
      "High": 152.02,
      "Low": 151.88,
      "Close": 151.95,
      "Volume": 1351448
    },
    {
      "DT": new Date(now.setMilliseconds(128)),
      "Open": 151.95,
      "High": 152.02,
      "Low": 151.87,
      "Close": 151.98,
      "Volume": 1171601
    },
    {
      "DT": new Date(now.setMilliseconds(129)),
      "Open": 151.97,
      "High": 151.99,
      "Low": 151.72,
      "Close": 151.73,
      "Volume": 1340956
    },
    {
      "DT": new Date(now.setMilliseconds(130)),
      "Open": 152.13,
      "High": 152.19,
      "Low": 152.08,
      "Close": 152.11,
      "Volume": 4505569
    },
    {
      "DT": new Date(now.setMilliseconds(131)),
      "Open": 151.76,
      "High": 151.83,
      "Low": 151.65,
      "Close": 151.79,
      "Volume": 2799990
    },
    {
      "DT": new Date(now.setMilliseconds(132)),
      "Open": 151.79,
      "High": 151.8,
      "Low": 151.6,
      "Close": 151.75,
      "Volume": 1817706
    },
    {
      "DT": new Date(now.setMilliseconds(133)),
      "Open": 151.74,
      "High": 151.96,
      "Low": 151.74,
      "Close": 151.84,
      "Volume": 2127911
    },
    {
      "DT": new Date(now.setMilliseconds(134)),
      "Open": 151.84,
      "High": 152.03,
      "Low": 151.79,
      "Close": 151.95,
      "Volume": 1640306
    },
    {
      "DT": new Date(now.setMilliseconds(135)),
      "Open": 151.95,
      "High": 152.09,
      "Low": 151.84,
      "Close": 152.07,
      "Volume": 1420396
    },
    {
      "DT": new Date(now.setMilliseconds(136)),
      "Open": 152.07,
      "High": 152.08,
      "Low": 151.87,
      "Close": 151.91,
      "Volume": 1312368
    },
    {
      "DT": new Date(now.setMilliseconds(137)),
      "Open": 151.92,
      "High": 152.02,
      "Low": 151.88,
      "Close": 151.95,
      "Volume": 1351448
    },
    {
      "DT": new Date(now.setMilliseconds(138)),
      "Open": 151.95,
      "High": 152.02,
      "Low": 151.87,
      "Close": 151.98,
      "Volume": 1171601
    },
    {
      "DT": new Date(now.setMilliseconds(139)),
      "Open": 151.97,
      "High": 151.99,
      "Low": 151.72,
      "Close": 151.73,
      "Volume": 1340956
    }
  ];


  stxx.loadChart("TEST", sampleData, function () {
    streamSimulation(); // 启动模拟流
  });

  function streamSimulation() {
    let price = 151.73;
    // if there is something in the masterData use the last element as the basis for our random seed
    if (stxx.chart.masterData.length) {
      price = stxx.chart.masterData[ stxx.chart.masterData.length - 1 ].Close;
    }
    let change = (price * .02) * Math.random() - (price * .01); // random between +/-1% of current price
    price = price + parseFloat(change.toFixed(2));
    let volume = Math.floor(Math.random() * 10) + 1
    stxx.updateChartData({
      "Last": price,
      "Volume": volume
    }, null, {
      bypassGovernor: true
    });

    // if (Math.floor(price) % 3 == 0) drawEvents(stxx, someDate, price, new Date().getTime());
    setTimeout(streamSimulation, 1000);
    // stxx.chart.xAxis.zoom = -0.0000001;
    // stxx.chart.yAxis.zoom = -0.0000001;
    // drawing.d0 = stxx.masterData[ stxx.masterData.length - 1 ].Date;
  }

  const doDraw = () => {
    let someDate = new Date(stxx.masterData[ stxx.masterData.length - 1 ].DT);
    console.warn(someDate, "someDate");
    drawEvents(stxx, someDate, price, new Date().getTime())
  }
  let button = document.querySelector(".btn")
  button.addEventListener("click", function () {
    let dataJson = stxx.masterData[ stxx.masterData.length - 1 ];
    let someDate = new Date(dataJson.DT);
    let price = dataJson.Close;
    console.warn(dataJson, "someDate - - - - ");
    drawEvents(stxx, someDate, price, new Date().getTime())
  });

  const drawEvents = throttle((stxx, x, y, direction) => {

    // 平滑缩放到最近 30 个时间点
    // smoothZoomSet(stxx, 34, 5);

    let newNode;
    newNode = document.querySelector("#stxEvent").cloneNode(true);
    newNode.id = `stxEvent-${direction}`;
    // newNode.querySelector(".content", newNode).innerHTML = 'H';
    newNode.querySelector(".tooltip", newNode).title = y;
    newNode.classList.add("hoverMarker");
    // newNode.classList.add("dividend");
    new CIQ.Marker({
      stx: stxx,
      // xPositioner: "date",
      // yPositioner: "under_candle", // above_candle
      x: x,
      label: "events",
      node: newNode
    });

    // stxx.zoomIn(null, 0.7)
    // stxx.zoomOut(null, 1.3);
    // 更新滚动位置
    // console.warn(stxx.chart, "stxx.chart");
    // stxx.chart.scroll = stxx.chart.maxTicks - 4;
    // smoothZoomAndFocus();

    stxx.draw();
    setTimeout(() => {
      const marker = document.querySelector(`#${newNode.id}`)
      marker.remove()
      // stxx.draw();
      // smoothZoomSet(stxx, 20, 5);
    }, 15000)
  }, 1000)



  function smoothZoomSetII(stxx, targetTicks, scroll) {
    let currentTicks = stxx.chart.maxTicks; // 获取当前显示的时间点数
    let step = Math.ceil((currentTicks - targetTicks) / 5); // 计算每次缩放的步长
    console.warn(step, currentTicks, targetTicks, "step - - - currentTicks - - - - targetTicks");
    console.warn(stxx, "stxx");
    let interval = setInterval(() => {
      if (currentTicks > targetTicks) {
        currentTicks -= step; // 减少时间点数
        stxx.zoomSet(currentTicks);
      } else {
        clearInterval(interval); // 停止平滑缩放
        stxx.zoomSet(targetTicks); // 最终设置目标范围
      }
      stxx.chart.scroll = stxx.chart.maxTicks - scroll;
      stxx.preferences.whitespace = 180;

      stxx.draw(); // 重绘图表
    }, 16); // 每 100 毫秒缩放一次
  }

  function smoothZoomSet(stxx, targetTicks, scroll) {
    const initialTicks = stxx.chart.maxTicks; // 当前显示的时间点数
    const initialScroll = stxx.chart.scroll; // 当前滚动位置

    const totalFrames = 60; // 动画总帧数，约 1 秒完成动画
    let currentFrame = 0; // 当前帧计数

    const ticksStep = Math.abs((initialTicks - targetTicks) / totalFrames); // 每帧减少的时间点数
    const scrollStep = Math.abs(initialScroll / totalFrames); // 每帧滚动的调整量
    console.warn(ticksStep, scrollStep, stxx, "ticksStep - - scrollStep");
    function animate() {
      if (currentFrame < totalFrames) {
        currentFrame++;
        // 逐步调整时间点数
        const currentTicks = initialTicks - ticksStep * currentFrame;
        stxx.zoomSet(currentTicks);
        console.warn(currentFrame, "currentFrame");
        // 调整滚动位置
        // stxx.chart.scroll = initialScroll;
        stxx.chart.scroll = stxx.chart.maxTicks - scroll;

        // 设置空白宽度
        // stxx.preferences.whitespace = 180;

        // 重绘图表
        stxx.draw();

        // 请求下一帧
        requestAnimationFrame(animate);
      } else {
        // 动画结束，确保最终值精准
        stxx.zoomSet(targetTicks);
        stxx.chart.scroll = stxx.chart.maxTicks - scroll;
        // stxx.preferences.whitespace = 180;
        stxx.draw();
      }
    }

    // 开始动画
    animate();
  }



  function smoothAdjustWithZoom(stx, targetWhitespace, targetScroll, targetZoom, duration) {
    const initialWhitespace = stx.preferences.whitespace; // 当前空白宽度
    const initialScroll = stx.chart.scroll; // 当前滚动位置
    const initialZoom = stx.chart.maxTicks; // 当前 zoom（最大显示时间点数）

    const whitespaceStep = Math.abs((targetWhitespace - initialWhitespace) / (duration / 16)); // 每帧调整的空白宽度
    const scrollStep = Math.abs((targetScroll - initialScroll) / (duration / 16)); // 每帧调整的滚动位置
    const zoomStep = Math.abs((targetZoom - initialZoom) / (duration / 16)); // 每帧调整的 zoom
    console.warn(whitespaceStep, scrollStep, zoomStep, "whitespaceStep - - - - - -");
    let currentFrame = 0;
    const totalFrames = duration / 16; // 估计每秒 60 帧

    function animate() {
      if (currentFrame < totalFrames) {
        stx.preferences.whitespace += whitespaceStep;
        stx.chart.scroll += scrollStep;
        stx.zoomSet(Math.round(initialZoom + zoomStep * currentFrame)); // 调整 zoom

        stx.draw(); // 重绘图表

        currentFrame++;
        requestAnimationFrame(animate); // 下一帧
      } else {
        // 确保最终值精准
        stx.preferences.whitespace = targetWhitespace;
        stx.chart.scroll = targetScroll;
        stx.zoomSet(targetZoom); // 最后设置 zoom
        stx.draw(); // 最后重绘
      }
    }

    animate(); // 开始动画
  }


























  // 防抖函数实现
  function debounce(func, delay = 3000) {
    let timer;
    return function (...args) {
      clearTimeout(timer); // 清除之前的计时器
      timer = setTimeout(() => func.apply(this, args), delay); // 启动新的计时器
    };
  }

  // 节流函数实现
  function throttle(func, delay = 100) {
    let lastTime = 0; // 上次调用的时间戳

    return function (...args) {
      const now = Date.now();

      if (now - lastTime >= delay) {
        func.apply(this, args); // 调用函数
        lastTime = now; // 更新上次调用时间
      }
    };
  }









  function updateMyDOMElement(close) {
    let myDOMElement;
    myDOMElement = document.querySelector("#myDOMElement").cloneNode(true);
    console.warn(myDOMElement, "myDOMElement");
    myDOMElement.id = null;
    myDOMElement.innerHTML = close;
    stxx.draw();
    // alert(`injection success ${close}`)
  }


  function myInjection() {
    console.warn("this.backOutX(CIQ.ChartEngine.crosshairX)");
    // get the price under the crosshairs by finding the bar and then looking in the x-axis array
    var bar = this.barFromPixel(this.backOutX(CIQ.ChartEngine.crosshairX));
    var prices = this.chart.xaxis[ bar ];
    // console.warn(this.backOutX(), "this.barFromPixel");

    // pass the Close from the intersected x-axis bar into the function which populates the DOM element
    if (prices && prices.data) updateMyDOMElement(prices.data.Close);
  }
  // stxx.append("headsUpHR", myInjection);


















  // 绘制起跑线和终点线
  function drawLines(stxx) {
    // 起跑线和终点线时间设定
    const startTime = new Date(Date.now() + 5000); // 起跑时间：当前时间 + 5 秒
    const endTime = new Date(Date.now() + 15000); // 终点时间：当前时间 + 15 秒
    const ctx = stxx.chart.context;
    const chart = stxx.chart;
    const panel = chart.panel;

    // 转换时间到像素坐标
    const startX = stxx.pixelFromDate(startTime, chart);
    const endX = stxx.pixelFromDate(endTime, chart);
    console.warn(startX, "startX");

    ctx.save();
    ctx.lineWidth = 2;
    ctx.setLineDash([ 5, 5 ]); // 设置虚线样式

    // 绘制起跑线
    ctx.strokeStyle = "#00FF00"; // 绿色
    ctx.beginPath();
    ctx.moveTo(startX, panel.top);
    ctx.lineTo(startX, panel.bottom);
    ctx.stroke();

    // 绘制终点线
    ctx.strokeStyle = "#FFA500"; // 橙色
    ctx.beginPath();
    ctx.moveTo(endX, panel.top);
    ctx.lineTo(endX, panel.bottom);
    ctx.stroke();

    ctx.restore();
  }

  // 添加标记
  function addPriceMarkers(stxx) {
    const markers = [];

    function createMarker(x, y, text, color) {
      const marker = new CIQ.Marker({
        stx: stxx,
        xPositioner: "none",
        yPositioner: "none",
        x,
        y,
        node: (() => {
          const node = document.createElement("div");
          node.style.position = "absolute";
          node.style.color = "white";
          node.style.background = color || "black";
          node.style.padding = "5px";
          node.style.borderRadius = "3px";
          node.style.fontSize = "12px";
          node.innerHTML = text;
          return node;
        })(),
      });
      markers.push(marker);
    }

  }


});