import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderThanksComponent } from './order-thanks.component';

describe('OrderThanksComponent', () => {
  let component: OrderThanksComponent;
  let fixture: ComponentFixture<OrderThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderThanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
