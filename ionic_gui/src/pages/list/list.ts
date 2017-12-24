import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';

import {BackendData} from '../../providers/backend-data';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: Array<{id: string; title: string, bot_nosaukums: string, potcelms:string}>;
  itemsFavourites: Array<{id: string; title: string, bot_nosaukums: string, potcelms:string}>;
  items_local_backup: any;
  itemsFavourites_local_backup: any;
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private backendData: BackendData) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.GetItemsFromBackend ();
  }

  GetItemsFromBackend () {
    this.backendData.getListDataFavourites().then(data => {
                                                  this.itemsFavourites = data;
                                                  this.itemsFavourites_local_backup = this.itemsFavourites;
                                              },
                                          err => console.log(err));
    this.backendData.getListData().then(data => {
                                                  this.items = data;
                                                  this.items_local_backup = this.items;
                                              },
                                          err => console.log(err));
  }

  itemTapped(event, item) {
    this.navCtrl.setRoot(HomePage, {
      item: item
    });
  }

  edit_product(event, item) {
    this.navCtrl.push(ProductPage, {
      item: item
    });
  }

  new_product(event) {
    let new_item = {id: 0,title: "", bot_nosaukums: "", potcelms: ""};
    this.navCtrl.push(ProductPage,{
      item: new_item
    });
  }

searchItems(event) {
// search and update the list
// Reset items back to all of the items
 this.items = this.items_local_backup;
 this.itemsFavourites = this.itemsFavourites_local_backup;

 // set val to the value of the ev target
 var val = this.searchTerm;

 // if the value is an empty string don't filter the items
 if (val && val.trim() != '') {
   this.items = this.items.filter((item) => {
     return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
   })
 }
 if (val && val.trim() != '') {
   this.itemsFavourites = this.itemsFavourites.filter((item) => {
     return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
   })
 }
}



}
