import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCursorComponent } from './timeline-cursor.component';

describe('TimelineCursorComponent', () => {
  let component: TimelineCursorComponent;
  let fixture: ComponentFixture<TimelineCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineCursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
