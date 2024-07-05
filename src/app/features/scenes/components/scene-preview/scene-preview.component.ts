import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { VjsPlayerComponent } from '@app/shared/components/vjs-player/vjs-player.component';
import { IScene } from '@app/shared/entities/scene/scene.interface';

@Component({
  selector: 'app-scene-preview',
  standalone: true,
  imports: [VjsPlayerComponent],
  templateUrl: './scene-preview.component.html',
  styleUrl: './scene-preview.component.scss'
})
export class ScenePreviewComponent implements OnDestroy {
  @Input() public scenes!: IScene[];
  @ViewChild(VjsPlayerComponent, { static: true }) private _vjsPlayer!: VjsPlayerComponent;

  constructor() { }

  private _convertToPlayerSource(scenes: IScene[]) {
    return scenes.map(scene => ({
      src: `${scene.url}?fm=hls`,
      type: 'application/x-mpegURL'
    }));
  }

  play(scenes: IScene[]) {
    this._vjsPlayer.player.init();

    const source = this._convertToPlayerSource(scenes);
    this._vjsPlayer.player.load(source);

    this._vjsPlayer.player.play();
  }

  pause() {
    this._vjsPlayer.player.pause();
  }

  ngOnDestroy() {
    this._vjsPlayer.player.dispose();
  }
}
