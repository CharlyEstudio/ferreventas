(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab1-tab1-module"],{

/***/ "./src/app/services/imei.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/imei.service.ts ***!
  \******************************************/
/*! exports provided: ImeiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImeiService", function() { return ImeiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_uid_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/uid/ngx */ "./node_modules/@ionic-native/uid/ngx/index.js");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "./node_modules/@ionic-native/android-permissions/ngx/index.js");





var ImeiService = /** @class */ (function () {
    function ImeiService(uid, androidPermissions, tstController) {
        this.uid = uid;
        this.androidPermissions = androidPermissions;
        this.tstController = tstController;
    }
    ImeiService.prototype.getImeiN = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var hasPermission, result, toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)];
                    case 1:
                        hasPermission = (_a.sent()).hasPermission;
                        if (!!hasPermission) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)];
                    case 2:
                        result = _a.sent();
                        if (!result.hasPermission) {
                            toast = this.tstController.create({
                                message: 'No se dio permiso',
                                duration: 2000,
                                position: 'middle'
                            });
                            toast.then(function (to) { to.present(); });
                        }
                        // ok, a user gave us permission, we can get him identifiers after restart app
                        return [2 /*return*/];
                    case 3: return [2 /*return*/, this.uid.IMEI];
                }
            });
        });
    };
    ImeiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_uid_ngx__WEBPACK_IMPORTED_MODULE_3__["Uid"],
            _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_4__["AndroidPermissions"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"]])
    ], ImeiService);
    return ImeiService;
}());



/***/ }),

/***/ "./src/app/tab1/tab1.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.module.ts ***!
  \*************************************/
/*! exports provided: Tab1PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageModule", function() { return Tab1PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab1.page */ "./src/app/tab1/tab1.page.ts");







var Tab1PageModule = /** @class */ (function () {
    function Tab1PageModule() {
    }
    Tab1PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab1_page__WEBPACK_IMPORTED_MODULE_6__["Tab1Page"] }])
            ],
            declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_6__["Tab1Page"]]
        })
    ], Tab1PageModule);
    return Tab1PageModule;
}());



/***/ }),

