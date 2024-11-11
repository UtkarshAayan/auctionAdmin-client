import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';
@Component({
  selector: 'app-manage-home',
  standalone: false,
  templateUrl: './manage-home.component.html',
  styleUrl: './manage-home.component.scss'
})
export class ManageHomeComponent {
  selectedFiles: FileList | null = null;
  bannerImages: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  adminSettingsService = inject(AdminSettingsService);

  ngOnInit(): void {
    this.loadBannerImages();
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files; // Capture the selected files
  }

  // Upload selected images
  uploadImages() {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const formData = new FormData();
      Array.from(this.selectedFiles).forEach((file) => {
        formData.append('bannerImages', file);
      });
  
      this.adminSettingsService.uploadBannerImages(formData).subscribe(
        (response) => {
          this.successMessage = 'Images uploaded successfully!';
          this.errorMessage = '';
          this.loadBannerImages(); // Refresh images after upload
        },
        (error) => {
          this.errorMessage = 'Image upload failed!';
          this.successMessage = '';
        }
      );
    }
  }
  
  

  // Load banner images
  loadBannerImages() {
    this.adminSettingsService.getBannerImages().subscribe(
      (response) => {
        this.bannerImages = response.bannerImages;
      },
      (error) => {
        this.errorMessage = 'Failed to load images!';
      }
    );
  }

// upload-banner.component.ts

// Ensure imageUrl is defined before calling the delete function
deleteImage(imageUrl: string | undefined) {
  if (!imageUrl) {
    console.error('Image URL is undefined');
    return;
  }

  const relativePath = imageUrl.replace('http://localhost:3001/', ''); // Remove the base URL to get the relative path
  if (relativePath) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.adminSettingsService.deleteBannerImage(relativePath).subscribe(
        (response) => {
          this.successMessage = 'Image deleted successfully!';
          this.errorMessage = '';
          this.loadBannerImages(); // Refresh the images after deletion
        },
        (error) => {
          this.errorMessage = 'Failed to delete image!';
          this.successMessage = '';
        }
      );
    }
  } else {
    console.error('Failed to extract relative path from image URL');
  }
}





  
}
