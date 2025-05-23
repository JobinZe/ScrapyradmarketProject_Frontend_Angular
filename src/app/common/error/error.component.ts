import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone:false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
// In your component.ts file
reloadPage() {
  window.location.reload();
}
}
