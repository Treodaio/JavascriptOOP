export const SHOW_SCREEN = true;
export const HIDE_SCREEN = false;
export const HIDDEN_CLASS = 'hidden';

export class Common {
  constructor(elementId) {
    this.element = this.bindElement(elementId);
  }

  toggleElementVisibility(element, mode) {
    mode === SHOW_SCREEN ? element.classList.remove(HIDDEN_CLASS) : element.classList.add(HIDDEN_CLASS);
  }

  bindElement(elementId) {
    const element = document.querySelector(`#${elementId}`);
    if (!element) {
      throw new Error(`Nie znaleziono elementu o ID ${elementId}`);
    }
    return element;
  }
}
