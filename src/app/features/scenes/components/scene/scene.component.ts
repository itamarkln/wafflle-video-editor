import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, InputSignal, OnInit, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
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
export class SceneComponent implements OnInit {
  totalDurationInS: number;

  @Input() scene!: IScene;
  @Input() isPlaying!: boolean;

  play: OutputEmitterRef<void> = output<void>();
  pause: OutputEmitterRef<void> = output<void>();

  constructor() {
    this.totalDurationInS = 0;
  }

  ngOnInit(): void {
    this._setTotalDuration();
  }

  private _setTotalDuration() {
    this.totalDurationInS = this.scene.sources.reduce((acc, source) => acc + source.durationInS, 0);
  }

  onPlay() {
    this.play.emit();
  }

  onPause() {
    this.pause.emit();
  }
}
