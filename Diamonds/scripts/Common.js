export const SHOW_SCREEN = true;
export const HIDE_SCREEN = false;
export const CSS_HIDDEN_CLASS = "hidden";

export class Common {
  constructor(elementId) {
    if (typeof elementId === "undefined") return;
    this.element = this.bindToElement(elementId);
  }

  toggleElementVisibility(element, mode) {
    mode === SHOW_SCREEN
      ? element.classList.remove(CSS_HIDDEN_CLASS)
      : element.classList.add(CSS_HIDDEN_CLASS);
  }

  bindToElement(ID) {
    const element = document.getElementById(ID);

    if (!element) {
      throw new Error(`Nie znaleziono elementu o ID ${elementId}`);
    }
    return element;
  }
}
