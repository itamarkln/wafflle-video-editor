import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OutputEmitterRef, output } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ISceneSource } from '@shared/entities/scene/scene-source.interface';
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
  timelineTracks: IScene[];
  currentTime: number;

  public onTimelinePlay: OutputEmitterRef<IScene> = output<IScene>();
  public onTimelinePause: OutputEmitterRef<IScene> = output<IScene>();

  constructor() {
    this.timelineTracks = [];
    this.currentTime = 0;
  }

  //#region timeline drag & drop
  sceneDropped(event: CdkDragDrop<IScene> | any) {
    if (this.timelineTracks.length === 0) {
      const sceneSources = event.previousContainer.data.sources;
      const newTrack = this.createTrack(sceneSources);
      this.timelineTracks.push(newTrack);
    }
    // TODO: handle multiple tracks here
  }
  //#endregion

  createTrack(sources: ISceneSource[] = []): IScene {
    const trackId = uuid();
    return {
      id: trackId,
      title: `track#${trackId}`,
      sources
    };
  }

  handleTrackUpdated(updatedTrack: IScene) {
    this.timelineTracks = [updatedTrack];
  }
}
