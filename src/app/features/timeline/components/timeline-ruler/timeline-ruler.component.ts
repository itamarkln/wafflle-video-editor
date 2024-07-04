import { Component, InputSignal, Signal, computed, input } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';

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
    const totalDurationInS = this.timelineTracks().reduce((acc: number, scene: IScene) => acc + scene.duration, 0);
    return Array(totalDurationInS);
  }
}
