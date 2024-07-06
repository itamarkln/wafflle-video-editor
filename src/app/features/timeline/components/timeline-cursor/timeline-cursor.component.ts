import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
  currentPosition: number;
  subscriptions: Subscription[];
  @Input() timelineWidth!: number;

  constructor(private timelineService: TimelineService) {
    this.currentPosition = 0;
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.timelineService.currentTime$.subscribe(time => {
        this.calculateCursorPosition(time);
      })
    );
  }

  calculateCursorPosition(currentTime: number) {
    const pixelsPerSecond = this.timelineService.getPixelsPerSecond(this.timelineWidth);
    this.currentPosition = currentTime * pixelsPerSecond;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
