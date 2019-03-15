import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ShipPosition } from 'src/app/models/ship';
import { BattleFieldCell } from 'src/app/services/gameState';

@Component({
  selector: 'app-battlefield',
  templateUrl: 'template.html',
  styleUrls: ['./styles.less']
})

export class BattlefieldComponent {

  @Input() title = '';
  @Input() isEnemy = false;
  @Input() cells: BattleFieldCell[] = [];
  @Output() fire = new EventEmitter<ShipPosition>();

  constructor() {
    console.log(this);
  }

  public onFire(cell: BattleFieldCell) {
    this.fire.emit({
      x: cell.x,
      y: cell.y
    });
  }

}
