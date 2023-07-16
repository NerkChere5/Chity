// 29.01.2023

export class Vector_2d {
  x = 0;
  y = 0;




  constructor(x = 0, y = x) {
    this.init(...arguments);
  }


  copy() {
    return new this.constructor(this.x, this.y);
  }


  division(num) {
    this.x /= num;
    this.y /= num;

    return this;
  }


  init(x = 0, y = x) {
    this.x = x;
    this.y = y;

    return this;
  }


  init_vector(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }


  invert() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }


  length__get() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }


  length__set(value) {
    let coeff = value / this.length__get();
    this.x *= coeff;
    this.y *= coeff;

    return this;
  }


  norm() {
    this.length__set(1);

    return this;
  }


  prod(num) {
    this.x *= num;
    this.y *= num;

    return this;
  }


  prod_scalar(vector) {
    return this.x * vector.x + this.y * vector.y;
  }


  reset() {
    this.x = 0;
    this.y = 0;

    return this;
  }


  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }


  sum(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }
}
