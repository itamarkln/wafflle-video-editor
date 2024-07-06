import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VjsPlayerComponent } from '@app/shared/components/vjs-player/vjs-player.component';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { MediaPlayerActionType } from '@shared/entities/media-player/actions/media-player-actions.enum';
import { Subscription } from 'rxjs';
import { ScenePreviewService } from './services/scene-preview.service';
import { differenceWith, isEqual, isEmpty } from "lodash";
@Component({
  selector: 'app-scene-preview',
  standalone: true,
  imports: [VjsPlayerComponent],
  templateUrl: './scene-preview.component.html',
  styleUrl: './scene-preview.component.scss'
})
export class ScenePreviewComponent implements OnInit, OnDestroy {
  private _scenesSubscription: Subscription | null;
  private _actionSubscription: Subscription | null;

  private _currentPreview: IScene[];

  @ViewChild(VjsPlayerComponent, { static: true }) private _vjsPlayer!: VjsPlayerComponent;

  constructor(private scenePreviewService: ScenePreviewService) {
    this._scenesSubscription = null;
    this._actionSubscription = null;
    this._currentPreview = [];
  }

  ngOnInit(): void {
    this.subscribeToCurrentScenes();
    this.subscribeToCurrentAction();
  }

  subscribeToCurrentScenes() {
    this._scenesSubscription = this.scenePreviewService.scenes$.subscribe((scenes: IScene[]) => {
      this._currentPreview = scenes;
      const source = this._convertToPlayerSource(scenes);
      this._vjsPlayer.load(source);
    });
  }

  subscribeToCurrentAction() {
    this._actionSubscription = this.scenePreviewService.currentAction$.subscribe((action: MediaPlayerActionType) => {
      switch (action) {
        case MediaPlayerActionType.PLAY:
          this._vjsPlayer.play();
          break;
        case MediaPlayerActionType.PAUSE:
          this._vjsPlayer.pause();
          break;
        default:
          console.error('Unrecognized action');
          break;
      }
    });
  }

  private _isPreviewChanged(scenes: IScene[]): boolean {
    return isEmpty(differenceWith(this._currentPreview, scenes, isEqual));
  }

  private _convertToPlayerSource(scenes: IScene[]) {
    return scenes.map(scene => ({
      src: `${scene.url}?fm=hls`,
      type: 'application/x-mpegURL'
    }));
  }

  play() {
    this._vjsPlayer.play();
  }

  pause(scene?: IScene) {
    this._vjsPlayer.pause();
  }

  ngOnDestroy() {
    this._vjsPlayer.dispose();
    this._scenesSubscription?.unsubscribe();
    this._actionSubscription?.unsubscribe();
  }
}
