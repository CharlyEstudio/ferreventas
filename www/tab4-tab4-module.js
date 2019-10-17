(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab4-tab4-module"],{

/***/ "./src/app/tab4/tab4.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab4/tab4.module.ts ***!
  \*************************************/
/*! exports provided: Tab4PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab4PageModule", function() { return Tab4PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tab4_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab4.page */ "./src/app/tab4/tab4.page.ts");







var routes = [
    {
        path: '',
        component: _tab4_page__WEBPACK_IMPORTED_MODULE_6__["Tab4Page"]
    }
];
var Tab4PageModule = /** @class */ (function () {
    function Tab4PageModule() {
    }
    Tab4PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_tab4_page__WEBPACK_IMPORTED_MODULE_6__["Tab4Page"]]
        })
    ], Tab4PageModule);
    return Tab4PageModule;
}());



/***/ }),

/***/ "./src/app/tab4/tab4.page.html":
/*!*************************************!*\
  !*** ./src/app/tab4/tab4.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n      <ion-buttons padding slot=\"end\" *ngIf=\"ws.socketStatus\">\n          ServerOn\n          <ion-icon color=\"success\" name=\"disc\"></ion-icon>\n      </ion-buttons>\n      <ion-buttons padding slot=\"end\" *ngIf=\"!ws.socketStatus\">\n          ServerOff\n          <ion-icon color=\"danger\" name=\"disc\"></ion-icon>\n      </ion-buttons>\n    <ion-title>Tablero</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"obtenerInfo(true, $event)\">\n      <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Deslice para Actualizar\" refreshingSpinner=\"circles\" refreshingText=\"Actualizando...\">\n      </ion-refresher-content>\n    </ion-refresher>\n\n    <ion-card class=\"welcome-card\" color=\"light\">\n      <ion-card-header>\n        <ion-card-title>\n          <ion-card-title>\n            <ion-grid>\n              <ion-row>\n                <ion-col size=\"6\" class=\"titulo-pedido\">\n                  Bajar\n                </ion-col>\n                <ion-col text-right size=\"6\" class=\"cantidad\">\n                  {{ porBajar }}\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-title>\n        </ion-card-title>\n      </ion-card-header>\n    </ion-card>\n\n    <ion-card class=\"welcome-card\" color=\"dark\">\n        <ion-card-header>\n          <ion-card-title>\n            <ion-grid>\n              <ion-row>\n                <ion-col size=\"6\" class=\"titulo-pedido\">\n                  Surtir\n                </ion-col>\n                <ion-col text-right size=\"6\" class=\"cantidad\">\n                  {{ porSurtir }}\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-title>\n        </ion-card-header>\n    </ion-card>\n\n    <ion-card class=\"welcome-card\" color=\"success\">\n      <ion-card-header>\n        <ion-card-title>\n          <ion-card-title>\n            <ion-grid>\n              <ion-row>\n                <ion-col size=\"6\" class=\"titulo-pedido\">\n                  Facturados\n                </ion-col>\n                <ion-col text-right size=\"6\" class=\"cantidad\">\n                  {{ facturado }}\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-title>\n        </ion-card-title>\n      </ion-card-header>\n    </ion-card>\n\n    <ion-card class=\"welcome-card\" color=\"danger\">\n      <ion-card-header>\n        <ion-card-title>\n          <ion-card-title>\n            <ion-grid>\n              <ion-row>\n                <ion-col size=\"6\" class=\"titulo-pedido\">\n                  Cancelados\n                </ion-col>\n                <ion-col text-right size=\"6\" class=\"cantidad\">\n                  {{ cancelado }}\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-title>\n        </ion-card-title>\n      </ion-card-header>\n    </ion-card>\n\n    <ion-list lines=\"none\">\n        <ion-list-header color=\"\">\n            <ion-label>Pedidos vs Clientes</ion-label>\n        </ion-list-header>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"barcode\"></ion-icon>\n            <ion-label>Total</ion-label>\n            <ion-badge color=\"dark\" slot=\"end\">{{ totalPed }}</ion-badge>\n            <ion-badge color=\"dark\" slot=\"end\">{{ totalPedImpo | currency }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"people\"></ion-icon>\n            <ion-label>Clientes Día</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ diaVis }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"checkmark-circle-outline\"></ion-icon>\n            <ion-label>Pedidos Día</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ pedidosDia }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"done-all\"></ion-icon>\n            <ion-label>Pedidos Diferente Día</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ pedidosDiaDif }}</ion-badge>\n        </ion-item>\n    </ion-list>\n\n    <ion-list lines=\"none\">\n        <ion-list-header color=\"\">\n            <ion-label>Ventas & Crédito</ion-label>\n        </ion-list-header>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"briefcase\"></ion-icon>\n            <ion-label>Cartera Total</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ carteraTot | currency }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"close-circle-outline\"></ion-icon>\n            <ion-label>Cartera Vencida</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ carteraVen | currency }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"cloud-upload\"></ion-icon>\n            <ion-label>Cartera Día Sana</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ carteraDiaSana | currency }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"cloud-download\"></ion-icon>\n            <ion-label>Cartera Día Vencida</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ carteraDiaVenc | currency }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"calculator\"></ion-icon>\n            <ion-label>Cobro Día</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ cobroDia | currency }}</ion-badge>\n        </ion-item>\n    </ion-list>\n\n    <ion-list lines=\"none\">\n        <ion-list-header color=\"\">\n            <ion-label>Actual vs Anterior {{ fecha | date:'yyyy' }}</ion-label>\n        </ion-list-header>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"return-right\"></ion-icon>\n            <ion-label>Mes Actual</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ ventaMes | currency }}</ion-badge>\n        </ion-item>\n        <ion-item color=\"\">\n            <ion-icon slot=\"start\" color=\"medium\" name=\"return-left\"></ion-icon>\n            <ion-label>Mes Anterior</ion-label>\n            <ion-badge color=\"danger\" slot=\"end\">{{ ventaMesAnt | currency }}</ion-badge>\n        </ion-item>\n    </ion-list>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/tab4/tab4.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab4/tab4.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".cantidad {\n  font-size: 2.5rem;\n  font-weight: 700; }\n\n.titulo-pedido {\n  font-size: 1.5rem;\n  font-weight: 700; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFiNC9DOlxcVXNlcnNcXERlc2Fycm9sbG9cXERvY3VtZW50c1xcQVBQU1xcdmlzb3Ivc3JjXFxhcHBcXHRhYjRcXHRhYjQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQWlCO0VBQ2pCLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLGlCQUFpQjtFQUNqQixnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3RhYjQvdGFiNC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FudGlkYWQge1xyXG4gICAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG59XHJcblxyXG4udGl0dWxvLXBlZGlkbyB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/tab4/tab4.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab4/tab4.page.ts ***!
  \***********************************/
