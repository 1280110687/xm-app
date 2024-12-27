import { CIQ } from "../../js/chartiq.js";
export default quoteFeedForecastSimulator
declare module './quoteFeedForecastSimulator' {
  interface QuoteFeedForecastSimulatorType {
    DT: Date
    Close: number
    High: number
    Low: number
    Open: number
    Volume: number
  }

  /**
   *
   */
  export namespace quoteFeedForecastSimulator {
    /**
     * valid symbols
     *
     */
    let valids: string[]
    /**
     * where the forecast begins
     *
     */
    let periodsBack: number
    /**
     * where the forecast ends
     *
     */
    let periodsForward: number
    /**
     * how widely the close will fluctuate in the forecast
     *
     */
    let randomizationFactor: number
    /**
     * how quickly the high/low spread will be allowed to grow as the forecast progresses
     *
     */
    let spreadPercentage: number
    /**
     * these add up to 100% and help predict the Certainty matrix which can be plotted on a scatterplot.
     *
     */
    let certaintyPercentages: number[]
    /**
     * Creates the forecast.  In the real world this function is replaced by a call to a remote server which contains the forecast data.
     * In this implementation the entire series is returned in one response
     *
     * @param stx Chart engine
     * @param symbol Forecast symbol
     * @param interval Current quote interval
     * @param period Current quote period
     * @return Forecasted quote records
     *
     */
    function generateData(
      stx: CIQ.ChartEngine,
      symbol: string,
      interval: string,
      period: number
    ): null | undefined | QuoteFeedForecastSimulatorType[]
    /**
     * called by chart to fetch initial data.  This implementation returns all the existing data at once, so moreAvailable is set to false.
     *
     * @param symbol Forecast symbol
     * @param suggestedStartDate Start time
     * @param suggestedEndDate End time
     * @param params Other useful parameters
     * @param params.stx Chart engine
     * @param params.interval Current quote interval
     * @param params.period Current quote period
     * @param cb Callback function
     *
     */
    function fetchInitialData(
      symbol: string,
      suggestedStartDate: Date,
      suggestedEndDate: Date,
      params: {
        stx: CIQ.ChartEngine,
        interval: string,
        period: number
      },
      cb: Function
    ): void
    /**
     * called by chart to fetch update data
     *
     * @param symbol Forecast symbol
     * @param startDate Start time
     * @param params Other useful parameters
     * @param params.stx Chart engine
     * @param params.interval Current quote interval
     * @param params.period Current quote period
     * @param cb Callback function
     *
     */
    function fetchUpdateData(
      symbol: string,
      startDate: Date,
      params: {
        stx: CIQ.ChartEngine,
        interval: string,
        period: number
      },
      cb: Function
    ): void
    /**
     * called by chart to fetch pagination data.  Shouldn't be called since the initial request set moreAvailable to false.
     *
     * @param symbol Forecast symbol
     * @param suggestedStartDate Start time
     * @param endDate End time
     * @param params Other useful parameters
     * @param params.stx Chart engine
     * @param params.interval Current quote interval
     * @param params.period Current quote period
     * @param cb Callback function
     *
     */
    function fetchPaginationData(
      symbol: string,
      suggestedStartDate: Date,
      endDate: Date,
      params: {
        stx: CIQ.ChartEngine,
        interval: string,
        period: number
      },
      cb: Function
    ): void
  }
}
