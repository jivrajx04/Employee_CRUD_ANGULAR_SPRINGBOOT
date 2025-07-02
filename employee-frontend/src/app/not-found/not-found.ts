// src/app/not-found/not-found.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // For routerLink in the template
import { CommonModule } from '@angular/common'; // For common directives if needed in template

@Component({
  selector: 'app-not-found',
  standalone: true, // Configured as a standalone component
  imports: [CommonModule, RouterLink], // Import necessary modules
  templateUrl: './not-found.html', // Corrected: Points to .html
  styleUrls: ['./not-found.css'] // Corrected: Points to .css
})
export class NotFoundComponent {
  // Constructor doesn't need any special injections for this simple 404 page.
  constructor() { }
}