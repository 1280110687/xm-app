import { CIQ } from "../../js/chartiq.js";
import "./signaliq.js";
declare module '../../js/chartiq.js' {
  /**
   * Namespace within CIQ.SignalIQ that represents painting a bar on an OHLC chart.
   *
   * @since 8.7.0
   */
  export namespace CIQ.SignalIQ.Paintbar {
    /**
     * Creates a signal as a "painted" OHLC bar.
     *
     * @param data Parameters used to create paintbar.
     * @return The object representing a painted bar.
     *
     * @static
     * @since 8.7.0
     */
    function create(data: CIQ.SignalIQ.NotificationData): object
    /**
     *
     * @param stx Chart engine
     * @return Appropriate function to call after the chart is renderered.  The function depends on the chart type.
     * @static
     */
    function getInjection(stx: CIQ.ChartEngine): Function
  }
}
