// 定义蛇
class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  // 蛇的身体 包括身体
  bodies: HTMLCollection;
  // 获取蛇的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div");
  }

  // 获取蛇的坐标 (蛇头坐标)
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇的位置
  set X(val: number) {
    if (this.X === val) {
      return;
    }
    // 判断X 值的合法范围0~290直接
    if (val < 0 || val > 290) {
      // 进入判断说明蛇撞墙了  抛出异常
      throw new Error("蛇撞墙了");
    }

    // 修改水平坐标，向右走，不能向向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
      // console.log("水平方向发送了掉头");
      // 如果发送了掉头，继续向前移动，不掉头
      if (val > this.X) {
        // 如果val 大于 this。X 说明蛇向右走，此时发生掉头，应该使蛇继续向左走
        val = this.X - 10;
      } else {
        // 如果val 小于 this。X 说明蛇向左走，此时发生掉头，应该使蛇继续向右走
        val = this.X + 10;
      }
    }

    // 移动身体
    this.moveBody();

    this.head.style.left = val + "px";

    // 检测有没有撞到自己
    this.checkHeadBody();
  }
  set Y(val: number) {
    if (this.Y === val) {
      return;
    }
    // 判断 Y 值的合法范围0~290直接
    if (val < 0 || val > 290) {
      // 进入判断说明蛇撞墙了 抛出异常
      throw new Error("蛇撞墙了");
    }

    // 修改垂直坐标，
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
      // console.log("垂直方向发送了掉头");
      // 如果发送了掉头，继续向前移动，不掉头
      if (val > this.Y) {
        // 如果val 大于 this。Y 说明蛇向下走，
        val = this.Y - 10;
      } else {
        // 如果val 小于 this。Y 说明蛇向上走，
        val = this.Y + 10;
      }
    }

    // 移动身体
    this.moveBody();

    this.head.style.top = val + "px";

    // 检测有没有撞到自己
    this.checkHeadBody();
  }

  // 蛇增加身体的方法
  addBody() {
    // 向 element 中添加div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 移动蛇身体的方法
  moveBody() {
    /**
     * 将后边的身体设置为前边身体的位置
     *    第四节=第三节
     *    第三节=第二节
     *    第二节=第一节
     * */
    // 遍历所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检测身体和头是否相撞
  checkHeadBody() {
    // 获取所有的 body , 检测是否和蛇头相撞
    for (let i = 1; i < this.bodies.length; i++) {
      if (
        this.X === (this.bodies[i] as HTMLElement).offsetLeft &&
        this.Y === (this.bodies[i] as HTMLElement).offsetTop
      ) {
        // console.log("撞到身体了");
        throw new Error("撞到身体了");
      }
    }
  }
}

export default Snake;
