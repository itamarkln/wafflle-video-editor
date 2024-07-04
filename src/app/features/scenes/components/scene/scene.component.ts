import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, InputSignal, OutputEmitterRef, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IScene } from '@app/shared/entities/scene/scene.interface';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, CdkDropList, CdkDrag],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss'
})
export class SceneComponent {
  @Input() public scene!: IScene;
  @Input() public isPlaying: boolean;
  public play: OutputEmitterRef<void> = output<void>();
  public pause: OutputEmitterRef<void> = output<void>();

  constructor() {
    this.isPlaying = false;
  }

  onPlay() {
    this.play.emit();
  }

  onPause() {
    this.pause.emit();
  }
}
