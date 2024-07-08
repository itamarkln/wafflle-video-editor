import { Component, Input, InputSignal, OnDestroy, OnInit, OutputEmitterRef, Signal, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScenePreviewService } from '@features/scene-preview/services/scene-preview.service';
import { TimelineService } from '@features/timeline/services/timeline.service';
import { ITrack } from '@shared/entities/track/track.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-controls',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './timeline-controls.component.html',
  styleUrl: './timeline-controls.component.scss'
})
export class TimelineControlsComponent implements OnInit, OnDestroy {
  currentTime: number;
  isPlaying: boolean;

  subscriptions: Subscription[];

  timelineTracks: InputSignal<ITrack[]> = input.required<ITrack[]>();
  controlsDisabled: Signal<boolean>;

  public onTimelinePlay: OutputEmitterRef<void> = output<void>();
  public onTimelinePause: OutputEmitterRef<void> = output<void>();
  public onTimelineReset: OutputEmitterRef<void> = output<void>();

  constructor(private timelineService: TimelineService, private previewService: ScenePreviewService) {
    this.isPlaying = this.timelineService.isPlayingValue;
    this.currentTime = this.timelineService.currentTimeValue;
    this.subscriptions = [];
    this.controlsDisabled = computed(() => this.timelineTracks().length === 0);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.previewService.currentTime$.subscribe(time => {
        this.currentTime = time;
      }),
      this.previewService.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = isPlaying;
      })
    );
  }

  play() {
    this.onTimelinePlay.emit();
  }

  pause() {
    this.onTimelinePause.emit();
  }

  reset() {
    this.onTimelineReset.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
