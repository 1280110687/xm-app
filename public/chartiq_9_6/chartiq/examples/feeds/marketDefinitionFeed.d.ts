/**
 * A self-updating Market Definition object.
 */
export class MarketDefinitionFeed {
  /**
   * A self-updating Market Definition object.
   * @param CIQ - The main library namespace.
   * @param symbol - The symbol for which this is the market definition.
   * @return A polling market definition object.
   */
  constructor(CIQ: Object, symbol: String)

}
/**
 * A custom promise for market definition updates
 */
export class MarketDefinitionPromise {
  /**
   * A custom promise for market definition updates
   * @param symbol - The symbol for which this promise is updating a MarketDefinitionFeed.
   * @param marketDefinitionFeed - The market definition feed object to be updated.
   * @param fallbackDefinition - The fallback market definition object.
   * @return A promise object for market definition.
   */
  constructor(
    symbol: String,
    marketDefinitionFeed: Object,
    fallbackDefinition: Object
  )

}

