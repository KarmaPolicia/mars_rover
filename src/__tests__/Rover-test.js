import {
  Rover,
  Commands
} from '../Rover';
import {
  Compass,
  Direction
} from '../Compass';
import {
  Coordinate
} from '../Coordinate';
import {
  Planet
} from '../Planet';
import {
  Obstacle,
  ObstacleType
} from '../Obstacle';

describe('Rover', () => {

  describe('direction', () => {

    it('faces north initially', () => {
      const rover = new Rover();
      expect(rover.getInfo().direction).toEqual(Direction.NORTH);
    });

    it('throws an error if direction is invalid', () => {
      expect(() => {
        const rover = new Rover(0, 0, 'invalidDirection')
      }).toThrow();
    });

    describe('right rotation', () => {
      it('rotates right', () => {

        const rover = new Rover();
        expect(rover.getInfo().direction).toEqual(Direction.NORTH);

        rover.executeCommand(Commands.RIGHT);
        expect(rover.getInfo().direction).toEqual(Direction.EAST);

        rover.executeCommand(Commands.RIGHT);
        expect(rover.getInfo().direction).toEqual(Direction.SOUTH);

        rover.executeCommand(Commands.RIGHT);
        expect(rover.getInfo().direction).toEqual(Direction.WEST);
      });

      it('returns to north after west', () => {
        const rover = new Rover(0, 0, Direction.WEST);

        rover.executeCommand(Commands.RIGHT);
        expect(rover.getInfo().direction).toEqual(Direction.NORTH);
      });

      it('turns multiple times', () => {
        const rover = new Rover();

        rover.executeCommand([Commands.RIGHT, Commands.RIGHT]);
        expect(rover.getInfo().direction).toEqual(Direction.SOUTH);

        rover.executeCommand([Commands.RIGHT, Commands.RIGHT]);
        expect(rover.getInfo().direction).toEqual(Direction.NORTH);
      });
    });
  });

  describe('left rotation', () => {
    it('rotates left', () => {
      const rover = new Rover();
      expect(rover.getInfo().direction).toEqual(Direction.NORTH);

      rover.executeCommand(Commands.LEFT);
      expect(rover.getInfo().direction).toEqual(Direction.WEST);

      rover.executeCommand(Commands.LEFT);
      expect(rover.getInfo().direction).toEqual(Direction.SOUTH);

      rover.executeCommand(Commands.LEFT);
      expect(rover.getInfo().direction).toEqual(Direction.EAST);
    });

    it('returns to north after east', () => {
      const rover = new Rover(0, 0, Direction.EAST);

      rover.executeCommand(Commands.LEFT);
      expect(rover.getInfo().direction).toEqual(Direction.NORTH);
    });

    it('turns multiple times', () => {
      const rover = new Rover();

      rover.executeCommand([Commands.LEFT, Commands.LEFT]);
      expect(rover.getInfo().direction).toEqual(Direction.SOUTH);

      rover.executeCommand([Commands.LEFT, Commands.LEFT]);
      expect(rover.getInfo().direction).toEqual(Direction.NORTH);
    })
  })

  describe('position', () => {
    it('has a default position [0,0]', () => {
      const rover = new Rover();
      expect(rover.getInfo().position.x).toEqual(0);
      expect(rover.getInfo().position.y).toEqual(0);
    });

    it('can set a starting position', () => {
      const rover = new Rover(1, 8);
      expect(rover.getInfo().position.x).toEqual(1);
      expect(rover.getInfo().position.y).toEqual(8);
    });
  });

  describe('movement', () => {
    describe('forward movement', () => {
      it('moves forward when facing North', () => {
        const rover = new Rover(0, 0, Direction.NORTH);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(1);
        expect(rover.getInfo().position.x).toEqual(0);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(2);
        expect(rover.getInfo().position.x).toEqual(0);
      });

      it('moves forward when facing East', () => {
        const rover = new Rover(0, 0, Direction.EAST);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(0);
        expect(rover.getInfo().position.x).toEqual(1);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(0);
        expect(rover.getInfo().position.x).toEqual(2);
      });

      it('moves forward when facing South', () => {
        const rover = new Rover(0, 2, Direction.SOUTH);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(1);
        expect(rover.getInfo().position.x).toEqual(0);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(0);
        expect(rover.getInfo().position.x).toEqual(0);
      });

      it('moves forward when facing West', () => {
        const rover = new Rover(2, 0, Direction.WEST);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(0);
        expect(rover.getInfo().position.x).toEqual(1);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(0);
        expect(rover.getInfo().position.x).toEqual(0);
      });
    });

    describe('backward movement', () => {
      it('moves forward when facing North', () => {
        const rover = new Rover(0, 2, Direction.NORTH);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(0);
        expect(rover.getInfo().position.y).toEqual(1);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(0);
        expect(rover.getInfo().position.y).toEqual(0);
      });

      it('moves forward when facing East', () => {
        const rover = new Rover(2, 0, Direction.EAST);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(1);
        expect(rover.getInfo().position.y).toEqual(0);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(0);
        expect(rover.getInfo().position.y).toEqual(0);
      });

      it('moves forward when facing South', () => {
        const rover = new Rover(0, 0, Direction.SOUTH);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(0);
        expect(rover.getInfo().position.y).toEqual(1);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(0);
        expect(rover.getInfo().position.y).toEqual(2);
      });

      it('moves forward when facing West', () => {
        const rover = new Rover(0, 0, Direction.WEST);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(1);
        expect(rover.getInfo().position.y).toEqual(0);

        rover.executeCommand(Commands.BACKWARD);
        expect(rover.getInfo().position.x).toEqual(2);
        expect(rover.getInfo().position.y).toEqual(0);
      });
    });

    describe('position wraps at planet boundaries', () => {

      let planet;

      beforeEach(() => {
        planet = new Planet(10, 10);
      })

      it('rover wraps from north to south', () => {
        const rover = new Rover(0, 10, Direction.NORTH, planet);
        expect(rover.getInfo().position.y).toEqual(10);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(0);
      });

      it('rover wraps from east to west', () => {
        const rover = new Rover(10, 0, Direction.EAST, planet);
        expect(rover.getInfo().position.x).toEqual(10);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.x).toEqual(0);
      });

      it('rover wraps from south to north', () => {
        const rover = new Rover(0, 0, Direction.SOUTH, planet);
        expect(rover.getInfo().position.y).toEqual(0);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.y).toEqual(10);
      });

      it('rover wraps from west to east', () => {
        const rover = new Rover(0, 0, Direction.WEST, planet);
        expect(rover.getInfo().position.x).toEqual(0);

        rover.executeCommand(Commands.FORWARD);
        expect(rover.getInfo().position.x).toEqual(10);
      });
    });
  });

  describe('processing a chain of commands', () => {

    it('moves to new position', () => {
      const rover = new Rover(0, 0, Direction.NORTH);
      rover.executeCommand([Commands.FORWARD, Commands.RIGHT, Commands.FORWARD, Commands.FORWARD, Commands.LEFT, Commands.FORWARD]);

      expect(rover.getInfo().position.x).toEqual(2);
      expect(rover.getInfo().position.y).toEqual(2);
      expect(rover.getInfo().direction).toEqual(Direction.NORTH);

      rover.executeCommand([Commands.FORWARD, Commands.FORWARD, Commands.FORWARD, Commands.LEFT, Commands.BACKWARD]);

      expect(rover.getInfo().position.x).toEqual(3);
      expect(rover.getInfo().position.y).toEqual(5);
      expect(rover.getInfo().direction).toEqual(Direction.WEST);
    });

    it('throws an error when given invalid command', () => {
      const rover = new Rover(0, 0, Direction.NORTH);

      expect(() => {
        rover.executeCommand([Commands.FORWARD, Commands.BACKWARD, 'invalid', Commands.LEFT]);
      }).toThrow();
    });

    it('stops rover when obstacle found', () => {
      const obstacle = new Obstacle(ObstacleType.ROCK, new Coordinate(0, 2));
      const planet = new Planet(5, 5, [obstacle]);
      const rover = new Rover(0, 0, Direction.NORTH, planet);
      expect(rover.getInfo().position.y).toEqual(0);

      expect(() => {
        rover.executeCommand([Command.FORWARD, Command.FORWARD]);

        expect(rover.getInfo().position.y).toEqual(1);
      }).toThrow();
    });
  });
});
