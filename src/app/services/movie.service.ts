import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategories } from '../models/ICategories';
import { IMovie } from '../models/IMovie';
import { IOrders } from '../models/IOrders';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // skapar observable av categories interface
  private categories = new Subject<ICategories[]>();
  categories$ = this.categories.asObservable();

  // skapar observable av movie interfacet
  private products = new Subject<IMovie[]>();
  products$ = this.products.asObservable();

  // skapa ovservable av Order interface
  private orders = new Subject<IOrders[]>();
  orders$ = this.orders.asObservable();

  // skapa observalbe av sökresultatet
  private SearchResult = new Subject<IMovie[]>();
  SearchResult$ = this.SearchResult.asObservable();

  constructor(private http: HttpClient) { }

  // hämta filmer från api
  getMovies() {
   this.http
    .get<IMovie[]>(environment.MovieUrl)
    .subscribe((MoviesFromApi) => {
    this.products.next(MoviesFromApi)
    });
  }

  // hämta kategorier från api
  getCategories() {
   this.http
    .get<ICategories[]>(environment.CategoriesUrl)
    .subscribe((CategoriesFromApi: ICategories[]) => {
      this.categories.next(CategoriesFromApi)
    });
  }

    // skickar order till api
   createOrder(order: object) {
     const httpHeaders = new HttpHeaders();
     httpHeaders.append('', 'aplication/json')
    return this.http.post<IOrders[]>(environment.OrderUrl, order, {headers: httpHeaders});
    }

    // hämta ordrar från api
    getOrders() {
      this.http
       .get<IOrders[]>(environment.GetOrders)
       .subscribe((OrdersFromApi: IOrders[]) => {
         this.orders.next(OrdersFromApi)
       });
    }

    // radera order från api
    DeleteOrder(id: number) {
      this.http.delete(environment.OrderUrl + "/" + id + "?companyId=28")
      .subscribe(() => this.getOrders())
    }

    // hämtar från api till sökfunktion
    getSearch(SearchText: string) {
     this.http.get<IMovie[]>(environment.SearchUrl + SearchText)
      .subscribe((movie: IMovie[]) => {
        this.SearchResult.next(movie)
      })
    }
};
