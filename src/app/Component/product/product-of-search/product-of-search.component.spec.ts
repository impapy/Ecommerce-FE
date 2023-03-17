import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOfSearchComponent } from './product-of-search.component';

describe('ProductOfSearchComponent', () => {
  let component: ProductOfSearchComponent;
  let fixture: ComponentFixture<ProductOfSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOfSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOfSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
