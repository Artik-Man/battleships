import { Injectable } from '@angular/core';
import { BattleFieldCell } from './gameState';
import { Point } from '../models/ship';

Injectable();
export default class Bot {
    private battlefield: BattleFieldCell[] = [];
    private canShot = [];

    constructor() {
        console.log(this);
        this.restart();
    }

    public myTurn(fire: (point: Point) => boolean) {
        const hit = fire(this.randomPoint());
    }

    public restart() {
        this.battlefield = [];
        this.canShot = [];
        let i = 0;
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                this.canShot.push(i++);
                this.battlefield.push({
                    x,
                    y,
                    shipHere: false,
                    shipDamaged: false,
                    miss: false
                });
            }
        }
    }

    public randomPoint(): Point {
        const index = Math.floor(Math.random() * this.canShot.length);
        const linearPoint = this.canShot[index];
        const x = Math.floor(linearPoint % 10);
        const y = Math.floor(linearPoint / 10);
        this.canShot.splice(index, 1);
        console.log(this.canShot, index, linearPoint, x, y);
        return { x, y };
    }
}
