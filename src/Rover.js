import {
  Coordinate
} from './Coordinate';
import {
  Compass,
  Direction
} from './Compass';
import {
  Planet
} from './Planet';

export const Commands = {
  FORWARD: 'f',
  BACKWARD: 'b',
  LEFT: 'l',
  RIGHT: 'r'
}

export class Rover {

  constructor(
    x = 0,
    y = 0,
    direction = Direction.NORTH,
    planet = new Planet()) {

    if (!Compass.hasDirection(direction)) {
      throw new Error('Invalid direction');
    }

    this._planet = planet;
    this._position = new Coordinate(x, y);
    this._direction = direction;
  }

  executeCommand(instructions) {
    try {
      [...instructions]
      .forEach(command => {
        switch (command) {
          case Commands.FORWARD:
            this._moveForward();
            break;
          case Commands.BACKWARD:
            this._moveBackward();
            break;
          case Commands.LEFT:
            this._turnLeft();
            break;
          case Commands.RIGHT:
            this._turnRight();
            break;
          default:
            debugger;
            throw new Error('Unknown command', command);
        }
      });
      console.info('Command complete', this.getInfo());

    } catch (e) {
      console.error(e.message, this.getInfo());
      throw (e);
    }
  }

  getInfo() {
    return {
      position: this._position.getCoordinates(),
      direction: this._direction
    }
  }

  _moveForward() {
    try {
      const newPos = this._getNewPosition(this._direction, true);
      this._position = newPos;
    } catch (e) {
      console.error('Could not move forward', e, this.getInfo());
    }
  }

  _moveBackward() {
    try {
      const newPos = this._getNewPosition(this._direction, false);
      this._position = newPos;
    } catch (e) {
      console.error('Could not move backward', e, this.getInfo());
    }
  }

  _turnLeft() {
    this._direction = Compass.getDirectionToLeft(this._direction);
    console.log(`turned left > facing: ${this._direction}`);
  }

  _turnRight() {
    this._direction = Compass.getDirectionToRight(this._direction);
    console.log(`turned right > facing: ${this._direction}`);
  }

  _getNewPosition(direction, forward) {
    switch (direction) {
      case Direction.NORTH:
        return this._planet.translateY(this._position, forward ? 1 : -1);
        break;
      case Direction.EAST:
        return this._planet.translateX(this._position, forward ? 1 : -1);
        break;
      case Direction.SOUTH:
        return this._planet.translateY(this._position, forward ? -1 : 1);
        break;
      case Direction.WEST:
        return this._planet.translateX(this._position, forward ? -1 : 1);
        break;
    }
  }
}
