/**
 * CLI command registry
 * A collection of commands for the CLI.
 * @example
 * {
 *   func: function func() {
 *     if (func.opts.e) {
 *       this.echo("Example option");
 *     }
 *     this.echo("Example command");
 *   },
 *   man: "Example command description",
 *   opts: "e",
 *   usage: "example [-e]"
 * }
 */
interface Registry {
  /**
   * - The specification for a command.
   */
  commandName: Object
  /**
   * .func - The function to execute for the command.
   */
  commandName: Function
}
