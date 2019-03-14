import { Component, Input, OnInit } from '@angular/core';
import Ship, { ShipPosition } from 'src/app/models/ship';

@Component({
  selector: 'app-battlefield',
  templateUrl: 'template.html',
  styleUrls: ['./styles.less']
})

export class BattlefieldComponent implements OnInit {

  @Input() ships: Ship[] = [];
  @Input() isEnemy = false;
  @Input() title = '';
  public cells = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.cells.push({
        shipHere: false,
        shipDamaged: false,
        miss: false
      });
    }

    console.log(this);

  }

  ngOnInit() {
    // if (!this.isEnemy) {
    this.ships.forEach(ship => {
      ship.shape.cells.forEach(cell => {
        const linearCoord = this.linearCoords({
          x: cell.x + ship.position.x,
          y: cell.y + ship.position.y
        });

        this.cells[linearCoord].shipHere = true;
      });
    });
    // }
  }

  private linearCoords(position: ShipPosition): number {
    if (position.y * 10 + position.x < 1) {
      console.log(position, position.y * 10 + position.x);
    }
    return position.y * 10 + position.x;
  }

}
