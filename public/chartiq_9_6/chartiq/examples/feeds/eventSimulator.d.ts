export default eventFeed;
declare module './eventSimulator' {
  interface EventType {
    /**
     * Record date
     */
    DT: Date
    /**
     * Example of a data record
     */
    data: EventDataType
  }
  interface EventDataType {
    /**
     * Unique ID
     */
    id: string
    /**
     * If a series of events are linked, name of linkage
     */
    group: Date | null
    /**
     * If a series of events are linked, number in group sequence
     */
    sequence: number
    /**
     * True if last event in group
     */
    final: boolean
    /**
     * Time event happened
     */
    timestamp: Date
    /**
     * Type of event
     */
    category: string
    /**
     * Title of event
     */
    headline: string
    /**
     * Details of event
     */
    story: string | null
    /**
     * Source of event
     */
    source: string
    /**
     * Amount of event in currency
     */
    value: null | number
    /**
     * If trade, size in units
     */
    size: null | number
    /**
     * If news, url to story
     */
    url: null | string
    /**
     * If news, thumbnail image
     */
    image: null | string
  }

  export namespace eventFeed {
    /**
     * local, non-dependent implementation of XmlHttpRequest
     *
     * @param url Remote address
     * @param cb Callback function
     *
     */
    function postAjax(url: string, cb: Function): void
    let url: null | string
    /**
     * Fetches initial event data up to the present.
     *
     * @param eventId Unique ID
     * @param suggestedStartDate Start time
     * @param suggestedEndDate End time
     * @param params Other useful parameters
     * @param cb Callback function
     *
     */
    function fetchInitialData(
      eventId: string,
      suggestedStartDate: Date,
      suggestedEndDate: Date,
      params: object,
      cb: Function
    ): void
    /**
     * Fetches data for the latest date record
     *
     * @param eventId Unique ID
     * @param startDate Start time
     * @param params Other useful parameters
     * @param cb Callback function
     *
     */
    function fetchUpdateData(
      eventId: string,
      startDate: Date,
      params: object,
      cb: Function
    ): void
    /**
     * Fetches records from historical dates
     *
     * @param eventId Unique ID
     * @param suggestedStartDate Start time
     * @param endDate End time
     * @param params Other useful parameters
     * @param cb Callback function
     *
     */
    function fetchPaginationData(
      eventId: string,
      suggestedStartDate: Date,
      endDate: Date,
      params: object,
      cb: Function
    ): void
    /**
     *
     * @param response
     * @param response.DT Date
     * @param response.data Record containing event data
     * @param eventId Unique ID
     * @return Event records
     *
     */
    function formatData(response: {DT: Date, data: EventDataType}, eventId: string): EventType[]
    /**
     * Generates simulated event records.
     *
     * @param eventId Unique ID
     * @param start Start time
     * @param end End time
     * @return Event records
     *
     */
    function generateData(eventId: string, start: Date, end: Date): EventType[]
  }
}
