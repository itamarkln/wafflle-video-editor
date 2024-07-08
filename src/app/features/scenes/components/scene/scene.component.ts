import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, InputSignal, OnDestroy, OnInit, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { MediaPlayerActionType } from '@shared/entities/media-player/actions/media-player-actions.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, CdkDrag, CdkDragHandle],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss'
})
export class SceneComponent implements OnInit, OnDestroy {
  private _actionSubscription: Subscription | null;

  @Input() scene!: IScene;
  @Input() isPlaying!: boolean;

  play: OutputEmitterRef<void> = output<void>();
  pause: OutputEmitterRef<void> = output<void>();

  constructor(private previewService: ScenePreviewService) {
    this._actionSubscription = null;
  }

  ngOnInit(): void {
    this._actionSubscription = this.previewService.currentAction$.subscribe(async (action: MediaPlayerActionType) => {
    });
  }

  onPlay() {
    this.play.emit();
  }

  onPause() {
    this.pause.emit();
  }

  ngOnDestroy(): void {
    this._actionSubscription?.unsubscribe();
  }
}
