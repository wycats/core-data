/**
 * Application tests should import from this file.
 *
 * The `test-support` module includes fairly generic utilities that could in
 * theory be used in other applications.
 */

// Re-export test-support
export * from "./test-support";

import { ConsoleReporter } from "./test-support";

/**
 * All test modules import `describe` from `app-test-support`, which defines and
 * configures it.
 */
export const describe = ConsoleReporter.describe;
