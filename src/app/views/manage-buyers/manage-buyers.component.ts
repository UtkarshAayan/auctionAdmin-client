import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-manage-buyers',
  standalone: false,
  templateUrl: './manage-buyers.component.html',
  styleUrl: './manage-buyers.component.scss'
})
export class ManageBuyersComponent {
  fb = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router)
  userForm!: FormGroup;
  passwordFieldType: string = 'password';
  public activePage = 2;
  editData: any;
 
  setActivePage(page: number) {
    this.activePage = page;
  }
  userData!: any
  userArray: any[]=[];
  buyersArray: any[] = [];
  dataArray!: any
  public visible = false;
  public visible2 = false;
  users: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0;
  limit: number = 5;
  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  toggleLiveDemo2() {
    this.visible2 = !this.visible2;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  handleLiveDemoChange2(event2: any) {
    this.visible2 = event2;
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required],
      isAdmin: '',
      isSeller: '',
      isBuyer: '',
      verifiedByAdmin: '',
    })
    this.getAllBuyers();
  }

  clickAddMember() {
    this.userForm.reset();
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  getAllBuyers(): void {
    this.usersService.getAllBuyersService(this.currentPage, this.limit, this.searchQuery).subscribe(response => {
      this.userArray = response.buyers;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
      this.totalUsers = response.totalUsers;
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.getAllBuyers();
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllBuyers();
    }
  }


  deleteMember(id: any) {
    this.usersService.deleteUserService(id)
      .subscribe(res => {
        alert('Member Deleted')
        this.getAllBuyers();
      })
  }

  getUserById(id: any) {
    this.usersService.getUserByIdService(id)
      .subscribe(data => {
        this.editData = data
        this.dataArray = this.editData.data
        this.userForm.patchValue({
          name: this.editData.data.name,
          email: this.editData.data.email,
          password: this.editData.data.password,
          contactNumber: this.editData.data.contactNumber
        })
      })
  }

  updateUser(userId: any): void {

    const updatedUserData = {
        // Assuming your API expects data in the format you're sending
        // If not, adjust this part accordingly
         name: this.userForm.value.name,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          contactNumber: this.userForm.value.contactNumber,
    };
    
    userId = this.editData.data._id; // Assuming you have user ID in editData
    this.usersService.updateUserService(updatedUserData, userId)
        .subscribe(updatedUser => {
          alert("Update Successfully")
            this.getUserById(userId)
            // Optionally, you can reset the form or perform other actions upon successful update
        });

}




  verifyUserByAdmin(productId: any) {
    this.usersService.verifyUserByAdminService(productId).subscribe(response => {
      // Handle the response, update UI accordingly
      alert("User Verified")
      this.userArray = this.userArray.map(product =>
        product.id === productId ? { ...product, verified: true } : product
      );
      this.getAllBuyers();
    });
  }

}
