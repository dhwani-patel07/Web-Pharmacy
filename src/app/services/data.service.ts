import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  private apiUrl = 'https://dev-api.evitalrx.in/v1/fulfillment/medicines/search';

  private patientUrl = 'https://dev-api.evitalrx.in/v1/fulfillment/patients/add';

  private checkOut = 'https://dev-api.evitalrx.in/v1/fulfillment/orders/place_order';  // Replace with actual order API
  
  private view = 'https://dev-api.evitalrx.in/v1/fulfillment/patients/view'

  private patientData: any;
  private selectedMedicines: any[] = [];


  private cart = [];

  constructor(private http: HttpClient) {}

  searchMedicines(apikey: string, query: string): Observable<any> {
    const body = {
      apikey: apikey, 
      searchstring: query, 
    };

    return this.http.post<any>(this.apiUrl, body); 
  }

  addToCart(medicine: any) {
    (this.cart as any[]).push(medicine)
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  // Method to add a patient
  addPatient(patientData: any): Observable<any> {
    const headers = new HttpHeaders({
      'api_key': this.apikey,
    });
    return this.http.post(this.patientUrl, patientData, { headers });
    
  }

   // Method to set patient data (from patient form)
   setPatientData(data: any) {
    this.patientData = data;
  }

  // Method to retrieve patient data
  getPatientData(apikey: string) {
    const patientId = localStorage.getItem('patientId');
    const body = {
      apikey: apikey, 
      patient_id: patientId 
    };
    return this.http.post(this.view, body); 
  }

  
  // Method to place the order
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.checkOut, orderData);
  }

}
  