/***/ "./src/app/tab1/tab1.page.html":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"\">\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"ws.socketStatus\">\r\n            On\r\n            <ion-icon color=\"success\" name=\"disc\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"!ws.socketStatus\">\r\n            Off\r\n            <ion-icon color=\"danger\" name=\"disc\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"tipo === '4G'\">\r\n            {{tipo}}\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"tipo === 'WiFi'\">\r\n            <ion-icon color=\"success\" name=\"wifi\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"tipo === 'Ethernet'\">\r\n            {{tipo}}\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"tipo !== '4G' && tipo !== 'WiFi' && tipo !== 'Ethernet'\">\r\n            NoData\r\n            <ion-icon color=\"danger\" name=\"radio-button-off\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-title>\r\n            <small>\r\n                {{imei}}\r\n            </small>\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content color=\"\">\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh(true, $event)\">\r\n        <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Deslice para Actualizar\" refreshingSpinner=\"circles\" refreshingText=\"Actualizando...\">\r\n        </ion-refresher-content>\r\n    </ion-refresher>\r\n    <ion-card class=\"welcome-card\" color=\"light\" *ngIf=\"message !== ''\">\r\n        <ion-img src=\"/assets/fondo4.jpg\"></ion-img>\r\n        <ion-card-header>\r\n            <ion-card-subtitle>Noticias del Día</ion-card-subtitle>\r\n            <ion-card-title>Mensaje de {{ current }}</ion-card-title>\r\n        </ion-card-header>\r\n        <ion-card-content>\r\n            <p>{{ message }}</p>\r\n        </ion-card-content>\r\n    </ion-card>\r\n    <ion-card class=\"welcome-card\" color=\"light\">\r\n        <ion-img src=\"/assets/fondo3.jpg\"></ion-img>\r\n        <ion-card-header class=\"tipo-lista\">\r\n            <ion-list lines=\"none\">\r\n                <ion-list-header color=\"light\">\r\n                    <ion-label>\r\n                        <small>\r\n                            <ion-badge color=\"danger\" *ngIf=\"client.length === 0\">{{ msg }}</ion-badge>\r\n                            <ion-badge color=\"success\" *ngIf=\"client.length !== 0\">{{ msg }}</ion-badge>\r\n                        </small>\r\n                    </ion-label>\r\n                </ion-list-header>\r\n            </ion-list>\r\n        </ion-card-header>\r\n        <!-- <ion-card-content class=\"lista-clientes\">\r\n            <ion-button color=\"success\" (click)=\"verLocal()\">Local</ion-button>\r\n            <ion-button color=\"danger\" (click)=\"borrarStorage()\">Borrar</ion-button>\r\n            <ion-virtual-scroll [items]=\"local\">\r\n                <ion-item color=\"light\" *virtualItem=\"let loc\">\r\n                    <ion-label class=\"cliente-nombre\"># {{ loc.numero }} - {{ loc.fecha }} - {{ loc.hora }} - {{ loc.accion }}</ion-label>\r\n                </ion-item>\r\n            </ion-virtual-scroll>\r\n        </ion-card-content> -->\r\n        <ion-card-content class=\"lista-clientes\">\r\n            <ion-virtual-scroll [items]=\"client\">\r\n                <ion-item color=\"light\" *virtualItem=\"let cli\" (click)=\"irA(cli)\">\r\n                    <ion-icon slot=\"start\" color=\"danger\" name=\"contact\" *ngIf=\"cli.tipoVis === 'cobro'\"></ion-icon>\r\n                    <ion-icon slot=\"start\" color=\"tertiary\" name=\"contact\" *ngIf=\"cli.tipoVis === 'venta'\"></ion-icon>\r\n                    <ion-icon slot=\"start\" color=\"success\" name=\"contact\" *ngIf=\"cli.tipoVis === 'ambas'\"></ion-icon>\r\n                    <ion-icon slot=\"start\" color=\"primary\" name=\"contact\" *ngIf=\"cli.tipoVis === 'ninguna'\"></ion-icon>\r\n                    <ion-icon slot=\"start\" color=\"medium\" name=\"contact\" *ngIf=\"cli.tipoVis === 'not'\"></ion-icon>\r\n                    <ion-label class=\"cliente-nombre\"># {{ cli.numero }} {{ cli.nombre }}</ion-label>\r\n                </ion-item>\r\n            </ion-virtual-scroll>\r\n        </ion-card-content>\r\n    </ion-card>\r\n    <ion-list lines=\"none\">\r\n        <ion-list-header color=\"\">\r\n            <ion-label>Utilidades</ion-label>\r\n        </ion-list-header>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"book\"></ion-icon>\r\n            <ion-label>Manual del Asesor</ion-label>\r\n        </ion-item>\r\n        <ion-item color=\"\">\r\n            <ion-icon slot=\"start\" color=\"medium\" name=\"build\"></ion-icon>\r\n            <ion-label>Reportar un problema</ion-label>\r\n        </ion-item>\r\n    </ion-list>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/tab1/tab1.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card ion-img {\n  max-height: 35vh;\n  overflow: hidden; }\n\nion-card-header.tipo-lista {\n  padding-top: 10px !important;\n  padding-bottom: 6px !important; }\n\nion-card-content.lista-clientes {\n  padding-top: 0px !important; }\n\nion-list {\n  padding-top: 0px;\n  padding-bottom: 0px;\n  margin-bottom: 8px; }\n\n.cliente-nombre {\n  font-size: 12px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFiMS9DOlxcVXNlcnNcXERlc2Fycm9sbG9cXERvY3VtZW50c1xcQVBQU1xcdmlzb3Ivc3JjXFxhcHBcXHRhYjFcXHRhYjEucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQWdCO0VBQ2hCLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLDRCQUEyQjtFQUMzQiw4QkFBNkIsRUFBQTs7QUFHakM7RUFDSSwyQkFBMEIsRUFBQTs7QUFHOUI7RUFDSSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLGVBQWUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3RhYjEvdGFiMS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2VsY29tZS1jYXJkIGlvbi1pbWcge1xyXG4gICAgbWF4LWhlaWdodDogMzV2aDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbmlvbi1jYXJkLWhlYWRlci50aXBvLWxpc3RhIHtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4IWltcG9ydGFudDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA2cHghaW1wb3J0YW50O1xyXG59XHJcblxyXG5pb24tY2FyZC1jb250ZW50Lmxpc3RhLWNsaWVudGVzIHtcclxuICAgIHBhZGRpbmctdG9wOiAwcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgICBwYWRkaW5nLXRvcDogMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLmNsaWVudGUtbm9tYnJlIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/tab1/tab1.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab1/tab1.page.ts ***!
  \***********************************/
/*! exports provided: Tab1Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1Page", function() { return Tab1Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/network/ngx */ "./node_modules/@ionic-native/network/ngx/index.js");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _services_imei_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/imei.service */ "./src/app/services/imei.service.ts");
/* harmony import */ var _services_ws_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/ws.service */ "./src/app/services/ws.service.ts");
/* harmony import */ var _services_network_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/network.service */ "./src/app/services/network.service.ts");





// Plugins

// Servicios




