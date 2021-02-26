// 定义食物 Food
class Food {
  // 定义一个属性表示对应的元素
  element: HTMLElement;
  constructor() {
    // 获取页面中的food元素并赋值给 element
    this.element = document.getElementById("food")!;
  }

  // 定义一个获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }
  // 定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成一个随机的位置
    // 食物的位置最小是0，最大时290
    // 蛇一次移动一格，一格就是10，所以食物坐标必须时整十

    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

export default Food;
