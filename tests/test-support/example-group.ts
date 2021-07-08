import { Example } from "./example";
import { Reporter } from "./reporter";

export class ExampleGroup {
  readonly #description: string;
  readonly #examples: readonly Example[];

  constructor(description: string, examples: readonly Example[]) {
    this.#description = description;
    this.#examples = examples;
  }

  async run(reporter: Reporter): Promise<void> {
    await reporter.group(this.#description, async () => {
      for (let example of this.#examples) {
        await example.run(reporter);
      }
    });
  }
}
