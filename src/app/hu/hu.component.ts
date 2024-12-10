import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hu',
  standalone: true,
  imports: [RouterOutlet], // Import RouterOutlet here
  templateUrl: './hu.component.html',
  styleUrls: ['./hu.component.css'],
})
export class HuComponent {}
