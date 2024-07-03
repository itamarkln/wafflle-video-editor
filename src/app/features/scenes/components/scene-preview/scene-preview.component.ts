import { Component, Input } from '@angular/core';
import { IScene } from '../scene/interfaces/scene.interface';

@Component({
  selector: 'app-scene-preview',
  standalone: true,
  imports: [],
  templateUrl: './scene-preview.component.html',
  styleUrl: './scene-preview.component.scss'
})
export class ScenePreviewComponent {
  @Input() scene?: IScene;
}
