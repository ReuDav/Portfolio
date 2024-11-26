import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements AfterViewInit {
  title = 'PortfolioPage';
  ngAfterViewInit(): void {

  }
}
