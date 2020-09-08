import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendDataService} from '../backend-data.service';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

selectedProduct:string;
refreshIntervalID:any;

  constructor(private activatedRoute: ActivatedRoute,
              public backendData: BackendDataService,
              private router: Router,
              public alertController: AlertController
              )
               {


            }

  ngOnInit() {

  }



  ionViewDidLeave() {
      //console.log ('**********************ionViewDidLeave called. ' );
    if (this.refreshIntervalID) {
      clearInterval(this.refreshIntervalID);
    }
  }


ionViewDidEnter() {
    //console.log ('**********************ionViewDidEnter called. ' );
    this.get_main_form_data();

}


get_main_form_data () {

// get server URL
if (this.backendData.ServerURL) {
  console.log ('ServerURL is set: ' + this.backendData.ServerURL );
  this.getData2 ();
}
else {
  console.log ('ServerURL is not set: ' );
  this.backendData.getServerURL().then((val) => {
                                                          if(val){
                                                                this.backendData.ServerURL = val;
                                                             }
                                                          else { this.backendData.ServerURL = this.backendData.ServerURLDefault}
                                                          this.getData2 ();
                                                      });
}


  console.log("Selected product: " + JSON.stringify(this.backendData.selectedProduct));
  this.selectedProduct = JSON.stringify(this.backendData.selectedProduct);



}




getData2 () {
this.backendData.getMaiFormDataLocal().then((val) => {
                                                        if(val){
                                                              this.backendData.selectedProduct4Print = val;
                                                           }

                                                    });
   this.refreshIntervalID = setInterval(data=>{
                    this.getQueueToday()
                    },2000);

  this.getQueueHistory();
  this.getPrintCountSuggestions();
}



change_product () {
    this.router.navigate(['/list']);

}

async scrollUp(step) {
  let request_data = {
      direction: "up",
      step: step
    };

 await this.backendData.scroll_paper (request_data) .subscribe(res => {
    this.backendData.configData = res;


  }, err => {
    console.log(err);
  });


  }

async scrollDown (step) {
let request_data = {
    direction: "down",
    step: step
  };
 await this.backendData.scroll_paper (request_data) .subscribe(res => {
    this.backendData.configData = res;


  }, err => {
    console.log(err);
  });


}

async doPrint () {


  const alert = await this.alertController.create({
        header: 'Drukāt ' + this.backendData.selectedProduct4Print.Nosaukums  +  ' ?',
        subHeader: 'Skaits: ' + this.backendData.printCount ,
        message: 'Krāsa: ' + this.backendData.selectedProduct4Print.PasesKrasa,
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
               this.backendData.printLabel()
                .subscribe(res => {
                  //this.backendData.configData = res;
                }, err => {
                  console.log(err);
                });


            }
          }
        ]
      });
      await alert.present();

}


async getQueueToday () {

 await this.backendData.getQueueToday()
                                        .subscribe(res => {
                                                            this.backendData.queueToday = res;
                                                          }, err => {
                                                                      console.log(err);
                                                            });


  await this.backendData.getQueueStatus()
                                        .subscribe(res => {
                                          this.backendData.print_queue_status = res.queue_status;
                                             }, err => {
                                            console.log(err);
                                             });



}

async getQueueHistory () {

 await this.backendData.getQueueHistory()
                                        .subscribe(res => {
                                                            this.backendData.queueOld = res;
                                                          }, err => {
                                                                      console.log(err);
                                                            });


}

async cancelPrint (id) {
  let request_data = {
            queue_id: id
          };


  await this.backendData.cancelPrintjob(request_data)
                                         .subscribe(res => {
                                                             //this.backendData.queueOld = res;
                                                           }, err => {
                                                                       console.log(err);
                                                             });

}

async switch_queue_status () {

  await this.backendData.switch_queue_status()
                                         .subscribe(res => {
                                                             //this.backendData.queueOld = res;
                                                           }, err => {
                                                                       console.log(err);
                                                             });


}

async getPrintCountSuggestions() {
  await this.backendData.getPrintCountSuggestions()
                                         .subscribe(res => {
                                                          //   console.log(JSON.stringify(res));
                                                          this.backendData.PrintCountSuggestions = res.print_count_suggestions;
                                                           }, err => {
                                                                       console.log(err);
                                                             });


}

set_print_count (x) {
  this.backendData.printCount = x;

}

}
