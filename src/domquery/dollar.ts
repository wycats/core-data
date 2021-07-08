import { SingleDollar } from "./single";

export function $(selector: string | ToDollarQuery): DollarQuery {
  if (typeof selector === "string") {
    return new DollarQuery([...document.querySelectorAll(selector)]);
  } else {
    return DollarQuery.from(selector);
  }
}

export class DollarQuery implements Iterable<Element> {
  static from(query: ToDollarQuery): DollarQuery {
    if (query instanceof DollarQuery) {
      return query;
    } else if (Array.isArray(query) || isNodeList(query)) {
      return new DollarQuery([...query]);
    } else {
      return new DollarQuery([query]);
    }
  }

  readonly #elements: readonly Element[];

  constructor(elements: readonly Element[]) {
    this.#elements = elements;
  }

  *[Symbol.iterator](): Iterator<Element> {
    for (let item of this.#elements) {
      yield item;
    }
  }

  #chain(callback: (element: Element) => DollarQuery): DollarQuery {
    let elements = this.#elements.flatMap(
      (element) => callback(element).#elements
    );

    return new DollarQuery(elements);
  }

  chain(callback: (element: Element) => ToDollarQuery): DollarQuery {
    return this.#chain((element) => DollarQuery.from(callback(element)));
  }

  map(callback: (element: Element) => Element): DollarQuery {
    return this.#chain((element) => new DollarQuery([callback(element)]));
  }

  get first(): SingleDollar {
    return SingleDollar.from(
      this.#elements[0] || null,
      `DollarQuery's first method`
    );
  }

  get single(): SingleDollar {
    switch (this.#elements.length) {
      case 1:
        return new SingleDollar(this.#elements[0]!);
      default:
        throw new Error(
          `You attempted to call DollarQuery's single method on a DollarQuery list with ${
            this.#elements.length
          } elements, but you may only call the single method on a DollarQuery with exactly one element.`
        );
    }
  }
}

/**
 * The types in {@link ToDollarQuery} can be converted into a
 * {@link DollarQuery}.
 */
export type ToDollarQuery =
  | DollarQuery
  | Element[]
  | NodeListOf<Element>
  | Element;

function isNodeList(
  query: NodeListOf<Element> | Element
): query is NodeListOf<Element> {
  return Symbol.iterator in query;
}
