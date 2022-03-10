import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IMovie } from 'src/app/models/IMovie';
import { IOrders } from 'src/app/models/IOrders';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: MovieService) { }

  adminForm = this.fb.group({
    username: [""],
    password: [""],
  });


  ngOnInit(): void {

  }

  OrderList: IOrders[] = [];
  products: IMovie[] = [];


  onLoggIn(){
    // kalla på getmovies funktionen
    this.service.getMovies();
    
      // prenumererar på movie api 
      this.service.products$.subscribe((moviesFromService: IMovie[]) => {
        // lägger till hämtade api till en lista
        this.products = moviesFromService;
       }); 

         // kallar på getorder functionen
    this.service.getOrders()

      this.service.orders$.subscribe((OrdersfromService: IOrders[]) => {
        // lägger till hämtade api till en lista
      this.OrderList = OrdersfromService;
    }); 
  }

  deleteOrder(id: number){
    alert("Du har tagit bort en order!")
    this.service.DeleteOrder(id);
  }

}
