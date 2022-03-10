import { Component, OnInit, } from '@angular/core';
import { IMovie } from 'src/app/models/IMovie';
import { FormBuilder, Validators, } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { IOrders } from 'src/app/models/IOrders';
import { IOrderRows } from 'src/app/models/IOrderRows';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  constructor(private fb: FormBuilder, private Service: MovieService) { }

  shoppingForm = this.fb.group({
    firstname: ["", [Validators.required]],
    lastname: ["", [Validators.required]],
  });

  ngOnInit(): void {
    this.getshoppinglist()
  }
  shoppingcart: IMovie[] = [];
  totalprice: number = 0;
  newOrderForm: IOrders[] = [];
  totalmoviesId: number = 0;
  orderRows: IOrderRows | undefined;
  productlist: IOrderRows[] = []
  totalamount: number = 0;

  // hämtar köp varor från localstorage
  getshoppinglist() {
   let cartlist = localStorage.getItem("köp") || "[]";
   this.shoppingcart = JSON.parse(cartlist);

    for (let i = 0; i < this.shoppingcart.length; i++) {
      // räkna ut tolat köppris
      this.totalprice = this.shoppingcart[i].price;

      // hämtar product Id
      this.totalmoviesId = this.shoppingcart[i].id;

      let totalmovies = this.totalamount = this.totalmoviesId.toString.length
    
      // objet att pusha till lista
      let productData = {id: 0, productId: this.totalmoviesId, product: "", amount: totalmovies, orderId: 9403, }

      this.productlist.push(productData)

    }
  }

  // köpknapp i formuläret
   newOrder(){ 

    alert("Ditt köp har genomförts!")

    
    // hämta värdet från formulär
    let ordercreater = this.shoppingForm.value.firstname + " " + this.shoppingForm.value.lastname;

    // lägg värdet från formulär i ordern
    let newOrderForm = {
      id: 0,
      companyId: 28,
      created: new Date,
      createdBy: ordercreater,
      paymentMethod: "Paypal",
      totalPrice: this.totalprice,
      status: 0,
      orderRows: this.productlist,
    }
    

     // skickar order
    this.Service.createOrder(newOrderForm).subscribe(data => {})

    //tömma varukorgen efter köp
    this.emptyCart()
  }


  // radera hela varukorgen
  emptyCart() {
    localStorage.removeItem("köp")
    this.getshoppinglist()
  }

  // radera en film 
  deleteMovie(s: IMovie) {
  let index = this.shoppingcart.indexOf(s)
  this.shoppingcart.splice(index, 1);
  this.savetoLS()
  };

  // spara i localstorage
  savetoLS(){
  localStorage.setItem("köp",JSON.stringify(this.shoppingcart))
  }

}
