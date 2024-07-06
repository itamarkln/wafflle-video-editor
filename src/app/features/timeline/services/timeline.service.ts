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
    private _isPlayingSubject = new BehaviorSubject<boolean>(false);

    private _timerEngine: TimerEngine;

    public tracks$ = this._tracksSubject.asObservable();
    public totalDuration$ = this._totalDurationSubject.asObservable();
    public currentTime$ = this._currentTimeSubject.asObservable();
    public isPlaying$ = this._isPlayingSubject.asObservable();

    constructor() {
        this._timerEngine = new TimerEngine();
        this._timerEngine.onTick((elapsed: number) => {
            this._currentTimeSubject.next(elapsed / 1000);
        });
    }

    public get currentTracksValue(): ITrack[] {
        return this._tracksSubject.getValue();
    }

    public get timelineTotalDurationValue(): number {
        return this._totalDurationSubject.getValue();
    }

    public get currentTimeValue(): number {
        return this._currentTimeSubject.getValue();
    }

    public get isPlayingValue(): boolean {
        return this._isPlayingSubject.getValue();
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
        const totalDuration = this._totalDurationSubject.getValue();
        this._timerEngine.start(totalDuration);
        this._isPlayingSubject.next(true);
    }

    pause() {
        this._timerEngine.pause();
        this._isPlayingSubject.next(false);
    }

    reset() {
        this._timerEngine.reset();
        this._currentTimeSubject.next(0);
        this._isPlayingSubject.next(false);
    }
}
