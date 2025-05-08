import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-expired',
  standalone:false,
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css'
})
export class SessionExpiredComponent {
  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/login']); // Redirect to login page
  }
}
