// 引入其他的类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

// 游戏控制器控制所有类
class GameControl {
  // 定义三个属性
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 积分牌
  scorePanel: ScorePanel;
  // 创建一个属性类存储蛇的移动方向，（也就是按键的方向）
  direction: string = "";
  // 创建一个属性用来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    // this.scorePanel = new ScorePanel();
    this.scorePanel = new ScorePanel(10, 2);

    this.init();
  }

  // 游戏的初始化方法，调用后游戏开始
  init() {
    // 绑定键盘按下事件
    document.addEventListener("keydown", this.keydownHandel.bind(this));
    // 调用run 方法，使蛇移动
    this.run();
  }

  // 创建一个键盘按下的响应函数
  keydownHandel(event: KeyboardEvent) {
    /**
     *  ArrowUp Up
     *  ArrowDown Down
     *  ArrowLeft Left
     *  ArrowRight Right
     *
     * ***/
    // console.log(event.key);
    // 修改 direction 值
    // 需要检测 event.key 是否合法
    this.direction = event.key;
  }

  // 创建一个控制蛇移动的方法
  run() {
    /*
     *  根据 this.direction 方向来使蛇的位置改变
     *    向上  top 减少
     *    向下  top 增加
     *    向左  left 减少
     *    向右  left 增加
     * */

    //  获取蛇现状的坐标
    let x = this.snake.X;
    let y = this.snake.Y;
    // 根据按键方向修改x和y值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上 top 减少
        y -= 10;
        break;

      case "ArrowDown":
      case "Down":
        // 向下 top 增加
        y += 10;

        break;

      case "ArrowLeft":
      case "Left":
        // 向左  left 减少
        x -= 10;
        break;

      case "ArrowRight":
      case "Right":
        // 向右 left 增加
        x += 10;
        break;
    }

    // 检测蛇是否吃到了食物
    this.checkEat(x, y);

    // 修改蛇的X和Y值
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (error) {
      // 进入到catch说明出现了异常，游戏结束，弹出提示信息
      // console.log(error.message);
      alert(error.message + "GAME OVER!");
      // 游戏结束
      this.isLive = false;
    }

    // 开启一个定时器
    this.isLive &&
      setTimeout(() => {
        this.run();
      }, 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义一个方法检测蛇是否吃到食物
  checkEat(X: number, Y: number): void {
    if (X === this.food.X && Y === this.food.Y) {
      // console.log("吃到食物了");
      // 吃到食物 加分
      // 食物换位置
      // 蛇增加一节
      this.scorePanel.addScore();
      this.food.change();
      this.snake.addBody();
    }
  }
}

export default GameControl;
