import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { Subscription } from 'rxjs';

import { IPreview } from '@features/scene-preview/interface/preview.entity';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { SceneComponent } from './components/scene/scene.component';
import { ScenesService } from './services/scenes.service';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [DragDropModule, SceneComponent],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.scss'
})
export class ScenesComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];

  private _currentPreview?: IPreview;

  public scenes: IScene[];
  public playingSceneId?: string;

  constructor(private scenesService: ScenesService, private previewService: ScenePreviewService) {
    this._subscriptions = [];

    this._currentPreview = undefined;

    this.scenes = [];
    this.playingSceneId = "";
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this.scenesService.getScenes().subscribe((scenes: IScene[]) => {
        this.scenes = scenes;
      }),
      this.previewService.preview$.subscribe(preview => {
        this._currentPreview = preview;
      }),
      this.previewService.isPlaying$.subscribe(isPlaying => {
          this.playingSceneId = isPlaying ? this._currentPreview?.id : undefined;
      })
    );
  }

  handleScenePlay(scene: IScene) {
    this.previewService.load({ id: scene.id, scenes: [scene] });
    this.previewService.play();
  }

  handleScenePause(scene: IScene) {
      this.previewService.pause();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
