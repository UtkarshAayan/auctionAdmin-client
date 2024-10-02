import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShippingCountriesComponent } from './manage-shipping-countries.component';

describe('ManageShippingCountriesComponent', () => {
  let component: ManageShippingCountriesComponent;
  let fixture: ComponentFixture<ManageShippingCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageShippingCountriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageShippingCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
