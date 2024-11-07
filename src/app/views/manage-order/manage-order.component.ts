import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-manage-order',
  standalone: false,
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent {
  public visible2 = false;
  orderService = inject(OrderService);
  page: number = 1;
  limit: number = 5;
  orders: any[] = [];
  pagination: any = { currentPage: 1, totalPages: 1 }; 
  dataArray: any;
  status: string = '';
  toggleLiveDemo2() {
    this.visible2 = !this.visible2;
  }

  ngOnInit(): void {
    this.loadOrders(this.page, this.limit);
  }

  handleLiveDemoChange2(event2: any) {
    this.visible2 = event2;
  }

  loadOrders(page: number, limit: number, status: string = ''): void {
    this.orderService.getAllOrders(page, limit, status).subscribe({
      next: (response) => {
        this.orders = response.data.orders || []; // Ensure orders is always an array
        this.pagination = response.data.pagination || { currentPage: 1, totalPages: 1 }; // Ensure pagination has default values
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
      complete: () => {
        console.log('Order fetching completed');
      }
    });
  }

  goToPage(page: number): void {
    this.page = page;
    this.loadOrders(page, this.limit, this.status);
  }

  filterByStatus(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.status = selectElement.value;
    this.loadOrders(this.page, this.limit, this.status);
  }
  

  getOrderById(id: any) {
    this.orderService.getOrders(id)
      .subscribe(res => {
        this.dataArray = res
        this.dataArray = this.dataArray.data
      })
  }

  deleteOrder(id: any) {
    this.orderService.deleteOrder(id)
      .subscribe(res => {
        alert('Auction Deleted')
        this.loadOrders(this.page, this.limit, this.status);
      })
  }

  updateOrderStatus(orderId: string, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      (response) => {
        this.loadOrders(this.page, this.limit, this.status); // Reload orders after update
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
  
}
