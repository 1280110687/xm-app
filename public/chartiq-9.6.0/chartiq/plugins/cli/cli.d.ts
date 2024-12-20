import { CIQ } from "../../js/componentUI.js";
declare module '../../js/chartiq.js' {
  export namespace WebComponents {
    /**
     *  @classdesc
     *
     * Command Line Interface (CLI) component. This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-cli&gt;</h4>
     *
     * The CLI allows users to interact with the chart using a command line
     * interface. The CLI appears at the bottom of the chart. It is activated by
     * clicking on the CLI icon in the toolbar or by pressing SHIFT + /. The CLI
     * provides a list of available commands that can be executed on the chart. The
     * user can type in the command line to filter the list of available commands.
     * The user can then select a command from the list to execute it. The CLI also
     * provides a history of the most recent commands that have been executed.
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
     * @since 9.6.0
     */
    class CLI extends CIQ.UI.ContextTag {
      /**
       * Called when the component is adopted into a new document.
       * Sets up inheritance and constructor.
       *
       */
      public adoptedCallback(): void
      /**
       * Called when the component is disconnected from the document.
       * Removes the claim and calls the parent method.
       *
       */
      public disconnectedCallback(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Initializes the component the first time it has been opened.
       * Sets all the default markup and adds listeners.
       *
       */
      public initialize(): void
      /**
       * Verifies if a command is valid.
       * @param command The command to check.
       * @return True if the command exists, false otherwise.
       *
       */
      public checkCommand(command: string): boolean
      /**
       * Processes a command entered by the user.
       *
       * @param command The command to process.
       *
       */
      public processCommand(command: string): Promise<void>
      /**
       * Adds a command to the command history.
       * @param command The command to add.
       *
       */
      public addHistory(command: string): void
      /**
       * Activates and shows the CLI.
       *
       */
      public activate(): void
      /**
       * Deactivates and hides the CLI.
       *
       */
      public deactivate(): void
      /**
       * Clears the input and output fields.
       *
       */
      public clear(): void
      /**
       * Clears the input field.
       *
       */
      public clearInput(): void
      /**
       * Hides the output.
       *
       */
      public hideOutput(): void
      /**
       * Shows the output.
       *
       */
      public showOutput(): void
      /**
       * Echoes text to the output.  If an object is passed, it is stringified.
       *
       * @param text The text or object to display.
       *
       */
      public echo(text: string|Object): void
      /**
       * Logs text to the console.
       * @param text The text to log.
       *
       */
      public log(text: string): void
      /**
       * Filters the commands based on the user input.
       * @param command The search string.
       *
       */
      public filterCommands(command: string): void
      /**
       * Updates the selected command; if next is true, the next command is selected,
       * otherwise the previous command is selected.
       * @param [next=true] True to select the next command, false to select the previous command.
       *
       */
      public selectCommand(next?: boolean): void
      /**
       * Selects the first command in the list.
       *
       */
      public selectFirst(): void
      /**
       * Selects the next command in the list.
       *
       */
      public selectNext(): void
      /**
       * Selects the previous command in the list.
       *
       */
      public selectPrevious(): void
      /**
       * Returns the selected command.
       * @return the selected command.
       *
       */
      public selected: HTMLElement | null;
      /**
       * Scrapes the chart for available drawing commands.
       * @return The drawing commands.
       *
       */
      public drawingCmds: object[];
      /**
       * Scrapes the chart for available periodicity commands.
       * @return The periodicity commands.
       *
       */
      public periodicityCmds: object[];
      /**
       * Scrapes the chart for available range commands.
       * @return The range commands.
       *
       */
      public rangeCmds: object[];
      /**
       * Returns the most recent commands.  The number of commands is determined by the SHOW_RECENT constant.
       * @return The most recent commands.
       *
       */
      public recentCmds: object[];
      /**
       * Scrapes the chart for available study commands.
       * @return The study commands.
       *
       */
      public studyCmds: object[];
      /**
       * Scrapes the chart for available type commands.
       * @return The type commands.
       *
       */
      public typeCmds: object[];
      /**
       * Builds a list of available commands from the chart.
       *
       */
      public buildCmdList(): void
    }
  }
}
