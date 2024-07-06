import { Component, InputSignal, Signal, computed, input } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ISceneSource } from '@shared/entities/scene/scene-source.interface';

@Component({
  selector: 'app-timeline-ruler',
  standalone: true,
  imports: [],
  templateUrl: './timeline-ruler.component.html',
  styleUrl: './timeline-ruler.component.scss'
})
export class TimelineRulerComponent {
  ticks: Signal<number[]>;
  timelineTracks: InputSignal<IScene[]> = input.required<IScene[]>();

  constructor() {
    this.ticks = computed(() => this.handleTicksComputed());
  }

  handleTicksComputed(): number[] {
    // the ruler ticks should be according to the track with the maximum total duration
    const totalDurationInS = this.timelineTracks().reduce((maxDurationInS, track) => {
      const trackDurationInS = track.sources.reduce((durationInS, source) => durationInS + source.durationInS, 0);
      return Math.max(maxDurationInS, trackDurationInS);
    }, 0)
    return Array(totalDurationInS);
  }
}
