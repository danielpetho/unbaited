export function createElementWithClass(
  tag: string,
  className: string
): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

export function createElementWithStyles(
  tag: string,
  styles: string
): HTMLElement {
  const element = document.createElement(tag);
  applyStyles(element, styles);
  return element;
}

export function applyStyles(
  element: HTMLElement,
  styles: string
): void {
  element.style.cssText = styles
}

export function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void {
  Object.assign(element.style, styles);
}

export function appendChildren(
  parent: HTMLElement,
  children: HTMLElement[]
): void {
  children.forEach((child) => parent.appendChild(child));
}
