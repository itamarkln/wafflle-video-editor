import { Component, ElementRef, OnDestroy, OnInit, OutputEmitterRef, ViewChild, output } from '@angular/core';
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

  public onPlay: OutputEmitterRef<void> = output<void>();
  public onPause: OutputEmitterRef<void> = output<void>();
  public onEnd: OutputEmitterRef<void> = output<void>();

  @ViewChild('target', { static: true }) private _target!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this._player = new VjsMediaPlayer();
    this.init();

    this._player.onPlay(() => this.onPlay.emit());
    this._player.onPause(() => this.onPause.emit());
    this._player.onEnded(() => this.onEnd.emit());
  }

  //#region actions
  public init(options?: VideoJsPlayerOptions): void {
    this._player?.init(this._target.nativeElement, options);
  }

  public load(source: videojs.Tech.SourceObject[]): void {
    this._player?.load(source);
  }

  public play(): void {
    this._player?.play();
  }

  public pause(): void {
    this._player?.pause();
  }

  public dispose(): void {
    this._player?.dispose();
  }
  //#endregion

  ngOnDestroy() {
    this.dispose();
  }
}
