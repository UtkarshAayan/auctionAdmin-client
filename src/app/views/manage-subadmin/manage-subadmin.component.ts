import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-manage-subadmin',
  standalone: false,
  templateUrl: './manage-subadmin.component.html',
  styleUrl: './manage-subadmin.component.scss'
})
export class ManageSubadminComponent {
  fb = inject(FormBuilder);
  modalTitle: string = '';
  authService = inject(AuthService);
  usersService = inject(UsersService);
  router = inject(Router)
  userForm!: FormGroup;
  isAddMode: boolean = true;
  isViewMode: boolean = false;
  public visible = false;
  userData: any;
  userArray: any[]=[];
  editData: any;
  dataArray: any;
  users: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0;
  limit: number = 5;
  subAdminArray: any[] = [];
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  clickAddMember() {
    this.userForm.reset();
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required]
      
    })
    this.getAllSubadmin()
  }

  openModal(action: string): void {
    this.isAddMode = action === 'add';
    this.isViewMode = action === 'view';

    switch (action) {
      case 'add':
        this.modalTitle = 'Add Item';
        this.userForm.enable();
        break;
      case 'update':
        this.modalTitle = 'Update Item';
        this.userForm.enable();
        break;
      case 'view':
        this.modalTitle = 'View Item';
        this.userForm.disable();  // Disable form inputs in view mode
        break;
      default:
        break;
    }

    this.toggleLiveDemo();
  }

  getAllSubadmin(): void {
    this.usersService.getAllSubAdminsService(this.currentPage, this.limit, this.searchQuery).subscribe(response => {
      this.userArray = response.subAdmins;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
      this.totalUsers = response.totalUsers;
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.getAllSubadmin();
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllSubadmin();
    }
  }


  addSubAdmin() {
    console.log(this.userForm.value)
    this.authService.createSubadminService(this.userForm.value)
    .subscribe({
      next:(res)=>{
        alert("Subadmin Created")
        this.userForm.reset();
        this.getAllSubadmin();
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.toggleLiveDemo();
  }

  
  deleteMember(id: any) {
    this.usersService.deleteUserService(id)
      .subscribe(res => {
        alert('Member Deleted')
        this.getAllSubadmin();
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
            this.getAllSubadmin();
            this.getUserById(userId)
            this.toggleLiveDemo();
            // Optionally, you can reset the form or perform other actions upon successful update
        });

}


}
