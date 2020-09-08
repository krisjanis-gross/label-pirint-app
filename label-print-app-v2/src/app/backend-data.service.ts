import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BackendDataService {
  public ServerURL;
  public ServerURLDefault = "http://localhost";
  public ServerPath = "/print_app_APIv2.php";
  public configData = {
    GadsPartija : "",
    Line1 : "",
    Line2 : "",
    Line3 : "",
    Line4 : "",
    lmargin : "",
    gap_after_label : "",
    scroll_parameter : 0,
  }
  public ProductList = [];
  public ProductListFavourites = [];

  public SugaSuggestions = [];
  public Potcelmssuggestions = [];
  public LatinNosaukumssuggestions = [];
  public Zonasuggestions = [];
  public Kods1suggestions = [];
  public PasesKrasasuggestions = [];





 public selectedProduct;
 public blank_product = {
   id : 0,
   Nosaukums : "",
   LatinNosaukums : "",
   Potcelms : "",
   Zona : "",
   Kods1 : "",
   Suga : "",
   PasesKrasa : "",
   printCount : 0,
 }

 public selectedProduct4Print;

 public printCount;


 public print_queue_status;
 public queueToday;
 public queueOld;

 public PrintCountSuggestions;

  public httpOptions = {
              headers: new HttpHeaders({
                'Accept': 'application/json',
                  'Content-Type':  'application/x-www-form-urlencoded'
              })
            };

  constructor(public localStorage: Storage,
              public http: HttpClient) {
        this.ServerURL = null;
        this.selectedProduct4Print = this.blank_product;
        this.printCount = 1;


   }


   getServerURL () {
      return    this.localStorage.get('storedServerURL');
   }

  saveServerURL() {
   this.localStorage.set('storedServerURL', this.ServerURL);
}

getMaiFormDataLocal () {
  return    this.localStorage.get('getMaiFormDataLocal');
}

setMaiFormDataLocal () {
  this.localStorage.set('getMaiFormDataLocal', this.selectedProduct4Print);
  }


getConfigData(): Observable<any> {
  let post_parameters = {
    request_type: "get_config_data",
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
//  console.log(' getSensorData  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));
}



saveConfigData (): Observable<any>  {

  let post_parameters = {
    request_type: "save_config_data",
    request_data: this.configData
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
  console.log(' save_config_data  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));

}



getProductList(): Observable<any> {
  let post_parameters = {
    request_type: "get_sort_list",
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
//  console.log(' getSensorData  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));
}

getProductListFavourites(): Observable<any> {
  let post_parameters = {
    request_type: "get_sort_list_favourites",
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
//  console.log(' getSensorData  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));
}




getProductSuggestions(): Observable<any> {
  let post_parameters = {
    request_type: "getProductSuggestions",
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
//  console.log(' getSensorData  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));
}








rebootServer(): Observable<any> {
  let post_parameters = {
    request_type: "reboot_server",
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
//  console.log(' getSensorData  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));
}

shutdownServer(): Observable<any> {
  let post_parameters = {
    request_type: "shutdown_server",
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
//  console.log(' getSensorData  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));
}





saveProductData (): Observable<any>  {

  let post_parameters = {
    request_type: "save_sort_data",
    request_data: this.selectedProduct
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
  console.log(' save_config_data  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));

}









private extractData(res: Response) {
  let body = res;
  return body || { };
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}


scroll_paper (request_data): Observable<any>  {

  let post_parameters = {
    request_type: "scroll_paper",
    request_data: request_data
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
  console.log(' scroll_paper  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
     map(this.extractData),
     catchError(this.handleError));

}


printLabel (): Observable<any>  {
  let post_parameters = {
    request_type: "print_label",
    request_data: this.selectedProduct4Print,
    label_count: this.printCount
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
  console.log(' printLabel  URL:', API_CALL_URL);

   return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                    map(this.extractData),
                                    catchError(this.handleError));

}

getQueueToday (): Observable<any> {
  let post_parameters = {
    request_type: "get_print_list_today"
  };

  let API_CALL_URL  = this.ServerURL + this.ServerPath;
  console.log(' get_print_list_today  URL:', API_CALL_URL);

  return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                   map(this.extractData),
                                   catchError(this.handleError))

}

getQueueHistory (): Observable<any> {
  let post_parameters = {
    request_type: "get_print_list_history"
  };


    let API_CALL_URL  = this.ServerURL + this.ServerPath;
    console.log(' get_print_list_history  URL:', API_CALL_URL);

    return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                     map(this.extractData),
                                     catchError(this.handleError))

}

cancelPrintjob(request_data): Observable<any> {
  let post_parameters = {
    request_type: "cancel_print_job",
      request_data: request_data
  };


    let API_CALL_URL  = this.ServerURL + this.ServerPath;
    console.log(' get_print_list_history  URL:', API_CALL_URL);

    return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                     map(this.extractData),
                                     catchError(this.handleError))

}

switch_queue_status () : Observable<any> {

  let post_parameters = {
    request_type: "update_queue"
  };


    let API_CALL_URL  = this.ServerURL + this.ServerPath;
    console.log(' get_print_list_history  URL:', API_CALL_URL);

    return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                     map(this.extractData),
                                     catchError(this.handleError))

}


getQueueStatus (): Observable<any> {

  let post_parameters = {
    request_type: "get_queue_status"
  };


    let API_CALL_URL  = this.ServerURL + this.ServerPath;
    console.log(' get_queue_status  URL:', API_CALL_URL);

    return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                     map(this.extractData),
                                     catchError(this.handleError))

}

getPrintCountSuggestions () : Observable<any> {

  let post_parameters = {
    request_type: "get_print_count_suggestions"
  };


    let API_CALL_URL  = this.ServerURL + this.ServerPath;
    console.log(' get_queue_status  URL:', API_CALL_URL);

    return this.http.post(API_CALL_URL,  post_parameters , this.httpOptions).pipe(
                                     map(this.extractData),
                                     catchError(this.handleError))

}



}
