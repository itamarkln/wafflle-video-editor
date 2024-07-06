import { Component, InputSignal, OnDestroy, OnInit, Signal, WritableSignal, computed, input, signal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { ITrack } from '@shared/entities/track/track.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-ruler',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './timeline-ruler.component.html',
  styleUrl: './timeline-ruler.component.scss'
})
export class TimelineRulerComponent implements OnInit, OnDestroy {
  ticks: Signal<number[]>;
  totalDurationInS: WritableSignal<number>;
  timelineTracks: InputSignal<ITrack[]> = input.required<ITrack[]>();

  subscriptions: Subscription[];

  constructor(private timelineService: TimelineService) {
    this.totalDurationInS = signal(this.timelineService.timelineTotalDuration);
    this.ticks = computed(() => Array(this.totalDurationInS()));

    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.timelineService.totalDuration$.subscribe(totalDuration => {
        this.totalDurationInS.set(totalDuration);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
