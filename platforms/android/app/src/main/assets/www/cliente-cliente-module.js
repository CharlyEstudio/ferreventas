(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cliente-cliente-module"],{

/***/ "./src/app/cliente/cliente.module.ts":
/*!*******************************************!*\
  !*** ./src/app/cliente/cliente.module.ts ***!
  \*******************************************/
/*! exports provided: ClientePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientePageModule", function() { return ClientePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _cliente_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cliente.page */ "./src/app/cliente/cliente.page.ts");







var routes = [
    {
        path: '',
        component: _cliente_page__WEBPACK_IMPORTED_MODULE_6__["ClientePage"]
    }
];
var ClientePageModule = /** @class */ (function () {
    function ClientePageModule() {
    }
    ClientePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_cliente_page__WEBPACK_IMPORTED_MODULE_6__["ClientePage"]]
        })
    ], ClientePageModule);
    return ClientePageModule;
}());



/***/ }),

/***/ "./src/app/cliente/cliente.page.html":
/*!*******************************************!*\
  !*** ./src/app/cliente/cliente.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"\">\r\n        <ion-buttons slot=\"start\">\r\n            <ion-back-button></ion-back-button>\r\n        </ion-buttons>\r\n        <ion-title>Información del Cliente</ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content color=\"\">\r\n\r\n    <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\r\n        <ion-fab-button color=\"danger\">\r\n            <ion-icon name=\"open\"></ion-icon>\r\n        </ion-fab-button>\r\n        <ion-fab-list side=\"top\">\r\n            <ion-fab-button color=\"danger\" (click)=\"llamar(dato)\">\r\n                <ion-icon name=\"call\"></ion-icon>\r\n            </ion-fab-button>\r\n        </ion-fab-list>\r\n        <ion-fab-list side=\"start\">\r\n            <ion-fab-button (click)=\"irA(dato)\">\r\n                <ion-icon name=\"locate\"></ion-icon>\r\n            </ion-fab-button>\r\n        </ion-fab-list>\r\n    </ion-fab>\r\n\r\n    <ion-card class=\"welcome-card\" color=\"light\">\r\n        <ion-img [src]=\"'https://ferremayoristas.com.mx/assets/clientes/' + dato.img\"></ion-img>\r\n        <ion-card-header>\r\n            <ion-card-subtitle>\r\n                <ion-icon name=\"radio-button-on\" color=\"success\" *ngIf=\"dato.activo === 1\"></ion-icon>\r\n                <ion-icon name=\"radio-button-on\" color=\"danger\" *ngIf=\"dato.activo === 0\"></ion-icon>\r\n                #{{dato.numero}} {{dato.nombre}}\r\n                <br>\r\n                <ion-badge color=\"danger\">{{ dato.membresia }}</ion-badge>\r\n                <br>\r\n                <small>{{dato.lat}} / {{dato.lng}}</small>\r\n            </ion-card-subtitle>\r\n            <ion-card-title>\r\n                <small class=\"small-titulo\">COMERCIO</small>\r\n                <br> {{dato.comercio}}\r\n            </ion-card-title>\r\n            <ion-card-subtitle>\r\n                <small class=\"small-titulo\">DIRECCION</small>\r\n                <br> {{dato.domicilio}}\r\n            </ion-card-subtitle>\r\n            <ion-card-subtitle>\r\n                <small class=\"small-titulo\">EMAIL REGISTRADO</small>\r\n                <br> {{dato.email}}\r\n            </ion-card-subtitle>\r\n        </ion-card-header>\r\n        <ion-card-content>\r\n            <ion-badge color=\"danger\">Ultima Compra: {{ dato.ultima }}</ion-badge>\r\n        </ion-card-content>\r\n    </ion-card>\r\n\r\n    <ion-list lines=\"none\">\r\n        <ion-list-header color=\"\">\r\n            <ion-label>Información</ion-label>\r\n        </ion-list-header>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"list-box\"></ion-icon>\r\n            <ion-label>\r\n                <ion-badge color=\"danger\" *ngIf=\"dato.vencidos > 0\">Facturas Vencidas {{ dato.vencidos }}</ion-badge>\r\n                <ion-badge color=\"success\" *ngIf=\"dato.vencidos === 0\">Facturas Vencidas {{ dato.vencidos }}</ion-badge>\r\n            </ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"checkmark-circle-outline\"></ion-icon>\r\n            <ion-label>\r\n                <ion-badge color=\"success\" *ngIf=\"(dato.limite - dato.saldo) > 0\">Disponible {{ (dato.limite - dato.saldo) | currency }}</ion-badge>\r\n                <ion-badge color=\"danger\" *ngIf=\"(dato.limite - dato.saldo) <= 0\">Disponible {{ (dato.limite - dato.saldo) | currency }}</ion-badge>\r\n            </ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"code-working\"></ion-icon>\r\n            <ion-label>\r\n                <ion-badge color=\"danger\">Días de Crédito {{ dato.dias }}</ion-badge>\r\n            </ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"wallet\"></ion-icon>\r\n            <ion-label>\r\n                <ion-badge color=\"danger\" *ngIf=\"dato.saldo > 0\">Saldo {{ dato.saldo | currency }}</ion-badge>\r\n                <ion-badge color=\"success\" *ngIf=\"dato.saldo === 0\">Saldo {{ dato.saldo | currency }}</ion-badge>\r\n            </ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"hammer\"></ion-icon>\r\n            <ion-label>\r\n                <ion-badge color=\"medium\">Límite {{ dato.limite | currency }}</ion-badge>\r\n            </ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"pricetag\"></ion-icon>\r\n            <ion-label>\r\n                <ion-badge color=\"medium\">Forma de Pago {{ dato.forpag }}</ion-badge>\r\n            </ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\" (click)=\"enviarComentario()\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"mail\"></ion-icon>\r\n            <ion-label>Enviar un comentario</ion-label>\r\n        </ion-item>\r\n    </ion-list>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/cliente/cliente.page.scss":
/*!*******************************************!*\
  !*** ./src/app/cliente/cliente.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-title {\n  font-size: 14px; }\n\nion-list {\n  padding-top: 0px;\n  padding-bottom: 0px; }\n\n.img-cli {\n  width: 100%; }\n\n.small-titulo {\n  font-size: 8px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2xpZW50ZS9DOlxcVXNlcnNcXERlc2Fycm9sbG9cXERvY3VtZW50c1xcQVBQU1xcdmlzb3Ivc3JjXFxhcHBcXGNsaWVudGVcXGNsaWVudGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBZSxFQUFBOztBQUduQjtFQUNJLGdCQUFnQjtFQUNoQixtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxXQUFXLEVBQUE7O0FBR2Y7RUFDSSxjQUFjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jbGllbnRlL2NsaWVudGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuaW9uLWxpc3Qge1xyXG4gICAgcGFkZGluZy10b3A6IDBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwcHg7XHJcbn1cclxuXHJcbi5pbWctY2xpIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uc21hbGwtdGl0dWxvIHtcclxuICAgIGZvbnQtc2l6ZTogOHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/cliente/cliente.page.ts":
/*!*****************************************!*\
  !*** ./src/app/cliente/cliente.page.ts ***!
  \*****************************************/
/*! exports provided: ClientePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientePage", function() { return ClientePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/call-number/ngx */ "./node_modules/@ionic-native/call-number/ngx/index.js");



// Plugins

var ClientePage = /** @class */ (function () {
    function ClientePage(router, route, callNumber) {
        this.router = router;
        this.route = route;
        this.callNumber = callNumber;
        this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
    }
    ClientePage.prototype.ngOnInit = function () {
    };
    ClientePage.prototype.irA = function (dato) {
        this.route.navigate(['viajar', JSON.stringify(dato)]);
    };
    ClientePage.prototype.llamar = function (dato) {
        console.log('Estoy llamando...' + dato.tel);
        this.callNumber.callNumber(dato.tel, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    ClientePage.prototype.enviarComentario = function () {
        this.route.navigate(['/modal', JSON.stringify(this.dato)]);
    };
    ClientePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cliente',
            template: __webpack_require__(/*! ./cliente.page.html */ "./src/app/cliente/cliente.page.html"),
            styles: [__webpack_require__(/*! ./cliente.page.scss */ "./src/app/cliente/cliente.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_3__["CallNumber"]])
    ], ClientePage);
    return ClientePage;
}());



/***/ })

}]);
//# sourceMappingURL=cliente-cliente-module.js.map