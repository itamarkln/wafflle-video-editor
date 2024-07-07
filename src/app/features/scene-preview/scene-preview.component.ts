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
  private _previewSubscription: Subscription | null;
  private _actionSubscription: Subscription | null;

  private _currentPreview: IScene[];

  @ViewChild(VjsPlayerComponent, { static: true }) private _vjsPlayer!: VjsPlayerComponent;

  constructor(private scenePreviewService: ScenePreviewService) {
    this._previewSubscription = null;
    this._actionSubscription = null;
    this._currentPreview = [];
  }

  ngOnInit(): void {
    this.subscribeToCurrentPreview();
    this.subscribeToCurrentAction();
  }

  subscribeToCurrentPreview() {
    this._previewSubscription = this.scenePreviewService.preview$.subscribe((scenes: IScene[]) => {
      this._currentPreview = scenes;
      this.scenePreviewService.load();
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
        case MediaPlayerActionType.LOAD:
          const source = this._convertToPlayerSource(this._currentPreview);
          this._vjsPlayer.load(source);
          break;
        default:
          console.error('Unrecognized action');
          break;
      }
    });
  }

  private _convertToPlayerSource(scenes: IScene[]) {
    return scenes.map(scene => ({
      src: `${scene.url}?fm=hls`,
      type: 'application/x-mpegURL'
    }));
  }

  handleOnPlay() {
    console.log('played');
  }

  handleOnPause() {
    console.log('paused');
  }

  handleOnEnd() {
    console.log('ended');
  }

  ngOnDestroy() {
    this._vjsPlayer.dispose();
    this._previewSubscription?.unsubscribe();
    this._actionSubscription?.unsubscribe();
  }
}
