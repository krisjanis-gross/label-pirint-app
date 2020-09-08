import { Component, OnInit } from '@angular/core';

import { BackendDataService} from '../backend-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  searchTerm: string = '';
  ProductListBackup: [];
  ProductListFavouritesBackup: [];

  constructor(public backendData: BackendDataService,
              private router: Router,
  ) { }

  ngOnInit() {
        this.get_list_data () ;
  }



    get_list_data () {

    // get server URL
    if (this.backendData.ServerURL) {
      console.log ('ServerURL is set: ' + this.backendData.ServerURL );
      this.get_list_data2 ();
    }
    else {
      console.log ('ServerURL is not set: ' );
      this.backendData.getServerURL().then((val) => {
                                                              if(val){
                                                                    this.backendData.ServerURL = val;
                                                                 }
                                                              else { this.backendData.ServerURL = this.backendData.ServerURLDefault}
                                                              this.get_list_data2 ();
                                                          });
    }

    }


    async get_list_data2 () {

          await this.backendData.getProductList()
            .subscribe(res => {
              this.backendData.ProductList = res;
              this.ProductListBackup = res;
            }, err => {
              console.log(err);
            });

          await this.backendData.getProductListFavourites()
            .subscribe(res => {
              this.backendData.ProductListFavourites = res;
              this.ProductListFavouritesBackup = res;
            }, err => {
              console.log(err);
            });
        }


editProduct (item) {
this.backendData.selectedProduct = item;
//console.log(JSON.stringify(item));
 this.router.navigate(['/product']);
}

selectProduct (item) {
  this.backendData.selectedProduct4Print = item;
  this.backendData.setMaiFormDataLocal () ;
  this.router.navigate(['/']);
}
newProduct () {


  this.backendData.selectedProduct =   this.backendData.blank_product;
  this.router.navigate(['/product']);
}

searchItems () {

  // search and update the list
  // Reset items back to all of the items
   this.backendData.ProductList = this.ProductListBackup;
   this.backendData.ProductListFavourites = this.ProductListFavouritesBackup;

   // set val to the value of the ev target
   var val = this.searchTerm;

   // if the value is an empty string don't filter the items
   if (val && val.trim() != '') {
     this.backendData.ProductList = this.backendData.ProductList.filter((item) => {
       return (item.Nosaukums.toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
   }
   if (val && val.trim() != '') {
     this.backendData.ProductListFavourites= this.backendData.ProductListFavourites.filter((item) => {
       return (item.Nosaukums.toLowerCase().indexOf(val.toLowerCase()) > -1);
     })
   }



}

}
