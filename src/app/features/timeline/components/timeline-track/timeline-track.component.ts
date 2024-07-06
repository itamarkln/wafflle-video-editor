import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit, OutputEmitterRef, ViewChild, output } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { TimelineComponent } from '@features/timeline/timeline.component';
import { ITrack } from '@shared/entities/track/track.interface';
import { Subscription } from 'rxjs';
import { TimelineTrackItemComponent } from './timeline-track-item/timeline-track-item.component';

@Component({
  selector: 'app-timeline-track',
  standalone: true,
  imports: [DragDropModule, TimelineTrackItemComponent],
  templateUrl: './timeline-track.component.html',
  styleUrl: './timeline-track.component.scss'
})
export class TimelineTrackComponent implements OnInit, OnDestroy {
  onTrackUpdated: OutputEmitterRef<ITrack> = output<ITrack>();
  subscriptions: Subscription[];

  @Input() track!: ITrack;
  @Input() timelineWidth!: number;
  @ViewChild(TimelineComponent) timelineEl!: TimelineComponent;

  constructor(private timelineService: TimelineService) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
  }

  //#region track drag & drop
  sceneDropped(event: CdkDragDrop<IScene[]>) {
    this.handleTrackSourceDropped(event);
    this.handleTrackSourcesRearranged(event);
    this.onTrackUpdated.emit(this.track);
  }

  handleTrackSourceDropped(event: CdkDragDrop<IScene[]>) {
    if (event.previousContainer !== event.container) {
      const droppedScene = event.previousContainer.data[event.previousIndex];
      this.track.scenes.push(droppedScene);
      // TODO: place the new scene in the correct position in it's track
      // this.track.scenes.splice(event.currentIndex, 0, droppedScene);
    }
  }

  handleTrackSourcesRearranged(event: CdkDragDrop<IScene[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.track.scenes, event.previousIndex, event.currentIndex);
    }
  }
  //#endregion

  handleRemoveTrackScene(scene: IScene) {
    // remove scene from current track
    const sceneIndex = this.track.scenes.findIndex(trackScene => trackScene.id === scene.id);
    this.track.scenes.splice(sceneIndex, 1);

    // update timeline tracks
    const updatedTracks = [...this.timelineService.currentTracks];
    const trackIndex = updatedTracks.findIndex(track => track.id === this.track.id);
    if (trackIndex !== -1) {
      updatedTracks.splice(trackIndex, 1, this.track);
    }
    this.timelineService.setTracks(updatedTracks);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
