import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-video-editor',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './video-editor.page.html',
  styleUrl: './video-editor.page.scss'
})
export class VideoEditorPageComponent {

}
