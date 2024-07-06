import { Injectable } from '@angular/core';
import { IScene } from '@shared/entities/scene/scene.interface';
import { BehaviorSubject } from 'rxjs';
import { TimerEngine } from '../entities/timer-engine.entity';
import { ITrack } from '@shared/entities/track/track.interface';

@Injectable({
    providedIn: 'root'
})
export class TimelineService {
    private _tracksSubject = new BehaviorSubject<ITrack[]>([]);
    private _totalDurationSubject = new BehaviorSubject<number>(0);
    private _currentTimeSubject = new BehaviorSubject<number>(0);
    private _timerEngine: TimerEngine;

    public tracks$ = this._tracksSubject.asObservable();
    public totalDuration$ = this._totalDurationSubject.asObservable();
    public currentTime$ = this._currentTimeSubject.asObservable();

    constructor() {
        this._timerEngine = new TimerEngine();
        this._timerEngine.onTick((elapsed: number) => {
            this._currentTimeSubject.next(elapsed / 1000);
        });
    }

    public get currentTracks(): ITrack[] {
        return this._tracksSubject.getValue();
    }

    public get timelineTotalDuration(): number {
        return this._totalDurationSubject.getValue();
    }

    private calculateTotalDuration() {
        // the ruler ticks should be according to the track with the maximum total duration
        const totalDuration = this._tracksSubject.getValue().reduce((maxDurationInS, track) => {
            const trackDurationInS = track.scenes.reduce((durationInS, scene) => durationInS + scene.durationInS, 0);
            return Math.max(maxDurationInS, trackDurationInS);
        }, 0);
        this._totalDurationSubject.next(totalDuration);
    }

    setTracks(tracks: ITrack[]) {
        this._tracksSubject.next(tracks);
        this.calculateTotalDuration();
    }

    getPixelsPerSecond(timelineWidth: number): number {
        const totalDuration = this._totalDurationSubject.getValue();
        return totalDuration ? timelineWidth / totalDuration : 0;
    }

    start() {
        this._timerEngine.start();
    }

    pause() {
        this._timerEngine.pause();
    }

    reset() {
        this._timerEngine.reset();
        this._currentTimeSubject.next(0);
    }
}
