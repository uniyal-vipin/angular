import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(BaseUrl + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(BaseUrl + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(BaseUrl + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(
      map((dishes) => dishes.map((dish) => dish.id))
    );
  }
}
