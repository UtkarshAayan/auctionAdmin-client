import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTaxComponent } from './sale-tax.component';

describe('SaleTaxComponent', () => {
  let component: SaleTaxComponent;
  let fixture: ComponentFixture<SaleTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleTaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
