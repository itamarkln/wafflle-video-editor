import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OutputEmitterRef, output } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ITrack } from '@shared/entities/track/track.interface';

@Component({
  selector: 'app-timeline-track',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './timeline-track.component.html',
  styleUrl: './timeline-track.component.scss'
})
export class TimelineTrackComponent {
  @Input() track!: ITrack;
  onTrackUpdated: OutputEmitterRef<ITrack> = output<ITrack>();

  constructor() {
  }

  //#region track drag & drop
  sceneDropped(event: CdkDragDrop<IScene[]>) {
    debugger
    this.handleTrackSourceDropped(event);
    this.handleTrackSourcesRearranged(event);
    this.onTrackUpdated.emit(this.track);
  }

  handleTrackSourceDropped(event: CdkDragDrop<IScene[]>) {
    if (event.previousContainer !== event.container) {
      const droppedScene = event.previousContainer.data[event.previousIndex];
      this.track.scenes.splice(event.currentIndex, 0, droppedScene);
    }
  }

  handleTrackSourcesRearranged(event: CdkDragDrop<IScene[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.track.scenes, event.previousIndex, event.currentIndex);
    }
  }
  //#endregion

  //#region track sources ui calculations
  calculateTrackSceneWidth(scene: IScene): number {
    return scene.durationInS * 10;
  }

  calculateTrackSceneLeftOffset(sourceIndex: number): number {
    return this.track.scenes.reduce((offset: number, scene: IScene, index: number) => {
      if (sourceIndex < index) {
        offset += scene.durationInS * 10;
      }
      return offset
    }, 0);
  }
  //#endregion
}
