import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoEditorPageComponent } from './video-editor.page';

describe('VideoEditorPageComponent', () => {
  let component: VideoEditorPageComponent;
  let fixture: ComponentFixture<VideoEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoEditorPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VideoEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
