import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: false,
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {
  sellForm!: FormGroup;
  termsContents: any;
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
      this.adminSettingsService.createTerms(this.sellForm.value)
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
    this.adminSettingsService.getTerms()
    .subscribe({
      next: (data) => {
        this.termsContents = data;
        this.termsContents =  this.termsContents.data;

      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching privacy contents.';
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
      this.adminSettingsService.updateTerms(this.selectedContent._id, this.sellForm.value).subscribe(
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
    this.adminSettingsService.deleteTerms(id).subscribe(
      response => {
        this.successMessage = 'Content deleted successfully';
        this.loadContents();
      },
      error => this.errorMessage = error.message
    );
  }
}