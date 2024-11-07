import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-buyer-premium',
  standalone: false,
  templateUrl: './buyer-premium.component.html',
  styleUrl: './buyer-premium.component.scss'
})
export class BuyerPremiumComponent {

  adminSettingsService = inject(AdminSettingsService);
  router = inject(Router)
  saleTax: any;
  buyerPremium: any;
  message: any;
  settingData: any;
  settingArray: any;
  settingsForm!: FormGroup;
  fb = inject(FormBuilder);
  editArray: any;
  editData: any;
  ngOnInit(): void {

     this.settingsForm = this.fb.group({
      buyerPremium: ['', Validators.required]
    });
    this.getbuyerPremium()
  }
  getbuyerPremium() {
    this.adminSettingsService.getSettings()
      .subscribe(data => {
        this.editData = data
      
        this.editArray = this.editData.data
        this.settingsForm.patchValue({
          buyerPremium: this.editData.data.buyerPremium,
        })
      })
  }

  updateSettings() {
 
      this.adminSettingsService.updateBuyersPremium(this.settingsForm.value)
      .subscribe({
        next:(res)=>{
         alert("BuyerPremium Updated Successfully")
        },
        error:(err)=>{
          console.log(err)
        }
      })
 
  }
}

