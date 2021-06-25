import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { concatMap, delay, mergeMap, map } from 'rxjs/operators';

export const moveRightKeyDown = new BehaviorSubject(false);
export const moveLeftKeyDown = new BehaviorSubject(false);
export const spaceKeyDown = new BehaviorSubject(false);

export const sched = from([0,1,2,3]).pipe(
    concatMap(val => {
        // console.log(val)
        return of(val).pipe(delay(1500))
    }),
    // concatMap(val => {
    //     console.log(val)
    //     return of(val)
    // }),
).subscribe(val => console.log(val));
