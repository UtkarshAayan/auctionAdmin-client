import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';
@Component({
  selector: 'app-manage-shipping-countries',
  standalone: false,
  templateUrl: './manage-shipping-countries.component.html',
  styleUrl: './manage-shipping-countries.component.scss'
})
export class ManageShippingCountriesComponent {
  fb = inject(FormBuilder);
  countryForm!: FormGroup;
  adminSettingsService = inject(AdminSettingsService);
  visible = false;
  isEditMode = false;
  isReadOnly = false;
  modalTitle = 'Add Country';
  countries: any;
  selectedCountry: any = null;
  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required]
    })
    this.loadCountries();
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: boolean) {
    this.visible = event;
  }

  clickAddMember(): void {
    this.isEditMode = false;
    this.isReadOnly = false;
    this.modalTitle = 'Add Country';
    this.countryForm.reset();
    this.toggleLiveDemo();
  }
  loadCountries(): void {
    this.adminSettingsService.getCountries().subscribe({
      next: (res) => {
        this.countries = res;
        this.countries = this.countries.data
      },
      error: (error) => {
        console.error('Error fetching Countries', error);
      }
    });
  }

  viewCountry(country: any): void {
    this.isEditMode = false;
    this.isReadOnly = true;
    this.modalTitle = 'View Shipping Countries';
    this.countryForm.patchValue({
      name: country.name,
      code: country.code
    });
    this.toggleLiveDemo();
  }
  editCountry(country: any): void {
    this.isEditMode = true;
    this.isReadOnly = false;
    this.modalTitle = 'Edit Country';
    this.selectedCountry = country;
    this.countryForm.patchValue({
      name: country.name,
      code: country.code
    });
    this.toggleLiveDemo();
  }


  createCountry(): void {
    this.adminSettingsService.createCountry(this.countryForm.value).subscribe({
      next: () => {
        this.loadCountries();
        this.toggleLiveDemo();
      },
      error: (error) => {
        console.error('Error creating country', error);
      }
    });
  }

  updateCountry(id: string): void {
    this.adminSettingsService.updateCountry(id, this.countryForm.value).subscribe({
      next: () => {
        this.loadCountries();
        this.toggleLiveDemo();
      },
      error: (error) => {
        console.error('Error updating country', error);
      }
    });
  }



  deleteCountry(id: string): void {
    this.adminSettingsService.deleteCountry(id).subscribe({
      next: (data) => {
        console.log('Country deleted', data);
        this.loadCountries(); 
      },
      error: (error) => {
        console.error('Error deleting country', error);
      }
    });
  }
}

