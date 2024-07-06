import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OutputEmitterRef, WritableSignal, output, signal } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ITrack } from '@shared/entities/track/track.interface';
import { v4 as uuid } from 'uuid';
import { TimelineControlsComponent } from './components/timeline-controls/timeline-controls.component';
import { TimelineCursorComponent } from './components/timeline-cursor/timeline-cursor.component';
import { TimelineRulerComponent } from './components/timeline-ruler/timeline-ruler.component';
import { TimelineTrackComponent } from './components/timeline-track/timeline-track.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    DragDropModule,
    TimelineControlsComponent,
    TimelineRulerComponent,
    TimelineTrackComponent,
    TimelineCursorComponent
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  isPlaying: boolean;
  currentTime: number;
  timelineTracks: WritableSignal<ITrack[]>;

  public onTimelinePlay: OutputEmitterRef<ITrack> = output<ITrack>();
  public onTimelinePause: OutputEmitterRef<ITrack> = output<ITrack>();

  constructor() {
    this.isPlaying = false;
    this.currentTime = 0;
    this.timelineTracks = signal<ITrack[]>([]);
  }

  //#region timeline drag & drop
  sceneDropped(event: CdkDragDrop<IScene[]>) {
    if (this.timelineTracks().length === 0) {
      const droppedScene = event.previousContainer.data[event.previousIndex];
      const newTrack = this.createTrack(droppedScene);
      this.timelineTracks.update(tracks => [...tracks, newTrack]);
    }
    // TODO: handle multiple tracks here
  }
  //#endregion

  createTrack(scene: IScene): ITrack {
    const trackId = uuid();
    return {
      id: trackId,
      title: `track#${trackId}`,
      scenes: [scene]
    };
  }

  handleTrackUpdated(updatedTrack: ITrack) {
    this.timelineTracks.set([updatedTrack]);
  }
}
