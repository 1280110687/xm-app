import "../../js/standard.js";

/**
 *
 */
declare module '../../js/chartiq.js' {
  /**
   * Contains classifications of studies into different categories.
   *
   */
  export namespace CIQ.Studies.Categories {
    /**
     * Often-used studies
     *
     */
    let Popular: string[]
    /**
     * Studies used to analyze trend
     *
     */
    let "Trend Analysis": string[]
    /**
     * Studies used to analyze volume changes
     *
     */
    let "Money Flow": string[]
    /**
     * Studies used to analyze momentum
     *
     */
    let "Momentum/Oscillator": string[]
    /**
     * Studies used to compute averages
     *
     */
    let "Averages/Bands": string[]
    /**
     * Studies used to analyze volume
     *
     */
    let Volume: string[]
    /**
     * Studies used to analyze support and resistance
     *
     */
    let "Support/Resistance": string[]
    /**
     * Studies used to analyze volatility
     *
     */
    let Volatility: string[]
    /**
     * Studies used to compare against a benchmark
     *
     */
    let Compare: string[]
    /**
     * Studies used to compute statistical values
     *
     */
    let Statistical: string[]
    /**
     * Studies used to predict the future
     *
     */
    let Projection: string[]
  }
}
