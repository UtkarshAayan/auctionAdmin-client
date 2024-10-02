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
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
    const userId = localStorage.getItem('user_id');
    console.log(userId)
    if (userId) {
      this.usersService.getUserByIdService(userId)
      .subscribe(data => {
        this.userData1 = data
        this.userData2 = this.userData1.data
        console.log(this.userData2);
      })
    }
    this.getUserById(userId)
  }


  getUserById(id: any) {
    this.usersService.getUserByIdService(id)
      .subscribe(data => {
        this.editData = data
      
        this.editArray = this.editData.data
        console.log(this.editArray);
        this.profileForm.patchValue({
          name: this.editData.data.name,
          username: this.editData.data.username,
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
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password
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
    console.log('Performing logout...');
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
