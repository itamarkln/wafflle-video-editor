import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VjsMediaPlayer } from '@app/shared/entities/media-player/vjs-media-player.entity';
import videojs, { VideoJsPlayerOptions } from 'video.js';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.component.html',
  styleUrl: './vjs-player.component.scss'
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  private _player!: VjsMediaPlayer;
  @ViewChild('target', { static: true }) private _target!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this._player = new VjsMediaPlayer();
    this.init();
  }

  public init(options?: VideoJsPlayerOptions): void {
    this._player.init(this._target.nativeElement, options);
  }

  public load(source: videojs.Tech.SourceObject[]): void {
    this._player.load(source);
  }

  public play(): void {
    this._player.play();
  }

  public pause(): void {
    this._player.pause();
  }

  public dispose(): void {
    this._player.dispose();
  }

  ngOnDestroy() {
    this.dispose();
  }
}
