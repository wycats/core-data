export default class Timestamp {
  readonly #timestamp: number;

  constructor(timestamp: number) {
    this.#timestamp = timestamp;
  }

  get next(): Timestamp {
    return new Timestamp(this.#timestamp + 1);
  }
}
