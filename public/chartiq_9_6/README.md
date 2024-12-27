## 去除 alert

. stxx.controls 所有的操控UI

. stxx.controls["home"] 回到最右边

. stxx.masterData

. stxx.chart.dataSet

. stxx.yaxisLabelStyle = "roundRectArrow"; // 当前价格样式

. 设置 y 轴宽度
stxx.chart.yAxis.width = stxx.chart.yAxis.smallScreenWidth;
stxx.calculateYAxisPositions();
stxx.draw();

. 将 y 轴宽度重置为默认值。
stxx.chart.yAxis.width = CIQ.ChartEngine.YAxis.prototype.width;
stxx.calculateYAxisPositions();
stxx.draw();

. y轴放大级别
stxx.chart.yAxis.zoom=100;
stxx.draw();

. z轴放大级别
stxx.chart.zAxis.zoom=100;
stxx.draw();

. stxx.chart.dataSegment 可见范围数据
. stxx.chart.dataSet 全部数据
. stxx.chart.masterData 初始化数据

### 重要

. stxx.tickFromDate // 时间转换成索引
. stxx.pixelFromTick // 索引转换成位置 基于x轴
. stxx.pixelFromDate // 时间转换成位置 基于x轴
. stxx.pixelFromPrice // 价格转换成位置 基于y轴
