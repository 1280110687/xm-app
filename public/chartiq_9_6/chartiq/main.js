
// // 添加监听
// document.addEventListener("readystatechange", function () {
//   if (document.readyState === "interactive") {
//     console.log("页面解析完成，DOM 可操作");
//     addMessage()
//   }
// });

// 删除监听
window.addEventListener("error", this.removeMessage);


// 删除监听
window.addEventListener("unload", this.removeMessage);


// 添加监听
window.addEventListener("load", this.addMessage, !1);


// 发送
function Ms(t) {
  window.parent.postMessage(JSON.stringify(t), { targetOrigin: '*' });
}

window.addEventListener('message', this.Mr, !1)

function addMessage() {
  window.addEventListener('message', this.Mr, !1)
  this.readyToCreate()
}

function removeMessage() {
  this.removeEventListener('message', this.Mr)
}






// 接收
function Mr(t) {
  if ('string' === typeof t.data)
    try {
      const e = JSON.parse(t.data);

      const { type, payload } = e;

      console.log(type, payload, '来自parent')

      if ('initial' === e.type) {
        // initial(payload)
      }

      if ('draw' === e.type) {
        // draw(payload)
      }
    } catch (e) {
      console.error(e);
    }

}

function readyToCreate() {
  Ms({
    type: "ready-to-create"
  })
}


function initial(payload) {
  console.log(payload)

  const { symbol, data } = payload

  console.log(CIQ)
  console.log(stxx)

  stxx.loadChart(symbol, {
    masterData: data,
  });



  // stxx.setChartType('lines');
  stxx.setPeriodicity({ period: 1, interval: 1, timeUnit: 'second' });

}

function draw(payload) {
  console.log(stxx)
  console.log(payload)

  // stxx.setData(payload)
  // stxx.addData(payload)
  // stxx.updateChartData(payload)

  const data = { ...payload[0] }

  data.Last = Number(data.Close)

  console.log(data)

  stxx.updateChartData(data);



}


// (this.onMessage = (t) => {
//   if ('string' === typeof t.data)
//     try {
//       const e = JSON.parse(t.data);
//       if ('initial' === e.type) {
//         this.fetchInitialResolve(e.payload);
//       } else if ('pagination' === e.type) {
//         this.fetchPaginationResolve(e.payload);
//       } else if ('draw' === e.type) {
//         this.chart.draw(e.payload);
//       } else if ('render' === e.type) {
//         this.render(e.payload);
//       } else if ('addMarker' === e.type) {
//         this.chart.addMarker(e.payload);
//       } else if ('removeMarker' === e.type) {
//         this.chart.removeMarker(e.payload);
//       } else if ('positionOrder' === e.type) {
//         this.chart.positionMarker(e.payload);
//       } else if ('positionSpacing' === e.type) {
//         this.chart.positionSpacing(e.payload);
//       } else if ('drawSpreadLine' === e.type) {
//         this.chart.drawSpreadLine(e.payload);
//       } else if ('drawSpreadOrderLine' === e.type) {
//         this.chart.drawSpreadOrderLine(e.payload);
//       } else if ('set-theme' === e.type) {
//         {
//           const {
//             klineBottomColor: t,
//             klineTopColor: i,
//             klineBorderColor: a,
//             klineWidth: n,
//             theme: r,
//           } = e.payload;
//           t && document.body.style.setProperty('--kline-bottom-color', t),
//             i && document.body.style.setProperty('--kline-top-color', i),
//             a &&
//             document.body.style.setProperty('--kline-border-color', a),
//             n && document.body.style.setProperty('--kline-width', n),
//             this.render({ theme: r }),
//             (document.body.className = r || '');
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     })
