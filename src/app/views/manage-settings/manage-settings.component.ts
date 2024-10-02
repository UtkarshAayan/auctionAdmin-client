import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminSettingsService } from 'src/app/services/admin-settings.service';

@Component({
  selector: 'app-manage-settings',
  templateUrl: './manage-settings.component.html',
  styleUrls: ['./manage-settings.component.scss']
})
export class ManageSettingsComponent  {
  adminSettingsService = inject(AdminSettingsService);
  router = inject(Router);
  categories: any;
  categoryForm!: FormGroup;
  subcategories!: FormArray;
  isEditMode: boolean = false; // For toggling between create and update mode
  categoryIdToEdit: string = ''; 
  fb = inject(FormBuilder);
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      categoryImage: [null],
      subcategories: this.fb.array([]) // Array for subcategories
    });
    this.subcategories = this.categoryForm.get('subcategories') as FormArray;
    this.loadCategories();

  }

  // Fetch all categories
  loadCategories(): void {
    this.adminSettingsService.getCategories().subscribe((response) => {
        this.categories = response
        this.categories =  this.categories.data
        console.log(this.categories)
    });
  }

  logFormData(formData: FormData): void {
    // Convert FormData to an array of key-value pairs
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      if (value instanceof File) {
        // If it's a file, use FileReader to read it
        const reader = new FileReader();
        reader.onload = () => {
          data[key] = reader.result;
          console.log(`Key: ${key}, Value:`, reader.result);
        };
        reader.readAsDataURL(value); // Use readAsDataURL or readAsText based on the content type
      } else {
        data[key] = value;
        console.log(`Key: ${key}, Value: ${value}`);
      }
    });
    console.log('FormData content:', data);
  }
  
  
  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = new FormData();
  
      // Append category fields
      const nameControl = this.categoryForm.get('name');
      if (nameControl) {
        formData.append('name', nameControl.value);
      }
  
      const categoryImageControl = this.categoryForm.get('categoryImage');
      if (categoryImageControl && categoryImageControl.value) {
        formData.append('categoryImage', categoryImageControl.value);
      }
  
      // Append subcategories
      const subcategories = this.categoryForm.get('subcategories') as FormArray;
      if (subcategories && subcategories.controls.length > 0) {
        subcategories.controls.forEach((control, index) => {
          const subcategoryName = control.get('name');
          const subcategoryImage = control.get('subcategoryImage');
  
          if (subcategoryName && subcategoryName.value) {
            formData.append(`subcategories[${index}].name`, subcategoryName.value);
          }
  
          if (subcategoryImage && subcategoryImage.value) {
            formData.append(`subcategoryImage`, subcategoryImage.value); // Single key for all images
          }
        });
      }
  
      // Log FormData contents for debugging
      this.logFormData(formData);
  
      // Submit the form based on whether it's in edit mode or create mode
      if (this.isEditMode) {
        this.adminSettingsService.updateCategory(this.categoryIdToEdit, formData).subscribe(() => {
          this.resetForm();
          this.loadCategories();  // Refresh the list after updating the category
        });
      } else {
        this.adminSettingsService.createCategory(formData).subscribe(() => {
          this.resetForm();
          this.loadCategories();  // Refresh the list after adding a new category
        });
      }
    }
  }
  
  
  
  // Function to log FormData entries

  
  
  
  
  

  // Add a subcategory form control
  addSubcategory(): void {
    const subcategoryGroup = this.fb.group({
      name: ['', Validators.required],
      subcategoryImage: [null]
    });
    this.subcategories.push(subcategoryGroup);
  }

  // Remove a subcategory form control
  removeSubcategory(index: number): void {
    this.subcategories.removeAt(index);
  }

  // Handle file input for image
  onFileSelected(event: any, fieldName: string, index?: number): void {
    const file = event.target.files[0];
    if (fieldName === 'categoryImage') {
      this.categoryForm.patchValue({ categoryImage: file });
    } else if (fieldName === 'subcategoryImage' && index !== undefined) {
      const subcategoryGroup = this.subcategories.at(index);
      if (subcategoryGroup) {
        subcategoryGroup.patchValue({ subcategoryImage: file });
      }
    }
  }
  






  
  // Delete a category
  deleteCategory(id: string): void {
    this.adminSettingsService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  // Delete a subcategory
  deleteSubcategory(categoryId: string, subcategoryId: string): void {
    this.adminSettingsService.deleteSubcategory(categoryId, subcategoryId).subscribe(() => {
      this.loadCategories();
    });
  }

  // Edit a category (Load data into the form)
  editCategory(category: any): void {
    this.isEditMode = true;
    this.categoryIdToEdit = category._id;

    // Populate the form with the category data
    this.categoryForm.patchValue({
      name: category.name,
    });

    // Clear existing subcategories in the form
    this.subcategories.clear();

    // Populate subcategories in the form
    category.subcategories.forEach((subcat: any) => {
      const subcategoryGroup = this.fb.group({
        name: [subcat.name, Validators.required],
        subcategoryImage: [subcat.subcategoryImage] // Assuming you're handling subcategory images as well
      });
      this.subcategories.push(subcategoryGroup);
    });
  }

  // Reset the form after submission or when switching between modes
  resetForm(): void {
    this.isEditMode = false;
    this.categoryIdToEdit = '';
    this.categoryForm.reset();
    this.subcategories.clear();  // Clear subcategories array when form is reset
  }
}