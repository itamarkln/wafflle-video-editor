import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPreview } from '../interface/preview.entity';

@Injectable({
  providedIn: 'root'
})
export class ScenePreviewService {
  private _previewSubject = new BehaviorSubject<IPreview | undefined>(undefined);
  public preview$ = this._previewSubject.asObservable();

  private _isPlayingSubject = new BehaviorSubject<boolean>(false);
  public isPlaying$ = this._isPlayingSubject.asObservable();

  private _loadSubject = new Subject<IPreview>();
  public load$ = this._loadSubject.asObservable();

  private _resetSubject = new Subject<void>();
  public reset$ = this._resetSubject.asObservable();

  private _seekSubject = new BehaviorSubject<number>(0);
  public seek$ = this._seekSubject.asObservable();

  private _currentTimeSubject = new BehaviorSubject<number>(0);
  public currentTime$ = this._currentTimeSubject.asObservable();

  constructor() { }

  public get currPreviewValue() {
    return this._previewSubject.getValue();
  }

  public get isPlayingValue() {
    return this._isPlayingSubject.getValue();
  }

  public get currentTimeValue() {
    return this._currentTimeSubject.getValue();
  }

  play() {
    this._isPlayingSubject.next(true);
  }

  pause() {
    this._isPlayingSubject.next(false);
  }

  load(preview: IPreview) {
    this._loadSubject.next(preview);
    this._previewSubject.next(preview);
  }

  reset() {
    this.pause();
    this._resetSubject.next();
    this._currentTimeSubject.next(0);
  }

  updateCurrentTime(time: number) {
    this._currentTimeSubject.next(time);
  }

  seek(time: number) {
    this._seekSubject.next(time);
  }
}
