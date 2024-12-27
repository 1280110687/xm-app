import marker from './markersSample.js';
export default marker
declare module './markersSample' {
  interface MarkersSample {
    /**
     * Show sample trade markers
     *
     * @return Labels of trade markers
     */
    showTradeAnalytics(): string[]|void
    /**
     * Create sample trade markers
     *
     */
    createTradeMarkers(): void
  }
}
