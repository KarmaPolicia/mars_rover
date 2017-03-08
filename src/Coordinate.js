export class Coordinate {

  constructor(x = 0, y = 0) {
    this._verifyNumber(x);
    this._verifyNumber(y);

    this.x = x;
    this.y = y;
  }

  getCoordinates() {
    return {
      x: this.x,
      y: this.y
    }
  }

  _verifyNumber(val) {
    if (!Number.isInteger(val) || val < 0) {
      throw new Error('Must be positive integer');
    }
  }
}