var Tab1Page = /** @class */ (function () {
    function Tab1Page(storage, plt, tstController, router, ws, usuario, imeiSer, net, netService) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.tstController = tstController;
        this.router = router;
        this.ws = ws;
        this.usuario = usuario;
        this.imeiSer = imeiSer;
        this.net = net;
        this.netService = netService;
        // Mensaje del día
        this.current = '';
        this.message = '';
        // Clientes del día
        this.client = [];
        // Ver datos local
        this.local = [];
        this.ws.escuchar('mensaje-importante').subscribe(function (mensaje) {
            _this.message = mensaje.msg;
            _this.current = mensaje.de;
        });
    }
    Tab1Page.prototype.ngOnInit = function () {
        var _this = this;
        this.plt.ready().then(function () {
            _this.doRefresh(true);
            if (_this.net.type === 'wifi') {
                _this.tipo = 'WiFi';
            }
            else if (_this.net.type === '2g') {
                _this.tipo = '2G';
            }
            else if (_this.net.type === '3g') {
                _this.tipo = '3G';
            }
            else if (_this.net.type === '4g') {
                _this.tipo = '4G';
            }
            else if (_this.net.type === 'cellular') {
                _this.tipo = 'Celular';
            }
            else if (_this.net.type === 'none') {
                _this.tipo = 'none';
            }
            else if (_this.net.type === 'unknown') {
                _this.tipo = 'Desconocido';
            }
            else if (_this.net.type === 'ethernet') {
                _this.tipo = 'Ethernet';
            }
            _this.net.onchange().subscribe(function () {
                if (_this.net.type === 'wifi') {
                    _this.tipo = 'WiFi';
                }
                else if (_this.net.type === '2g') {
                    _this.tipo = '2G';
                }
                else if (_this.net.type === '3g') {
                    _this.tipo = '3G';
                }
                else if (_this.net.type === '4g') {
                    _this.tipo = '4G';
                }
                else if (_this.net.type === 'cellular') {
                    _this.tipo = 'Celular';
                }
                else if (_this.net.type === 'none') {
                    _this.tipo = 'none';
                }
                else if (_this.net.type === 'unknown') {
                    _this.tipo = 'Desconocido';
                }
                else if (_this.net.type === 'ethernet') {
                    _this.tipo = 'Ethernet';
                }
            });
        });
    };
    Tab1Page.prototype.mensaje = function (msg) {
        var toast = this.tstController.create({
            message: msg,
            duration: 3000,
            position: 'middle',
            color: 'danger'
        });
        toast.then(function (to) { return to.present(); });
    };
    Tab1Page.prototype.doRefresh = function (refresh, refresher) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.plt.is('cordova')) {
            this.imeiSer.getImeiN().then(function (imei) {
                // this.mostrarMensaje(imei);
                _this.imei = imei;
                _this.usuario.usuario(refresh, imei).subscribe(function (use) {
                    if (use.status) {
                        _this.usuario.clientes(refresh, use.respuesta.idFerrum)
                            .subscribe(function (cli) {
                            if (cli.length !== 0) {
                                _this.client = cli;
                                _this.msg = 'ACTIVO';
                            }
                            else {
                                _this.msg = 'Sin Clientes';
                            }
                        }, function (error) { return _this.mostrarMensaje(error.message); });
                    }
                    else {
                        _this.msg = use.msg;
                        _this.mostrarMensaje(use.msg);
                    }
                }, function (error) { return _this.mostrarMensaje(error.error); });
            });
        }
        else {
            this.imei = 359270078018344;
            // this.imei = 359997091574966;
            // this.imei = 359997091644900;
            // this.imei = 357617084506476;
            // this.imei = 123456;
            // this.imei = 352605094314705;
            this.usuario.usuario(refresh, this.imei).subscribe(function (use) {
                if (use.status) {
                    _this.usuario.clientes(refresh, use.respuesta.idFerrum).subscribe(function (cli) {
                        if (cli.length !== 0) {
                            _this.client = cli;
                            _this.msg = 'ACTIVO';
                        }
                        else {
                            _this.msg = 'Sin Clientes';
                        }
                    }, function (error) { return _this.mostrarMensaje(error.message); });
                }
                else {
                    _this.msg = '';
                    _this.mostrarMensaje(use.msg);
                }
            }, function (error) { return _this.mostrarMensaje(error.error); });
        }
        if (refresher) {
            refresher.target.complete();
        }
    };
    Tab1Page.prototype.irA = function (cli) {
        this.router.navigate(['/cliente', JSON.stringify(cli)]);
    };
    Tab1Page.prototype.verLocal = function () {
        this.local = JSON.parse(localStorage.getItem('mensaje-visita'));
    };
    Tab1Page.prototype.borrarStorage = function () {
        this.local = [];
        localStorage.removeItem('mensaje-visita');
        this.storage.remove('localData-mensaje-visita');
    };
    Tab1Page.prototype.mostrarMensaje = function (mensaje) {
        var toast = this.tstController.create({
            message: mensaje,
            position: 'middle',
            duration: 3000,
            color: 'danger'
        });
        toast.then(function (c) { return c.present(); });
    };
    Tab1Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tab1',
            template: __webpack_require__(/*! ./tab1.page.html */ "./src/app/tab1/tab1.page.html"),
            styles: [__webpack_require__(/*! ./tab1.page.scss */ "./src/app/tab1/tab1.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_ws_service__WEBPACK_IMPORTED_MODULE_8__["WsService"],
            _services_usuario_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioService"],
            _services_imei_service__WEBPACK_IMPORTED_MODULE_7__["ImeiService"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_5__["Network"],
            _services_network_service__WEBPACK_IMPORTED_MODULE_9__["NetworkService"]])
    ], Tab1Page);
    return Tab1Page;
}());



/***/ })

}]);
//# sourceMappingURL=tab1-tab1-module.js.map