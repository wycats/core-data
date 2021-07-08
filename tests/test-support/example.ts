import { Assertion, AssertionDescription } from "./assertion";
import { Reporter } from "./reporter";

export type AssertionCallback = (description: string) => AssertionDescription;

export type ExampleCallback = (
  expect: AssertionCallback
) => void | Promise<void>;

export class Example {
  readonly #description: string;
  readonly #assertions: ExampleCallback;

  constructor(description: string, assertions: ExampleCallback) {
    this.#description = description;
    this.#assertions = assertions;
  }

  async run(reporter: Reporter): Promise<void> {
    await reporter.example(this.#description, async () => {
      await this.#assertions((description: string) =>
        Assertion.describe(description, reporter)
      );
    });
  }
}
