import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, OutputEmitterRef, ViewChild, output } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { ITrack } from '@shared/entities/track/track.interface';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { TimelineControlsComponent } from './components/timeline-controls/timeline-controls.component';
import { TimelineCursorComponent } from './components/timeline-cursor/timeline-cursor.component';
import { TimelineRulerComponent } from './components/timeline-ruler/timeline-ruler.component';
import { TimelineTrackComponent } from './components/timeline-track/timeline-track.component';
import { TimelineService } from './services/timeline.service';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';

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
      this.timelineService.setTracks([...this.timelineService.currentTracksValue, newTrack]);
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
    const updatedTracks = [...this.timelineTracks];
    const trackIndex = updatedTracks.findIndex(track => track.id === updatedTrack.id);
    if (trackIndex !== -1) {
      updatedTracks.splice(trackIndex, 1, updatedTrack);
    }
    this.timelineService.setTracks(updatedTracks);
  }

  //#region timeline controls actions
  handleTimelinePlay() {
    // TODO: enable playing all tracks together, now pick the first one
    this.previewService.preview(this.timelineTracks[0].scenes);
    this.timelineService.start();
  }

  handleTimelinePause() {
    this.previewService.stopPreview();
    this.timelineService.pause();
  }

  handleTimelineReset() {
    this.previewService.stopPreview();
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
