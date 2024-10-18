import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-manage-aboutus',
  standalone: false,
  templateUrl: './manage-aboutus.component.html',
  styleUrl: './manage-aboutus.component.scss'
})
export class ManageAboutusComponent {

  sellForm!: FormGroup;
  aboutusContents: any;
  selectedContent: any;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  adminSettingsService = inject(AdminSettingsService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.sellForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.loadContents();
  }
  onSubmit(): void {
    if (this.sellForm.valid) {
      this.adminSettingsService.createAbout(this.sellForm.value)
      .subscribe(
        response => {
          this.successMessage = 'Content created successfully';
          this.loadContents();
          this.sellForm.reset()
        },
        error => this.errorMessage = error.message
      );
    }
  }

  loadContents(): void {
    this.adminSettingsService.getAbout()
    .subscribe({
      next: (data) => {
        this.aboutusContents = data;
        this.aboutusContents =  this.aboutusContents.data;
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching aboutus.';
      }
    });
  }

  editContent(content: any): void {
    this.selectedContent = content;
    this.sellForm.patchValue({
      title: content.title,
      content: content.content
    });
  }

  updateContent(): void {
    if (this.sellForm.valid && this.selectedContent) {
      this.adminSettingsService.updateAbout(this.selectedContent._id, this.sellForm.value).subscribe(
        response => {
          this.successMessage = 'Content updated successfully';
          this.loadContents();
          this.selectedContent = null;
          this.sellForm.reset();
        },
        error => this.errorMessage = error.message
      );
    }
  }

  deleteContent(id: string): void {
    this.adminSettingsService.deleteAbout(id).subscribe(
      response => {
        this.successMessage = 'Content deleted successfully';
        this.loadContents();
      },
      error => this.errorMessage = error.message
    );
  }
}