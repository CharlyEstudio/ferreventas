(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab3-tab3-module"],{

/***/ "./src/app/tab3/tab3.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab3/tab3.module.ts ***!
  \*************************************/
/*! exports provided: Tab3PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab3PageModule", function() { return Tab3PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _tab3_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab3.page */ "./src/app/tab3/tab3.page.ts");







var Tab3PageModule = /** @class */ (function () {
    function Tab3PageModule() {
    }
    Tab3PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab3_page__WEBPACK_IMPORTED_MODULE_6__["Tab3Page"] }])
            ],
            declarations: [_tab3_page__WEBPACK_IMPORTED_MODULE_6__["Tab3Page"]]
        })
    ], Tab3PageModule);
    return Tab3PageModule;
}());



/***/ }),

/***/ "./src/app/tab3/tab3.page.html":
/*!*************************************!*\
  !*** ./src/app/tab3/tab3.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"\">\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"ws.socketStatus\">\r\n            ServerOn\r\n            <ion-icon color=\"success\" name=\"disc\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-buttons padding slot=\"end\" *ngIf=\"!ws.socketStatus\">\r\n            ServerOff\r\n            <ion-icon color=\"danger\" name=\"disc\"></ion-icon>\r\n        </ion-buttons>\r\n        <ion-title>\r\n            Pedidos\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content padding text-center color=\"\">\r\n    <h1>Cálculo de Cobro</h1>\r\n\r\n    <ion-item color=\"\">\r\n        <ion-label position=\"floating\">Ingrese el importe aquí</ion-label>\r\n        <ion-input #input type=\"number\" (keyup)=\"importe(input.value)\"></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-list>\r\n        <ion-radio-group>\r\n            <ion-list-header color=\"\">\r\n                <ion-item-divider color=\"\">\r\n                    <ion-label>\r\n                        TIPO DE TARJETA\r\n                    </ion-label>\r\n                </ion-item-divider>\r\n            </ion-list-header>\r\n\r\n            <ion-item>\r\n                <ion-label>Débito</ion-label>\r\n                <ion-radio #debito slot=\"start\" (ionSelect)=\"tipoTarjeta(debito.value)\" value=\"debito\" [disabled]=\"radioDis\"></ion-radio>\r\n                <!--1.45% MAS IVA-->\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label>Crédito</ion-label>\r\n                <ion-radio #credito slot=\"start\" (ionSelect)=\"tipoTarjeta(credito.value)\" value=\"credito\" [disabled]=\"radioDis\"></ion-radio>\r\n                <!--1.25% MAS IVA-->\r\n            </ion-item>\r\n        </ion-radio-group>\r\n    </ion-list>\r\n\r\n    <ion-list>\r\n        <ion-radio-group>\r\n            <ion-list-header color=\"\">\r\n                <ion-item-divider color=\"\">\r\n                    <ion-label>\r\n                        TIPO DE PAGO\r\n                    </ion-label>\r\n                </ion-item-divider>\r\n            </ion-list-header>\r\n\r\n            <ion-item>\r\n                <ion-label>Abono</ion-label>\r\n                <ion-radio #abono slot=\"start\" (ionSelect)=\"tipoAbono(abono.value)\" value=\"abono\" [disabled]=\"radioDis\"></ion-radio>\r\n                <!--1.45% MAS IVA-->\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label>Completo</ion-label>\r\n                <ion-radio #completo slot=\"start\" (ionSelect)=\"tipoAbono(completo.value)\" value=\"completo\" [disabled]=\"radioDis\"></ion-radio>\r\n                <!--1.25% MAS IVA-->\r\n            </ion-item>\r\n        </ion-radio-group>\r\n    </ion-list>\r\n\r\n    <ion-list>\r\n        <ion-list-header color=\"\">\r\n            <ion-item-divider color=\"\">\r\n                <ion-label>\r\n                    PROMOCION SIN INTERESES\r\n                </ion-label>\r\n            </ion-item-divider>\r\n        </ion-list-header>\r\n\r\n        <ion-item>\r\n            <ion-label>Meses</ion-label>\r\n            <ion-select #meses placeholder=\"Seleccione uno\" [disabled]=\"disabled\" (ionChange)=\"promoMes(meses.value)\">\r\n                <ion-select-option value=\"n/a\">Sin Promoción</ion-select-option>\r\n                <!--1.25% MAS IVA-->\r\n                <ion-select-option value=\"3\">3 MESES</ion-select-option>\r\n                <!--3% MAS IVA-->\r\n                <ion-select-option value=\"6\">6 MESES</ion-select-option>\r\n                <!--5.8% MAS IVA-->\r\n                <ion-select-option value=\"9\">9 MESES</ion-select-option>\r\n                <!--8.7% MAS IVA-->\r\n                <ion-select-option value=\"12\">12 MESES</ion-select-option>\r\n                <!--11.7% MAS IVA-->\r\n                <ion-select-option value=\"18\">18 MESES</ion-select-option>\r\n                <!--15% MAS IVA-->\r\n            </ion-select>\r\n        </ion-item>\r\n\r\n    </ion-list>\r\n\r\n    <ion-card text-center color=\"light\">\r\n        <h1>{{imporFinal | currency}}</h1>\r\n        <ion-grid *ngIf=\"desgloce.length > 0\">\r\n            <ion-row *ngFor=\"let des of desgloce\">\r\n                <ion-col size=\"6\">\r\n                    {{ des.pago }}\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                    {{ des.importe | currency }}\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n        <p>El importe final es ya con la comisión por manejo de cuenta. Recuerda que tenemos hasta 18 meses sin intereses para pagar.</p>\r\n        <!--<p *ngIf=\"desgloce.length > 0\">La comisión por manejo de {{ promo }} Meses es del {{ porcenFinal | percent: '0.2' }} + I.V.A.</p>\r\n        <p *ngIf=\"tipoPago === 'debito'\">La comisión por pago en Débito es del {{ porcenFinal | percent: '0.2' }} + I.V.A.</p>-->\r\n    </ion-card>\r\n\r\n    <ion-button expand=\"full\" size=\"large\" color=\"danger\" (click)=\"enviarCobro()\" *ngIf=\"porcenFinal > 0\">Enviar Cobro</ion-button>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/tab3/tab3.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab3/tab3.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-list {\n  padding-top: 0px;\n  padding-bottom: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFiMy9DOlxcVXNlcnNcXERlc2Fycm9sbG9cXERvY3VtZW50c1xcQVBQU1xcdmlzb3Ivc3JjXFxhcHBcXHRhYjNcXHRhYjMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQWdCO0VBQ2hCLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvdGFiMy90YWIzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1saXN0IHtcclxuICAgIHBhZGRpbmctdG9wOiAwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/tab3/tab3.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab3/tab3.page.ts ***!
  \***********************************/
