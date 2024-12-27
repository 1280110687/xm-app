// This inline script acts as the entry point, without creating a separate external file.

import './js/advanced.js';
import './js/addOns.js';
import { CIQ } from './js/components.js';

CIQ.alert = function () {

}

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

import getDefaultConfig from './defaultConfiguration.js';
import PerfectScrollbar from './js/thirdparty/perfect-scrollbar.esm.js';

import quotefeed from './quoteFeedSimulator.js';
import './examples/feeds/symbolLookupChartIQ.js';

import './examples/markets/marketDefinitionsSample.js';
import './examples/markets/marketSymbologySample.js';
import './examples/markets/timezones.js';

import marker from './examples/markers/markersSample.js';
import './examples/markers/tradeAnalyticsSample.js';
import './examples/markers/videoSample.js';

import './examples/translations/translationSample.js';

const config = getDefaultConfig({
  markerFeed: marker.MarkersSample,
  scrollStyle: PerfectScrollbar,
  quoteFeed: quotefeed,
});

config.addOns.tableView.coverContainer = '.ciq-chart-area';
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
  shortcuts: false, // 快捷键
  tableView: true, // 表格视图
  tooltip: false, // 工具提示
};
config.initialSymbol = '^BTCUSD';
config.plugins.marketDepth = false;

// window.addEventListener("DOMContentLoaded", function () {
//   console.log("文档已构建完成，但资源可能尚未加载完毕。");
//   const loader_screen = document.querySelector("cq-loader-screen");
//   console.log(loader_screen)

// });
function getScale(stxx) {
  // console.log(stxx)
  // 获取当前显示的最大数据点数和实际数据点总数
  let maxVisibleBars = stxx.chart.maxTicks;  // 图表当前显示的最大数据点数
  let totalBars = stxx.chart.dataSet.length; // 数据集中的总数据点数
  // console.log(totalBars, maxVisibleBars)
  // 计算缩放倍数
  let zoomLevel = totalBars / maxVisibleBars;
  console.log(`当前放大倍数 (Zoom Level): ${zoomLevel}`);
  return zoomLevel
}
// 自定义marker
function custom_marker(stxx) {


  const masterData = stxx.masterData;
  const len = masterData.length
  const up_item = masterData[ len - 50 ]
  const down_item = masterData[ len - 100 ]

  // console.log(up_item, 'up_item')


  let newNode;

  newNode = document.querySelector("#maio_up_marker").cloneNode(true);
  newNode.id = null
  newNode.querySelector('span', newNode).innerHTML = up_item.Close + ' USDT'

  new CIQ.Marker({
    stx: stxx,
    xPositioner: "date",
    x: up_item.DT,
    label: "events",
    node: newNode
  });

  stxx.draw();

  newNode = document.querySelector("#maio_down_marker").cloneNode(true);
  newNode.id = null
  newNode.querySelector('span', newNode).innerHTML = up_item.Close + ' USDT'

  new CIQ.Marker({
    stx: stxx,
    xPositioner: "date",
    x: down_item.DT,
    label: "events",
    node: newNode
  });

  // console.log(stxx.markers)

  setTimeout(() => {
    stxx.markers.events[ 1 ].remove()
  }, 3000)



  stxx.draw();
}
// 监听 dataSet 变化
function monitorDataSetChange(stxx, callback) {
  let previousDataSetLength = stxx.chart.dataSet ? stxx.chart.dataSet.length : 0;

  stxx.prepend("draw", function () {
    const currentDataSetLength = stxx.chart.dataSet ? stxx.chart.dataSet.length : 0;

    if (currentDataSetLength !== previousDataSetLength) {
      // 调用回调函数，传递当前 dataSet
      callback(currentDataSetLength, previousDataSetLength);
      previousDataSetLength = currentDataSetLength;
    }
  });
}
const myDOMElement = document.querySelector('#stxRhombusPrototype')

