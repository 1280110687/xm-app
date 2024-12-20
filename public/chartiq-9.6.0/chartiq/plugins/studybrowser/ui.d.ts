import { CIQ } from "../../js/chartiq.js";
import "./studyfavorites.js";
declare module '../../js/chartiq.js' {
  export namespace WebComponents {
    /**
     *  @classdesc
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-study-browser&gt;</h4>
     *
     * Study Browser component provides user interface for categorized and filterable list of studies,
     * as well as list of favorites and active studies
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute | description |
     * | :-------- | :---------- |
     * | filter | Reflect and update selection in the left hand panel |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "filter"|
     * | action | "click" |
     * | category | _Filter name_ |
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     *
     * @since
     * - 8.8.0
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class StudyBrowser extends CIQ.UI.ContextTag {
      /**
       * List of studies which require interaction to set the parameters.
       * The key is the study type and the value is `true`.
       *
       */
      public interactiveStudies: {
        "Anchored VWAP": boolean
      }
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Flag indicating initialization status.
       *
       */
      public init: boolean
      /**
       * Called for a registered component when the context is changed in a multichart environment.
       *
       * @param newContext The chart user interface context.
       *
       */
      public changeContext(newContext: CIQ.UI.Context): void
      /**
       * Opens the study browser.
       *
       */
      public open(): void
      /**
       * Closes the study browser.
       *
       */
      public hide(): void
      /**
       * Gets the list of studies and populates the study browser's favorites, active studies, and categories.
       *
       */
      public getStudies(): void
      /**
       * Study categories
       *
       */
      public categories: CIQ.Studies.Categories
      /**
       * Initializes the "active studies" counter to observe for changes in active studies on chart.
       *
       */
      public setupActiveStudyCountListener(): void
      /**
       * Filters studies list to show only those in a paricular category.
       *
       * @param filterName Name of category to show
       * @param [force] If true forces a refresh even if new filter is same as current filter.
       */
      public filterCategory(filterName: string, force?: boolean): void
      /**
       * Value of current filter.
       *
       */
      public currentFilter: string
      /**
       * Controls display of study browser's right panel depending on selection on left panel menu.
       *
       * @param type Left panel menu selection
       */
      public selectType(type: string): void
      /**
       * Creates markup for favorites list.
       *
       */
      public updateFavoriteList(): void
      /**
       * Sets up information panel.  Information is optionally available for each study as a description of what the study does.
       * Called automatically when context is set.
       *
       */
      public setupInfoPanel(): void
      /**
       * Shows the information panel for the provided study type.
       *
       * @param studyType Study type
       */
      public showStudyInfo(studyType: boolean): void
      /**
       * Removes study information panel.
       *
       */
      public hideStudyInfo(): void
      /**
       * Add a study to the chart.
       *
       * @param type Study type
       */
      public addStudy(type: string): void
      /**
       * For Legacy WebComponents, this is the study legend template.
       *
       * @return Template markup.
       */
      public deprecatedTemplate(): string
      /**
       * Sets up study browser in the DOM.
       * Called automatically when context is set.
       *
       */
      public responsiveSetup(): void
    }
  }

  /**
   *  @classdesc
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-study-browser&gt;</h4>
   *
   * Study Browser component provides user interface for categorized and filterable list of studies,
   * as well as list of favorites and active studies
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute | description |
   * | :-------- | :---------- |
   * | filter | Reflect and update selection in the left hand panel |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when it is clicked.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "filter"|
   * | action | "click" |
   * | category | _Filter name_ |
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   *
   * @since
   * - 8.8.0
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.StudyBrowser {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: string
  }
}
