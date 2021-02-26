// 定义表示记分牌的类
class ScorePanel {
  score = 0;
  level = 1;

  // 设置一个变量限制等级
  maxLevel: number;
  // 设置一个变量表示多少分升级
  upScore: number;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  // 设置加分的方法
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + "";
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }
  // 设置加等级的方法
  levelUp() {
    // 设置等级上限
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + "";
    }
  }
}

export default ScorePanel;
