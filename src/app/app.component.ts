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
  outerHeight: number | undefined;

  ngAfterViewInit(): void {
    this.outerHeight = window.outerHeight;
  }
}
