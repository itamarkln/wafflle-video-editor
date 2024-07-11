import { Component, ElementRef, OnDestroy, OnInit, OutputEmitterRef, ViewChild, output } from '@angular/core';
import { VjsMediaPlayer } from '@app/shared/entities/media-player/vjs-media-player.entity';
import { Playlist } from '@shared/entities/media-player/interfaces/playlist.interface';

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

  public onPlayed: OutputEmitterRef<void> = output<void>();
  public onPaused: OutputEmitterRef<void> = output<void>();
  public onEnded: OutputEmitterRef<void> = output<void>();
  public onTimeUpdated: OutputEmitterRef<number> = output<number>();

  @ViewChild('target', { static: true }) private _target!: ElementRef;

  constructor() {
    this._player = new VjsMediaPlayer();
  }

  ngOnInit(): void {
    this.init();
    // this._listenToEvent();
  }

  private _listenToEvent(): void {
    this._player.onPlayed(() => this.onPlayed.emit());
    this._player.onPaused(() => this.onPaused.emit());
    this._player.onEnded(() => this.onEnded.emit());
    this._player.onTimeUpdated((currentTime: number) => this.onTimeUpdated.emit(currentTime));
  }

  //#region actions
  public init(options?: VideoJsPlayerOptions): void {
    this._player?.init(this._target.nativeElement, options, () => {
      this._listenToEvent();
    });
  }

  public get currentTime(): number {
    return this._player?.currentTime || 0;
  }

  public setCurrentTime(time: number): void {
    this._player?.setCurrentTime(time);
  }

  public play(): void {
    this._player?.play();
  }

  public pause(): void {
    this._player?.pause();
  }

  public load(playlist: Playlist): void {
    this._player?.load(playlist);
  }

  public seek(time: number): void {
    this._player?.seek(time);
  }

  public reset(): void {
    this._player?.reset();
  }

  public dispose(): void {
    this._player?.dispose();
  }
  //#endregion

  ngOnDestroy() {
    this.dispose();
  }
}
