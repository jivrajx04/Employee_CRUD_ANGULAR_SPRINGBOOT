// src/app/employee-form/employee-form.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // FIX 2: Import Observable
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse for typing errors

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.employeeId = idParam ? +idParam : null;

    if (this.employeeId) {
      this.isEditMode = true;
      this.loading = true;
      this.errorMessage = null;
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          this.employeeForm.patchValue(employee);
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => { 
          this.errorMessage = err.message || 'Failed to load employee data for editing.';
          this.loading = false;
          console.error('Error fetching employee for edit:', err);
        }
      });
    } else {
      this.loading = false;
    }
  }

  get nameControl() { return this.employeeForm.get('name'); }
  get phoneControl() { return this.employeeForm.get('phone'); }
  get emailControl() { return this.employeeForm.get('email'); }


  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.errorMessage = 'Please correct the highlighted form errors before submitting.';
      this.successMessage = null;
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const employeeData: Employee = { ...this.employeeForm.value };

    if (this.isEditMode && this.employeeId) {
        employeeData.id = this.employeeId;
    }

    let operation$: Observable<string>;

    if (this.isEditMode && employeeData.id) {
      operation$ = this.employeeService.updateEmployee(employeeData.id, employeeData);
    } else {
      operation$ = this.employeeService.createEmployee(employeeData);
    }

    operation$.subscribe({
      next: (responseMessage: string) => {
        this.successMessage = responseMessage || (this.isEditMode ? 'Employee updated successfully!' : 'Employee added successfully!');
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 1500);
      },
      error: (err: HttpErrorResponse) => { 
        this.errorMessage = err.message || (this.isEditMode ? 'Failed to update employee.' : 'Failed to add employee.');
        this.loading = false;
        console.error('Form submission error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}