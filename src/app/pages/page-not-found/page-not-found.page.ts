import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.page.html',
  styleUrl: './page-not-found.page.scss'
})
export class PageNotFoundComponent {
  constructor(private router: Router) { }

  public navigateHome() {
    this.router.navigate(['/']);
  }
}
