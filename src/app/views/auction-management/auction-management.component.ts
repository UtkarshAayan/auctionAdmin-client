import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutionProductService } from 'src/app/services/aution-product.service';
@Component({
  selector: 'app-auction-management',
  standalone: false,
  templateUrl: './auction-management.component.html',
  styleUrl: './auction-management.component.scss'
})
export class AuctionManagementComponent {
  public visible = false;
  public visible2 = false;
  autionProductService = inject(AutionProductService);
  proData: any;
  proArray: any[]=[];
  editData: any;
  dataArray: any;
  products: any[] = [];
  currentPage = 1;
  totalPages!: number;
  searchQuery = '';
  limit = 5;
  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  toggleLiveDemo2() {
    this.visible2 = !this.visible2;
  }

  ngOnInit(): void {
    this.getAllproducts();
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  handleLiveDemoChange2(event2: any) {
    this.visible2 = event2;
  }

  getAllproducts(): void {
    this.autionProductService.getAllAuctionService(this.currentPage, this.limit, this.searchQuery)
      .subscribe(response => {
        
        this.products = response.data.products;
        console.log(this.products)
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.getAllproducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllproducts();
  }
  getProductById(id: any) {
    this.autionProductService.getAuctionByIdService(id)
      .subscribe(data => {
        this.editData = data
        this.dataArray = this.editData.data
        console.log(this.dataArray);  
      })
  }


  deleteMember(id: any) {
    this.autionProductService.deleteAuctionService(id)
      .subscribe(res => {
        alert('Auction Deleted')
        this.getAllproducts();
      })
  }
  
  verifyProduct(productId: any) {
    this.autionProductService.verifyAuctionByAdminService(productId).subscribe(response => {
      alert("Product Verified")
      console.log('Product verified', response);
      this.proArray = this.proArray.map(product =>
        product.id === productId ? { ...product, verified: true } : product
      );
      this.getAllproducts();
    });
  }


}
