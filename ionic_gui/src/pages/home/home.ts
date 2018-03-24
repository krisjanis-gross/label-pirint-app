import { Component } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
//import { ServerAPI } from '../../providers/server-api';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {BackendData} from '../../providers/backend-data';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

/* title;
 bot_nosaukums;
 potcelms;
 kategorija;
 skira;
 daudzums;
 skaits;
 skaits_favoriiti;
*/
queueToday: Array<{id: string; title: string, satus: string, color:string}>;
queueOld: Array<{id: string; title: string, satus: string, color:string}>;

  constructor(public navCtrl: NavController, public params: NavParams, public http: Http, private backendData: BackendData,public alertCtrl: AlertController,public toastCtrl: ToastController) {


    try {
      // this will execute if comming from list page
      this.backendData.mainId = this.params.get('item').id;
      this.backendData.mainTitle = this.params.get('item').title;
      this.backendData.mainBot_nosaukums = this.params.get('item').bot_nosaukums;
      this.backendData.mainPotcelms = this.params.get('item').potcelms;
    } catch(e) {
      // default or previously used values
      this.get_main_form_data ();
    }



  }

get_main_form_data () {

// get server URL
if (this.backendData.ServerURL) {
//  console.log ('ServerURL is set: ' + this.backendData.ServerURL );
  this.getData2 ();
}
else {
  console.log ('ServerURL is not set: ' );
  this.backendData.getServerURL().then((val) => {
//            console.log ('server URL from storage:' + val);
            this.backendData.setServerURL(val);
            this.getData2 ();
          });

}

// then get the actual data


}


getData2 () {
    this.backendData.getMainFormData().then(data => {

                                                //this.title = data.title;
                                                this.backendData.mainId = data.id;
                                                this.backendData.mainTitle = data.title;
                                                this.backendData.mainBot_nosaukums= data.bot_nosaukums;
                                                this.backendData.mainPotcelms= data.potcelms;
                                                this.backendData.mainKategorija= data.kategorija;
                                                this.backendData.mainSkira= data.skira;
                                                this.backendData.mainDaudzums= data.daudzums;
                                                this.backendData.mainSkaits = data.skaits;
                                                this.backendData.mainSkaitsFavoriiti = data.skaits_favoriiti;
                                              },
                                              err => console.log(err));
    this.backendData.getQueueToday();
    this.backendData.getQueueHistory();
}

  change_sort(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage);
  }

  set_skaits(x) {
    this.backendData.mainSkaits = x;
    this.backendData.message = x;
  }

doPrint () {

  let confirm = this.alertCtrl.create({
    title: 'Drukāt ' +   this.backendData.mainSkaits + ' x ' + this.backendData.mainTitle + ' ?' ,
    message:  this.backendData.mainKategorija +
                  ' / ' + this.backendData.mainSkira +
                  ' / ' + this.backendData.mainDaudzums,
    buttons: [
      {
        text: 'Atcelt',
        handler: () => {

        }
      },
      {
        text: 'Drukāt',
        handler: () => {

          // compile parameters

          let request_data = {
            id:   this.backendData.mainId,
            Title:   this.backendData.mainTitle,
            Bot_nosaukums:   this.backendData.mainBot_nosaukums,
            Potcelms:   this.backendData.mainPotcelms,
            Kategorija:   this.backendData.mainKategorija,
            Skira:   this.backendData.mainSkira,
            Daudzums:   this.backendData.mainDaudzums,
            Skaits:   this.backendData.mainSkaits,

          };


          this.backendData.printLabel (request_data).then(data => {
            this.showToast (data.message);
            this.get_main_form_data();
            },
            err => console.log(err));


          // send












        }
      }
    ]
  });
  confirm.present();




}


scrollUp () {

    let request_data = {
      direction: "up",
      step: 10
    };


    this.backendData.scroll_paper (request_data).then(data => {
                                    this.showToast (data.message);
                                      },
                                  err => console.log(err));

}

scrollDown () {

    let request_data = {
      direction: "down",
      step: 10
    };


    this.backendData.scroll_paper (request_data).then(data => {
                                    this.showToast (data.message);
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

}
