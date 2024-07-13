import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-ruler',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSliderModule],
  templateUrl: './timeline-ruler.component.html',
  styleUrl: './timeline-ruler.component.scss'
})
export class TimelineRulerComponent implements OnInit, OnDestroy {
  ticks: number[];

  currentTime: number;
  startTime: number;
  endTime: number;

  sliderStepValue: number;

  subscriptions: Subscription[];

  constructor(private timelineService: TimelineService, private previewService: ScenePreviewService) {
    this.ticks = [];

    this.currentTime = 0;
    this.startTime = 0;
    this.endTime = this.timelineService.timelineTotalDurationValue;

    this.sliderStepValue = 0.01;

    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.previewService.currentTime$.subscribe(time => {
        this.currentTime = time;
      }),
      this.timelineService.totalDuration$.subscribe(totalDuration => {
        this.ticks = Array(totalDuration);
        this.endTime = totalDuration;
      })
    );
  }

  onSliderChange(event: Event) {
    this.previewService.pause();
    this.previewService.seek(this.currentTime);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
