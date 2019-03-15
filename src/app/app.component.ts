import { Component } from '@angular/core';
import GameGeneratorService from './services/gameGenerator';
import Ship, { Cell, Point } from './models/ship';
import GameStateService, { BattleFieldCell, GameState } from './services/gameState';
import Bot from './services/bot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public gameIsStarted = false;
  public winner: string;
  public battleFields: {
    [player: string]: {
      title: string,
      cells: BattleFieldCell[],
      isEnemy: boolean
    }
  } = {
      player: {
        title: 'Player',
        cells: [],
        isEnemy: false
      },
      enemy: {
        title: 'Enemy',
        cells: [],
        isEnemy: true
      }
    };

  constructor(
    private generator: GameGeneratorService,
    private game: GameStateService,
    private bot: Bot
  ) { }

  public restart() {
    this.gameIsStarted = true;
    this.bot.restart();
    const playerShips = this.createShips(this.generateShapes());
    const enemyShips = this.createShips(this.generateShapes());
    this.generator.start(playerShips, enemyShips);
    this.game.newGame(playerShips, enemyShips);
    this.battleFields.player.cells = this.game.getPlayerBattleField();
    this.battleFields.enemy.cells = this.game.getEnemyBattleField();
  }

  public playerFire(point: Point) {
    const hit = this.game.playerFire(point);
    if (!hit) {
      this.bot.myTurn((p: Point) => {
        return this.game.enemyFire(p);
      });
    }
    const state: GameState = this.game.checkGameState();
    this.gameStateReaction(state);
  }

  private gameStateReaction(state: GameState) {
    switch (state) {
      default:
      case GameState.GameContinues:
        break;
      case GameState.PlayerWin:
        this.winner = this.battleFields.player.title;
        break;
      case GameState.EnemyWin:
        this.winner = this.battleFields.enemy.title;
    }
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
