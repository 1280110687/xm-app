import { CIQ } from "../../js/chartiq.js";
declare module '../../js/chartiq.js' {
  /**
   * Creates a SignalIQ helper object that is used to manage the signalling studies.
   *
   * @example
   *	// Importing and using an emoji picker
   *  import getDefaultConfig from "./js/defaultConfiguration.js";
   *  import EmojiPopover from "./js/thirdparty/emoji-popover.es.js";
   *	const config = getDefaultConfig({
   *		emojiPicker: EmojiPopover,
   *		...
   *	});
   *
   * @since 8.6.0
   * @since 8.9.0 added config.disallowedStudies
   *
   */
  export namespace CIQ.SignalIQ {
    /**
     * Used directly by CIQ.SignalIQ#addStudyAsSignal and CIQ.SignalIQ#convertStudyToSignal,
     * or indirectly by CIQ.SignalIQ#flagSignals.
     *
     */
    interface SignalData {
      /**
       * Type of notification for the signal.  e.g. `marker`, `emojimarker`, paintbar`.
       */
      notificationType: string
      /**
       * Name of Signal.  Signal will be saved with this name and this name will appear
       * in any study legend and in the expanded signal's title.
       */
      name: string
      /**
       * Array of conditions; each condition is itself an array of [lhs, operator, rhs, color, markerOptions]
       * <br>- `lhs` is a field in the study's outputMap
       * <br>- `rhs` can be either a numeric value or a field in the study's outputMap
       * <br>- `operator` can be "<", "<=", "=", ">", ">=", "<>", ">p" (greater than previous),
       * "<p" (less than previous), "=p" (same as previous), "x" (crosses another plot/value in either direction),
       * "x+" (crosses another plot/value upwards", "x-" (crosses another plot/value downwards,"
       * "t+" (turns upwards", "t-" (turns downwards"
       * <br>- `color` is the color of the signal.  If not provided, lhs's color will be used
       * <br>- `markerOptions` Optional settings for main series marker. When multiple conditions match, markerOptions from
       * the first matching condition are applied.
       * <br> - `markerOptions.shape` Shape of the signal marker on the chart.  The shape of the marker on the study
       * will always be "circle". If omitted, "text" assumed.
       * <br> - `markerOptions.size` Size of the signal marker on the chart.  Possible values are S/M/L.  The size of the
       * marker on the study will always be S. If omitted, "S" assumed.
       * <br> - `markerOptions.label` Optional string to display in the marker.
       * <br> - `markerOptions.position` Where to display the signal as a marker in relation to the main plot.
       * See {@link CIQ.Marker} for options. If omitted, "above_candle" assumed.
       */
      conditions: string[][]
      /**
       * & or | to join conditions. If omitted, "|" assumed.
       */
      joiner?: string
      /**
       * Signals indicating where conditions were met.
       */
      results: CIQ.SignalIQ.NotificationData[]
      /**
       * Description of signal.
       */
      description?: string
      /**
       * Whether to display the study. If omitted, "false" assumed.
       */
      reveal?: boolean
      /**
       * Where to display the signal as a marker in relation to the main plot.
       * See {@link CIQ.Marker} for options. If omitted, "above_candle" assumed.
       */
      position?: string
      /**
       * Shape of the signal marker on the chart.  The shape of the marker on the study
       * will always be "circle". If omitted, "text" assumed.
       */
      shape?: string
      /**
       * Size of the signal marker on the chart.  Possible values are S/M/L.  The size of the
       * marker on the study will always be S. If omitted, "S" assumed.
       */
      size?: string
      /**
       * Number of pixels in a panel study when revealed.
       * Defaults to plugin config's panelHeight.
       */
      panelHeight?: number
      /**
       * Optional string to display in the marker.
       */
      label?: string
      /**
       * Optional delivery point of alert.
       */
      destination?: string
    }
    /**
     * Used directly by CIQ.SignalIQ#flagSignals when creating alerts.
     *
     */
    interface NotificationData {
      /**
       * Study descriptor's signalData object.
       */
      signalData: CIQ.SignalIQ.SignalData
      /**
       * Color of signal, if applicable.
       */
      color?: string
      /**
       * Text strings containing conditions met by signal.
       */
      conditions?: string[]
      /**
       * Name of field where signal occurred.
       */
      field?: string
      /**
       * True if signal is to be tied to the plot which triggered it.
       */
      isPlotSpecific?: boolean
      /**
       * Study descriptor.
       */
      sd: CIQ.Studies.StudyDescriptor
      /**
       * Instance of chart engine.
       */
      stx: CIQ.ChartEngine
      /**
       * Index to data set where signal occurred.
       */
      tick: number
    }
    /**
     * Returned by CIQ.SignalIQ#verifySignalData.
     *
     */
    interface VerificationInfo {
      /**
       * Verification error code, or 0 if no error
       */
      code: number
      /**
       * Message accompanying code
       */
      message: string
    }
    /**
     * Used by CIQ.SignalIQ.stylesheets.
     *
     */
    interface Stylesheet {
      /**
       * URL of stylesheet
       */
      url: string
      /**
       * callback after successful load
       */
      callback?: Function
    }
    /**
     * Holds loaded notification types.
     * Any subclass that visualizes alerts should add its notification type to
     * this array when the subclass is loaded.
     *
     * @static
     * @since 8.6.0
     */
    let notificationTypes: string[]
    /**
     * Holds loaded stylesheets for loading when CIQ.SignalIQ is constructed.
     *
     * @static
     * @since 8.6.0
     */
    let stylesheets: CIQ.SignalIQ.Stylesheet[]
  }

