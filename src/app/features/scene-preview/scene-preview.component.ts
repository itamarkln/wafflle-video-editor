import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VjsPlayerComponent } from '@app/shared/components/vjs-player/vjs-player.component';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { Playlist, PlaylistItem } from '@shared/entities/media-player/interfaces/playlist.interface';
import { Subscription } from 'rxjs';
import { IPreview } from './interface/preview.entity';
import { ScenePreviewService } from './services/scene-preview.service';
@Component({
  selector: 'app-scene-preview',
  standalone: true,
  imports: [VjsPlayerComponent],
  templateUrl: './scene-preview.component.html',
  styleUrl: './scene-preview.component.scss'
})
export class ScenePreviewComponent implements OnInit, OnDestroy {
  private _currentPreview?: IPreview;
  private _subscriptions: Subscription[] = [];

  @ViewChild(VjsPlayerComponent, { static: true }) private _vjsPlayer?: VjsPlayerComponent;

  constructor(private scenePreviewService: ScenePreviewService) {
    this._currentPreview = undefined;
    this._subscriptions = [];
  }

  public get isPreview(): boolean {
    return !!this._currentPreview && this._currentPreview.scenes.length > 0;
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this.scenePreviewService.preview$.subscribe(preview => {
        this._currentPreview = preview;
      }),
      this.scenePreviewService.isPlaying$.subscribe(isPlaying => {
        if (isPlaying) {
          this.play();
        } else {
          this.pause();
        }
      }),
      this.scenePreviewService.load$.subscribe(preview => {
        this.load(preview);
      }),
      this.scenePreviewService.reset$.subscribe(() => {
        this.reset();
      }),
      this.scenePreviewService.seek$.subscribe(time => {
        this.seek(time);
      })
    );
  }

  //#region actions on preview
  private _convertToPlaylist(scenes: IScene[] = []): Playlist {
    const playlistItems = scenes.map(scene => (<PlaylistItem>{
      sources: [{ src: `${scene.url}`, type: 'video/mp4' }],
      duration: scene.durationInS
    }));

    return playlistItems;
  }

  load(preview: IPreview | null) {
    if (this._currentPreview?.id !== preview?.id) {
      const playlist = this._convertToPlaylist(preview?.scenes);
      this._vjsPlayer?.load(playlist);
    }
  }

  play() {
    this._vjsPlayer?.play();
  }

  pause() {
    this._vjsPlayer?.pause();
  }

  reset() {
    this._vjsPlayer?.reset();
  }

  seek(currentTime: number) {
    this._vjsPlayer?.seek(currentTime);
  }
  //#endregion

  //#region preview events
  handleOnPlayed() {
    console.log('played');
    this.scenePreviewService.play();
  }

  handleOnPaused() {
    console.log('paused');
    this.scenePreviewService.pause();
  }

  handleOnEnded() {
    console.log('ended');
    this.scenePreviewService.pause();
  }

  handleOnTimeUpdated(currentTime: number) {
    console.log('currentTime', currentTime);
    this.scenePreviewService.updateCurrentTime(currentTime);
  }
  //#endregion

  ngOnDestroy() {
    this._vjsPlayer?.dispose();
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
