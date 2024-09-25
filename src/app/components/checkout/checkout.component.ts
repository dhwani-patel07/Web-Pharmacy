import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  totalAmount: number = 0;
  patientData: any = {};
  deliveryType: string = 'delivery'; 
  successMessage: string = '';
  errorMessage: string = '';
  patientdetail: any = {};
  checkout: any[] = [];
  api_Key: string = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.details();
    this.cart = this.dataService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cart.reduce(
      (total, item) => total + item.price * item.quantity,0    
    );
  }

  details() {
    this.dataService.getPatientData(this.api_Key).subscribe(
      (response: any) => {
        this.patientdetail = response.data;
      }
    );
  }

  placeOrder() {
    // var array = [
    //   {"medicine_id":"gv0GokYn9w4zFL51eouS2g==","quantity": 4}, {"medicine_id":"ZlwdulPpADMQClszLhZnKA==","quantity": 4}
    // ]
    
    var data = this.cart.map((item) => ({
      medicine_id: item.medicine_id,
      quantity: parseInt(item.quantity), 
    }));
   
    var orderData = {
      apikey: this.api_Key,
      patient_id: this.patientdetail[0].patient_id,
      patient_name: `${this.patientdetail[0].firstname} ${this.patientdetail[0].lastname}`,
      mobile: this.patientdetail[0].mobile,
      address: 'poornam residency',
      city: 'Gandhinagar',
      state: 'Gujarat',
      zipcode: '382421',
      delivery_type: this.deliveryType,
      items: JSON.stringify(data),
      latitude: 23.10960237000644,
      longitude: 72.73742960199942,
    };

    this.dataService.placeOrder(orderData).subscribe(
      (response: any) => {
        this.checkout = response.data;
        console.log(response.status_message)
        this.successMessage = response.status_message;
        this.dataService.clearCart(); 
      },
      (error) => {
        this.errorMessage = error.status_message;
      }
    );
  }
}
