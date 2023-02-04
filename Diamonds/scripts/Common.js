export const SHOW_SCREEN = true;
export const HIDE_SCREEN = false;
export const HIDDEN_CLASS = 'hidden';

export class Common {
  constructor(elementId) {
    this.element = this.bindToElement(elementId);
  }

  toggleElementVisibility(element, mode) {
    mode === SHOW_SCREEN ? element.classList.remove(HIDDEN_CLASS) : element.classList.add(HIDDEN_CLASS);
  }

  bindToElement(ID) {
    const element = document.getElementById(ID);

    if (!element) {
      throw new Error(`Nie znaleziono elementu o ID ${elementId}`);
    }
    return element;
  }
}
