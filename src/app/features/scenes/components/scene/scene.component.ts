import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, InputSignal, OnInit, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IScene } from '@app/shared/entities/scene/scene.interface';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, CdkDrag, CdkDragHandle],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss'
})
export class SceneComponent implements OnInit {
  @Input() scene!: IScene;
  @Input() isPlaying!: boolean;

  play: OutputEmitterRef<void> = output<void>();
  pause: OutputEmitterRef<void> = output<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onPlay() {
    this.play.emit();
  }

  onPause() {
    this.pause.emit();
  }
}