/*! exports provided: Tab3Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab3Page", function() { return Tab3Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ "./node_modules/@ionic-native/barcode-scanner/ngx/index.js");
/* harmony import */ var _services_ws_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/ws.service */ "./src/app/services/ws.service.ts");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



// Plugins

// servicios



var Tab3Page = /** @class */ (function () {
    function Tab3Page(plt, tstCtl, router, barcodeScanner, usuario, ws) {
        this.plt = plt;
        this.tstCtl = tstCtl;
        this.router = router;
        this.barcodeScanner = barcodeScanner;
        this.usuario = usuario;
        this.ws = ws;
        this.total = 0;
        this.imporFinal = 0;
        this.porcenFinal = 0;
        this.pagoMes = 0;
        this.impor = 0;
        // intDebito = 0.0145;
        // intCredito = 0.0125;
        this.intDebito = 0.0125;
        this.intCredito = 0.0145;
        this.intCredito3 = 0.03;
        this.intCredito6 = 0.058;
        this.intCredito9 = 0.087;
        this.intCredito12 = 0.117;
        this.intCredito18 = 0.15;
        this.impuesto = 0.16;
        this.disabled = true;
        this.radioDis = true;
        this.desgloce = [];
    }
    Tab3Page.prototype.importe = function (valor) {
        if (valor === '') {
            if (!this.disabled) {
                this.mensaje('SIN IMPORTE', 'Debe de ingresar un importe para calcular.');
            }
            this.total = 0;
            this.imporFinal = 0;
            this.radioDis = true;
        }
        else {
            this.impor = Number(valor);
            this.radioDis = false;
            this.total = this.impor;
            if (this.tipo === 'debito') {
                this.tipoTarjeta(this.tipo);
            }
            else {
                this.promoMes(this.promo);
            }
        }
    };
    Tab3Page.prototype.tipoTarjeta = function (valor) {
        this.tipo = valor;
        if (valor === 'debito') {
            this.disabled = true;
            this.promo = '0';
            this.pagoMes = 0;
            this.desgloce = [];
            this.porcenFinal = this.intDebito;
            var iva = (this.total * this.intDebito) * this.impuesto;
            this.imporFinal = this.total + (this.total * this.intDebito) + iva;
        }
        else {
            this.disabled = false;
            if (this.promo !== '') {
                this.promoMes(this.promo);
            }
        }
        this.tipoPago = valor;
    };
    Tab3Page.prototype.tipoAbono = function (valor) {
        this.tipoPayment = valor;
    };
    Tab3Page.prototype.promoMes = function (valor) {
        this.desgloce = [];
        this.porcenFinal = 0;
        this.pagoMes = 0;
        this.promo = valor;
        var iva;
        switch (valor) {
            case '3':
                iva = (this.total * this.intCredito3) * this.impuesto;
                this.imporFinal = this.total + (this.total * this.intCredito3) + iva;
                this.porcenFinal = this.intCredito3;
                break;
            case '6':
                iva = (this.total * this.intCredito6) * this.impuesto;
                this.imporFinal = this.total + (this.total * this.intCredito6) + iva;
                this.porcenFinal = this.intCredito6;
                break;
            case '9':
                iva = (this.total * this.intCredito9) * this.impuesto;
                this.imporFinal = this.total + (this.total * this.intCredito9) + iva;
                this.porcenFinal = this.intCredito9;
                break;
            case '12':
                iva = (this.total * this.intCredito12) * this.impuesto;
                this.imporFinal = this.total + (this.total * this.intCredito12) + iva;
                this.porcenFinal = this.intCredito12;
                break;
            case '18':
                iva = (this.total * this.intCredito18) * this.impuesto;
                this.imporFinal = this.total + (this.total * this.intCredito18) + iva;
                this.porcenFinal = this.intCredito18;
                break;
            default:
                iva = (this.total * this.intCredito) * this.impuesto;
                this.imporFinal = this.total + (this.total * this.intCredito) + iva;
                this.porcenFinal = this.intCredito;
        }
        this.pagoMes = this.imporFinal / Number(valor);
        for (var i = 1; i <= Number(valor); i++) {
            var dato = {
                pago: "Pago " + i,
                importe: this.pagoMes
            };
            this.desgloce.push(dato);
        }
    };
    Tab3Page.prototype.enviarCobro = function () {
        var _this = this;
        var fechaActual = this.usuario.getDìa();
        var horaActual = this.usuario.getHora();
        if (this.plt.is('cordova')) {
            this.barcodeScanner.scan().then(function (barcodeData) {
                if (!barcodeData.cancelled && barcodeData.text !== null) {
                    /*console.log('IMEI: ' + this.imei.getImeiN());
                    console.log('Fecha: ' + fechaActual);
                    console.log('Hora: ' + horaActual);
                    console.log('Comisión Final: ' + this.porcenFinal);
                    console.log('Importe Inicial: ' + this.total);
                    console.log('Importe Final: ' + this.imporFinal);
                    console.log('Tipo de Tarjeta: ' + this.tipo);
                    console.log('Tipo de Pago: ' + this.tipoPayment);
                    console.log('Promoción: ' + this.promo);
                    console.log('Pago Mensual: ' + this.pagoMes);
                    console.log('Texto Code: ' + barcodeData.text);
                    console.log('Formato Code: ' + barcodeData.format);*/
                    _this.usuario.getLocalData('usuario').then(function (user) {
                        var enviar = {
                            perid: user.idFerrum,
                            fecha: fechaActual,
                            hora: horaActual,
                            comision: _this.porcenFinal,
                            importeInicial: _this.total,
                            importeFinal: _this.imporFinal,
                            tarjeta: _this.tipo,
                            pago: _this.tipoPayment,
                            promocion: _this.promo,
                            pagoMensual: _this.pagoMes,
                            factura: barcodeData.text
                        };
                        _this.usuario.enviarPago(enviar).subscribe(function (resp) {
                            if (resp !== null) {
                                _this.mensaje('Envio Correcto', 'Se ha enviado correctamente el pago.');
                                setTimeout(function () {
                                    _this.router.navigate(['/']);
                                }, 2000);
                            }
                            else {
                                _this.mensaje('Error de Envio', 'No se envio correctamente el pago, favor de reportar.');
                            }
                        });
                    });
                }
                else {
                    _this.mensaje('Cancelado', 'Se cancelo el escanneo. Favor de volver a intentar.');
                }
            }).catch(function (err) {
                console.log('Error', err);
                var msg = 'Error: ' + err;
                _this.mensaje('Error en el BarCode', msg);
            });
        }
        else {
            /*console.log('Fecha: ' + fechaActual);
            console.log('Hora: ' + horaActual);
            console.log('Comisión Final: ' + this.porcenFinal);
            console.log('Importe Inicial: ' + this.total);
            console.log('Importe Final: ' + this.imporFinal);
            console.log('Tipo de Tarjeta: ' + this.tipo);
            console.log('Tipo de Pago: ' + this.tipoPayment);
            console.log('Promoción: ' + this.promo);
            console.log('Pago Mensual: ' + this.pagoMes);*/
            this.usuario.getLocalData('usuario').then(function (user) {
                var enviar = {
                    perid: user.idFerrum,
                    fecha: fechaActual,
                    hora: horaActual,
                    comision: _this.porcenFinal,
                    importeInicial: _this.total,
                    importeFinal: _this.imporFinal,
                    tarjeta: _this.tipo,
                    pago: _this.tipoPayment,
                    promocion: _this.promo,
                    pagoMensual: _this.pagoMes,
                    factura: '200584'
                };
                _this.usuario.enviarPago(enviar).subscribe(function (resp) {
                    if (resp !== null) {
                        _this.mensaje('Envio Correcto', 'Se ha enviado correctamente el pago.');
                        setTimeout(function () {
                            _this.router.navigate(['/']);
                        }, 2000);
                    }
                    else {
                        _this.mensaje('Error de Envio', 'No se envio correctamente el pago, favor de reportar.');
                    }
                });
            });
        }
    };
    Tab3Page.prototype.mensaje = function (titulo, msg) {
        var toast = this.tstCtl.create({
            header: titulo,
            message: msg,
            position: 'middle',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ]
        });
        toast.then(function (to) { to.present(); });
    };
    Tab3Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tab3',
            template: __webpack_require__(/*! ./tab3.page.html */ "./src/app/tab3/tab3.page.html"),
            styles: [__webpack_require__(/*! ./tab3.page.scss */ "./src/app/tab3/tab3.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__["BarcodeScanner"],
            _services_usuario_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioService"],
            _services_ws_service__WEBPACK_IMPORTED_MODULE_4__["WsService"]])
    ], Tab3Page);
    return Tab3Page;
}());



/***/ })

}]);
//# sourceMappingURL=tab3-tab3-module.js.map