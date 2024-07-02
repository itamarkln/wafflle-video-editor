import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.page';

const routes: Routes = [
  {
    path: 'video-editor',
    loadComponent: () => import('@pages/video-editor/video-editor.page').then((m) => m.VideoEditorPageComponent)
  },
  { path: '', redirectTo: 'video-editor', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
