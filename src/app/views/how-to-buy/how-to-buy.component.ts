import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-how-to-buy',
  standalone: false,
  templateUrl: './how-to-buy.component.html',
  styleUrl: './how-to-buy.component.scss'
})
export class HowToBuyComponent {
  buyForm!: FormGroup;
  helpContents: any;
  selectedContent: any;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  adminSettingsService = inject(AdminSettingsService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buyForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.loadContents();
  }
  onSubmit(): void {
    if (this.buyForm.valid) {
      this.adminSettingsService.createContentBuy(this.buyForm.value).subscribe(
        response => {
          this.successMessage = 'Content created successfully';
          this.loadContents();
          this.buyForm.reset()
        },
        error => this.errorMessage = error.message
      );
    }
  }

  loadContents(): void {
    this.adminSettingsService.getContentsBuy()
    .subscribe({
      next: (data) => {
        this.helpContents = data;
        this.helpContents = this.helpContents.data;
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching help contents.';
      }
    });
  }

  editContent(content: any): void {
    this.selectedContent = content;
    this.buyForm.patchValue({
      title: content.title,
      content: content.content
    });
  }

  updateContent(): void {
    if (this.buyForm.valid && this.selectedContent) {
      this.adminSettingsService.updateContentBuy(this.selectedContent._id, this.buyForm.value).subscribe(
        response => {
          this.successMessage = 'Content updated successfully';
          this.loadContents();
          this.selectedContent = null;
          this.buyForm.reset();
        },
        error => this.errorMessage = error.message
      );
    }
  }

  deleteContent(id: string): void {
    this.adminSettingsService.deleteContentBuy(id).subscribe(
      response => {
        this.successMessage = 'Content deleted successfully';
        this.loadContents();
      },
      error => this.errorMessage = error.message
    );
  }
}
