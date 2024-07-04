import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTrackComponent } from './timeline-track.component';

describe('TimelineTrackComponent', () => {
  let component: TimelineTrackComponent;
  let fixture: ComponentFixture<TimelineTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
