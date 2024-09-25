import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent {
  patientForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  patientData: any = {};

  constructor(
    private fb: FormBuilder,
    private dataService: DataService, // Inject the service
    private router: Router,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data from parent
  ) {
    // Initialize form with validators
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      zipCode: [
        '560008',
        [Validators.required, Validators.pattern('^[0-9]{6}$')],
      ],
      dateOfBirth: ['',[ Validators.required, pastDateValidator]],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
    });
  }

  

  // Form submission handler
  onSubmit() {
    if (this.patientForm.valid) {
      const patientData = {
        apikey: 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3',
        first_name: this.patientForm.get('firstName')?.value,
        last_name: this.patientForm.get('lastName')?.value,
        mobile: this.patientForm.get('mobile')?.value,
        zipcode: this.patientForm.get('zipCode')?.value,
        dob: this.patientForm.get('dateOfBirth')?.value,
        gender: this.patientForm.get('gender')?.value,
        blood_group: this.patientForm.get('bloodGroup')?.value,
      };

      this.dataService.addPatient(patientData).subscribe(
        (response: any) => {
          this.patientData = response.data.patient_id;
          localStorage.setItem('patientId', response.data.patient_id);
          this.successMessage = response.status_message;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error.status_messag;
        }
      );
    }
  }

  dataSubmite() {
    if (this.patientForm.valid) {
      this.dialogRef.close(this.patientForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


export function pastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value);
  const today = new Date();

  // If the selected date is in the future, return an error
  return selectedDate > today ? { futureDate: true } : null;
}