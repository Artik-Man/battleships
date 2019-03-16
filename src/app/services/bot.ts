import { Injectable } from '@angular/core';
import { Point } from '../models/ship';
import { BattleFieldCell } from '../models/battlefieldCell';
import { BATTLEFIELD_SIZE } from './gameGenerator';

Injectable();
/**
 * Opponent
 */
export class Bot {
    private battlefield: BattleFieldCell[] = [];
    private canShot = [];

    constructor() {
        console.log(this);
        this.restart();
    }

    /**
     * Calls GameService.enemyFire method with random point
     * @param fire - GameService.enemyFire method
     */
    public myTurn(fire: (point: Point) => boolean) {
        const point = this.randomPoint();
        const hit = fire(point);
        if (hit) {
            this.battlefield[point.y * BATTLEFIELD_SIZE + point.x].shipHere = true;
            this.battlefield[point.y * BATTLEFIELD_SIZE + point.x].shipDamaged = true;
            // TODO: need to understand where bot can take next shot
            this.myTurn(fire);
        } else {
            this.battlefield[point.y * BATTLEFIELD_SIZE + point.x].miss = true;
        }
    }

    /**
     * Restart Bot mind
     */
    public restart() {
        this.battlefield = [];
        this.canShot = [];
        let i = 0;
        for (let y = 0; y < BATTLEFIELD_SIZE; y++) {
            for (let x = 0; x < BATTLEFIELD_SIZE; x++) {
                this.canShot.push(i++);
                this.battlefield.push(new BattleFieldCell(x, y));
            }
        }
    }

    /**
     * Generate random point for shot
     */
    private randomPoint(): Point {
        const index = Math.floor(Math.random() * this.canShot.length);
        const linearPoint = this.canShot[index];
        const x = Math.floor(linearPoint % BATTLEFIELD_SIZE);
        const y = Math.floor(linearPoint / BATTLEFIELD_SIZE);
        this.canShot.splice(index, 1);
        return { x, y };
    }
}
