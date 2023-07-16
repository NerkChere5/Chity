// 06.11.2022




export class Common {
  static inRange(num, min, max) {
    return num >= min && num <= max;
  }
  
  
  static toRange(num, min, max) {
    return num < min ? min : (num > max ? max : num);
  }
}
