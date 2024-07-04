import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-scene-preview',
  standalone: true,
  imports: [],
  templateUrl: './scene-preview.component.html',
  styleUrl: './scene-preview.component.scss'
})
export class ScenePreviewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public scenes!: IScene[];
  @Input() public isPlaying: boolean;
  public player?: Player;

  constructor() {
    this.scenes = [];
    this.isPlaying = false;
  }

  ngOnInit() {
    // this._initVideoJsPlayer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.scenes && this.player) {
      this._updateVideoJsPlayerPlaylist();
    }
  }

  private _initVideoJsPlayer() {
    this.player = videojs('video-player', {
      sources: [{
        src: this.scenes.map(scene => scene.url),
        controls: true,
        autoplay: false,
        type: 'video/mp4'
      }]
    });
  }

  private _updateVideoJsPlayerPlaylist() {
    if (this.player) {
      const playlist = this.scenes.map(scene => ({
        src: scene.url,
        type: 'video/mp4'
      }));

      // Use videojs-concat plugin to play videos sequentially
      (this.player as any).concat(playlist);
    }
  }

  play() {
    if (this.player) {
      this.player.play();
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
