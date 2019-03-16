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
    private canShot: number[] = [];

    constructor() {
        console.log(this);
        this.restart();
    }

    /**
     * Calls GameService.enemyFire method with random point
     * @param fire - GameService.enemyFire method
     */
    public myTurn(fire: (point: Point) => boolean, point?: Point) {
        point = point || this.randomPoint();
        const hit = fire(point);
        if (hit) {
            this.battlefield[point.y * BATTLEFIELD_SIZE + point.x].shipHere = true;
            this.battlefield[point.y * BATTLEFIELD_SIZE + point.x].shipDamaged = true;
            // TODO: need to understand where bot can take next shot
            this.myTurn(fire, this.smartShot(point));
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
     * Makes next shot near current shot
     * @param point current shot position
     * @returns point for shot or null
     */
    private smartShot(point: Point): Point {
        const linearCoord = (p: Point) => p.y * BATTLEFIELD_SIZE + p.x;
        const smartPoints: Point[] = [
            { x: point.x - 1, y: point.y },
            { x: point.x + 1, y: point.y },
            { x: point.x, y: point.y - 1 },
            { x: point.x, y: point.y + 1 }
        ];
        const points = smartPoints
            .filter(p => {
                return p.x >= 0 && p.y >= 0
                    && p.x <= BATTLEFIELD_SIZE && p.y <= BATTLEFIELD_SIZE
                    && this.canShot.includes(linearCoord(p));
            })
            .map(linearCoord);
        if (!points.length) {
            return null;
        }
        const index = Math.floor(Math.random() * smartPoints.length);
        return smartPoints[index];
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
