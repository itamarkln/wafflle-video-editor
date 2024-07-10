import { Injectable } from '@angular/core';
import { MediaPlayerActionType } from '@shared/entities/media-player/actions/media-player-actions.enum';
import { IScene } from '@shared/entities/scene/scene.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScenePreviewService {
  private _previewSubject: BehaviorSubject<IScene[]>;
  private _currentActionSubject: BehaviorSubject<MediaPlayerActionType>;
  private _currentTimeSubject: BehaviorSubject<number>;
  private _isPlayingSubject: BehaviorSubject<boolean>;

  public preview$: Observable<IScene[]>;
  public currentAction$: Observable<MediaPlayerActionType>;
  public currentTime$: Observable<number>;
  public isPlaying$: Observable<boolean>;

  constructor() {
    this._previewSubject = new BehaviorSubject<IScene[]>([]);
    this._currentActionSubject = new BehaviorSubject<MediaPlayerActionType>(MediaPlayerActionType.PAUSE);
    this._currentTimeSubject = new BehaviorSubject<number>(0);
    this._isPlayingSubject = new BehaviorSubject<boolean>(false);

    this.preview$ = this._previewSubject.asObservable();
    this.currentAction$ = this._currentActionSubject.asObservable();
    this.currentTime$ = this._currentTimeSubject.asObservable();
    this.isPlaying$ = this._isPlayingSubject.asObservable();
  }

  private _setPreview(scenes: IScene[]): void {
    this._previewSubject.next(scenes);
  }

  public setIsPlaying(isPlaying: boolean): void {
    this._isPlayingSubject.next(isPlaying);
  }

  public setCurrentTime(currentTime: number): void {
    this._currentTimeSubject.next(currentTime);
  }

  public loadPreview(): void {
    this._currentActionSubject.next(MediaPlayerActionType.LOAD);
  }

  public preview(scenes: IScene[]) {
    this._setPreview(scenes);
    this._currentActionSubject.next(MediaPlayerActionType.PLAY);
  }

  public stopPreview() {
    this._currentActionSubject.next(MediaPlayerActionType.PAUSE);
  }
}