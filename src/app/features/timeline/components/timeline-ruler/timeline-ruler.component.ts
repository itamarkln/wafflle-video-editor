import { Component, InputSignal, Signal, computed, input } from '@angular/core';
import { ITrack } from '@shared/entities/track/track.interface';

@Component({
  selector: 'app-timeline-ruler',
  standalone: true,
  imports: [],
  templateUrl: './timeline-ruler.component.html',
  styleUrl: './timeline-ruler.component.scss'
})
export class TimelineRulerComponent {
  ticks: Signal<number[]>;
  timelineTracks: InputSignal<ITrack[]> = input.required<ITrack[]>();

  constructor() {
    this.ticks = computed(() => this.handleTicksComputed());
  }

  handleTicksComputed(): number[] {
    // the ruler ticks should be according to the track with the maximum total duration
    const totalDurationInS = this.timelineTracks().reduce((maxDurationInS, track) => {
      const trackDurationInS = track.scenes.reduce((durationInS, scene) => durationInS + scene.durationInS, 0);
      return Math.max(maxDurationInS, trackDurationInS);
    }, 0)
    return Array(totalDurationInS);
  }
}
