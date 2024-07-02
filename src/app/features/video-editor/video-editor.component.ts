import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-video-editor',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './video-editor.component.html',
  styleUrl: './video-editor.component.scss'
})
export class VideoEditorComponent {

}
