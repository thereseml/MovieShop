import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategories } from 'src/app/models/ICategories';
import { IMovie } from 'src/app/models/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: IMovie[] = [];
  productId: number = 0;
  categories: ICategories[] = [];
  categoryId: number = 0;

  constructor(private service: MovieService, private route:ActivatedRoute) { }

  ngOnInit(): void {
     // prenumererar på movie api 
    this.service.products$.subscribe((moviesFromService: IMovie[]) => {
      // lägger till hämtade api till en lista
     this.products = moviesFromService;
    }); 

    // hämta id från route
    this.route.params.subscribe(p => {
     this.productId = +p['id'];
  
    });

      // prenumerera på categori api
      this.service.categories$.subscribe((CategoriesFromService) => {
        // lägga till hämtade categorier till lista
        this.categories = CategoriesFromService;
      })

      // kalla på getcategories funktionen
      this.service.getCategories();

    // kalla på getmovies funktionen
    this.service.getMovies();
  }

  CategoryClick(id:number) {
    this.categoryId = id    
    console.log(id);
    
  }

  shoppingcartlist: IMovie[] = [];

  // lägga till varor i varukorgen
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
