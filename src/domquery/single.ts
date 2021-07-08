import { insert, Insertable } from "./insert";

export class SingleDollar {
  static from(element: Element | null, desc: string): SingleDollar {
    if (element === null) {
      throw new Error(
        `You attempted to call ${desc} with an empty DollarQuery`
      );
    } else {
      return new SingleDollar(element);
    }
  }

  readonly #element: Element;

  constructor(element: Element) {
    this.#element = element;
  }

  insert(content: Insertable, options?: { before: Node }): void {
    insert(content, this.#element, options?.before ?? null);
  }
}
