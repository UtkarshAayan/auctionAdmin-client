import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubadminComponent } from './manage-subadmin.component';

describe('ManageSubadminComponent', () => {
  let component: ManageSubadminComponent;
  let fixture: ComponentFixture<ManageSubadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
