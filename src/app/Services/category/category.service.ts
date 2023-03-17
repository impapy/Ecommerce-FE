import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ICategory } from './../../View Model/icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:ICategory[] = [];
  constructor(private http:HttpClient, private router:Router) { }

  getAllCategory():Observable<ICategory[]>{    
    return this.http.get<any>(`${environment.APIURL}/api/category`)
  }
  getCategory(cate:string):Observable<ICategory>{
    return this.http.get<ICategory>(`${environment.APIURL}/api/category/speciefic/${cate}`)
  }
}
