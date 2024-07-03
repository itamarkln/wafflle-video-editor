import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, InputSignal, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IScene } from './interfaces/scene.interface';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, CdkDropList, CdkDrag],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss'
})
export class SceneComponent {
  scene: InputSignal<IScene> = input.required<IScene>();
}
