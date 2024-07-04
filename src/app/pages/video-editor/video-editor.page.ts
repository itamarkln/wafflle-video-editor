import { Component } from '@angular/core';
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

  constructor() {
    this.scenesToPreview = [];
  }
}
