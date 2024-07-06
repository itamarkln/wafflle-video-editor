import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScenePreviewComponent } from '@app/features/scene-preview/scene-preview.component';
import { ScenesComponent } from '@app/features/scenes/scenes.component';
import { TimelineComponent } from '@app/features/timeline/timeline.component';
import { IScene } from '@app/shared/entities/scene/scene.interface';

@Component({
  selector: 'app-video-editor',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ScenesComponent,
    ScenePreviewComponent,
    TimelineComponent
  ],
  templateUrl: './video-editor.page.html',
  styleUrl: './video-editor.page.scss'
})
export class VideoEditorPageComponent {
  sceneToPreview?: IScene;
  @ViewChild(ScenePreviewComponent) scenePreviewEl!: ScenePreviewComponent;

  constructor() {
    this.sceneToPreview = undefined;
  }

  handleScenePlay(scene: IScene) {
    this.sceneToPreview = scene;
    this.scenePreviewEl.play(scene);
  }

  handleScenePause(scene: IScene) {
    this.scenePreviewEl.pause(scene);
  }
}
