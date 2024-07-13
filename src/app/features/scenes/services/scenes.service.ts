import { Injectable } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import SCENES from '../data/scenes.data.json';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {
  private _scenes: IScene[];

  constructor() {
    this._scenes = SCENES;
  }

  public getScenes(): Observable<IScene[]> {
    // generate unique scenes ids
    return of(this._scenes)
      .pipe(map((scenes: IScene[]) => {
        return scenes.map((scene: IScene) => ({ ...scene, id: uuid() }))
      }));
  }
}
