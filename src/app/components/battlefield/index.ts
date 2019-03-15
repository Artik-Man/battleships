import { Component, Input, OnInit, OnChanges } from '@angular/core';
import Ship, { ShipPosition } from 'src/app/models/ship';

@Component({
  selector: 'app-battlefield',
  templateUrl: 'template.html',
  styleUrls: ['./styles.less']
})

export class BattlefieldComponent implements OnChanges {

  @Input() ships: Ship[] = [];
  @Input() isEnemy = false;
  @Input() fieldTitle = '';
  public cells = [];

  constructor() {
    console.log(this);
  }

  ngOnChanges() {
    this.prepareShips();
  }

  private prepareShips() {
    this.cells = [];
    for (let i = 0; i < 100; i++) {
      this.cells.push({
        linearPosition: i,
        shipHere: false,
        shipDamaged: false,
        miss: false
      });
    }
    // if (!this.isEnemy) {
    this.ships.forEach(ship => {
      ship.shape.forEach(cell => {
        const linearCoord = this.linearCoords({
          x: cell.x + ship.position.x - 1,
          y: cell.y + ship.position.y - 1
        });
        if (linearCoord > 100) {
          console.warn(linearCoord, ship);
        }
        this.cells[linearCoord].shipHere = true;
      });
    });
    // }
  }

  public fire(cell) {
    console.warn('fire', cell);
  }

  private linearCoords(position: ShipPosition): number {
    return position.y * 10 + position.x;
  }

}
