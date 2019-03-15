import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() fire = new EventEmitter<ShipPosition>();

  public cells: BattleFieldCell[] = [];

  constructor() {
    console.log(this);
  }

  ngOnChanges() {
    this.prepareShips();
  }

  private prepareShips() {
    this.cells = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        this.cells.push({
          x,
          y,
          shipHere: false,
          shipDamaged: false,
          miss: false
        });
      }

    }
    // if (!this.isEnemy) {
    this.ships.forEach(ship => {
      ship.shape.forEach(cell => {
        const linearCoord = this.linearCoords({
          x: cell.x + ship.position.x - 1,
          y: cell.y + ship.position.y - 1
        });
        this.cells[linearCoord].shipHere = true;
      });
    });
    // }
  }

  public onFire(cell: BattleFieldCell) {
    console.warn('fire', cell);
    this.fire.emit({
      x: cell.x,
      y: cell.y
    });
  }

  private linearCoords(position: ShipPosition): number {
    return position.y * 10 + position.x;
  }

}

interface BattleFieldCell {
  x: number;
  y: number;
  shipHere: boolean;
  shipDamaged: boolean;
  miss: boolean;
}
