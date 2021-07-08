import Timestamp from "./timestamp";

export default class Timeline {
  #current: Timestamp;

  constructor(current: Timestamp) {
    this.#current = current;
  }

  advance(): void {
    this.#current = this.#current.next;
  }
}
