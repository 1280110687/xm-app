import { CIQ } from "../../js/chartiq.js";
import "./signaliq.js";
import "./highPerformanceMarkers.js";
declare module '../../js/chartiq.js' {
  export namespace CIQ.Marker {
    /**
     * Specific subclass of markers for SignalIQ purposes.
     *
     * @since 8.6.0
     */
    class SignalIQ {
      /**
       * Specific subclass of markers for SignalIQ purposes.
       *
       * @param params Marker parameters. See CIQ.Marker for details.
       * @since 8.6.0
       */
      constructor(params: object)
    }
  }

  export namespace CIQ.SignalIQ {
    /**
     * Namespace within CIQ.SignalIQ which represents an alert as an emoji on the chart.
     *
     * @since 8.8.0
     */
    class Emojimarker {
      /**
       * Creates a signal as an emoji marker. This is called when the `signalData.notificationType` value is "marker".
       *
       * @param data Parameters used to create marker.
       * @return A marker representing a SignalIQ alert.
       *
       * @static
       * @since 8.8.0
       */
      public static create(data: CIQ.SignalIQ.NotificationData): CIQ.Marker.SignalIQ
    }
  }

  /**
   * Namespace within CIQ.SignalIQ which represents an alert as a marker on the chart.
   *
   * @since  8.6.0
   */
  export namespace CIQ.SignalIQ.Marker {
    /**
     * Creates a signal as a marker. This is called when the `signalData.notificationType` value is "marker".
     *
     * @param data Parameters used to create marker.
     * @return A marker representing a SignalIQ alert.
     *
     * @static
     * @since 8.6.0
     */
    function create(data: CIQ.SignalIQ.NotificationData): CIQ.Marker.SignalIQ
  }
}
