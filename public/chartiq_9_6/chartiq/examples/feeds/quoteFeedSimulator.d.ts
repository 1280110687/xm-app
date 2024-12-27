export default quoteFeedSimulator
declare module './quoteFeedSimulator' {
  /**
   * quote type
   */
  interface QuoteType {
    DT: Date
    Open: string
    High: string
    Low: string
    Close: string
    Volume: string
  }

  export namespace quoteFeedSimulator {
    /**
     * local, non-dependent implementation of XmlHttpRequest
     *
     * @param url
     * @param cb
     *
     */
    function postAjax(url: string, cb: Function): void
    /**
     *
     */
    let maxTicks: number
    /**
     *
     */
    let url: string
    /**
     * called by chart to fetch initial data
     *
     * @param symbol Requested symbol
     * @param suggestedStartDate Start time
     * @param suggestedEndDate End time
     * @param params
     * @param params.quoteDriverID Unique ID of quotedriver
     * @param params.interval Current chart interval
     * @param params.period Current chart period
     * @param params.extended Whether extended hours data is requested
     * @param cb Callback function
     *
     */
    function fetchInitialData(
      symbol: string,
      suggestedStartDate: Date,
      suggestedEndDate: Date,
      params: {
        quoteDriverID: string | number,
        interval: string | number,
        period: string | number,
        extended: boolean
      },
      cb: Function
    ): void
    /**
     * called by chart to fetch update data
     *
     * @param symbol Requested symbol
     * @param startDate Start time
     * @param params
     * @param params.quoteDriverID Unique ID of quotedriver
     * @param params.interval Current chart interval
     * @param params.period Current chart period
     * @param params.extended Whether extended hours data is requested
     * @param cb Callback function
     *
     */
    function fetchUpdateData(
      symbol: string,
      startDate: Date,
      params: {
        quoteDriverID: string | number,
        interval: string | number,
        period: string | number,
        extended: boolean
      },
      cb: Function
    ): void
    /**
     * called by chart to fetch pagination data
     *
     * @param symbol Requested symbol
     * @param suggestedStartDate Start time
     * @param endDate End time
     * @param params
     * @param params.quoteDriverID Unique ID of quotedriver
     * @param params.interval Current chart interval
     * @param params.period Current chart period
     * @param params.extended Whether extended hours data is requested
     * @param cb Callback function
     *
     */
    function fetchPaginationData(
      symbol: string,
      suggestedStartDate: Date,
      endDate: Date,
      params: {
        quoteDriverID: string | number,
        interval: string | number,
        period: string | number,
        extended: boolean
      },
      cb: Function
    ): void
    /**
     * utility function to format data for chart input; given simulator was designed to work with library, very little formatting is needed
     * symbol argument can be used to further refine simulated data
     *
     * @param response JSON stringified quote response
     * @param [symbol] Requested symbol
     * @return Quote records
     *
     */
    function formatChartData(response: string, symbol?: string): QuoteType[]
  }
}