/*! exports provided: Tab4Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab4Page", function() { return Tab4Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_ws_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/ws.service */ "./src/app/services/ws.service.ts");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/usuario.service */ "./src/app/services/usuario.service.ts");



// Servicios


var Tab4Page = /** @class */ (function () {
    function Tab4Page(plt, ws, usuario) {
        this.plt = plt;
        this.ws = ws;
        this.usuario = usuario;
        this.fecha = Date.now();
    }
    Tab4Page.prototype.ngOnInit = function () {
        var _this = this;
        this.plt.ready().then(function () {
            _this.obtenerInfo(true);
        });
    };
    Tab4Page.prototype.obtenerInfo = function (refresh, refresher) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.usuario.getLocalData('usuario').then(function (user) {
            var id;
            if (_this.plt.is('cordova')) {
                id = user.idFerrum;
            }
            else {
                id = 6;
            }
            _this.usuario.porBajar(refresh, id).subscribe(function (bajar) {
                _this.porBajar = bajar[0].cantidad;
            }, function (err) { return console.log(err.message); });
            _this.usuario.porSurtir(refresh, id).subscribe(function (surtir) {
                _this.porSurtir = surtir[0].cantidad;
            });
            _this.usuario.facturado(refresh, id).subscribe(function (factura) {
                _this.facturado = factura[0].cantidad;
            });
            _this.usuario.cancelado(refresh, id).subscribe(function (cancela) {
                _this.cancelado = cancela[0].cantidad;
            });
            _this.usuario.pedidosTotales(refresh, id).subscribe(function (pedTot) {
                _this.totalPed = pedTot[0].cantidad;
                _this.totalPedImpo = pedTot[0].importe;
            });
            _this.usuario.diaVisita(refresh, id).subscribe(function (diavis) {
                _this.diaVis = diavis[0].cantidad;
            });
            _this.usuario.pedidosDia(refresh, id).subscribe(function (peddia) {
                _this.pedidosDia = peddia.length;
            });
            _this.usuario.pedDiaDiferente(refresh, id).subscribe(function (peddiadif) {
                _this.pedidosDiaDif = peddiadif.length;
            });
            _this.usuario.carteraTotal(refresh, id).subscribe(function (carteraTot) {
                _this.carteraTot = carteraTot[0].saldo;
            });
            _this.usuario.carteraVencida(refresh, id).subscribe(function (carteraVen) {
                _this.carteraVen = carteraVen[0].importe;
            });
            _this.usuario.carteraDiaSana(refresh, id).subscribe(function (carteraDiaSana) {
                _this.carteraDiaSana = carteraDiaSana[0].importe;
            });
            _this.usuario.carteraDiaVencida(refresh, id).subscribe(function (carteraDiaVenc) {
                _this.carteraDiaVenc = carteraDiaVenc[0].importe;
            });
            _this.usuario.cobroDia(refresh, id).subscribe(function (cobroDia) {
                _this.cobroDia = cobroDia[0].importe;
            });
            _this.usuario.ventaMensual(refresh, id).subscribe(function (ventaMes) {
                _this.ventaMes = ventaMes[0].subtotal;
            });
            _this.usuario.ventaMesAnterior(refresh, id).subscribe(function (ventaMesAnt) {
                _this.ventaMesAnt = ventaMesAnt[0].importe;
            });
        });
        if (refresher) {
            refresher.target.complete();
        }
    };
    Tab4Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tab4',
            template: __webpack_require__(/*! ./tab4.page.html */ "./src/app/tab4/tab4.page.html"),
            styles: [__webpack_require__(/*! ./tab4.page.scss */ "./src/app/tab4/tab4.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _services_ws_service__WEBPACK_IMPORTED_MODULE_3__["WsService"],
            _services_usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"]])
    ], Tab4Page);
    return Tab4Page;
}());



/***/ })

}]);
//# sourceMappingURL=tab4-tab4-module.js.map