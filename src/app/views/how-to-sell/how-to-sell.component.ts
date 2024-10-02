import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-how-to-sell',
  standalone: false,
  templateUrl: './how-to-sell.component.html',
  styleUrl: './how-to-sell.component.scss'
})
export class HowToSellComponent {
  sellForm!: FormGroup;
  helpContents: any;
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
      this.adminSettingsService.createContentSell(this.sellForm.value)
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
    this.adminSettingsService.getContentsSell()
    .subscribe({
      next: (data) => {
        this.helpContents = data;
        this.helpContents =  this.helpContents.data;
        console.log(this.helpContents)
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching help contents.';
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
      this.adminSettingsService.updateContentSell(this.selectedContent._id, this.sellForm.value).subscribe(
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
    this.adminSettingsService.deleteContentSell(id).subscribe(
      response => {
        this.successMessage = 'Content deleted successfully';
        this.loadContents();
      },
      error => this.errorMessage = error.message
    );
  }
}

