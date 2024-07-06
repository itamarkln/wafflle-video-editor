import { TestBed } from '@angular/core/testing';

import { ScenePreviewService } from './scene-preview.service';

describe('ScenePreviewService', () => {
  let service: ScenePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
