import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OutputEmitterRef, WritableSignal, output, signal } from '@angular/core';
import { IScene } from '@app/features/scenes/components/scene/interfaces/scene.interface';

@Component({
  selector: 'app-timeline-track',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './timeline-track.component.html',
  styleUrl: './timeline-track.component.scss'
})
export class TimelineTrackComponent {
  tracks: WritableSignal<IScene[]>;
  onTracksUpdated: OutputEmitterRef<IScene[]> = output<IScene[]>();

  constructor() {
    this.tracks = signal([]);
  }

  //#region track drag & drop
  dropped(event: CdkDragDrop<IScene[]>) {
    this.handleTrackDropped(event);
    this.handleTracksRearrangement(event);
    this.onTracksUpdated.emit(this.tracks());
  }

  handleTrackDropped(event: CdkDragDrop<IScene[]>) {
    if (event.previousContainer !== event.container) {
      const droppedScene = event.previousContainer.data.find((_, index) => index === event.previousIndex);
      droppedScene && this.tracks.set([...this.tracks(), droppedScene]);
    }
  }

  handleTracksRearrangement(event: CdkDragDrop<IScene[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tracks(), event.previousIndex, event.currentIndex);
    }
  }
  //#endregion

  //#region tracks ui calculations
  calculateTrackWidth(track: IScene): number {
    return track.duration * 10;
  }

  calculateTrackLeftOffset(trackIndex: number): number {
    return this.tracks().reduce((offset: number, track: IScene, index: number) => {
      if (trackIndex < index) {
        offset += track.duration * 10;
      }
      return offset
    }, 0);
  }
  //#endregion
}
