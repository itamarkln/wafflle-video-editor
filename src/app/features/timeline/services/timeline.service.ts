import { Injectable } from '@angular/core';
import { ITrack } from '@shared/entities/track/track.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimelineService {
    private _tracksSubject = new BehaviorSubject<ITrack[]>([]);
    private _totalDurationSubject = new BehaviorSubject<number>(0);

    public tracks$ = this._tracksSubject.asObservable();
    public totalDuration$ = this._totalDurationSubject.asObservable();

    constructor() { }

    public get currentTracksValue(): ITrack[] {
        return this._tracksSubject.getValue();
    }

    public get timelineTotalDurationValue(): number {
        return this._totalDurationSubject.getValue();
    }

    private _calculateTotalDuration() {
        // the ruler ticks should be according to the track with the maximum total duration
        const totalDuration = this._tracksSubject.getValue().reduce((maxDurationInS, track) => {
            const trackDurationInS = track.scenes.reduce((durationInS, scene) => durationInS + scene.durationInS, 0);
            return Math.max(maxDurationInS, trackDurationInS);
        }, 0);
        this._totalDurationSubject.next(totalDuration);
    }

    setTracks(tracks: ITrack[]) {
        this._tracksSubject.next(tracks);
        this._calculateTotalDuration();
    }

    getPixelsPerSecond(timelineWidth: number): number {
        const totalDuration = this._totalDurationSubject.getValue();
        return totalDuration ? timelineWidth / totalDuration : 0;
    }

    reset() {
    }
}
