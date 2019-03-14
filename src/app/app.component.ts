import { Component } from '@angular/core';
import GameGeneratorService from './services/gameGenerator';
import Ship from './models/ship';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public playerShips: Ship[];
  public enemyShips: Ship[];

  constructor(private generator: GameGeneratorService) {

    this.generator.start([
      { width: 4, height: 1 },
      // { width: 3, height: 2 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },
      { width: 1, height: 1 },

    ]);

    this.playerShips = this.generator.getPlayerShips();
    this.enemyShips = this.generator.getEnemyShips();

  }
}
