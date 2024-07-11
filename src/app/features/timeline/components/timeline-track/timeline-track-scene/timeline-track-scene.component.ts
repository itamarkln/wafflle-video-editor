import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit, OutputEmitterRef, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { IScene } from '@shared/entities/scene/scene.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-track-scene',
  standalone: true,
  imports: [DragDropModule, MatButtonModule, MatIconModule],
  templateUrl: './timeline-track-scene.component.html',
  styleUrl: './timeline-track-scene.component.scss'
})
export class TimelineTrackSceneComponent implements OnInit, OnDestroy {
  trackSceneWidth: number;
  trackSceneLeftOffset: number;
  subscriptions: Subscription[];

  @Input() scene!: IScene;
  @Input() timelineWidth!: number;

  removeTrackScene: OutputEmitterRef<IScene> = output<IScene>();

  constructor(private timelineService: TimelineService) {
    this.trackSceneWidth = 0;
    this.trackSceneLeftOffset = 0;
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.timelineService.totalDuration$.subscribe(totalDuration => {
        this.calculateSceneWidth();
      })
    );
  }

  handleRemoveTrackScene() {
    this.removeTrackScene.emit(this.scene);
  }

  //#region track sources ui calculations
  calculateSceneWidth() {
    const pixelsPerSecond = this.timelineService.getPixelsPerSecond(this.timelineWidth);
    const halfPixelsPerSecond = pixelsPerSecond / 2;
    this.trackSceneWidth = this.scene.durationInS * pixelsPerSecond - halfPixelsPerSecond;
  }
  //#endregion

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
