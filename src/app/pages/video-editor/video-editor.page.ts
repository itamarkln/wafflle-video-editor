import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScenePreviewComponent } from '@app/features/scenes/components/scene-preview/scene-preview.component';
import { ScenesComponent } from '@app/features/scenes/scenes.component';
import { TimelineComponent } from '@app/features/timeline/timeline.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  scenesToPreview: IScene[];
  @ViewChild(ScenePreviewComponent) scenePreviewEl!: ScenePreviewComponent;

  constructor() {
    this.scenesToPreview = [];
  }

  handleScenePlay(scene: IScene) {
    this.scenesToPreview = [scene];
    this.scenePreviewEl.play([scene]);
  }

  handleScenePause(scene: IScene) {
    // scene pause validation is being checked inside Scenes.Component
    this.scenePreviewEl.pause();
  }

  handleTimelinePlay(tracks: IScene[]) {
    this.scenesToPreview = tracks;
    this.scenePreviewEl.play(tracks);
  }

  handleTimelinePause(tracks: IScene[]) {
    this.scenePreviewEl.pause();
  }
}
