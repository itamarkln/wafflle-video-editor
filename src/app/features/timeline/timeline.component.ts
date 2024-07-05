import { Component, OutputEmitterRef, output } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { TimelineControlsComponent } from './components/timeline-controls/timeline-controls.component';
import { TimelineCursorComponent } from './components/timeline-cursor/timeline-cursor.component';
import { TimelineRulerComponent } from './components/timeline-ruler/timeline-ruler.component';
import { TimelineTrackComponent } from './components/timeline-track/timeline-track.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
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

  public onTimelinePlay: OutputEmitterRef<IScene[]> = output<IScene[]>();
  public onTimelinePause: OutputEmitterRef<IScene[]> = output<IScene[]>();

  constructor() {
    this.timelineTracks = [];
    this.currentTime = 0;
  }

  handleTracksUpdated(currentTracks: IScene[]) {
    this.timelineTracks = currentTracks;
  }
}
