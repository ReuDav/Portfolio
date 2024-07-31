import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  title = 'PortfolioPage';
  bottomUIHeight: number | undefined;

  ngAfterViewInit(): void {
    // Initial calculation with a slight delay
    setTimeout(() => {
      this.calculateUIHeights();
    }, 100); // Adjust delay as needed
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onResizeOrScroll() {
    this.calculateUIHeights();
  }

  calculateUIHeights() {
    // Layout viewport height
    const layoutViewportHeight = window.innerHeight;

    // Visual viewport height (if available, otherwise fall back to layout viewport height)
    const visualViewportHeight = window.visualViewport ? window.visualViewport.height : layoutViewportHeight;

    // Calculate the bottom UI height
    this.bottomUIHeight = layoutViewportHeight - visualViewportHeight;

    // Calculate the full browser chrome height
    const outerHeight = window.outerHeight;
    const chromeHeight = outerHeight - layoutViewportHeight;

    // Display alerts with calculated values
    alert('Layout Viewport Height: ' + layoutViewportHeight + 'px');
    alert('Visual Viewport Height: ' + visualViewportHeight + 'px');
    alert('Calculated Bottom UI Height: ' + this.bottomUIHeight + 'px');
    alert('Browser Chrome Height (Top Menu + UI): ' + chromeHeight + 'px');
  }
}
