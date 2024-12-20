import { CIQ } from "../../js/standard.js";
export { CIQ };

/**
 *
 */
declare module './symbolLookupChartIQ' {
  export namespace CIQ.ChartEngine.Driver.Lookup {
    /**
     * An example of an asynchronous Lookup.Driver that uses ChartIQ's suggestive search as its source for symbol search
     * @since 6.0.0
     */
    class ChartIQ {
      /**
       * An example of an asynchronous Lookup.Driver that uses ChartIQ's suggestive search as its source for symbol search
       * @param exchanges An array of exchanges that can be searched against
       * @since 6.0.0
       */
      constructor(exchanges: string[])
    }
  }
}
