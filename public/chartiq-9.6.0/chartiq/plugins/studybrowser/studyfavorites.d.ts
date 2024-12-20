import { CIQ } from "../../js/chartiq.js";
declare module '../../js/chartiq.js' {
  export namespace CIQ.Studies {
    /**
     *
     */
    class Favorites {
      /**
       * Add study to favorite list
       *
       * @param study Name or definition of a study
       */
      public add(study: string|object): void
      /**
       * Remove study from favorite list
       *
       * @param studyName Name of study to remove
       */
      public remove(studyName: string): void
      /**
       * Return list of favorites
       *
       * @return Favorite list
       */
      public getList(): string[]
      /**
       * Returns first found favorite of name specified
       *
       * @param studyName Name of study
       * @return First match in favorite list
       */
      public includes(studyName: string): object|undefined
      /**
       * Adds study from favorite list to the chart
       *
       * @param studyName Name of study
       * @param stx Chart engine
       */
      public addToChart(studyName: string, stx: CIQ.ChartEngine): void
      /**
       * Save favorite list to persistent storage
       *
       * @param stx Chart engine
       * @param cb Callback function
       */
      public save(stx: CIQ.ChartEngine, cb: Function): void
      /**
       * Retrieve favorite list from persistent storage
       *
       * @param stx Chart engine
       * @param cb Callback function
       */
      public retrieveList(stx: CIQ.ChartEngine, cb: Function): void
    }
  }

  export namespace CIQ.UI {
    interface StudyEdit {
      /**
       * Proxy for adding the study to favorites.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize web components can be found at {@tutorial Web Component Interface}.
       *
       * Assumes the params for the study have already been set.
       * @param activator
       * @param activator.params
       * @param activator.params.parent Parent node of activator
       * @since 8.8.0
       */
      addToFavorites(activator: {params: {parent: HTMLElement}}): void
    }
  }
}
