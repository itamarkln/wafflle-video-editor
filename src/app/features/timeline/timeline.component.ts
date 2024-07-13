import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { ITrack } from '@shared/entities/track/track.interface';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { TimelineControlsComponent } from './components/timeline-controls/timeline-controls.component';
import { TimelineCursorComponent } from './components/timeline-cursor/timeline-cursor.component';
import { TimelineRulerComponent } from './components/timeline-ruler/timeline-ruler.component';
import { TimelineTrackComponent } from './components/timeline-track/timeline-track.component';
import { TimelineService } from './services/timeline.service';

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
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  timelineWidth: number;
  timelineTracks: ITrack[];

  subscriptions: Subscription[];

  @ViewChild('timeline') timelineEl!: ElementRef;

  constructor(private timelineService: TimelineService, private previewService: ScenePreviewService) {
    this.timelineWidth = 0;
    this.timelineTracks = [];

    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.timelineService.tracks$.subscribe(tracks => {
        this.timelineTracks = tracks;
      })
    );
  }

  ngAfterViewInit(): void {
    this.calculateTimelineWidth();
  }

  //#region timeline drag & drop
  sceneDropped(event: CdkDragDrop<IScene[]>) {
    const droppedScene = event.previousContainer.data[event.previousIndex];
    const currTracks = this.timelineService.currentTracksValue;

    if (currTracks.length === 0) {
      const newTrack = this.createTrack(droppedScene);
      this.timelineService.setTracks([...currTracks, newTrack]);
      this.previewService.load({ id: newTrack.id, scenes: newTrack.scenes });
    }
    // TODO: handle multiple tracks here
  }
  //#endregion

  createTrack(scene?: IScene): ITrack {
    const trackId = uuid();
    return {
      id: trackId,
      title: `track#${trackId}`,
      scenes: scene ? [scene] : []
    };
  }

  handleTrackUpdated(updatedTrack: ITrack) {
    let updatedTracks = [...this.timelineTracks];
    const trackIndex = updatedTracks.findIndex(track => track.id === updatedTrack.id);
    if (trackIndex !== -1) {
      if (updatedTrack.scenes.length > 0) {
        updatedTracks.splice(trackIndex, 1, updatedTrack);
        this.previewService.load({ id: uuid(), scenes: updatedTrack.scenes });
      } else {
        updatedTracks = [];
      }
    }
    this.timelineService.setTracks(updatedTracks);
  }

  //#region timeline controls actions
  handleTimelinePlay() {
    // TODO: enable playing all tracks together, now pick the first one
    if (this.timelineTracks.length > 0) {
      const track = this.timelineTracks[0];
      this.previewService.load({ id: track.id, scenes: track.scenes });
      this.previewService.play();
    }
  }

  handleTimelinePause() {
    this.previewService.pause();
  }

  handleTimelineReset() {
    this.previewService.pause();
    this.timelineService.reset();
  }
  //#endregion

  //#region ui related
  calculateTimelineWidth() {
    this.timelineWidth = this.timelineEl.nativeElement.clientWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateTimelineWidth();
  }
  //#endregion

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
