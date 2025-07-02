// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterOutlet and RouterLink, RouterLinkActive
import { CommonModule } from '@angular/common'; // Important for *ngIf, *ngFor etc. if used in this template

@Component({
  selector: 'app-root', // The custom HTML tag for this component in index.html
  standalone: true, // This component is configured as a standalone component
  imports: [
    CommonModule,       // Provides common Angular directives like *ngIf, *ngFor, etc.
    RouterOutlet,       // This is the placeholder where routed components will be rendered.
    RouterLink,         // Directive for creating navigation links without full page reloads.
    RouterLinkActive    // Directive for adding CSS classes to active RouterLinks.
  ],
  templateUrl: './app.html', // Corrected: Points to .html
  styleUrls: ['./app.css'] // Corrected: Points to .css
})
export class AppComponent {
  title = 'Employee Management'; // A property to hold the application title
}