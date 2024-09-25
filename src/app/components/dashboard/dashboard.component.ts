import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  medicines: any[] = []; 
  cart: any[] = []; 
  searchTerm: string = '';
  apikey: string = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cart = this.dataService.getCart();
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.searchTerm = query;
    if (query.length > 2) {
      this.dataService
        .searchMedicines(this.apikey, query)
        .subscribe((data: any) => {
          this.medicines = data.data.result;
        });
    } else {
      this.medicines = [];
    }
  }

  addToCart(medicine: any) {
    const existingItem = this.cart.find(
      (item) => item.medicine_id === medicine.medicine_id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        medicine_id: medicine.medicine_id,
        medicine_name: medicine.medicine_name,
        price: medicine.price,
        quantity: 1,
      });
    }
  }

  openAddPatientDialog() {
    const patientData = {
      firstName: '',
      lastName: '',
      age: '',
      contact: '',
      zipCode: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
    };

    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '650px',
      height: '800px',
      data: patientData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
  }

  openCartDialog() {
    this.dialog.open(CartComponent, {
      width: '600px',
      data: { cart: this.cart },
    });
  }
}
