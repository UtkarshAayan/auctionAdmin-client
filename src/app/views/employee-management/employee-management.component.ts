import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
// interface IUser {
//   name: string;
//   state: string;
//   registered: string;
//   country: string;
//   usage: number;
//   period: string;
//   payment: string;
//   activity: string;
//   avatar: string;
//   status: string;
//   color: string;
// }
@Component({
  selector: 'app-employee-management',
  standalone: false,
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss'
})
export class EmployeeManagementComponent implements OnInit {
  fb = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router)
  userForm!: FormGroup;

  public activePage = 2;
  editData: any;
 
  setActivePage(page: number) {
    this.activePage = page;
  }
  userData!: any
  userArray: any[]=[];
  sellerArray: any[] = [];
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
    this.getAllSellers();
  }

  clickAddMember() {
    this.userForm.reset();
  }
  // getAllUsers() {
  //   this.usersService.getAllUsersService()
  //     .subscribe((res) => {
  //       this.userData = res
  //       this.userArray = this.userData.data
  //       this.sellerArray = this.userArray.filter(user => user.isSeller);
  //       console.log(this.sellerArray)
  //     })
  // }

  getAllSellers(): void {
    this.usersService.getAllSellersService(this.currentPage, this.limit, this.searchQuery).subscribe(response => {
      this.userArray = response.sellers;
      console.log(this.userArray)
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
      this.totalUsers = response.totalUsers;
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.getAllSellers();
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllSellers();
    }
  }

  deleteMember(id: any) {
    this.usersService.deleteUserService(id)
      .subscribe(res => {
        alert('Member Deleted')
        this.getAllSellers();
      })
  }

  getUserById(id: any) {
    this.usersService.getUserByIdService(id)
      .subscribe(data => {
        this.editData = data
        this.dataArray = this.editData.data
        console.log(this.dataArray);  
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
    console.log(userId)
    console.log(updatedUserData)
    this.usersService.updateUserService(updatedUserData, userId)
        .subscribe(updatedUser => {
          alert("Update Successfully")
            console.log('User updated:', updatedUser);
            this.getUserById(userId)
            // Optionally, you can reset the form or perform other actions upon successful update
        });

}




  verifyUserByAdmin(productId: any) {
    this.usersService.verifyUserByAdminService(productId).subscribe(response => {
      // Handle the response, update UI accordingly
      alert("User Verified")
      console.log('User verified', response);
      this.userArray = this.userArray.map(product =>
        product.id === productId ? { ...product, verified: true } : product
      );
      this.getAllSellers();
    });
  }


}
