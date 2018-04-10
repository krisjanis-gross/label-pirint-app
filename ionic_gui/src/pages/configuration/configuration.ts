import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

//import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import {BackendData} from '../../providers/backend-data';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
GadsPartija;
ServerURL;
SyncON;
Line1;
Line2;
Line3;
Line4;
lmargin;
gap_after_label;
scroll_parameter;

  constructor(public navCtrl: NavController, public navParams: NavParams,  /*public http: Http,*/ /*private storage: Storage,*/ public toastCtrl: ToastController, private backendData: BackendData,public alertCtrl: AlertController) {
      this.get_config_data ();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Product');
  }

  get_config_data () {
    this.backendData.getConfigData().then(data => {
      this.GadsPartija = data.GadsPartija;
      this.SyncON = data.SyncON;
      this.Line1 = data.Line1;
      this.Line2 = data.Line2;
      this.Line3 = data.Line3;
      this.Line4 = data.Line4;
      this.lmargin = data.lmargin;
      this.gap_after_label = data.gap_after_label;
      this.scroll_parameter = data.scroll_parameter;


      },
  err => console.log(err));
  this.ServerURL = this.backendData.ServerURL;
  }

saveServerURL() {
  // set a key/value
  this.storage.set('storedServerURL',   this.ServerURL);
  this.backendData.ServerURL = this.ServerURL;
  this.get_config_data ();
}

saveSettings () {


  let request_data = {
    GadsPartija: this.GadsPartija,
    SyncON: this.SyncON,
    Line1: this.Line1,
    Line2: this.Line2,
    Line3: this.Line3,
    Line4: this.Line4,
    lmargin: this.lmargin,
    gap_after_label: this.gap_after_label,
    scroll_parameter: this.scroll_parameter,
  };


  this.backendData.saveConfigData (request_data).then(data => {
    this.showToast (data.message);

    },
err => console.log(err));

}


reboot_server () {

  let confirm = this.alertCtrl.create({
    title: 'Skaidri zini?' ,
    buttons: [
      {
        text: 'Jā, restartēt',
        handler: () => {
          this.backendData.rebootServer ().then(data => {
            this.showToast (data.message);
            },
          err => console.log(err));


        }
      }
    ]
  });
  confirm.present();
}

shutdown_server () {
  let confirm = this.alertCtrl.create({
    title: 'Skaidri zini?' ,
    buttons: [
      {
        text: 'Jā, shutdown',
        handler: () => {
          this.backendData.shutdownServer ().then(data => {
            this.showToast (data.message);
            },
          err => console.log(err));


        }
      }
    ]
  });
  confirm.present();
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
