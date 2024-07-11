import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit, OutputEmitterRef, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, CdkDrag, CdkDragHandle],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss'
})
export class SceneComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];


  @Input() scene!: IScene;
  @Input() isPlaying!: boolean;

  play: OutputEmitterRef<void> = output<void>();
  pause: OutputEmitterRef<void> = output<void>();

  constructor(private previewService: ScenePreviewService) {
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(
    );
  }

  onPlay() {
    this.play.emit();
  }

  onPause() {
    this.pause.emit();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
