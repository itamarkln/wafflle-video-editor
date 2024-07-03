import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, InputSignal, Signal, computed, input } from '@angular/core';
import { IScene } from '../scenes/components/scene/interfaces/scene.interface';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  scenes: InputSignal<IScene[]> = input<IScene[]>([]);
  timelineScenes: Signal<IScene[]>;
  ticks: Signal<number[]>;

  constructor() {
    this.timelineScenes = computed(() => this.scenes());
    this.ticks = computed(() => {
      const totalDurationInS = this.timelineScenes().reduce((acc: number, scene: IScene) => acc + scene.duration, 0);
      return Array(totalDurationInS);
    });
  }

  dropped(event: CdkDragDrop<IScene[]>) {
    const droppedScene = event.previousContainer.data.find((_, index) => index === event.previousIndex);
    droppedScene && this.timelineScenes().push(droppedScene);

    // const currTimelineScenes = event.container.data;
    console.log(droppedScene, this.timelineScenes());
  }
}
