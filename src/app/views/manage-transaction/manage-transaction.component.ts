import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manage-transaction',
  standalone: false,
  templateUrl: './manage-transaction.component.html',
  styleUrl: './manage-transaction.component.scss'
})
export class ManageTransactionComponent {
  orderService = inject(OrderService);
  transactions: any[] = [];
  totalTransactions: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  transactionsPerPage: number = 4;

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(page: number = this.currentPage): void {
    this.orderService.getTransactions(page, this.transactionsPerPage).subscribe({
      next: (response) => {
        this.transactions = response.transactions;
        this.totalTransactions = response.totalTransactions;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  // Handle page change (next/previous)
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchTransactions();
    }
  }
}
