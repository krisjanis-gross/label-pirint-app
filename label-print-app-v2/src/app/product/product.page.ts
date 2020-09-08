import { Component, OnInit } from '@angular/core';

import { BackendDataService} from '../backend-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(public backendData: BackendDataService,
              private router: Router,

            ) {

      console.log("edit product: " + JSON.stringify(backendData.selectedProduct));



   }

  ngOnInit() {
    this.getSuggestions();





  }

  async getSuggestions () {


    await this.backendData.getProductSuggestions()
      .subscribe(res => {
        this.backendData.SugaSuggestions = res.Suga_suggestions;
        this.backendData.Potcelmssuggestions = res.Potcelmssuggestions;
        this.backendData.Zonasuggestions = res.Zonasuggestions;
        this.backendData.Kods1suggestions = res.Kods1suggestions;
        this.backendData.PasesKrasasuggestions = res.PasesKrasasuggestions;
        this.backendData.LatinNosaukumssuggestions = res.LatinNosaukumssuggestions;


      }, err => {
        console.log(err);
      });

  }

set_suga (x) {
  this.backendData.selectedProduct.Suga = x;
}

set_potcelms (x) {
  this.backendData.selectedProduct.Potcelms = x;
}

set_LatinNosaukums(x) {
  this.backendData.selectedProduct.LatinNosaukums = x;
}

set_Zona(x) {
  this.backendData.selectedProduct.Zona = x;
}
set_Kods1(x) {
  this.backendData.selectedProduct.Kods1 = x;
}

set_PasesKrasa(x) {
  this.backendData.selectedProduct.PasesKrasa = x;
}


  saveProduct()
  {

    this.backendData.saveProductData().subscribe(res => {
      this.router.navigate(['/list']);
    }, err => {
      console.log(err);
    });
  }

}
