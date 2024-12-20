/**
 * Executor — a command interpreter for string input.
 * @param registry command registry; can be a function that overrides the default executor
 * @param [rpcClient] JSON-RPC client; optional.  If not passed in the executor will not be able to execute RPC commands.
 * @return a function that interprets string input and executes commands
 * @since 9.6.0
 */
export function Executor(registry: object, rpcClient?: object): Function


