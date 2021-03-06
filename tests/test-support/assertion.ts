import { MatchResult } from "./mismatch";
import { Reporter } from "./reporter";

// @ts-expect-error
import type { Eq } from "./matchers/eq";

/**
 * {@link AssertionDescription} is the first step in the process of building an
 * {@link Assertion}. It is instantiated with a description and reporter, and
 * {@link AssertionWithActual} is instantiated from
 * {@link AssertionDescription}'s {@link AssertionDescription#expect} method
 * once the test has provided an actual value.
 */
export class AssertionDescription {
  #description: string;
  #reporter: Reporter;

  constructor(description: string, reporter: Reporter) {
    this.#description = description;
    this.#reporter = reporter;
  }

  expect<T>(actual: T): AssertionWithActual<T> {
    return new AssertionWithActual(this.#description, this.#reporter, actual);
  }
}

class AssertionWithActual<T> {
  #description: string;
  #reporter: Reporter;
  #actual: T;

  constructor(description: string, reporter: Reporter, actual: T) {
    this.#description = description;
    this.#reporter = reporter;
    this.#actual = actual;
  }

  to<U>(matcher: Matcher<T, U>, expected: U): Promise<void> {
    return new Assertion({
      description: this.#description,
      actual: this.#actual,
      expected,
      matcher,
    }).run(this.#reporter);
  }
}

/**
 * A {@link Matcher} matches an actual value with an expected pattern. The
 * simplest kind of matcher is {@link Eq}, which just compares the actual value
 * with the expected pattern using `===`.
 */
export interface Matcher<T, U> {
  match(actual: T, expected: U, description: string): Promise<MatchResult>;
}

export class Assertion<T = unknown, U = unknown> {
  static describe(
    description: string,
    reporter: Reporter
  ): AssertionDescription {
    return new AssertionDescription(description, reporter);
  }

  #description: string;
  #actual: T;
  #expected: U;
  #matcher: Matcher<T, U>;

  constructor({
    description,
    actual,
    expected,
    matcher,
  }: {
    description: string;
    actual: T;
    expected: U;
    matcher: Matcher<T, U>;
  }) {
    this.#description = description;
    this.#actual = actual;
    this.#expected = expected;
    this.#matcher = matcher;
  }

  async run(reporter: Reporter): Promise<void> {
    let result = await this.#matcher.match(
      this.#actual,
      this.#expected,
      this.#description
    );

    if (result.match === true) {
      reporter.success(result);
    } else {
      reporter.failure(result);
    }
  }
}
