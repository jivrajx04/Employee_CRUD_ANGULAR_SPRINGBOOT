// src/app/employee-list/employee-list.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'; // Import the EmployeeService
import { Employee } from '../employee.model'; // Import the Employee model
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngFor
import { RouterLink } from '@angular/router'; // Required for [routerLink]
import { Observable, Subject, merge } from 'rxjs'; // Import merge from RxJS
import { catchError, map, startWith, switchMap } from 'rxjs/operators'; // Import RxJS operators

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './employee-list.html', 
  styleUrls: ['./employee-list.css'] 
})
export class EmployeeListComponent implements OnInit {
  // employees$ is an Observable that will hold the array of Employee objects.
  // Using an Observable ('$') is a common Angular/RxJS pattern for async data.
  employees$!: Observable<Employee[]>;
  loading: boolean = false; // Controls display of loading spinner
  errorMessage: string | null = null; // Stores error messages to display

  // refreshEmployees$ is a Subject (an Observable that you can imperatively push values into).
  // It's used to trigger a re-fetch of the employee list, e.g., after a deletion.
  private refreshEmployees$ = new Subject<void>();

  // Inject EmployeeService into the component's constructor.
  // Angular's dependency injection system will provide an instance of EmployeeService.
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // `merge` combines multiple Observables into one.
    // `this.refreshEmployees$.pipe(startWith(undefined))` ensures the list fetches data on initial load
    // AND whenever `refreshEmployees$.next()` is called.
    this.employees$ = merge(
      this.refreshEmployees$.pipe(startWith(undefined))
    ).pipe(
      // `switchMap` cancels any ongoing fetch request if a new refresh event occurs.
      // This is good for preventing race conditions (e.g., user clicks delete multiple times quickly).
      switchMap(() => {
        this.loading = true; // Set loading state to true before fetching
        this.errorMessage = null; // Clear any previous error messages
        // Call the service to get employees.
        return this.employeeService.getEmployees().pipe(
          // `catchError` handles errors from the HTTP request.
          catchError(err => {
            this.loading = false; // Turn off loading even on error
            this.errorMessage = err.message || 'Failed to load employees.'; // Set error message
            console.error('Error fetching employees:', err); // Log the full error to console
            return []; // Return an empty array or an empty observable to gracefully handle the error and keep the stream alive
          }),
          // `map` transforms the emitted data (the employees array)
          map(employees => {
            this.loading = false; // Turn off loading state after successful data reception
            return employees; // Pass the employees array down the stream
          })
        );
      })
    );
  }

  /**
   * Triggers a re-fetch of the employee list by emitting a value to refreshEmployees$.
   */
  refreshList(): void {
    this.refreshEmployees$.next();
  }

  /**
   * Handles the deletion of an employee.
   * @param id The ID of the employee to delete. This is an optional parameter.
   */
  deleteEmployee(id?: number): void {
    if (id === undefined) {
      console.warn('Attempted to delete employee with undefined ID.');
      this.errorMessage = 'Cannot delete employee: ID is missing.';
      return;
    }

    // Using a native `window.confirm` dialog for user confirmation.
    // In a production application, you would typically replace this with a more sophisticated
    // custom modal dialog for a better user experience and consistent styling.
    if (window.confirm('Are you sure you want to delete this employee?')) {
      this.loading = true; // Set loading state during deletion
      // Call the deleteEmployee method from the service.
      this.employeeService.deleteEmployee(id).subscribe({
        // `next` callback handles a successful response from the backend.
        next: (responseMessage) => {
          console.log(responseMessage); // Log the confirmation message from Spring Boot
          this.errorMessage = null; // Clear any previous error
          this.refreshList(); // Refresh the list to show the employee has been removed
        },
        // `error` callback handles any errors during the deletion process.
        error: (err) => {
          this.loading = false; // Turn off loading on error
          this.errorMessage = err.message || 'Error deleting employee.'; // Set error message
          console.error('Delete error:', err); // Log the full error to console
        }
      });
    }
  }
}