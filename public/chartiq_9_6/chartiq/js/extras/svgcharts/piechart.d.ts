import '../../../js/chartiq.js'
declare module '../../../js/chartiq.js' {
  /**
   * Namespace for SVG Charts.
   *
   */
  export namespace CIQ.SVGChart {
    /**
     * Draws a pie or donut chart SVG graphic using D3.
     *
     * This method should rarely if ever be called directly. Use CIQ.Visualization instead. This method should be passed in as the `renderFunction` attribute.
     * The data array for this method takes an object with a `name` and a `value` property for each segment of the pie.
     *
     * The attributes supported for this specific method are documented as parameters below.
     *
     * This method attaches the following class names, allowing styles to be assigned to them:
     * - arc: Attaches to each `<g>` element containing a `<path>` element defining a pie wedge.
     * - name: Attaches to the `<tspan>` element containing the text fill of the `name` property of the data.
     * - value: Attaches to the `<tspan>` element containing the text fill of the `value` property of the data.
     * - title: Attaches to the `<g>` element containing the chart's title text.
     *
     * @param data Array of objects representing the data to use when generating the SVG graphic.
     * @param attributes Parameters to be used when creating the SVG graphic.
     * @param attributes.container Element in which to place the SVG graphic. This element must have a height and width defined in its CSS.
     * @param [attributes.printLabels=true] Set to false to suppress the printing of the data's name property on the chart.
     * @param [attributes.printValues=true] Set to false to suppress the printing of the data's value property on the chart.
     * @param [attributes.valueFormatter] Optional formatting function for values. If omitted, formats `toLocaleString`.
     * @param [attributes.translator] Optional translation function for text. If omitted, uses the chart engine's translation function if available.
     * @param [attributes.onclick] Optional click handler to be placed on each SVG path (each pie wedge). The function takes a D3 record `d`, in which
     * 		one can find the data record (`d.data`).
     * @param [attributes.sorter] Optional sorting function for the wedges in the pie, beginning clockwise from top.
     * @param [attributes.colorRange] Optional function or array for setting the range of colors. The function should return an array.
     * 		The colors are assigned to the data array's elements *before* the sorting function is called. The default array is produced by the D3 function
     * 		`d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse()`. A function is useful for generating a color based on a scale.
     * 		An array is useful for assigning a color to a specific data record based on its location within the data array.
     * @param [attributes.legend] Optional legend function. If set to `true`, will use the built in legend creator. If passed a function, will use that.
     * 		Function has the following signature: `legendFunc(svg, pieData, color)`, where `svg` is the D3 SVG graphic being created,
     * 		`pieData` is the D3 data being rendered, and `color` is the D3 color function.
     * @param [attributes.type=pie] Valid values are "pie" or "donut".
     * @param [attributes.padAngle=0.005] Function that returns radians of blank space between each wedge; takes a D3 record `d`.
     * @param [attributes.showValueAngle=0.25] Function that returns radians below which a wedge would not display the value; takes a D3 record `d`.
     * @param [attributes.className] Optional class name for the chart. This is attached to the \<svg\> tag.
     * @param [attributes.title] Optional title for the chart; appears above the chart if specified.
     * @return An SVG element.
     *
     * @since 7.4.0
     *
     * @example
     * <caption>Create a container 300 x 300 pixels.</caption>
     *
     * let pie = new CIQ.Visualization({ renderFunction: CIQ.SVGChart.renderPieChart });
     * pie.updateData({"Low":{name:"low", value:30}, "High":{name:"high", value:70}});
     * CIQ.extend(pie.container.style, {position:"absolute", top:0, zIndex:500});  // Style container.
     *
     * <!-- Puts chart into canvas shim. -->
     * <style>
     * #pie {
     *     height: 250px;
     *     width: 250px;
     *     position: absolute;
     *     bottom: 150px;
     *     left: 200px;
     *     opacity: 0.8;
     *     display : block;
     *     pointer-events: auto;  // set to none if the chart is blocking chart interaction
     *     z-index: 500;
     * }
     * .pie-chart {
     *     fill: #000;
     * }
     * .ciq-night .pie-chart {
     *     fill: #fff;
     * }
     * .pie-chart .arc {
     *     font-size: 12px;
     *     text-anchor: middle;
     * }
     * .pie-chart .arc tspan {
     *     fill: #333;
     *     }
     * .pie-chart .arc tspan.name {
     *     font-weight: bold;
     * }
     * .pie-chart .arc tspan.value {
     *     fill-opacity: 0.8;
     * }
     * .pie-chart .title {
     *     font-size: 14px;
     *     font-weight: bold;
     * }
     * .pie-chart .title text {
     *     text-anchor: middle;
     *     text-align: center;
     *     dominant-baseline: hanging;
     * }
     * </style>
     * ...
     * var attributes = {
     *     title: "My Donut Chart",
     *     type: "donut",
     *     container: "#pie",
     *     className: "pie-chart",
     *     useCanvasShim: true,
     *     stx: stxx,
     *     renderFunction: CIQ.SVGChart.renderPieChart
     * };
     *
     * (new CIQ.Visualization(attributes)).updateData(data);
     */
    function renderPieChart(
      data: object[],
      attributes: {
        container: HTMLElement,
        printLabels?: boolean,
        printValues?: boolean,
        valueFormatter?: Function,
        translator?: Function,
        onclick?: Function,
        sorter?: Function,
        colorRange?: Function|string[],
        legend?: Function|boolean,
        type?: string,
        padAngle?: Function,
        showValueAngle?: Function,
        className?: string,
        title?: string
      }
    ): HTMLElement
  }
}
