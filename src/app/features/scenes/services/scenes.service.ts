import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IScene } from '../components/scene/interfaces/scene.interface';
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
    return of(this._scenes);
  }
}
