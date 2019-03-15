import { Injectable } from '@angular/core';
import { Ship, Point } from '../models/ship';

export const enum GameState {
    GameContinues = 0,
    PlayerWin = 1,
    EnemyWin = 2,
}

export interface BattleFieldCell {
    x: number;
    y: number;
    shipHere: boolean;
    shipDamaged: boolean;
    miss: boolean;
}

@Injectable()
export class GameStateService {
    private playerShips: Ship[] = [];
    private enemyShips: Ship[] = [];
    private playerBattleField: BattleFieldCell[] = [];
    private enemyBattleField: BattleFieldCell[] = [];

    constructor() {
        console.log(this);
    }

    public newGame(playerShips: Ship[], enemyShips: Ship[]) {
        this.playerShips = playerShips;
        this.enemyShips = enemyShips;
        this.playerBattleField = this.prepareShips(this.playerShips);
        this.enemyBattleField = this.prepareShips(this.enemyShips, true);
    }

    public getPlayerBattleField() {
        return this.playerBattleField;
    }

    public getEnemyBattleField() {
        return this.enemyBattleField;
    }

    public playerFire(point: Point): boolean {
        return this.fire(this.enemyBattleField, this.enemyShips, point);
    }

    public enemyFire(point: Point): boolean {
        return this.fire(this.playerBattleField, this.playerShips, point);
    }

    public checkGameState(): GameState {
        if (!this.playerShips.filter(ship => !ship.dead).length) {
            return GameState.EnemyWin;
        } else if (!this.enemyShips.filter(ship => !ship.dead).length) {
            return GameState.PlayerWin;
        } else {
            return GameState.GameContinues;
        }
    }

    private fire(battlefield: BattleFieldCell[], ships: Ship[], point: Point): boolean {
        const coord = this.linearCoords(point);
        const update = (state: string) => {
            battlefield[coord][state] = true;
        };
        for (const ship of ships) {
            const shipLinearCoords = this.getShipLinearCoords(ship);
            if (shipLinearCoords.includes(coord)) {
                ship.damaged = true;
                const shipCell = ship.shape.find(cell => {
                    return ship.position.x + cell.x - 1 === point.x
                        && ship.position.y + cell.y - 1 === point.y;
                });
                if (shipCell) {
                    shipCell.damaged = true;
                }
                update('shipDamaged');
                update('shipHere');
                this.checkShipLife(ship);
                return true;
            }
        }
        update('miss');
        return false;
    }

    private checkShipLife(ship: Ship) {
        ship.dead = ship.shape.filter(cell => cell.damaged).length === ship.shape.length;
    }

    private prepareShips(ships: Ship[], isEnemy: boolean = false): BattleFieldCell[] {
        const cells = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                cells.push({
                    x,
                    y,
                    shipHere: false,
                    shipDamaged: false,
                    miss: false
                });
            }
        }
        if (!isEnemy) {
            ships.forEach(ship => {
                const shipLinearCoords = this.getShipLinearCoords(ship);
                shipLinearCoords.forEach(linearCoord => {
                    cells[linearCoord].shipHere = true;
                });
            });
        }
        return cells;
    }

    private linearCoords(position: Point): number {
        return position.y * 10 + position.x;
    }

    private getShipLinearCoords(ship: Ship): number[] {
        const coords = [];
        ship.shape.forEach(cell => {
            const linearCoord = this.linearCoords({
                x: cell.x + ship.position.x - 1,
                y: cell.y + ship.position.y - 1
            });
            coords.push(linearCoord);
        });
        return coords;
    }

}
