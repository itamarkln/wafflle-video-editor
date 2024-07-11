import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTrackSceneComponent } from './timeline-track-scene.component';

describe('TimelineTrackItemComponent', () => {
  let component: TimelineTrackSceneComponent;
  let fixture: ComponentFixture<TimelineTrackSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineTrackSceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineTrackSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