function updateMyDOMElement(close) {
  console.log(close, 'close')
  myDOMElement.innerHTML = close;
}
function myInjection() {
  // get the price under the crosshairs by finding the bar and then looking in the x-axis array
  var bar = this.barFromPixel(this.backOutX(CIQ.ChartEngine.crosshairX));
  var prices = this.chart.xaxis[ bar ];

  console.log(bar)

  // pass the Close from the intersected x-axis bar into the function which populates the DOM element
  if (prices && prices.data) updateMyDOMElement(prices.data.Close);
}


window.addEventListener("load", () => {





  let stxx = config.createChart();


  // stxx.append("headsUpHR", myInjection);

  const loader_screen = document.querySelector("cq-loader-screen");

  let previousMaxTicks = stxx.chart.maxTicks;

  function checkZoom() {
    let currentMaxTicks = stxx.chart.maxTicks;
    let totalBars = stxx.chart.dataSet.length; // 数据总长度

    // 计算缩放比例
    let scale = totalBars / currentMaxTicks;

    if (currentMaxTicks !== previousMaxTicks) {
      // console.log(`缩放比例 (Scale): ${scale}`);
      previousMaxTicks = currentMaxTicks;
    }
  }

  stxx.prepend("draw", checkZoom); // 每次重绘都会检查缩放变化

  // myInjection()

  // let previousScroll = stxx.chart.scroll; // 保存初始滚动位置

  // function monitorScroll() {
  //   let currentScroll = stxx.chart.scroll; // 当前滚动位置

  //   console.log(stxx.chart.dataSet.length)
  //   if (currentScroll !== previousScroll) {
  //     console.log(`滚动位置已改变: ${currentScroll}`);
  //     previousScroll = currentScroll; // 更新滚动位置
  //   }
  // }

  // // 在每次重绘前调用回调函数
  // stxx.prepend("draw", monitorScroll);

  // 禁用背景网格线
  stxx.chart.xAxis.displayGridLines = false;
  stxx.chart.yAxis.displayGridLines = false;

  const loader = document.querySelector("cq-loader");

  if (loader) loader.show();

  // stxx.chart.yAxis.yaxisLabelStyle = "rect" // 矩形


  // console.log(stxx.chart.yAxis)

  // 加载 ETHUSDT 图表，并执行回调函数
  stxx.loadChart("ETHUSDT", null, function (err) {
    if (loader_screen) loader_screen.style.display = 'none'
    if (err) {
      console.error("Error loading chart:", err);
    } else {
      stxx.setChartType('mountain');
      // stxx.setChartType('candle');


      // stxx.zoomIn();
      getScale(stxx)

      stxx.setPeriodicity({ period: 1, interval: 1, timeUnit: "second" }, function () {
        if (loader) loader.hide();
      });


      // // 确保数据已加载完成
      // if (stxx.chart.dataSet && stxx.chart.masterData.length) {
      //   console.log(stxx.chart.scroll)
      //   // stxx.chart.scroll = stxx.chart.masterData.length; // 滚动到数据集的最后一个点
      //   stxx.draw(); // 重新绘制图表以应用更改
      // }

      // console.log(stxx.controls["home"])
      // console.log(stxx.controls)
      // stxx.yaxisLabelStyle = "noop";


      // function addCustomMarker(stxx, tickIndex, text) {
      //   const marker = document.createElement("div");
      //   marker.className = "custom-marker";
      //   marker.style.position = "absolute";
      //   marker.style.left = stxx.pixelFromTick(tickIndex) + "px"; // 计算 X 位置
      //   marker.style.top = "50px"; // 自定义 Y 轴位置
      //   marker.innerHTML = `<span style="color: red;">🔔 ${text}</span>`;

      //   // 添加到图表容器
      //   stxx.container.appendChild(marker);
      // }

      // // 调用函数：手动插入 Marker 到指定的 tick 位置
      // if (stxx.chart.dataSet) {
      //   const lastIndex = stxx.chart.dataSet.length - 1; // 获取最后一个数据点的索引
      //   addCustomMarker(stxx, lastIndex, "重要事件");
      // }

      // custom_marker(stxx);
      stxx.draw()




      const masterData = stxx.chart.masterData;
      const startTime = masterData[ 0 ].DT
      const endTime = masterData[ masterData.length - 1 ].DT
      const price = masterData[ masterData.length - 1 ].Close

      const { timeAfter } = getTimeRangeAroundCurrent(10, 30)

      // 动态添加水平线，基于 masterData 的起始和结束索引
      // 附加绘图逻辑并获取 injection ID
      const drawHorizontalLineInjectionId = stxx.append("draw", function () {
        drawHorizontalLineBasedOnMasterData(price, "red", [], startTime, timeAfter);


        // console.log(drawHorizontalLineInjectionId)

        const dataSet = stxx.chart.dataSet


        const trigger_data = dataSet.find(i => new Date(i.DT).getTime() >= new Date(timeAfter).getTime())
        if (trigger_data) {
          console.log('绘制水平线已经移除')
          stxx.remove("draw", drawHorizontalLineInjectionId);

          miao_end_marker(stxx, timeAfter, trigger_data.Close)


        }
      });


      // console.log(drawHorizontalLineInjectionId, 'drawHorizontalLineInjectionId')

      // 移除附加的绘图逻辑
      // stxx.remove("draw", drawHorizontalLineInjectionId);

      setTimeout(() => {
        // console.log(stxx.controls["home"])
        stxx.controls[ "home" ]?.click()
      }, 0)

    }


  });




  function batch_mock(fn, times = 99) {



  }


  // 绘制水平线
  function drawHorizontalLineBasedOnMasterData(price, color = "red", pattern = [ 5, 5 ], startTime = null, endTime = null) {

    const ctx = stxx.chart.context;
    const panel = stxx.chart.panel; // 获取主图表面板

    const dataSet = stxx.chart.dataSet

    const trigger_data = dataSet.find(i => new Date(i.DT).getTime() >= new Date(endTime).getTime())


    if (trigger_data) {
      const y = stxx.pixelFromPrice(trigger_data.Close, stxx.chart.panel.subholder);
      const x = stxx.pixelFromDate(trigger_data.DT);


      // drawGradientCircle(ctx, x, y, 20, "yellow", "green");


      return
    }


    const rect = panel?.subholder.getBoundingClientRect();

    const { width, height, x, y, top, bottom, left, right } = rect;

    const yAxis = stxx.pixelFromPrice(price, stxx.chart.panel.subholder); // 将价格转换为 Y 坐标

    // 将 `masterData` 的索引转换为 X 坐标
    let startX = stxx.pixelFromDate(startTime);
    const xAxis = stxx.pixelFromDate(endTime);
    let endX = xAxis;



    startX = Math.max(startX, left)
    endX = Math.min(endX, right)
    endX = Math.max(startX, endX)

    ctx.beginPath();
    ctx.moveTo(startX, yAxis); // 起点
    ctx.lineTo(endX, yAxis);   // 终点
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash(pattern);
    ctx.stroke();


    if (xAxis < right) {
      // 绘制垂直线
      ctx.beginPath();
      ctx.moveTo(xAxis, top); // 起点 (X, Top)
      ctx.lineTo(xAxis, bottom); // 终点 (X, Bottom)
      ctx.strokeStyle = color; // 设置线条颜色
      ctx.lineWidth = 1; // 设置线条宽度
      ctx.setLineDash(pattern); // 设置虚线样式
      ctx.stroke();
    }

  }








  // 获取均价
  function calculateAverageClose(datas = []) {
    const effect_data = datas.filter(i => !!i)
    // 确保 masterData 存在且不为空
    if (!effect_data || effect_data.length === 0) {
      console.error("masterData is empty or undefined");
      return null;
    }

    let totalClose = 0; // 总和
    let count = 0;      // 有效数据点计数

    // 遍历 masterData
    effect_data.forEach(data => {
      if (!data) console.log(effect_data)
      if (data.Close !== undefined && data.Close !== null) {
        totalClose += data.Close; // 累加 Close 值
        count++; // 增加计数
      }
    });

    if (count === 0) {
      console.error("No valid Close values found in masterData");
      return null;
    }

    const averageClose = totalClose / count; // 计算平均值
    return averageClose;
  }



  function getTimeRangeAroundCurrent(secondsBefore = 100, secondsAfter = 100) {
    const currentTime = new Date(); // 当前时间

    // 计算前 20 秒的时间
    const timeBefore = new Date(currentTime);
    timeBefore.setSeconds(currentTime.getSeconds() - secondsBefore);

    // 计算后 20 秒的时间
    const timeAfter = new Date(currentTime);
    timeAfter.setSeconds(currentTime.getSeconds() + secondsAfter);

    return { currentTime, timeBefore, timeAfter };
  }



  // console.log(stxx.chart.panel.subholder)

  // stxx.chart.panel.subholder.appendChild(yAxis_arrow)




  stxx.yaxisLabelStyle = "customPriceLabelWithImage"; // 引用自定义标签函数





  if (window.ciqAvailable) {
    window.ciqAvailable({
      stxx,
      CIQ,
    });
  }
});



