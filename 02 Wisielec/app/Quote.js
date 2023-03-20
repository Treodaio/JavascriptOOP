export class Quote {
  constructor(text) {
    this.text = text;
    this.guessed = [];
  }

  getContent() {
    let content = '';
    for (const char of this.text) {
      if (char === ' ' || this.guessed.includes(char.toLowerCase()) || this.guessed.includes(char.toUpperCase())) {
        content += char;
      } else {
        content += '_';
      }
    }
    return content;
  }

  guess(letter) {
    if (this.text.toLowerCase().includes(letter.toLowerCase())) {
      this.guessed.push(letter);
      return true;
    }
    else {
      return false;
    }
  }
}