  export namespace CIQ {
    /**
     * Creates a SignalIQ helper object that is used to manage the signalling studies.
     *
     * @example
     *	// Importing and using an emoji picker
     *  import getDefaultConfig from "./js/defaultConfiguration.js";
     *  import EmojiPopover from "./js/thirdparty/emoji-popover.es.js";
     *	const config = getDefaultConfig({
     *		emojiPicker: EmojiPopover,
     *		...
     *	});
     *
     * @since 8.6.0
     * @since 8.9.0 added config.disallowedStudies
     *
     */
    class SignalIQ {
      /**
       * Creates a SignalIQ helper object that is used to manage the signalling studies.
       *
       * @param config Parameters for setting up the SignalIQ plug-in.
       * @param config.stx A reference to the chart to which the plug-in is
       * 		added.
       * @param config.panelHeight Default height screen study panel will occupy when
       * 		revealed (panel study only).
       * @param [config.displayCondition] Set to true to display the condition that
       * 		triggered a signal in the expanded tooltip.
       * @param [config.emojiPicker] Implementation of an emojiPicker.  This is used
       * 		by the signaliqDialog or other dialog implementation to allow emojis to be displayed
       * 		on the chart as signal markers. The default picker is lightweight and you are free
       * 		to swap in your own.  If you do so, you must implement two functions: `open()` and `clean()`.
       * 		The emojiPicker will resolve to undefined unless it is imported and passed as a resource
       * 		to getDefaultConfig().  See example below.
       * @param [config.emojiPicker.open] Creates the picker and adds its markup to the DOM
       *		if it doesn't already exist, and opens it.  It may use the list of short names provided in
       * 		`config.emojiPicker.emojis` to generate the choices within the picker. Takes an object as
       * 		 an argument, with three properties:
       *		- stx: The Chart engine instance
       *		- targetElement: Either a selector or the actual HTMLElement which is a reference point
       * 		to position the picker
       *		- handler: a callback function which processes the chosen emoji.  The function takes a parameter
       *		 	`emoji` which is the emoji character chosen.
       * @param [config.emojiPicker.clean] Removes any artifacts remaining in memory from
       * 		creation of picker.  Takes no arguments.
       * @param [config.emojiPicker.emojis] Array of emoji short names to be used in an emoji
       * 		dialog implemented by `config.emojiPicker`.  Short names are expressed without any surrounding
       * 		colons.  To indicate skin tones, the default implementation of emojiPicker expects
       * 		a pipe to separate the short names; for example, "point_up|skin-tone-4".
       * @param [config.disallowedStudies] A list of studies to not appear for signaling.
       *
       * @example
       *	// Importing and using an emoji picker
       *  import getDefaultConfig from "./js/defaultConfiguration.js";
       *  import EmojiPopover from "./js/thirdparty/emoji-popover.es.js";
       *	const config = getDefaultConfig({
       *		emojiPicker: EmojiPopover,
       *		...
       *	});
       *
       * @since 8.6.0
       * @since 8.9.0 added config.disallowedStudies
       *
       */
      constructor(
        config: {
          stx: CIQ.ChartEngine,
          panelHeight: number,
          displayCondition?: boolean,
          emojiPicker?: {
            open?: Function,
            clean?: Function,
            emojis?: string[]
          },
          disallowedStudies?: string[]
        }
      )
      /**
       * Holds a list of allowed study types for signaling. Leave blank to include all studies or set config.disallowedStudies to an empty array.
       * @since 8.6.0
       */
      public allowedStudies: boolean
      /**
       * Creates a default study and converts it into an signal study.
       * To add a customized study, first create the study, then use CIQ.SignalIQ#convertStudyToSignal.
       *
       * @param type	 The name of the study (object key on the CIQ.Studies.studyLibrary)
       * @param [signalData] Data and configuration for the signals.
       * @return A study descriptor which can be used to remove or modify the study.
       *
       * @example
       * stxx.signalIQ.addStudyAsSignal("Aroon", {
       *	name: "Aroon Extreme",
       *	conditions: [
       *		["Aroon Up ‌Aroon‌ (14)", ">", 90],
       *		["Aroon Down ‌Aroon‌ (14)", "<=", 5]
       *	],
       *	joiner: "&"
       * });
       *
       * @since 8.6.0
       */
      public addStudyAsSignal(type: string, signalData?: CIQ.SignalIQ.SignalData): CIQ.Studies.StudyDescriptor
      /**
       * Converts a study descriptor into an signal study.
       * Use this to attach signalData object to a study descriptor. It will overwrite any previous signalData.
       * This is useful for setting new signalData as well as updating conditions.
       * Any existing signals from this study will be removed.
       *
       * **Note:** When calling this function it is assumed that the study defined in the study descriptor exists on the chart.
       *
       * @param sd The study descriptor.
       * @param signalData Data and configuration for the signals.
       * @param [replace] True if replacing existing signal data.
       * @return True if signalData was added or modified successfully
       * @since 8.6.0
       */
      public convertStudyToSignal(
        sd: CIQ.Studies.StudyDescriptor,
        signalData: CIQ.SignalIQ.SignalData,
        replace?: boolean
      ): boolean
      /**
       * Cursory check if the signal data is properly constructed.
       * A name and conditions array must be provided. The name cannot already be in use.
       *
       * The following codes and messages are currently defined:
       * | Code | Message |
       * |---|---|
       * | 0 | "ok" |
       * | 1 | "no data" |
       * | 2 | "no name" |
       * | 3 | "no conditions" |
       * | 4 | "invalid conditions" |
       * | 5 | "already exists" |
       *
       * @param [signalData] Data and configuration for the signals.
       * @param [forceReplace] True if replacing existing signal data should occur.
       * @return Error code and message. If no error, code will be 0.
       * @since 8.6.0
       */
      public verifySignalData(signalData?: CIQ.SignalIQ.SignalData, forceReplace?: boolean): CIQ.SignalIQ.VerificationInfo
      /**
       * Hides the study from view.
       *
       * @param sd The study descriptor.
       * @since 8.6.0
       */
      public hide(sd: CIQ.Studies.StudyDescriptor): void
      /**
       * Reveals the study on the chart. The study will also show the signals along its plot line.
       *
       * @param sd The study descriptor.
       * @param [height=0] Optional height of panel in pixels.
       * @since 8.6.0
       */
      public show(sd: CIQ.Studies.StudyDescriptor, height?: number): void
      /**
       * Finds where signals take place on the study series. Creates objects of type
       * CIQ.SignalIQ~NotificationData corresponding to matches in the
       * signal conditions and stores them in the `results` array of study's `signalData`.
       * This function is called from CIQ.ChartEngine#createDataSet.
       *
       * @param sd The study descriptor.
       * @since 8.6.0
       */
      public flagSignals(sd: CIQ.Studies.StudyDescriptor): void
      /**
       * Removes all signals associated with study.
       * Called automatically by CIQ.ChartEngine#cleanupRemovedStudy.
       *
       * @param sd The study descriptor.
       * @since 8.6.0
       */
      public removeSignals(sd: CIQ.Studies.StudyDescriptor): void
      /**
       * Convenience function for returning only studies which produce signals.
       *
       * @return Subset of all studies.
       * @since 8.6.0
       */
      public studies(): CIQ.Studies.StudyDescriptor[]
      /**
       * Convenience function to manually refresh the signals from the study.
       *
       * @since 8.6.0
       */
      public refresh(): void
      /**
       * Toggles the display state of the study.
       *
       * @param sd The study descriptor.
       * @since 8.7.0
       */
      public toggleStudy(sd: CIQ.Studies.StudyDescriptor): void
    }
  }
}
