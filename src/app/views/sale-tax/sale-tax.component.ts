import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-sale-tax',
  standalone: false,
  templateUrl: './sale-tax.component.html',
  styleUrl: './sale-tax.component.scss'
})
export class SaleTaxComponent {
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
      saleTax: ['', Validators.required]
    });
    this.getSalesTax()
  }
  getSalesTax() {
    this.adminSettingsService.getSettings()
      .subscribe(data => {
        this.editData = data
      
        this.editArray = this.editData.data
        this.settingsForm.patchValue({
          saleTax: this.editData.data.saleTax,
        })
      })
  }

  updateSettings() {
 
      this.adminSettingsService.updateSalesTax(this.settingsForm.value)
      .subscribe({
        next:(res)=>{
         alert("SalesTax Updated Successfully")
        },
        error:(err)=>{
          console.log(err)
        }
      })
 
  }
}
