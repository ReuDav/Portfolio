import { Component, AfterViewInit } from '@angular/core';
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
    const layoutViewportHeight = window.innerHeight;
    const visualViewportHeight = window.visualViewport ? window.visualViewport.height : layoutViewportHeight;

    this.bottomUIHeight = layoutViewportHeight - visualViewportHeight;
  }
}
