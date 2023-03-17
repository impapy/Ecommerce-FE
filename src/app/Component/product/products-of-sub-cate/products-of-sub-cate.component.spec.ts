import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOfSubCateComponent } from './products-of-sub-cate.component';

describe('ProductsOfSubCateComponent', () => {
  let component: ProductsOfSubCateComponent;
  let fixture: ComponentFixture<ProductsOfSubCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsOfSubCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOfSubCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
