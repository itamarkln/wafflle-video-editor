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
  public onTimeUpdate: OutputEmitterRef<number> = output<number>();

  @ViewChild('target', { static: true }) private _target!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this._player = new VjsMediaPlayer();
    this.init();
    this._listenToEvent();
  }

  private _listenToEvent(): void {
    this._player.onPlay(() => this.onPlay.emit());
    this._player.onPause(() => this.onPause.emit());
    this._player.onEnded(() => this.onEnd.emit());
    this._player.onTimeUpdate((currentTime: number) => this.onTimeUpdate.emit(currentTime));
  }

  //#region actions
  public init(options?: VideoJsPlayerOptions): void {
    this._player?.init(this._target.nativeElement, options);
  }

  public async load(source: videojs.Tech.SourceObject[]): Promise<void> {
    this._player?.load(source[0].src);
    // if (source.length === 1) {
    //   this._player?.load(source[0].src);
    // } else {
    //   const concatenatedBlob = await this.concatenateFiles(source.map(s => s.src));
    //   this._player?.load(URL.createObjectURL(concatenatedBlob));
    // }
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
