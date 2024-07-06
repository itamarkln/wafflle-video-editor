import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, InputSignal, OutputEmitterRef, Signal, WritableSignal, computed, input, output, signal } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ISceneSource } from '@shared/entities/scene/scene-source.interface';

@Component({
  selector: 'app-timeline-track',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './timeline-track.component.html',
  styleUrl: './timeline-track.component.scss'
})
export class TimelineTrackComponent {
  @Input() track!: IScene;
  onTrackUpdated: OutputEmitterRef<IScene> = output<IScene>();

  constructor() {
  }

  //#region track drag & drop
  sceneDropped(event: CdkDragDrop<IScene>) {
    this.handleTrackSourcesDropped(event);
    this.handleTrackSourcesRearranged(event);
    this.onTrackUpdated.emit(this.track);
  }

  handleTrackSourcesDropped(event: CdkDragDrop<IScene>) {
    if (event.previousContainer !== event.container) {
      const droppedSceneSources = event.previousContainer.data.sources;
      [...this.track.sources, ...droppedSceneSources]; // adding at the end of the array
      this.track.sources.splice(event.currentIndex, 0, ...droppedSceneSources);
    }
  }

  handleTrackSourcesRearranged(event: CdkDragDrop<IScene>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.track.sources, event.previousIndex, event.currentIndex);
    }
  }
  //#endregion

  //#region track sources ui calculations
  calculateTrackSourceWidth(source: ISceneSource): number {
    return source.durationInS * 10;
  }

  calculateTrackSourceLeftOffset(sourceIndex: number): number {
    return this.track.sources.reduce((offset: number, source: ISceneSource, index: number) => {
      if (sourceIndex < index) {
        offset += source.durationInS * 10;
      }
      return offset
    }, 0);
  }
  //#endregion
}
