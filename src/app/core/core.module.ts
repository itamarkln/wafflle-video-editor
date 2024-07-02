import { NgModule } from '@angular/core';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import { PageNotFoundComponent } from '@layout/page-not-found/page-not-found.component';

@NgModule({
  declarations: [],
  imports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  providers: []
})
export class CoreModule { }
