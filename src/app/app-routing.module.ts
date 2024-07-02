import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'video-editor',
    loadComponent: () => import('@features/video-editor/video-editor.component').then((m) => m.VideoEditorComponent)
  },
  { path: '', redirectTo: 'video-editor', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
