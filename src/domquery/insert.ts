export function insertHTML(
  html: string,
  parent: Element,
  reference: Node | null
) {
  let template = document.createElement("template");
  template.innerHTML = html;

  parent.insertBefore(template.content, reference);
}

export function insert(
  content: Insertable,
  parent: Element,
  reference: Node | null
) {
  if (typeof content === "string") {
    insertHTML(content, parent, reference);
  } else {
    parent.insertBefore(content, reference);
  }
}

export type Insertable = string | Node;
