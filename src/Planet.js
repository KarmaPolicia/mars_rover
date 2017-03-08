import {
  Rover
} from './Rover'
import {
  Coordinate
} from './Coordinate';
import {
  Obstacle
} from './Obstacle';

export class Planet {

  constructor(width = 20, height = 20, obstacles = []) {
    this._width = width;
    this._height = height;

    this._grid = this._createGrid(width, height, obstacles);
  }

  translateY(coordinate, increment) {
    const newY = coordinate.y + increment;
    const pos = new Coordinate(coordinate.x);

    if (increment > 0) {
      pos.y = (newY > this._height) ? 0 : newY;
    } else {
      pos.y = (newY < 0) ? this._height : newY;
    }

    this._checkForObstacle(pos);

    return pos;
  }

  translateX(coordinate, increment) {
    const newX = coordinate.x + increment;
    const pos = new Coordinate(0, coordinate.y);

    if (increment > 0) {
      pos.x = (newX > this._width) ? 0 : newX;
    } else {
      pos.x = (newX < 0) ? this._width : newX;
    }

    this._checkForObstacle(pos);

    return pos;
  }

  _createGrid(width, height, obstacles) {
    const grid = [];

    for (let i = 0; i <= height; i++) {
      grid.push(Array.from(new Array(width)));
    }

    obstacles.forEach(obstacle => {
      const {
        x,
        y
      } = obstacle.getInfo().coordinate;
      grid[y][x] = obstacle;
    });

    return grid;
  }

  _checkForObstacle(coordinate) {
    const {
      x,
      y
    } = coordinate;
    const obstacle = this._grid[y][x];
    if (obstacle !== undefined) {
      throw new Error('Obstacle found', obstacle);
    }
  }
}
