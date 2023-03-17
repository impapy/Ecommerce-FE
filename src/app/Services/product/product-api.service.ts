import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from 'src/app/View Model/icart';

import { IProduct } from 'src/app/View Model/iproduct';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private httpOptions = {};
  public subject = new BehaviorSubject<any>('');

  emit<T>(data: T) {
    this.subject.next(data);
  }
  on<T>(): Observable<T> {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  GetProductsBySubCate(subcate: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      environment.APIURL + '/api/products/subcat/' + subcate
    );
  }
  GetAllProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(environment.APIURL + '/api/products');
  }
  getProductsByCategory(cate: string) {
    return this.http.get<IProduct[]>(
      environment.APIURL + '/api/products/cat/' + cate
    );
  }

  getProductByID(Id: string): Observable<IProduct> {
    return this.http.get<IProduct>(environment.APIURL + '/api/products/' + Id);
  }

  createProductReview(Id: string, data: any): Observable<IProduct> {
    return this.http.post<IProduct>(
      `${environment.APIURL}/api/products/reviews/${Id}`,
      data,
      this.httpOptions
    );
  }

  getProductReviews(Id: string): Observable<any> {
    return this.http.get<any>(
      environment.APIURL + '/api/products/reviews/' + Id
    );
  }

  deleteReview(IdPrd: string, reviewId: string): Observable<IProduct> {
    return this.http.put<IProduct>(
      `${environment.APIURL}/api/products/${IdPrd}/${reviewId}`,
      this.httpOptions
    );
  }

  addToCart(productId: string, price: number,seller_id:string): Observable<ICart> {
    let prodId = { items: { productId: productId, price: price, quantity: 1,sellerId:seller_id} };
    return this.http.post<ICart>(environment.APIURL + '/api/cart/addToCart', prodId,
      this.httpOptions
    );
  }

  createWishList(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.APIURL}/api/wishlist`,
      data,
      this.httpOptions
    );
  }

  getAllProductsOfSearch():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(
      environment.APIURL + '/api/products/prdOfSearch'
    );
    console.log("after")
  }
  
}
