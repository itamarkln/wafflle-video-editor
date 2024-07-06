import { Injectable } from '@angular/core';
import { MediaPlayerActionType } from '@shared/entities/media-player/actions/media-player-actions.enum';
import { IScene } from '@shared/entities/scene/scene.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScenePreviewService {
  private _sceneSubject: Subject<IScene[]>;
  private _currentActionSubject: Subject<MediaPlayerActionType>;

  public scenes$: Observable<IScene[]>;
  public currentAction$: Observable<MediaPlayerActionType>;

  constructor() {
    this._sceneSubject = new Subject<IScene[]>();
    this._currentActionSubject = new Subject<MediaPlayerActionType>();

    this.scenes$ = this._sceneSubject.asObservable();
    this.currentAction$ = this._currentActionSubject.asObservable();
  }

  public setScenes(scenes: IScene[]): void {
    this._sceneSubject.next(scenes);
  }

  public play(): void {
    this._currentActionSubject.next(MediaPlayerActionType.PLAY);
  }

  public pause(): void {
    this._currentActionSubject.next(MediaPlayerActionType.PAUSE);
  }
}
