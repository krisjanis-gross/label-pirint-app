import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from "@angular/common/http";


/*
  Generated class for the BackendData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BackendData {

  public ServerURL;
  public message: any = "I'm new here";

// main page form data
  public mainId = 0;
  public mainTitle= "";
  public mainBot_nosaukums= "";
  public mainPotcelms= "";
  public mainKategorija = "";
  public mainSkira= "";
  public mainDaudzums= "";
  public mainSkaits= "";
  public mainSkaitsFavoriiti= "";

  public queueToday: Array<{id: string; title: string,count:string, printed_count:string, satus: string, color:string}>;
  public queueOld: Array<{id: string; title: string,count:string, printed_count:string, satus: string, color:string}>;

 private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  public ServerURLDefault = "http://localhost";

  constructor(public http: Http, private storage: Storage) {

    this.ServerURL = null;
    this.queueToday = [];
    this.queueOld = [];

    setInterval(data=>{
                        this.getQueueToday()
                        },5000);

    // Or to get a key/value pair

  }

  setMessage(message) {
    this.message = message;
  }


  getServerURL () {
//  if (this.ServerURL == null) {
  return    this.storage.get('storedServerURL');
//    }
//  else {
//    return this.ServerURL;
//  }
}

setServerURL(val) {
  if (val != '' && val != null ) {
      this.ServerURL = val;
  }
  else {
    this.ServerURL = this.ServerURLDefault;
  }


}

  getMainFormData ()
  {
    // get main data from Server
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');


    let post_parameters = {
      request_type: "get_main_data"
    };

    console.log ('get main form data from ' + this.ServerURL);

    //return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters), headers)
    return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();
  }


  getListData ()
  {

    // get default data from Server
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let post_parameters = {
      request_type: "get_sort_list"
    };

    return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();
  }


  getListDataFavourites ()
  {

    // get default data from Server
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let post_parameters = {
      request_type: "get_sort_list_favourites"
    };

    return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();
  }

saveSortData (request_data) {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "save_sort_data",
    request_data: request_data
  };
  return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();
}


scroll_paper (request_data) {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "scroll_paper",
    request_data: request_data
  };
  return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();
}


getPotcelmuSuggestions () {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "get_potcelms_suggestions"
  };

  return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                        .map(data => data.json())
                        .toPromise();

}

getConfigData () {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "get_config_data"
  };

  return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                        .map(data => data.json())
                        .toPromise();




}

saveConfigData (request_data) {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "save_config_data",
    request_data: request_data
  };
  return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();

}

printLabel  (request_data) {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "print_label",
    request_data: request_data
  };
  return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                          .map(data => data.json())
                          .toPromise();

}

getQueueToday () {
  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "get_print_list_today"
  };

  this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                        .map(data => data.json())
                        .toPromise().then(data => {
                                            this.queueToday = data;
                                            console.log("list loaded");
                                                  },
                                          err => console.log(err));


}

getQueueHistory () {

if (this.queueOld.length < 1) { // skip refresh if data is already there.

  // get default data from Server
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let post_parameters = {
    request_type: "get_print_list_history"
  };

  this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                        .map(data => data.json())
                        .toPromise().then(data => {
                                            this.queueOld = data;
                                            console.log("list loaded");
                                                  },
                                          err => console.log(err));
}

}

}
