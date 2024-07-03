import { Component } from '@angular/core';
import { SceneComponent } from './components/scene/scene.component';
import { ScenePreviewComponent } from './components/scene-preview/scene-preview.component';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [SceneComponent, ScenePreviewComponent],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.scss'
})
export class ScenesComponent {

}
