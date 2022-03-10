import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/models/ICategories';
import { IMovie } from 'src/app/models/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private Service: MovieService) { }

  
  ngOnInit(): void {
  }
  
  SearchResult: IMovie[] = [];
  products: IMovie[] = [];

  
  // söker efter filmer funktion
  searchMovie(SearchText: string) {
    this.Service.getSearch(SearchText);
    this.Service.SearchResult$.subscribe((serechMovies) => {
      this.SearchResult = serechMovies;
    })
  }

  shoppingcartlist: IMovie[] = [];

  BuyProduct(i: number) {
    alert("Varan har lagts till i din varukorg! ")

    // hämtar varukorgen
    let cartlist = localStorage.getItem("köp") || "[]";
    this.shoppingcartlist = JSON.parse(cartlist);
    // lägger till i varukorgen
    this.shoppingcartlist.push(this.products[i])
    localStorage.setItem("köp", (JSON.stringify(this.shoppingcartlist)))
   console.log(this.products[i])
  }

}
