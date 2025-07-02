// src/app/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the app
})
export class EmployeeService {

  // Define the base URL for your Spring Boot backend's employee API.
  // ***IMPORTANT***: Make sure this matches your Spring Boot application's port and context path.
  // Default Spring Boot port is 8080. Your EmpController's base path is "/employees".
  private apiUrl = 'http://localhost:8080/employees';

  // Inject the HttpClient service to make HTTP requests.
  constructor(private http: HttpClient) { }

  /**
   * Fetches all employees from the backend.
   * @returns An Observable of an array of Employee objects.
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError) // Catch and handle any HTTP errors
      );
  }

  /**
   * Fetches a single employee by their ID.
   * @param id The ID of the employee to fetch.
   * @returns An Observable of a single Employee object.
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new employee in the backend.
   * Your Spring Boot backend returns a String message for this operation.
   * @param employee The Employee object to create.
   * @returns An Observable of the confirmation string message from the backend.
   */
  createEmployee(employee: Employee): Observable<string> {
    // The 'responseType: 'text'' is crucial here because your backend returns a String, not JSON.
    return this.http.post(this.apiUrl, employee, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing employee in the backend.
   * Your Spring Boot backend returns a String message for this operation.
   * @param id The ID of the employee to update.
   * @param employee The updated Employee object.
   * @returns An Observable of the confirmation string message from the backend.
   */
  updateEmployee(id: number, employee: Employee): Observable<string> {
    // Note: Ensure the 'id' in the path matches the ID in the employee object if the backend expects it.
    // However, based on your EmpController, the ID from @PathVariable is used, so the body ID might not be strictly needed by backend.
    return this.http.put(`${this.apiUrl}/${id}`, employee, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deletes an employee from the backend by their ID.
   * Your Spring Boot backend returns a String message for this operation.
   * @param id The ID of the employee to delete.
   * @returns An Observable of the confirmation string message from the backend.
   */
  deleteEmployee(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Generic error handling function for HTTP requests.
   * @param error The HttpErrorResponse object.
   * @returns An Observable that emits an error.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
      // You can also parse error.error for more specific backend error messages if available
      if (typeof error.error === 'string') {
        errorMessage += ` | Backend Message: ${error.error}`;
      } else if (error.error && error.error.message) {
         errorMessage += ` | Backend Message: ${error.error.message}`;
      }
    }
    console.error(errorMessage); // Log the error to console
    return throwError(() => new Error(errorMessage)); // Re-throw it as an Observable error
  }
}