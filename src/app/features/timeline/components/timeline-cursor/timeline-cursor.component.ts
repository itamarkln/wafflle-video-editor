import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timeline-cursor',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './timeline-cursor.component.html',
  styleUrl: './timeline-cursor.component.scss'
})
export class TimelineCursorComponent implements OnChanges {
  @Input() currentTime!: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTime) {
      this.updateCursor();
    }
  }

  calculateCursorPosition(): number {
    return this.currentTime * 10;
  }

  updateCursor(): void {
  }
}
