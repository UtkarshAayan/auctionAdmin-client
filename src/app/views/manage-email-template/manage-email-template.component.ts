import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailTemplateService } from 'src/app/services/email-template.service';
@Component({
  selector: 'app-manage-email-template',
  standalone: false,
  templateUrl: './manage-email-template.component.html',
  styleUrl: './manage-email-template.component.scss'
})
export class ManageEmailTemplateComponent {
  fb = inject(FormBuilder);
  emailForm!: FormGroup;
  emailTemplateService = inject(EmailTemplateService);
  visible = false;
  isEditMode = false;
  isReadOnly = false;
  modalTitle = 'Add Email Template';
  templates: any[] = [];
  selectedTemplate: any = null;
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    })
    this.loadTemplates();
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
    this.modalTitle = 'Add Email Template';
    this.emailForm.reset();
    this.toggleLiveDemo();
  }
  loadTemplates(): void {
    this.emailTemplateService.getTemplates().subscribe({
      next: (data) => {
        this.templates = data;
      },
      error: (error) => {
        console.error('Error fetching templates', error);
      }
    });
  }

  viewTemplate(template: any): void {
    this.isEditMode = false;
    this.isReadOnly = true;
    this.modalTitle = 'View Email Template';
    this.emailForm.patchValue({
      title: template.title,
      subject: template.subject,
      body: template.body,
    });
    this.toggleLiveDemo();
  }
  editTemplate(template: any): void {
    this.isEditMode = true;
    this.isReadOnly = false;
    this.modalTitle = 'Edit Email Template';
    this.selectedTemplate = template;
    this.emailForm.patchValue({
      title: template.title,
      subject: template.subject,
      body: template.body,
    });
    this.toggleLiveDemo();
  }


  createTemplate(): void {
    this.emailTemplateService.createTemplate(this.emailForm.value).subscribe({
      next: () => {
        this.loadTemplates();
        this.toggleLiveDemo();
      },
      error: (error) => {
        console.error('Error creating template', error);
      }
    });
  }

  updateTemplate(id: string): void {
    this.emailTemplateService.updateTemplate(id, this.emailForm.value).subscribe({
      next: () => {
        this.loadTemplates();
        this.toggleLiveDemo();
      },
      error: (error) => {
        console.error('Error updating template', error);
      }
    });
  }



  deleteTemplate(id: string): void {
    this.emailTemplateService.deleteTemplate(id).subscribe({
      next: (data) => {
        console.log('Template deleted', data);
        this.loadTemplates(); // Reload templates after deletion
      },
      error: (error) => {
        console.error('Error deleting template', error);
      }
    });
  }
}
