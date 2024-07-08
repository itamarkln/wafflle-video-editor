import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-cursor',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './timeline-cursor.component.html',
  styleUrl: './timeline-cursor.component.scss'
})
export class TimelineCursorComponent implements OnInit, OnDestroy {
  currentTime: number;
  currentPosition: number;
  subscriptions: Subscription[];
  @Input() timelineWidth!: number;

  constructor(private timelineService: TimelineService, private previewService: ScenePreviewService) {
    this.currentTime = this.timelineService.currentTimeValue;
    this.currentPosition = 0;
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.previewService.currentTime$.subscribe(time => {
        this.currentTime = time;
        this.calculateCursorPosition();
      })
    );
  }

  calculateCursorPosition() {
    const pixelsPerSecond = this.timelineService.getPixelsPerSecond(this.timelineWidth);
    const halfPixelsPerSecond = pixelsPerSecond / 2;
    const calculatedPosition = this.currentTime * pixelsPerSecond - halfPixelsPerSecond;
    calculatedPosition > 0 && (this.currentPosition = calculatedPosition);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
