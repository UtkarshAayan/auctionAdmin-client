import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrl: './profile-account.component.scss'
})

export class ProfileAccountComponent {
  editArray: any;
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  imageUrl: string | ArrayBuffer | null = 'https://files.axshare.com/gsc/OW98R1/55/96/b1/5596b16ae58a432bb988c0b0f92f2221/images/profile/u28.svg?pageId=51c8c0b2-5e07-45ce-87e3-f0f9c6a15bf6';
  public visible = false;

  @ViewChild('profileImageInput')
  profileImageInput!: ElementRef;
  fb = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router);
  profileForm!: FormGroup;
  profileData: any;
  userData: any;
  userData1:any;
  userData2:any
  userArray: any;
  editData: any;
  id: any
  user: any;
  userId:any
  passwordFieldType: string = 'password';

  // createForm() {
  //   this.profileForm = this.fb.group({
  //     user: this.fb.group({
  //       name: [this.userService.currentUser.name],
  //       fullName: [this.userService.currentUser.fullName]
  //     }),
  //   });



  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
    const userId = localStorage.getItem('user_id');
 
    this.getUserById(userId)
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  getUserById(id: any) {
    this.usersService.getUserByIdService(id)
      .subscribe(data => {
        this.editData = data
      
        this.editArray = this.editData.data
   
        this.profileForm.patchValue({
          name: this.editData.data.name,
          contactNumber: this.editData.data.contactNumber,
          email: this.editData.data.email,
          password: this.editData.data.password
        })
      })
  }
  updateUser(userId: any): void {

    const updatedUserData = {
        // Assuming your API expects data in the format you're sending
        // If not, adjust this part accordingly
        name: this.profileForm.value.name,
        contactNumber: this.profileForm.value.contactNumber,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password
    };
    
    userId = this.editData.data._id; // Assuming you have user ID in editData
    
    this.usersService.updateUserService(updatedUserData, userId)
      .subscribe({
        next: (updatedUser) => {
        
        alert("User updated successfully!")

          this.getUserById(userId);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        
        }
      });

}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  closeModal() {
    // Implement your closeModal logic here
  }

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  changePasswordLabelClicked() {
    this.passwordInput.nativeElement.focus();
  }

  showLogoutModal: boolean = false;

  performLogout() {
    this.showLogoutModal = false;
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['login'])
  }

}
