import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';

const routes: Routes = [ 
  { path: "", component: HomeComponent},
  { path: "products", component: ProductsComponent },
  { path: "shoppingcart", component: ShoppingcartComponent },
  { path: "admin", component: AdminComponent},
  { path: "category", component: DetailsComponent},
  { path: "products/details/:id", component: DetailsComponent},
  { path: "**", component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
