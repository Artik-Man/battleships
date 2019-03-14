import { Injectable } from '@angular/core';
import Ship, { ShipPosition } from '../models/ship';

@Injectable()
export default class GameGeneratorService {
  private playerShips: Ship[] = [];
  private enemyShips: Ship[] = [];

  constructor() {
    console.log(this);
  }

  public start(battleFieldAreas: Area[]) {
    this.playerShips = this.generateBattlefield(battleFieldAreas);
    this.enemyShips = this.generateBattlefield(battleFieldAreas);
  }

  public getPlayerShips() {
    return this.playerShips;
  }

  public getEnemyShips() {
    return this.enemyShips;
  }

  public generateBattlefield(battleFieldAreas: Area[]): Ship[] {
    const battlefield: Ship[] = [];

    const areas = this.createRandomAreas(battleFieldAreas);

    console.log(areas);

    areas.forEach(area => {
      if (area.width * area.height === 1) {
        battlefield.push(this.createPointShip({ x: area.x, y: area.y }));
      } else if (area.width * area.height === 4) {
        battlefield.push(this.createLinearShip({ x: area.x, y: area.y }, (Math.random() - 0.5) > 0));
      }
    });
    // battlefield.push(this.createPointShip({ x: 0, y: 0 }));
    // battlefield.push(this.createPointShip({ x: 1, y: 1 }));

    return battlefield;
  }

  public createRandomAreas(areas: Area[]): PositionedArea[] {
    const output: PositionedArea[] = [];

    areas = areas.sort((a, b) => b.width * b.height - a.width * a.height);

    do {
      const area = areas[output.length];
      const x = Math.round(Math.random() * (10 - area.width));
      const y = Math.round(Math.random() * (10 - area.height));
      const posArea = { x: x, y: y, width: area.width, height: area.height };
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

    return output;
  }

  public hitTest(rect1: PositionedArea, rect2: PositionedArea): boolean {
    return (rect1.x - 1 < rect2.x + rect2.width &&
      rect1.x + 1 + rect1.width > rect2.x &&
      rect1.y - 1 < rect2.y + rect2.height &&
      rect1.y + 1 + rect1.height > rect2.y);
  }

  public createPointShip(position: ShipPosition): Ship {
    return new Ship(
      {
        cells: [{ x: 0, y: 0, damaged: false }]
      },
      position
    );
  }

  public createLinearShip(position: ShipPosition, vertical: boolean = false): Ship {
    const ship = new Ship(
      {
        cells: [
          { x: 0, y: 0, damaged: false },
          { x: 0, y: 0, damaged: false },
          { x: 0, y: 0, damaged: false },
          { x: 0, y: 0, damaged: false },
        ]
      },
      position
    );
    ship.shape.cells.forEach((cell, i) => {
      vertical ? cell.y = i : cell.x = i;
    });
    return ship;
  }
}

interface Area {
  width: number;
  height: number;
}

interface PositionedArea extends Area {
  x: number;
  y: number;
}
