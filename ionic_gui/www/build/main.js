webpackJsonp([0],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_list__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_backend_data__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, params, http, backendData, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.http = http;
        this.backendData = backendData;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        try {
            // this will execute if comming from list page
            this.backendData.mainId = this.params.get('item').id;
            this.backendData.mainTitle = this.params.get('item').title;
            this.backendData.mainBot_nosaukums = this.params.get('item').bot_nosaukums;
            this.backendData.mainPotcelms = this.params.get('item').potcelms;
        }
        catch (e) {
            // default or previously used values
            this.get_main_form_data();
        }
    }
    HomePage.prototype.get_main_form_data = function () {
        var _this = this;
        // get server URL
        if (this.backendData.ServerURL) {
            //  console.log ('ServerURL is set: ' + this.backendData.ServerURL );
            this.getData2();
        }
        else {
            console.log('ServerURL is not set: ');
            this.backendData.getServerURL().then(function (val) {
                //            console.log ('server URL from storage:' + val);
                _this.backendData.setServerURL(val);
                _this.getData2();
            });
        }
        // then get the actual data
    };
    HomePage.prototype.getData2 = function () {
        var _this = this;
        this.backendData.getMainFormData().then(function (data) {
            //this.title = data.title;
            _this.backendData.mainId = data.id;
            _this.backendData.mainTitle = data.title;
            _this.backendData.mainBot_nosaukums = data.bot_nosaukums;
            _this.backendData.mainPotcelms = data.potcelms;
            _this.backendData.mainKategorija = data.kategorija;
            _this.backendData.mainSkira = data.skira;
            _this.backendData.mainDaudzums = data.daudzums;
            _this.backendData.mainSkaits = data.skaits;
            _this.backendData.mainSkaitsFavoriiti = data.skaits_favoriiti;
        }, function (err) { return console.log(err); });
        this.backendData.getQueueToday();
        this.backendData.getQueueHistory();
    };
    HomePage.prototype.change_sort = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__list_list__["a" /* ListPage */]);
    };
    HomePage.prototype.set_skaits = function (x) {
        this.backendData.mainSkaits = x;
        this.backendData.message = x;
    };
    HomePage.prototype.doPrint = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Drukāt ' + this.backendData.mainSkaits + ' x ' + this.backendData.mainTitle + ' ?',
            message: this.backendData.mainKategorija +
                ' / ' + this.backendData.mainSkira +
                ' / ' + this.backendData.mainDaudzums,
            buttons: [
                {
                    text: 'Atcelt',
                    handler: function () {
                    }
                },
                {
                    text: 'Drukāt',
                    handler: function () {
                        // compile parameters
                        var request_data = {
                            id: _this.backendData.mainId,
                            Title: _this.backendData.mainTitle,
                            Bot_nosaukums: _this.backendData.mainBot_nosaukums,
                            Potcelms: _this.backendData.mainPotcelms,
                            Kategorija: _this.backendData.mainKategorija,
                            Skira: _this.backendData.mainSkira,
                            Daudzums: _this.backendData.mainDaudzums,
                            Skaits: _this.backendData.mainSkaits,
                        };
                        _this.backendData.printLabel(request_data).then(function (data) {
                            _this.showToast(data.message);
                            _this.get_main_form_data();
                        }, function (err) { return console.log(err); });
                        // send
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.scrollUp = function (step) {
        var _this = this;
        var request_data = {
            direction: "up",
            step: step
        };
        this.backendData.scroll_paper(request_data).then(function (data) {
            _this.showToast(data.message);
        }, function (err) { return console.log(err); });
    };
    HomePage.prototype.scrollDown = function (step) {
        var _this = this;
        var request_data = {
            direction: "down",
            step: step
        };
        this.backendData.scroll_paper(request_data).then(function (data) {
            _this.showToast(data.message);
        }, function (err) { return console.log(err); });
    };
    HomePage.prototype.update_queue = function () {
        var _this = this;
        this.backendData.update_queue().then(function (data) {
            _this.showToast(data.message);
        }, function (err) { return console.log(err); });
    };
    HomePage.prototype.cancelPrint = function (queue_id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Skaidri zini?',
            buttons: [
                {
                    text: 'Atcelt šo darbu',
                    handler: function () {
                        var request_data = {
                            queue_id: queue_id
                        };
                        _this.backendData.cancel_print_job(request_data).then(function (data) {
                            _this.showToast(data.message);
                        }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top'
        });
        toast.present(toast);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Augu pases 2.0.1 {{backendData.ServerURL}}</ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n  <ion-card-content>\n\n\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-10 col-sm-8 col-md-8 col-lg-8 col-xl-6>\n\n          <h1 (click)="change_sort($event)">{{this.backendData.mainTitle}}</h1>\n\n          <h2 (click)="change_sort($event)">{{this.backendData.mainBot_nosaukums}} {{this.backendData.mainPotcelms}}</h2>\n\n        </ion-col>\n\n        <ion-col col-2 col-sm-4 col-md-4 col-lg-4 col-xl-6>\n\n          <button (click)="change_sort($event)" ion-button full icon-left ><ion-icon name=\'create\'></ion-icon>Mainīt</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-sm-4>\n\n          <ion-item>\n\n            <ion-label floating>Kategorija</ion-label>\n\n            <ion-input type="text" [(ngModel)]="this.backendData.mainKategorija"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-sm-4>\n\n            <ion-item>\n\n              <ion-label floating>Šķira</ion-label>\n\n              <ion-input type="text" [(ngModel)]="this.backendData.mainSkira"></ion-input>\n\n            </ion-item>\n\n        </ion-col>\n\n        <ion-col col-sm-4>\n\n            <ion-item>\n\n              <ion-label floating>Daudzums</ion-label>\n\n              <ion-input type="text" [(ngModel)]="this.backendData.mainDaudzums"></ion-input>\n\n            </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </ion-grid>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n<ion-card>\n\n  <ion-card-content>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12 col-sm-4 col-md-3>\n\n          <ion-item>\n\n            <ion-label floating>Zīmīšu skaits</ion-label>\n\n            <ion-input type="text" [(ngModel)]="this.backendData.mainSkaits"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-12 col-sm-8 col-md-9 >\n\n          <ion-buttons >\n\n              <button ion-button *ngFor="let x of this.backendData.mainSkaitsFavoriiti" (click)="set_skaits(x)">{{x}}</button>\n\n            </ion-buttons>\n\n        </ion-col>\n\n      </ion-row>\n\n  </ion-grid>\n\n    <button ion-button full icon-left (click)="doPrint()"><ion-icon name=\'print\'>Drukāt</ion-icon></button>\n\n  </ion-card-content>\n\n  </ion-card>\n\n<ion-card>\n\n<ion-card-content>\n\n  <button ion-button color="light"  icon-left (click)="scrollUp(1)"><ion-icon name=\'arrow-up\' ></ion-icon>Papīrs uz augšu</button>\n\n  <button ion-button color="light"  icon-left (click)="scrollDown(1)"><ion-icon name=\'arrow-down\'></ion-icon>Papīrs uz leju</button>\n\n\n\n  <button ion-button color="light" icon-left (click)="scrollUp(10)"><ion-icon name=\'arrow-up\' ></ion-icon>Papīrs uz augšu 10x</button>\n\n  <button ion-button color="light"  icon-left (click)="scrollDown(10)"><ion-icon name=\'arrow-down\'></ion-icon>Papīrs uz leju 10x</button>\n\n</ion-card-content>\n\n</ion-card>\n\n\n\n<ion-item>\n\n  <ion-label>Drukāšanas rinda ieslēgt/izslēgt -></ion-label>\n\n  <ion-toggle (click)="update_queue()" [(ngModel)]="this.backendData.print_queue_status" ></ion-toggle>\n\n</ion-item>\n\n\n\n<ion-item-group>\n\n  <ion-item-divider color="light">Šodien</ion-item-divider>\n\n  <ion-item *ngFor="let item of this.backendData.queueToday" >\n\n    {{item.title}} ( {{item.printed_count}}/{{item.count}})\n\n      <button *ngIf=" item.status == \'Gaida\' || item.status == \'Drukā\' " ion-button item-right color="danger" icon-left (click)="cancelPrint(item.id)"><ion-icon name=\'close\'></ion-icon>Atcelt</button>\n\n      <ion-note item-right color="{{item.color}}" >  {{item.status}}</ion-note>\n\n  </ion-item>\n\n\n\n</ion-item-group>\n\n\n\n<ion-item-group>\n\n  <ion-item-divider color="light">Agrāk</ion-item-divider>\n\n  <ion-item *ngFor="let item of this.backendData.queueOld" >\n\n    {{item.title}} ({{item.printed_count}}/{{item.count}})\n\n    <ion-note item-right color="{{item.color}}" >{{item.status}}</ion-note>\n\n  </ion-item>\n\n\n\n</ion-item-group>\n\n\n\n\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__providers_backend_data__["a" /* BackendData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_list__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_backend_data__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Injectable } from '@angular/core';




/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductPage = (function () {
    function ProductPage(navCtrl, params, http, backendData, toastCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.http = http;
        this.backendData = backendData;
        this.toastCtrl = toastCtrl;
        this.productId = this.params.get('item').id;
        this.Nosaukums = this.params.get('item').title;
        this.BotNosaukums = this.params.get('item').bot_nosaukums;
        this.Potcelms = this.params.get('item').potcelms;
        this.getPotcelmssuggestions();
    }
    ProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Product');
    };
    ProductPage.prototype.saglabaatSkirnesDatus = function () {
        var _this = this;
        var request_data = {
            productID: this.productId,
            Nosaukums: this.Nosaukums,
            BotNosaukums: this.BotNosaukums,
            Potcelms: this.Potcelms,
        };
        this.backendData.saveSortData(request_data).then(function (data) {
            _this.showToast(data.message);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__list_list__["a" /* ListPage */]);
        }, function (err) { return console.log(err); });
    };
    ProductPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top'
        });
        toast.present(toast);
    };
    ProductPage.prototype.set_potcelms = function (x) {
        this.Potcelms = x;
    };
    ProductPage.prototype.getPotcelmssuggestions = function () {
        var _this = this;
        this.backendData.getPotcelmuSuggestions().then(function (data) {
            _this.potcelms_suggestions = data.potcelms_suggestions;
        }, function (err) { return console.log(err); });
    };
    ProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product',template:/*ion-inline-start:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/product/product.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Šķirnes dati</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-list>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Nosaukums</ion-label>\n\n    <ion-input type="text" [(ngModel)]="Nosaukums"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label floating>Bot. nos.</ion-label>\n\n    <ion-input type="text" [(ngModel)]="BotNosaukums"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Potcelms</ion-label>\n\n    <ion-input type="text" [(ngModel)]="Potcelms"></ion-input>\n\n  </ion-item>\n\n\n\n</ion-list>\n\n  <ion-buttons >\n\n      <button ion-button *ngFor="let x of potcelms_suggestions" (click)="set_potcelms(x)">{{x}}</button>\n\n    </ion-buttons>\n\n\n\n\n\n\n\n\n\n<button ion-button  full (click)="saglabaatSkirnesDatus()">Saglabāt</button>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/product/product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__providers_backend_data__["a" /* BackendData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], ProductPage);
    return ProductPage;
}());

//# sourceMappingURL=product.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_backend_data__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ConfigurationPage = (function () {
    function ConfigurationPage(navCtrl, navParams, http, storage, toastCtrl, backendData, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.backendData = backendData;
        this.alertCtrl = alertCtrl;
        this.get_config_data();
    }
    ConfigurationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Product');
    };
    ConfigurationPage.prototype.get_config_data = function () {
        var _this = this;
        this.backendData.getConfigData().then(function (data) {
            _this.GadsPartija = data.GadsPartija;
            _this.SyncON = data.SyncON;
            _this.Line1 = data.Line1;
            _this.Line2 = data.Line2;
            _this.Line3 = data.Line3;
            _this.Line4 = data.Line4;
            _this.lmargin = data.lmargin;
            _this.gap_after_label = data.gap_after_label;
            _this.scroll_parameter = data.scroll_parameter;
        }, function (err) { return console.log(err); });
        this.ServerURL = this.backendData.ServerURL;
    };
    ConfigurationPage.prototype.saveSettings = function () {
        var _this = this;
        // set a key/value
        this.storage.set('storedServerURL', this.ServerURL);
        this.backendData.ServerURL = this.ServerURL;
        var request_data = {
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
        this.backendData.saveConfigData(request_data).then(function (data) {
            _this.showToast(data.message);
        }, function (err) { return console.log(err); });
    };
    ConfigurationPage.prototype.reboot_server = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Skaidri zini?',
            buttons: [
                {
                    text: 'Jā, restartēt',
                    handler: function () {
                        _this.backendData.rebootServer().then(function (data) {
                            _this.showToast(data.message);
                        }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    ConfigurationPage.prototype.shutdown_server = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Skaidri zini?',
            buttons: [
                {
                    text: 'Jā, shutdown',
                    handler: function () {
                        _this.backendData.shutdownServer().then(function (data) {
                            _this.showToast(data.message);
                        }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    ConfigurationPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top'
        });
        toast.present(toast);
    };
    ConfigurationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-configuration',template:/*ion-inline-start:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/configuration/configuration.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Uzstādījumi</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-10 col-sm-8 col-md-8 col-lg-8 col-xl-6>\n\n        <ion-item>\n\n          <ion-label floating>Server URL</ion-label>\n\n          <ion-input type="text" [(ngModel)]="ServerURL"></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n      <ion-col col-2 col-sm-4 col-md-4 col-lg-4 col-xl-6>\n\n          <button ion-button   (click)="saveSettings()" >Saglabāt</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n    <!--  <ion-item>\n\n          <ion-label> Sinhronizēt ar WEB</ion-label>\n\n          <ion-toggle [(ngModel)]="SyncON" ></ion-toggle>\n\n        </ion-item>\n\n    -->\n\n    <ion-card>\n\n      <ion-card-header>\n\n        Rīki\n\n      </ion-card-header>\n\n        <ion-card-content>\n\n        <button (click)="reboot_server()" ion-button>Restart</button>\n\n        <button (click)="shutdown_server()" ion-button>Shutdown</button>\n\n        <button ion-button>(todo) Import data</button>\n\n        <button ion-button>(todo) Export data</button>\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n\n\n    <ion-card>\n\n      <ion-card-header>\n\n        Drukāšanas parametri\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n          <ion-list>\n\n            <ion-item>\n\n              <ion-label floating>Gads/partija</ion-label>\n\n              <ion-input type="text" [(ngModel)]="GadsPartija" ></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>Line 1</ion-label>\n\n              <ion-input type="text" [(ngModel)]="Line1"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>Line 2</ion-label>\n\n              <ion-input type="text" [(ngModel)]="Line2"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>Line 3</ion-label>\n\n              <ion-input type="text" [(ngModel)]="Line3"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>Line 4</ion-label>\n\n              <ion-input type="text" [(ngModel)]="Line4"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>Kreisā atkāpe</ion-label>\n\n              <ion-input type="text" [(ngModel)]="lmargin"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>Atstarpe starp izdrukām (Advances the vertical print position n/216 inch  = n/0,334 mm)</ion-label>\n\n              <ion-input type="text" [(ngModel)]="gap_after_label"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>Scroll parametrs (n/216 inch = n/0,334 mm)</ion-label>\n\n              <ion-input type="text" [(ngModel)]="scroll_parameter"></ion-input>\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n\n\n          <button ion-button  full (click)="saveSettings()" >Saglabāt</button>\n\n\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/configuration/configuration.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_backend_data__["a" /* BackendData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ConfigurationPage);
    return ConfigurationPage;
}());

//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(355);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_product_product__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_configuration_configuration__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_backend_data__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_product_product__["a" /* ProductPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_configuration_configuration__["a" /* ConfigurationPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_product_product__["a" /* ProductPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_configuration_configuration__["a" /* ConfigurationPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_backend_data__["a" /* BackendData */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_product_product__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_configuration_configuration__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Drukāt', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Saraksts', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Šķirnes dati', component: __WEBPACK_IMPORTED_MODULE_6__pages_product_product__["a" /* ProductPage */] },
            { title: 'Uzstādījumi', component: __WEBPACK_IMPORTED_MODULE_7__pages_configuration_configuration__["a" /* ConfigurationPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.go_to_homepage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.go_to_list = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]);
    };
    MyApp.prototype.go_to_config = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_configuration_configuration__["a" /* ConfigurationPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/user/print_app/label-pirint-app/ionic_gui/src/app/app.html"*/'<ion-split-pane>\n<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item (click)="go_to_homepage()">\n        Drukāt\n      </button>\n      <button menuClose ion-item (click)="go_to_list()">\n        Saraksts\n      </button>\n      <button menuClose ion-item (click)="go_to_config()">\n        Uzstādījumi\n      </button>\n<!--\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n-->\n\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main></ion-nav>\n</ion-split-pane>\n'/*ion-inline-end:"/home/user/print_app/label-pirint-app/ionic_gui/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(680);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the BackendData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var BackendData = (function () {
    function BackendData(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.message = "I'm new here";
        // main page form data
        this.mainId = 0;
        this.mainTitle = "";
        this.mainBot_nosaukums = "";
        this.mainPotcelms = "";
        this.mainKategorija = "";
        this.mainSkira = "";
        this.mainDaudzums = "";
        this.mainSkaits = "";
        this.mainSkaitsFavoriiti = "";
        this.print_queue_status = "";
        this._options = { headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpHeaders */]({ 'Content-Type': 'application/json' }) };
        this.ServerURLDefault = "http://localhost";
        this.ServerURL = null;
        this.queueToday = [];
        this.queueOld = [];
        setInterval(function (data) {
            _this.getQueueToday();
        }, 1000);
        // Or to get a key/value pair
    }
    BackendData.prototype.setMessage = function (message) {
        this.message = message;
    };
    BackendData.prototype.getServerURL = function () {
        //  if (this.ServerURL == null) {
        return this.storage.get('storedServerURL');
        //    }
        //  else {
        //    return this.ServerURL;
        //  }
    };
    BackendData.prototype.setServerURL = function (val) {
        if (val != '' && val != null) {
            this.ServerURL = val;
        }
        else {
            this.ServerURL = this.ServerURLDefault;
        }
    };
    BackendData.prototype.getMainFormData = function () {
        // get main data from Server
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "get_main_data"
        };
        console.log('get main form data from ' + this.ServerURL);
        //return   this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters), headers)
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.getListData = function () {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "get_sort_list"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.getListDataFavourites = function () {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "get_sort_list_favourites"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.saveSortData = function (request_data) {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "save_sort_data",
            request_data: request_data
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.scroll_paper = function (request_data) {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "scroll_paper",
            request_data: request_data
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.cancel_print_job = function (request_data) {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "cancel_print_job",
            request_data: request_data
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.getPotcelmuSuggestions = function () {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "get_potcelms_suggestions"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.getConfigData = function () {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "get_config_data"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.saveConfigData = function (request_data) {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "save_config_data",
            request_data: request_data
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.printLabel = function (request_data) {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "print_label",
            request_data: request_data
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.rebootServer = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "reboot_server"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.shutdownServer = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "shutdown_server"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.getQueueToday = function () {
        var _this = this;
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "get_print_list_today"
        };
        this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise().then(function (data) {
            _this.queueToday = data;
            console.log("list loaded");
        }, function (err) { return console.log(err); });
        // get queue tmp_status
        var headers2 = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters2 = {
            request_type: "get_queue_status"
        };
        this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters2))
            .map(function (data) { return data.json(); })
            .toPromise().then(function (data) {
            _this.print_queue_status = data.queue_status;
            console.log("print_queue_status loaded");
        }, function (err) { return console.log(err); });
    };
    BackendData.prototype.update_queue = function () {
        // get default data from Server
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var post_parameters = {
            request_type: "update_queue"
        };
        return this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    BackendData.prototype.getQueueHistory = function () {
        var _this = this;
        if (this.queueOld.length < 1) {
            // get default data from Server
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            var post_parameters = {
                request_type: "get_print_list_history"
            };
            this.http.post(this.ServerURL + '/print_app_API.php', JSON.stringify(post_parameters))
                .map(function (data) { return data.json(); })
                .toPromise().then(function (data) {
                _this.queueOld = data;
                console.log("list loaded");
            }, function (err) { return console.log(err); });
        }
    };
    BackendData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], BackendData);
    return BackendData;
}());

//# sourceMappingURL=backend-data.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_product__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_backend_data__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListPage = (function () {
    function ListPage(navCtrl, navParams, backendData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.backendData = backendData;
        this.searchTerm = '';
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.GetItemsFromBackend();
    }
    ListPage.prototype.GetItemsFromBackend = function () {
        var _this = this;
        this.backendData.getListDataFavourites().then(function (data) {
            _this.itemsFavourites = data;
            _this.itemsFavourites_local_backup = _this.itemsFavourites;
        }, function (err) { return console.log(err); });
        this.backendData.getListData().then(function (data) {
            _this.items = data;
            _this.items_local_backup = _this.items;
        }, function (err) { return console.log(err); });
    };
    ListPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], {
            item: item
        });
    };
    ListPage.prototype.edit_product = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__product_product__["a" /* ProductPage */], {
            item: item
        });
    };
    ListPage.prototype.new_product = function (event) {
        var new_item = { id: 0, title: "", bot_nosaukums: "", potcelms: "" };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__product_product__["a" /* ProductPage */], {
            item: new_item
        });
    };
    ListPage.prototype.searchItems = function (event) {
        // search and update the list
        // Reset items back to all of the items
        this.items = this.items_local_backup;
        this.itemsFavourites = this.itemsFavourites_local_backup;
        // set val to the value of the ev target
        var val = this.searchTerm;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        if (val && val.trim() != '') {
            this.itemsFavourites = this.itemsFavourites.filter(function (item) {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <button ion-button  icon-left  (click)="new_product($event)">\n        <ion-icon name="add"></ion-icon>\n            Pievienot jaunu / Add\n        </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="searchItems($event)"></ion-searchbar>\n  <ion-item-group>\n    <ion-item-divider color="light">Favorīti</ion-item-divider>\n\n    <ion-item *ngFor="let item of itemsFavourites" >\n      <h1 (click)="itemTapped($event, item)">{{item.title}}</h1>\n      <h2 (click)="itemTapped($event, item)">{{item.bot_nosaukums}}{{item.potcelms}}</h2>\n        <div class="buttons" item-right>\n            <button ion-button  (click)="edit_product($event, item)">Rediģēt</button>\n        </div>\n    </ion-item>\n </ion-item-group>\n\n <ion-item-group>\n   <ion-item-divider color="light">Visi</ion-item-divider>\n   <ion-item *ngFor="let item of items" >\n     <h1 (click)="itemTapped($event, item)">{{item.title}}</h1>\n     <h2 (click)="itemTapped($event, item)">{{item.bot_nosaukums}}{{item.potcelms}}</h2>\n       <div class="buttons" item-right>\n           <button ion-button  (click)="edit_product($event, item)">Rediģēt</button>\n       </div>\n   </ion-item>\n\n </ion-item-group>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/user/print_app/label-pirint-app/ionic_gui/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_backend_data__["a" /* BackendData */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ })

},[350]);
//# sourceMappingURL=main.js.map