// 防抖函数实现
function debounce(func, delay = 500) {
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



function drawGradientCircle(ctx, x, y, radius = 5, innerColor = "red", outerColor = "blue") {
  // 创建径向渐变
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, innerColor); // 内部颜色
  gradient.addColorStop(1, outerColor); // 外部颜色

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI); // 绘制圆形
  ctx.fillStyle = gradient; // 使用渐变填充
  ctx.fill(); // 填充圆形
}



// 自定义 秒结束
function miao_end_marker(stxx, x, y) {
  const markerId = `marker-${Date.now()}`;
  let newNode;
  newNode = document.querySelector("#maio_down_end_marker").cloneNode(true);
  newNode.id = markerId


  new CIQ.Marker({
    stx: stxx,
    xPositioner: "date",
    x: x,
    label: "events",
    node: newNode
  });

  stxx.draw();


  setTimeout(() => {
    const marker = document.querySelector(`#${markerId}`)

    marker.remove()

    stxx.draw();
  }, 3000)




}





// 定义一个自定义价格标签函数
CIQ.customPriceLabelWithImage = function (params) {
  let { backgroundColor, color, ctx, height, stroke, radius, margin: { top, left }, txt, width, x, y } = params



  const context = ctx; // 获取 Canvas 上下文

  height = 16


  yAxis_arrow.style.left = x - 20 + 'px'
  yAxis_arrow.style.top = y - 13 + 'px'
  yAxis_arrow.style.zIndex = 1
  yAxis_arrow.querySelector('.yAxis_arrow_bg').style.fill = backgroundColor

  // 绘制标签背景
  context.fillStyle = backgroundColor; // 设置背景颜色



  y -= height / 2

  // 绘制圆角矩形
  context.beginPath();
  context.moveTo(x, y); // 左上角
  context.lineTo(x + width - radius, y); // 上边线到右上角圆角的起点
  context.arcTo(x + width, y, x + width, y + radius, radius); // 右上角圆角
  context.lineTo(x + width, y + height - radius); // 右边线到右下角圆角的起点
  context.arcTo(x + width, y + height, x + width - radius, y + height, radius); // 右下角圆角
  context.lineTo(x, y + height); // 下边线到左下角
  context.lineTo(x, y); // 返回到左上角
  context.closePath();
  // 填充矩形
  context.fill();



  // 绘制文字
  context.fillStyle = color; // 白色字体
  context.font = "12px Arial";
  context.fillText(txt, x + 5, y + 12); // 显示价格



};




