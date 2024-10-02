import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-request',
  standalone: false,
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {
  adminSettingsService = inject(AdminSettingsService);
  router = inject(Router);
  editData: any;
  updateStatusForm!: FormGroup;
  fb = inject(FormBuilder);
  public visible2 = false;
  requests: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalRequests: number = 0;
  pageSize: number = 5;
  status: string = '';
  ngOnInit(): void {
    this.updateStatusForm = this.fb.group({
      requestId: ['', Validators.required],
      status: ['closed', Validators.required]
    });
    this.loadRequest();
  }
  toggleLiveDemo2() {
    this.visible2 = !this.visible2;
  }
  handleLiveDemoChange2(event2: any) {
    this.visible2 = event2;
  }
  // loadRequest(): void {
  //   this.adminSettingsService.getRequest().subscribe(res => {
  //     this.requests = res;
  //     this.requests =  this.requests.data
  //     console.log(this.requests)
  //   });
  // }


  loadRequest(page: number = 1): void {
    this.adminSettingsService.getRequest(page, this.pageSize, this.status).subscribe((response: any) => {
      this.requests = response.data.requests;
      this.currentPage = response.data.currentPage;
      this.totalPages = response.data.totalPages;
      this.totalRequests = response.data.totalRequests;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRequest(this.currentPage);
  }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.status = selectElement.value;
    this.loadRequest(1); // Reset to the first page on status change
  }
  

  getRequestById(id: any) {
    this.adminSettingsService.getRequestByIdService(id)
      .subscribe(data => {
        this.editData = data
        this.editData = this.editData.data
        console.log(this.editData);  
    
      })
  }
  deleteRequest(id: any) {
    this.adminSettingsService.deleteRequest(id)
      .subscribe(res => {
        alert('Member Request')
        this.loadRequest();
      })
  }

  updateRequestStatus(requestId: string, newStatus: string): void {
    this.adminSettingsService.updateRequest({ status: newStatus }, requestId).subscribe(
      (response) => {
       alert("Status Updated")
        this.loadRequest(); 
      }
    );
  }
}
