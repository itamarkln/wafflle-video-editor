import { NgModule } from '@angular/core';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';

@NgModule({
  declarations: [],
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: []
})
export class CoreModule { }
