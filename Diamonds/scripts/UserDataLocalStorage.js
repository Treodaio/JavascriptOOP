class UserData {
  constructor() {
    if (!localStorage.length) {
      localStorage.setItem('1', JSON.stringify({ active: true, bestScore: 0 }));
    }
  }

  checkAvailabilityLevel(level) {
    const item = localStorage.getItem(String(level));

    if (!item) {
      return false;
    } else {
      const { active } = JSON.parse(item);
      return active;
    }
  }

  addNewLevel(level) {
    localStorage.setItem(String(level), JSON.stringify({ active: true, bestScore: 0 }));
  }

  getHighScores(level) {
    const item = localStorage.getItem(String(level));

    const { bestScore } = JSON.parse(item);
    return bestScore;
  }

  setHighScores(level, highScore) {
    localStorage.setItem(String(level), JSON.stringify({ active: true, bestScore: highScore }));
  }
}


export const userData = new UserData();