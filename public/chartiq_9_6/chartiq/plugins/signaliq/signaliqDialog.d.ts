import { CIQ } from "../../js/chartiq.js";
import "../../js/componentUI.js";
import "./signaliq.js";

/**
 *
 */
declare module '../../js/chartiq.js' {
  export namespace WebComponents {
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-signaliq-dialog&gt;</h4>
     *
     * Displays a dialog so signal studies can be entered into the system through the UI.
     *
     * **Requires [SignalIQ]CIQ.SignalIQ plugin.**
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it saves signal settings.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "save"|
     * | action | "click" |
     * | study | _study parameters_ |
     * | signal | _signal parameters_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     *  - 8.6.0
     *  - 9.1.0 Added emitter.
     */
    class SignalIQDialog extends CIQ.UI.DialogContentTag {
      /**
       * Study driving the signal.
       *
       */
      public activeStudy: null|CIQ.Studies.StudyDescriptor
      /**
       * Whether editing a signal (true) or adding one (false).
       *
       */
      public editMode: boolean
      /**
       * Implementations of pickers (these are dialogs allowing to choose from an array of options, e.g. emojis.)
       *
       */
      public pickers: Set<string>
      /**
       * Push a new empty array to the `signalParams.conditions` and re-render the
       * condition options UI.
       *
       * @since 8.6.0
       */
      public addCondition(): void
      /**
       * Callback function for the study select menu. Adds the selected
       * study to the chart.
       *
       * @param obj Object containing event or null
       * @param name Name of the study to add.
       * @since 8.6.0
       */
      public addStudy(obj: object|null, name: string): void
      /**
       * Closes any lifts or popups for the node.
       *
       * @param node Element to collapse.
       * @since 8.6.0
       */
      public collapse(node: HTMLElement): void
      /**
       * Invoke the Study Edit dialog for the currently active study
       *
       * @param activator
       * @param activator.e Event associated with activator
       * @since 8.6.0
       */
      public editStudy(activator: {e: Event}): void
      /**
       * Hides the dialog and resets local signal properties if
       * not in the middle of an interactive add operation.
       *
       * @since 8.6.0
       */
      public hide(): void
      /**
       * Adds local property containing dropdown menu options.
       * Adds form element event handlers.
       *
       * @param params The parameter object.
       * @param [params.context] A context. See [setContext]CIQ.UI.DialogContentTag#setContext.
       * @since 8.6.0
       */
      public init(params: {context?: CIQ.UI.Context}): void
      /**
       * Create a cq-menu form element and return it. The created element
       * is not attached to the DOM.
       *
       * @param name Name of the form element.
       * @param currentValue Value to select by default.
       * @param fields A one-dimensional array of values or a two-dimensional array of name/value pairs.
       * @param cb Stringified callback function template, with $val to be replaced,
       * 						and called when a value is selected.
       * @param index Numerical index of menu element. Used to differentiate multiple condition selections.
       * @param label Alternative label for menu when value is not selected. Default is "Select..."
       * @return cq-menu element
       * @since
       * - 8.6.0
       * - 8.7.0 Add index and label parameters.
       */
      public makeMenu(
        name: string,
        currentValue: string,
        fields: string[]|string[][],
        cb: string,
        index: number,
        label: string
      ): HTMLElement
      /**
       * Create a cq-menu form element with all available studies and inject a
       * search field in the menu header to filter options. The menu is automatically
       * attached to a local element with class `study-select-container`.
       *
       * @since 8.6.0
       */
      public makeStudyMenu(): void
      /**
       * Called when the dialog is invoked. Automatically sets up local properties
       * for either adding or editing a study signal.
       *
       * @param params The parameter object.
       * @param [params.context] A context. See [setContext]CIQ.UI.DialogContentTag#setContext.
       * @param params.sd The study descriptor.
       * @since 8.6.0
       */
      public open(
        params: {
          sd: CIQ.Studies.StudyDescriptor,
          context?: CIQ.UI.Context
        }
      ): void
      /**
       * Remove the active study from the chart.
       *
       * @since 8.6.0
       */
      public removeActiveStudy(): void
      /**
       * Update form controls related to marker condition options based on values in
       * `signalParams.conditions` array.
       *
       * @since 8.6.0
       */
      public renderConditionOptions(): void
      /**
       * Update form controls related to marker options based on values in `signalParams`.
       *
       * @param condition Array of parameters representing a condition on which the signal will trigger.
       * @param idx Index of the condition.
       * @return A DOM node tailored to the condition options, as form controls.
       *
       * @since 8.6.0
       * @since 8.7.0 Rename from renderMarkerOptions to renderSignalOptions to include other notification types.
       */
      public renderSignalOptions(condition: object[], idx: number): Node
      /**
       * Update marker preview based on values in `signalParams`.
       *
       * @since 8.6.0
       */
      public renderMarkerPreview(): void
      /**
       * Resets local study signal properties.
       *
       * @since 8.6.0
       */
      public reset(): void
      /**
       * Apply the current study signal settings to the active study and close the dialog.
       *
       * @since 8.6.0
       */
      public save(): void
      /**
       * Update a value in `signalParams.conditions` at provided index.
       *
       * @param obj Object containing event or null.
       * @param [obj.e] Event triggering the update.
       * @param conditionIdx Index of the condition.
       * @param paramIdx Index of the property within the condition.
       * @param value Value for the condition property.
       * @since 8.6.0
       */
      public updateConditionVal(
        obj: {
          e?: Event
        },
        conditionIdx: number,
        paramIdx: number,
        value: string|number
      ): void
      /**
       * Update a marker option value in `signalParams.conditions` at provided index.
       *
       * @param obj Object containing event or null.
       * @param [obj.e] Event triggering the update.
       * @param conditionIdx Index of the condition.
       * @param paramName Name of the marker property.
       * @param value Value for the condition property.
       * @since 8.7.0
       */
      public updateConditionSignalVal(
        obj: {
          e?: Event
        },
        conditionIdx: number,
        paramName: string,
        value: string|number
      ): void
      /**
       * Synchronizes dialog HTML elements in the local `formElements` property with
       * values in the `signalParams` object. By default, this will update the
       * element value with its corresponding `signalParams` value. Passing
       * `formToData` parameter as `true` will update the corresponding
       * `signalParams` value with the element value.
       *
       * @param formToData Update `signalParams` with form values.
       * @since 8.6.0
       */
      public updateFormValues(formToData: boolean): void
      /**
       * Update the value of a `signalParams` property.
       *
       * @param obj Object containing event or null
       * @param [obj.e] Event triggering the update.
       * @param name Name of the property.
       * @param value Value for the property.
       * @since 8.6.0
       */
      public updateParamValue(obj: {e?: Event}, name: string, value: string|number): void
      /**
       * Checks local signalParams.conditions array for all properties required by
       * CIQ.SignalIQ#convertStudyToSignal.
       *
       * @param index Array index to check.
       * @return Return `true` if valid.
       * @since 8.6.0
       */
      public validateCondition(index: number): boolean
      /**
       * Checks local signalParams object for all properties required by
       * CIQ.SignalIQ#convertStudyToSignal. Displays appropriate
       * feedback messaging at bottom of dialog.
       *
       * @return True if passed all validations.
       * @since 8.6.0
       */
      public validateSignalParams(): boolean
    }
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-signaliq-dialog&gt;</h4>
   *
   * Displays a dialog so signal studies can be entered into the system through the UI.
   *
   * **Requires [SignalIQ]CIQ.SignalIQ plugin.**
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it saves signal settings.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "save"|
   * | action | "click" |
   * | study | _study parameters_ |
   * | signal | _signal parameters_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   *  - 8.6.0
   *  - 9.1.0 Added emitter.
   */
  export namespace WebComponents.SignalIQDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: string
  }
}
