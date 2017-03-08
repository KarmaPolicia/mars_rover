export const ObstacleType = {
  ROCK: 'Rock',
  RIVER: 'River'
}

export class Obstacle {
  constructor(type = ObstacleType.ROCK, coordinate) {
    this._type = type;
    this._coordinate = coordinate;
  }

  getInfo() {
    return {
      coordinate: this._coordinate,
      type: this._type
    }
  }
}
