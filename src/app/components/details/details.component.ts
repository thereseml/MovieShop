import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IMovie } from 'src/app/models/IMovie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  detailsId: number = 0;

  constructor(private service: MovieService, private route: ActivatedRoute) { }

  details: IMovie[] = [];
  productId: number = 0;

  ngOnInit(): void {

     // hämta id från route
     this.route.params.subscribe((p) => {
      this.productId = +p["id"];
      console.log(p['id']);
    })

     // prenumererar på movie api 
    this.service.products$.subscribe((moviesFromService: IMovie[]) => {
     this.details = moviesFromService;
    }); 

    // kalla på getmovies funktionen
    this.service.getMovies();
  }

  shoppingcartlist: IMovie[] = [];

  // lägga till varor i varukorgen
  BuyProduct(i: number) {
    alert("Varan har lagts till i din varukorg! ")

    // hämtar varukorgen
    let cartlist = localStorage.getItem("köp") || "[]";
    this.shoppingcartlist = JSON.parse(cartlist);
    // lägger till i varukorgen
    this.shoppingcartlist.push(this.details[i])
    localStorage.setItem("köp", (JSON.stringify(this.shoppingcartlist)))
   console.log(this.details[i])
  }


}
