import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { BackendDataService} from '../backend-data.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  constructor(public backendData: BackendDataService,
              public alertController: AlertController
            ) { }




  ngOnInit() {
    this.get_config_data () ;
  }




  get_config_data () {

  // get server URL
  if (this.backendData.ServerURL) {
    console.log ('ServerURL is set: ' + this.backendData.ServerURL );
    this.get_config_data2 ();
  }
  else {
    console.log ('ServerURL is not set: ' );
    this.backendData.getServerURL().then((val) => {
                                                            if(val){
                                                                  this.backendData.ServerURL = val;
                                                               }
                                                            else { this.backendData.ServerURL = this.backendData.ServerURLDefault}
                                                            this.get_config_data2 ();
                                                        });
  }

  }


  async get_config_data2 () {

        await this.backendData.getConfigData()
          .subscribe(res => {
            this.backendData.configData = res;


          }, err => {
            console.log(err);
          });
        }




  saveServerURL() {
    // set a key/value
    this.backendData.saveServerURL();
    this.get_config_data ();
  }


async saveSettings () {
  //console.log ('saving confg settings ' );
  await this.backendData.saveConfigData ()
  .subscribe(res => {
      console.log("Sucess");
    }, err => {
      console.log(err);
    });
}






async reboot_server () {

  const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to reboot server?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');

              this.backendData.rebootServer()
              .subscribe(res => {
                  console.log("Sucess");
                }, err => {
                  console.log(err);
                });

            }
          }
        ]
      });
      await alert.present();
}


async shutdown_server () {

  const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to shutdown server?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');

              this.backendData.shutdownServer()
              .subscribe(res => {
                  console.log("Sucess");
                }, err => {
                  console.log(err);
                });

            }
          }
        ]
      });
      await alert.present();
}











}
