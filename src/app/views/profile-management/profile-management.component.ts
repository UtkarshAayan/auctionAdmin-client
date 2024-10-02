import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-management',
  standalone: false,
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss'
})
export class ProfileManagementComponent implements OnInit {


  visible: any;
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  ngOnInit() {
  
  }
}
