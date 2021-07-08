import { DESCRIBE, Describe } from "./dsl";
import { Match, Mismatch } from "./mismatch";

/**
 * Do not including styling instructions in {@link ToMessage} strings.
 */
export type ToMessage = string | [string, ...unknown[]];

/**
 * For the moment, {@link Message} bodies may not contain styling instructions. This
 * could change if needed relatively easily.
 */
export class Message {
  static from(msg: ToMessage): Message {
    if (typeof msg === "string") {
      return new Message([msg]);
    } else {
      return new Message(msg);
    }
  }

  #parts: [string, ...unknown[]];

  constructor(parts: [string, ...unknown[]]) {
    this.#parts = parts;
  }

  log({
    style,
    header,
    log = "log",
  }: { style?: string; header?: string; log?: "log" | "group" } = {}): void {
    let parts = header === undefined ? this.#parts : [header, ...this.#parts];

    if (style !== undefined) {
      parts = [`%c${style}`, ...parts];
    }

    console[log](...parts);
  }

  group(
    callback: () => void,
    { style, header }: { style?: string; header?: string } = {}
  ): void {
    this.log({ style, header, log: "group" });
    callback();
    console.groupEnd();
  }
}

export interface Reporter {
  group(description: string, callback: () => Promise<void>): Promise<void>;
  example(description: string, callback: () => Promise<void>): Promise<void>;
  success(msg: Match): void;
  failure(msg: Mismatch): void;

  readonly describe: Describe;
}

export class ConsoleReporter implements Reporter {
  static get describe(): Describe {
    return new ConsoleReporter().describe;
  }

  async example(
    description: string,
    callback: () => Promise<void>
  ): Promise<void> {
    console.group(description);
    await callback();
    console.groupEnd();
  }

  async group(
    description: string,
    callback: () => Promise<void>
  ): Promise<void> {
    console.group(description);
    await callback();
    console.groupEnd();
  }

  success(match: Match): void {
    match.message.log({ header: "✔️" });
  }

  failure(mismatch: Mismatch): void {
    mismatch.message.log({ header: "❌" });
  }

  get describe(): Describe {
    return DESCRIBE(this);
  }
}
