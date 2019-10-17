(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"],{

/***/ "./src/app/tab2/tab2.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.module.ts ***!
  \*************************************/
/*! exports provided: Tab2PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function() { return Tab2PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab2.page */ "./src/app/tab2/tab2.page.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");







// Maps

var Tab2PageModule = /** @class */ (function () {
    function Tab2PageModule() {
    }
    Tab2PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"] }]),
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyApgyf9zpctTzuckqSRRYiA9wgrVKeWGFY'
                })
            ],
            declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"]]
        })
    ], Tab2PageModule);
    return Tab2PageModule;
}());



/***/ }),

/***/ "./src/app/tab2/tab2.page.html":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"\">\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"ws.socketStatus\">\r\n            ServerOn\r\n            <ion-icon color=\"success\" name=\"disc\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"!ws.socketStatus\">\r\n            ServerOff\r\n            <ion-icon color=\"danger\" name=\"disc\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-title>\r\n            Ruta\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content text-center color=\"\" *ngIf=\"lat === 0 && estado\">\r\n\r\n    <h1 class=\"sin-datos\">Obteniendo los datos</h1>\r\n\r\n</ion-content>\r\n\r\n<ion-content text-center color=\"\" *ngIf=\"!estado\">\r\n\r\n    <h1 class=\"sin-datos\">Estas en modo Off Line</h1>\r\n\r\n</ion-content>\r\n\r\n<ion-content color=\"\" *ngIf=\"lat > 0\">\r\n\r\n    <agm-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"8\" [panControl]=\"panControl\" [mapTypeControl]=\"mapTypeControl\" (mapReady)=\"doSomethingWithTheMapInstance($event)\">\r\n        <agm-marker *ngFor=\"let cli of clientes\" [latitude]=\"cli.lat\" [longitude]=\"cli.lng\"></agm-marker>\r\n        <agm-kml-layer></agm-kml-layer>\r\n    </agm-map>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/tab2/tab2.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 100%; }\n\n.sin-datos {\n  position: relative;\n  top: 40%;\n  bottom: 50%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFiMi9DOlxcVXNlcnNcXERlc2Fycm9sbG9cXERvY3VtZW50c1xcQVBQU1xcdmlzb3Ivc3JjXFxhcHBcXHRhYjJcXHRhYjIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBWSxFQUFBOztBQUdoQjtFQUNJLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdGFiMi90YWIyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFnbS1tYXAge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uc2luLWRhdG9zIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDogNDAlO1xyXG4gICAgYm90dG9tOiA1MCU7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/tab2/tab2.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab2/tab2.page.ts ***!
  \***********************************/
/*! exports provided: Tab2Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2Page", function() { return Tab2Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _services_ws_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/ws.service */ "./src/app/services/ws.service.ts");


// Servicios


var Tab2Page = /** @class */ (function () {
    function Tab2Page(usuario, ws) {
        var _this = this;
        this.usuario = usuario;
        this.ws = ws;
        this.clientes = [];
        this.lat = 0;
        this.lng = 0;
        this.estado = true;
        this.panControl = true;
        this.mapTypeControl = true;
        this.usuario.getLocalData('cliente').then(function (cli) {
            _this.clientes = cli;
            var indice = Math.round(_this.clientes.length / 2);
            _this.lat = _this.clientes[indice].lat;
            _this.lng = _this.clientes[indice].lng;
        });
    }
    Tab2Page.prototype.doSomethingWithTheMapInstance = function (event) {
        console.log(event);
    };
    Tab2Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tab2',
            template: __webpack_require__(/*! ./tab2.page.html */ "./src/app/tab2/tab2.page.html"),
            styles: [__webpack_require__(/*! ./tab2.page.scss */ "./src/app/tab2/tab2.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_usuario_service__WEBPACK_IMPORTED_MODULE_2__["UsuarioService"],
            _services_ws_service__WEBPACK_IMPORTED_MODULE_3__["WsService"]])
    ], Tab2Page);
    return Tab2Page;
}());



/***/ })

}]);
//# sourceMappingURL=tab2-tab2-module.js.map