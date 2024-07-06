import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScenePreviewComponent } from '@app/features/scene-preview/scene-preview.component';
import { ScenesComponent } from '@app/features/scenes/scenes.component';
import { TimelineComponent } from '@app/features/timeline/timeline.component';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { ITrack } from '@shared/entities/track/track.interface';

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
  @ViewChild(ScenePreviewComponent) scenePreviewEl!: ScenePreviewComponent;

  constructor(private scenePreviewService: ScenePreviewService) { }

  handleScenePlay(scene: IScene) {
    this.scenePreviewService.setScenes([scene]);
    this.scenePreviewEl.play();
  }

  handleScenePause(scene: IScene) {
    this.scenePreviewEl.pause();
  }

  handleTimelinePlay(track: ITrack) {
    this.scenePreviewService.setScenes(track.scenes);
    this.scenePreviewEl.play();
  }

  handleTimelinePause(track: ITrack) {
    this.scenePreviewEl.pause();
  }
}
