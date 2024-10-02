import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPremiumComponent } from './buyer-premium.component';

describe('BuyerPremiumComponent', () => {
  let component: BuyerPremiumComponent;
  let fixture: ComponentFixture<BuyerPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerPremiumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
