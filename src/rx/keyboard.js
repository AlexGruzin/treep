import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { concatMap, delay, mergeMap, map } from 'rxjs/operators';

export const moveRightKeyDown = new BehaviorSubject(false);
export const moveLeftKeyDown = new BehaviorSubject(false);
export const spaceKeyDown = new BehaviorSubject(false);

const JUMP_DURATION = 2000;
const RANGE_VALUES_AMOUNT = 100;
const COMMON_RANGE = Array.from(Array(RANGE_VALUES_AMOUNT).keys()) // Jump
const RANGE_DELAY = JUMP_DURATION / RANGE_VALUES_AMOUNT

export const jumpFunc = x => {
    return Math.abs(x - 50)
}

export const rangeValuesEmitter = from(COMMON_RANGE).pipe(
    concatMap(val => {
        return of(val).pipe(delay(RANGE_DELAY))
    }),
);
