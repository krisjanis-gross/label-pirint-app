import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { Injectable } from '@angular/core';
//mport { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ListPage } from '../list/list';

import {BackendData} from '../../providers/backend-data';

/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  Nosaukums;
  BotNosaukums;
  Potcelms;
  productId;
  potcelms_suggestions;

  constructor(public navCtrl: NavController, public params: NavParams, /*public http: Http,*/ private backendData: BackendData, public toastCtrl: ToastController) {

    this.productId = this.params.get('item').id;

    this.Nosaukums = this.params.get('item').title;
    this.BotNosaukums = this.params.get('item').bot_nosaukums;
    this.Potcelms = this.params.get('item').potcelms;
    this.getPotcelmssuggestions ();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Product');
  }


  saglabaatSkirnesDatus () {

      let request_data = {
        productID: this.productId,
        Nosaukums: this.Nosaukums,
        BotNosaukums: this.BotNosaukums,
        Potcelms: this.Potcelms,
      };


      this.backendData.saveSortData (request_data).then(data => {
                                      this.showToast (data.message);
                                      this.navCtrl.setRoot(ListPage);
                                        },
                                    err => console.log(err));

  }


  showToast(message: string) {
     let toast = this.toastCtrl.create({
       message: message,
       duration: 2000,
       position: 'top'
     });

     toast.present(toast);
   }

set_potcelms (x) {
  this.Potcelms = x;
}

getPotcelmssuggestions () {
  this.backendData.getPotcelmuSuggestions().then(data => {
                                this.potcelms_suggestions = data.potcelms_suggestions;
                                    },
                                err => console.log(err));

}
}
