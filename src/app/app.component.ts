import { Component } from '@angular/core';
import GameGeneratorService from './services/gameGenerator';
import Ship, { Cell, ShipPosition } from './models/ship';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public playerShips: Ship[];
  public enemyShips: Ship[];

  constructor(private generator: GameGeneratorService) {
    this.restart();
  }

  public restart() {
    this.playerShips = this.createShips(this.generateShapes());
    this.enemyShips = this.createShips(this.generateShapes());
    this.generator.start(this.playerShips, this.enemyShips);
  }

  public playerFire(point: ShipPosition) {
    console.log(point);
  }

  public enemyFire(point: ShipPosition) {
    console.log(point);
  }

  private generateShapes(): Cell[][] {
    return [
      this.createDotShape(),
      this.createDotShape(),
      this.createIShape(),
      this.createLShape()
    ];
  }

  private createShips(ships: Cell[][]): Ship[] {
    let id = 0;
    return ships.map(shape => {
      return new Ship(++id, shape);
    });
  }

  private createDotShape(): Cell[] {
    return [{ x: 1, y: 1 }];
  }

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
