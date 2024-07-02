import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.page';
import { VideoEditorPageComponent } from './video-editor/video-editor.page';

@NgModule({
  declarations: [],
  imports: [
    VideoEditorPageComponent,
    PageNotFoundComponent
  ],
  exports: [
    VideoEditorPageComponent,
    PageNotFoundComponent
  ],
  providers: []
})
export class PagesModule { }
