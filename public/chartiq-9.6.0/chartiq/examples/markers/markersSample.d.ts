import { CIQ } from '../../js/standard.js';
export declare let marker: { MarkersSample: MarkersSample }
export default marker

/**
 *
 */
declare module './markersSample' {
  /**
   *
   */
  export class MarkersSample {
    /**
     * Chart engine
     *
     */
    public stx: CIQ.ChartEngine
    /**
     * Array of active marker types
     *
     */
    public activeLabels: string[]
    /**
     * The allowComparisonSeriesMarkers allows markers to be attached to a secondary series.
     * This example file will randomly select series on which to attach a marker when enabling markers.
     *
     */
    public allowComparisonSeriesMarkers: boolean
    /**
     * The specialTypes property provides a lookup of type -> method dictionary
     * that allows to extend MarketSample#showMarkers functionality with
     * additional event types not available in this file.
     * Use #registerType to populate it as it will provide additional extensibility in future
     *
     */
    public specialTypes: Record<string, string>
    /**
     * Registers new prototype method as type handler to be available in #showMarkers
     * When invoked the registered method will receive type and renderType parameters
     *
     * Example: register video event handler
     *
     *		MarkersSample.registerType('video', 'showVideoMarkers');
     *		MarkersSample.prototype.showVideoMarkers = function (type) {
     *		}
     *
     * @param type Marker type
     * @param methodName Name of handler
     * @param overwrite Force overwrite of any existing handler of that name
     *
     */
    public registerType(type: string, methodName: string, overwrite: boolean): void
    /**
     * Update chart with markers to show
     *
     * @param labels Name of new label to show
     * @return Name of new label to show
     *
     */
    public processLabelsAndDraw(labels: string[]): string[]
    /**
     * Creates sample markers
     *
     * @param label Label of marker to create
     * @param markerType Class name of marker
     * @return
     *
     */
    public createMarkers(label: string, markerType: string): string
    /**
     * Create an "abstract" sample marker above the candle
     *
     * @param abstractType Type name of marker
     * @return Type name of marker
     *
     */
    public createAbstractMarker(abstractType: string): string
    /**
     * Hides markers by type
     *
     * @param type Marker label name to hide
     *
     */
    public hideMarkers(type: string): void
    /**
     * Show markers by type
     *
     * @param type Marker label to show
     * @param renderType Class name of marker
     *
     */
    public showMarkers(type: string, renderType: string): void
  }
}
