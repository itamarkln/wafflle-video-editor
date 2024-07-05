import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VjsMediaPlayer } from '@app/shared/entities/media-player/vjs-media-player.entity';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.component.html',
  styleUrl: './vjs-player.component.scss'
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  private _player!: VjsMediaPlayer;
  @ViewChild('target', { static: true }) public target!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this._player = new VjsMediaPlayer(this.target.nativeElement);
  }

  public get player(): VjsMediaPlayer {
    return this._player;
  }

  ngOnDestroy() {
    this._player.dispose();
  }
}
