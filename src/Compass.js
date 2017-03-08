export const Direction = {
  NORTH: 'n',
  EAST: 'e',
  SOUTH: 's',
  WEST: 'w'
}

export class Compass {
  static hasDirection(direction) {
    return Object.values(Direction).includes(direction);
  }

  static getDirectionToLeft(direction) {
    const index = this._getDirectionIndex(direction);
    const nextIndex = index === 0 ? 3 : index - 1;
    return this._getDirectionAtIndex(nextIndex);
  }

  static getDirectionToRight(direction) {
    const index = this._getDirectionIndex(direction);
    const nextIndex = index === 3 ? 0 : index + 1;
    return this._getDirectionAtIndex(nextIndex);
  }

  static _getDirectionIndex(direction) {
    return Object.values(Direction).indexOf(direction);
  }

  static _getDirectionAtIndex(index) {
    return Object.values(Direction)[index];
  }
}
