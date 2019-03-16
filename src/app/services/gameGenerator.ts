import { Injectable } from '@angular/core';
import { Ship, Cell } from '../models/ship';

export const BATTLEFIELD_SIZE = 10;

@Injectable()
/**
 * Use this service only if you want to create ships randomly
 */
export class GameGeneratorService {
  constructor() {
    console.log(this);
  }
  /**
   * @returns random positioned ships
   */
  public startGame(): { playerShips: Ship[], enemyShips: Ship[] } {
    const playerShips = this.createShips(this.generateShapes());
    const enemyShips = this.createShips(this.generateShapes());
    this.shakeShips(playerShips, enemyShips);
    return { playerShips, enemyShips };
  }

  private shakeShips(palyerShips: Ship[], enemyShips: Ship[]) {
    this.arrangeShips(palyerShips);
    this.arrangeShips(enemyShips);
  }

  private arrangeShips(ships: Ship[]): Ship[] {
    const areas: Area[] = [];
    ships.forEach(ship => {
      areas.push(this.getShipArea(ship));
    });
    const posAreas: PositionedArea[] = this.createRandomAreas(areas);
    ships.sort((a, b) => a.id - b.id).forEach((ship, i) => {
      ship.position.x = posAreas[i].x;
      ship.position.y = posAreas[i].y;
    });
    return ships;
  }

  private getShipArea(ship: Ship): Area {
    const width = Math.max(...ship.shape.map(cell => cell.x));
    const height = Math.max(...ship.shape.map(cell => cell.y));
    const id = ship.id;
    return { width, height, id };
  }

  private createRandomAreas(areas: Area[]): PositionedArea[] {
    // TODO: need to improve the algorithm
    const output: PositionedArea[] = [];
    areas = areas.sort((a, b) => b.width * b.height - a.width * a.height);
    do {
      const area = areas[output.length];
      const x = Math.round(Math.random() * (BATTLEFIELD_SIZE - area.width));
      const y = Math.round(Math.random() * (BATTLEFIELD_SIZE - area.height));
      const width = area.width;
      const height = area.height;
      const id = area.id;
      const posArea = { x, y, width, height, id };
      if (output.length) {
        let ok = true;
        for (const element of output) {
          if (this.hitTest(element, posArea)) {
            ok = false;
            break;
          }
        }
        if (ok) {
          output.push(posArea);
        }
      } else {
        output.push(posArea);
      }
    } while (output.length < areas.length);
    return output.sort((a, b) => a.id - b.id);
  }

  private hitTest(rect1: PositionedArea, rect2: PositionedArea): boolean {
    return (rect1.x - 1 < rect2.x + rect2.width &&
      rect1.x + 1 + rect1.width > rect2.x &&
      rect1.y - 1 < rect2.y + rect2.height &&
      rect1.y + 1 + rect1.height > rect2.y);
  }

  /**
   * @returns two dot-ships, one I-ship and one L-ship SHAPES (not Ship[])
   */
  private generateShapes(): Cell[][] {
    return [
      this.createDotShape(),
      this.createDotShape(),
      this.createIShape(),
      this.createLShape()
    ];
  }

  /**
   * Creates Instances of Ships
   * @param ships - Shapes for ships
   */
  private createShips(ships: Cell[][]): Ship[] {
    return ships.map((shape, id) => {
      return new Ship(id, shape);
    });
  }

  /**
   * Shape: [.]
   */
  private createDotShape(): Cell[] {
    return [{ x: 1, y: 1 }];
  }

  /**
   * Shape: [I]
   */
  private createIShape(): Cell[] {
    const shape = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }];
    if (Math.random() > .5) {
      shape.forEach((cell, i) => {
        cell.x = 1;
        cell.y = i + 1;
      });
    }
    return shape;
  }

  /**
   * Shape: [L]
   */
  private createLShape(): Cell[] {
    const shape = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }];
    if (Math.random() > .5) {
      shape.forEach((cell, i) => {
        cell.x = 1;
        cell.y = i + 1;
      });
      const additionalPoints = [{ x: 2, y: 1 }, { x: 2, y: 3 }];
      const point = additionalPoints[Math.round(Math.random() * (additionalPoints.length - 1))];
      shape.push(point);
    } else {
      const additionalPoints = [{ x: 1, y: 2 }, { x: 3, y: 2 }];
      const point = additionalPoints[Math.round(Math.random() * (additionalPoints.length - 1))];
      shape.push(point);
    }
    return shape;
  }
}


interface Area {
  id: number;
  width: number;
  height: number;
}

interface PositionedArea extends Area {
  id: number;
  x: number;
  y: number;
}
