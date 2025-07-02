// src/app/app.routes.ts
// In Angular 19+ standalone projects, routing is configured directly here.
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list'; // Corrected import path
import { EmployeeFormComponent } from './employee-form/employee-form'; // Corrected import path
import { NotFoundComponent } from './not-found/not-found'; // Corrected import path

// Define the application's routes as an array of Route objects
export const routes: Routes = [
  // Route for the employee list (this will be your main view/dashboard)
  { path: 'employees', component: EmployeeListComponent },

  // Route for adding a new employee
  { path: 'employees/add', component: EmployeeFormComponent },

  // Route for editing an existing employee (dynamic route with ID parameter)
  // The ':id' signifies a route parameter that can be read by EmployeeFormComponent.
  { path: 'employees/edit/:id', component: EmployeeFormComponent },

  // Default route: redirects to '/employees' when the base URL is accessed (e.g., just 'localhost:4200')
  // `pathMatch: 'full'` ensures that the entire URL path must match.
  { path: '', redirectTo: '/employees', pathMatch: 'full' },

  // Wildcard route: catches any unmatched URLs and displays the NotFoundComponent (404 page)
  // This route should always be the LAST one in your `routes` array.
  { path: '**', component: NotFoundComponent }
];