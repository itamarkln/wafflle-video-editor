import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-controls',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './timeline-controls.component.html',
  styleUrl: './timeline-controls.component.scss'
})
export class TimelineControlsComponent implements OnInit, OnDestroy {
  currentTime: number;
  isPlaying: boolean;

  subscriptions: Subscription[];

  constructor(private timelineService: TimelineService) {
    this.isPlaying = this.timelineService.isPlayingValue;
    this.currentTime = this.timelineService.currentTimeValue;
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.timelineService.currentTime$.subscribe(time => {
        this.currentTime = time;
      }),
      this.timelineService.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = isPlaying;
      })
    );
  }

  play() {
    this.timelineService.start();
  }

  pause() {
    this.timelineService.pause();
  }

  reset() {
    this.timelineService.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
