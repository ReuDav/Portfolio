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
      this.calculateBottomUIHeight();
    }, 100); // Adjust delay as needed
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onResizeOrScroll() {
    this.calculateBottomUIHeight();
  }

  calculateBottomUIHeight() {
    const layoutViewportHeight = window.innerHeight;
    const visualViewportHeight = window.visualViewport ? window.visualViewport.height : layoutViewportHeight;

    this.bottomUIHeight = layoutViewportHeight - visualViewportHeight;
    alert('Layout Viewport Height:' + layoutViewportHeight);
    alert('Visual Viewport Height:' + visualViewportHeight);
    alert('Calculated Bottom UI Height: ' + this.bottomUIHeight);
  }
}
