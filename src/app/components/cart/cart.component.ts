import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit() {
  }

  clearCart() {
    this.dataService.clearCart();
    this.dialogRef.close();
  }

  orderReady() {
    this.router.navigate(['/checkout']); 
    this.dialogRef.close();
  }
}


