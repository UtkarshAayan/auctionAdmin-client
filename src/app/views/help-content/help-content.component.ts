import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-help-content',
  standalone: false,
  templateUrl: './help-content.component.html',
  styleUrl: './help-content.component.scss'
})
export class HelpContentComponent {
  helpContents: any;
  helpForm!: FormGroup;
  successMessage!: string;
  errorMessage!: string;
  fb = inject(FormBuilder);
  adminSettingsService = inject(AdminSettingsService);
  router = inject(Router)
  currentEditId: any;
  showModal: boolean = false;

  ngOnInit(): void {

    this.helpForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.getHelpContents();
 }

 
 getHelpContents(): void {
  this.adminSettingsService.getAllHelpContents().subscribe({
    next: (data) => {
      this.helpContents = data;
      this.helpContents =   this.helpContents.data;
      
    },
    error: (err) => {
      this.errorMessage = 'An error occurred while fetching help contents.';
    }
  });
}

onSubmit(): void {
  if (this.helpForm.valid) {
    if (this.currentEditId) {
      // Update existing content
      this.adminSettingsService.updateHelpContent(this.currentEditId, this.helpForm.value).subscribe({
        next: (updatedContent) => {
          this.successMessage = 'Help content updated successfully.';
          this.getHelpContents();  // Refresh the list
          this.resetForm();  // Clear the form and ID
          this.closeModal();  // Close the modal
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while updating help content.';
        }
      });
    } else {
      // Create new content
      this.adminSettingsService.createHelpContent(this.helpForm.value).subscribe({
        next: (data) => {
          this.successMessage = 'Help content created successfully.';
          this.getHelpContents();
          this.resetForm();  // Clear the form
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while creating help content.';
        }
      });
    }
  }
}

editHelpContent(content: any): void {
  this.currentEditId = content._id;
  this.helpForm.patchValue({
    title: content.title,
    content: content.content
  });
  this.showModal = true;
}

deleteHelpContent(id: string): void {
  this.adminSettingsService.deleteHelpContent(id).subscribe({
    next: () => {
      this.successMessage = 'Help content deleted successfully.';
      this.getHelpContents();  // Refresh the list
    },
    error: (err) => {
      this.errorMessage = 'An error occurred while deleting help content.';
    }
  });
}

toggleModal(): void {
  this.showModal = !this.showModal;
}

closeModal(): void {
  this.showModal = false;
}

resetForm(): void {
  this.helpForm.reset();
  this.currentEditId = null;
}
}
