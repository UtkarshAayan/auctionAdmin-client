import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBuyersComponent } from './manage-buyers.component';

describe('ManageBuyersComponent', () => {
  let component: ManageBuyersComponent;
  let fixture: ComponentFixture<ManageBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBuyersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
