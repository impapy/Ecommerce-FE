import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iwishlist } from 'src/app/View Model/iwishlist';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  httpOptions = {};

  constructor(private httpclient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }



  getWishListsForUser(): Observable<Iwishlist[]> {
    return this.httpclient.get<Iwishlist[]>(environment.APIURL + '/api/wishlist')
  }

  AddWishList(IdForProduct: string, NameOfList: string ): Observable<Iwishlist> {
    let item = { items: { productId: IdForProduct }, name: NameOfList }
    return this.httpclient.post<Iwishlist>(environment.APIURL + '/api/wishlist', item, this.httpOptions)
  }
  _AddWishList( NameOfList: string ): Observable<Iwishlist> {
    let item = { items: { productId: undefined},  name: NameOfList }
    return this.httpclient.post<Iwishlist>(environment.APIURL + '/api/wishlist', item, this.httpOptions)
  }

  deleteList(idForList:string):Observable<Iwishlist>{
    return this.httpclient.delete<Iwishlist>(environment.APIURL+'/api/wishlist/'+idForList)
  }

  deleteItemList(idForItemList:string):Observable<Iwishlist>{
    return this.httpclient.delete<Iwishlist>(environment.APIURL+'/api/wishlist/remveItem/'+idForItemList)
  }
}
