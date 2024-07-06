import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTrackItemComponent } from './timeline-track-item.component';

describe('TimelineTrackItemComponent', () => {
  let component: TimelineTrackItemComponent;
  let fixture: ComponentFixture<TimelineTrackItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineTrackItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineTrackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
