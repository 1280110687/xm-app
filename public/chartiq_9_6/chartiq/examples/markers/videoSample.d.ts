import marker from './markersSample.js';
export default marker
declare module './markersSample' {
  interface MarkersSample {
    /**
     * Show the video type markers
     *
     * @param label Label name of marker
     * @return Label name of marker
     */
    showVideoMarkers(label: string): string|undefined
  }
}
