import { AssertionDescription } from "./assertion";
import { Example } from "./example";
import { ExampleGroup } from "./example-group";
import { Reporter } from "./reporter";

export type It = (
  description: string,
  assert: (assert: (description: string) => AssertionDescription) => void
) => void;

export type Describe = (
  description: string,
  callback: (assert: It) => void
) => void;

export const DESCRIBE = (reporter: Reporter): Describe => {
  return function (description: string, callback: (assert: It) => void): void {
    let examples: Example[] = [];

    const it: It = (description, callback): void => {
      examples.push(new Example(description, callback));
    };

    callback(it);

    let suite = new ExampleGroup(description, examples);

    suite.run(reporter);
  };
};
