import { Injectable } from '@angular/core';
import Ship, { ShipPosition } from '../models/ship';

@Injectable()
export default class GameGeneratorService {
  private playerShips: Ship[] = [];
  private enemyShips: Ship[] = [];

  constructor() {
    console.log(this);
  }

  public start(palyerShips: Ship[], enemyShips: Ship[]) {
    this.playerShips = this.arrangeShips(palyerShips);
    this.enemyShips = this.arrangeShips(enemyShips);
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
    const output: PositionedArea[] = [];

    areas = areas.sort((a, b) => b.width * b.height - a.width * a.height);

    do {
      const area = areas[output.length];
      const x = Math.round(Math.random() * (10 - area.width));
      const y = Math.round(Math.random() * (10 - area.height));
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
