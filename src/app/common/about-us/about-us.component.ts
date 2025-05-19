import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone:false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements AfterViewInit{
// Add this to your component.ts file for the counter animation
ngAfterViewInit() {
  this.animateStats();
}

animateStats() {
  const statElements = document.querySelectorAll('.stat-number');
  
  statElements.forEach((element) => {
    const target = +(element.getAttribute('data-count') ?? 0);
    const duration = 2000; // Animation duration in ms
    const step = target / (duration / 16); // 16ms per frame
    
    let current = 0;
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        clearInterval(counter);
        element.textContent = target.toString();
      } else {
        element.textContent = Math.floor(current).toString();
      }
    }, 16);
  });
}
}
