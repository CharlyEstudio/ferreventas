(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-modal-modal-module"],{

/***/ "./src/app/components/modal/modal.module.ts":
/*!**************************************************!*\
  !*** ./src/app/components/modal/modal.module.ts ***!
  \**************************************************/
/*! exports provided: ModalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPageModule", function() { return ModalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal.page */ "./src/app/components/modal/modal.page.ts");







var routes = [
    {
        path: '',
        component: _modal_page__WEBPACK_IMPORTED_MODULE_6__["ModalPage"]
    }
];
var ModalPageModule = /** @class */ (function () {
    function ModalPageModule() {
    }
    ModalPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_modal_page__WEBPACK_IMPORTED_MODULE_6__["ModalPage"]]
        })
    ], ModalPageModule);
    return ModalPageModule;
}());



/***/ }),

/***/ "./src/app/components/modal/modal.page.html":
/*!**************************************************!*\
  !*** ./src/app/components/modal/modal.page.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"\">\r\n        <ion-buttons slot=\"start\">\r\n            <ion-back-button></ion-back-button>\r\n        </ion-buttons>\r\n        <ion-title>Enviar Comentario</ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n    <ion-item>\r\n        <ion-label position=\"floating\">Nùmero de Cliente</ion-label>\r\n        <ion-input type=\"number\" [value]=\"dato.numero\"></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-item>\r\n        <ion-label position=\"floating\">Nombre de Cliente</ion-label>\r\n        <ion-input type=\"text\" [value]=\"dato.nombre\"></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-list>\r\n        <ion-radio-group>\r\n            <ion-list-header color=\"\">\r\n                <ion-item-divider color=\"\">\r\n                    <ion-label>\r\n                        ¿Que proceso se le realizó al cliente?\r\n                    </ion-label>\r\n                </ion-item-divider>\r\n            </ion-list-header>\r\n\r\n            <ion-item>\r\n                <ion-label>Venta</ion-label>\r\n                <ion-radio #venta slot=\"start\" (ionSelect)=\"accion(venta.value)\" value=\"venta\"></ion-radio>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label>Cobro</ion-label>\r\n                <ion-radio #cobro slot=\"start\" (ionSelect)=\"accion(cobro.value)\" value=\"cobro\"></ion-radio>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label>Ambas</ion-label>\r\n                <ion-radio #ambas slot=\"start\" (ionSelect)=\"accion(ambas.value)\" value=\"ambas\"></ion-radio>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label>Ninguna</ion-label>\r\n                <ion-radio #niguna slot=\"start\" (ionSelect)=\"accion(niguna.value)\" value=\"ninguna\"></ion-radio>\r\n            </ion-item>\r\n        </ion-radio-group>\r\n    </ion-list>\r\n\r\n    <ion-item>\r\n        <ion-label position=\"floating\">Breve comentario aquí</ion-label>\r\n        <ion-textarea #comentario></ion-textarea>\r\n    </ion-item>\r\n\r\n    <ion-button color=\"danger\" size=\"large\" expand=\"full\" (click)=\"enviar(comentario.value)\">Enviar Comentario</ion-button>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/components/modal/modal.page.scss":
/*!**************************************************!*\
  !*** ./src/app/components/modal/modal.page.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/modal/modal.page.ts":
/*!************************************************!*\
  !*** ./src/app/components/modal/modal.page.ts ***!
  \************************************************/
/*! exports provided: ModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPage", function() { return ModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_ws_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/ws.service */ "./src/app/services/ws.service.ts");



// Servicios



var ModalPage = /** @class */ (function () {
    function ModalPage(router, toastController, route, usuario, ws) {
        this.router = router;
        this.toastController = toastController;
        this.route = route;
        this.usuario = usuario;
        this.ws = ws;
        this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
    }
    ModalPage.prototype.ngOnInit = function () {
    };
    ModalPage.prototype.accion = function (accion) {
        this.tipo = accion;
    };
    ModalPage.prototype.enviar = function (texto) {
        if (this.tipo === undefined) {
            this.avisos('Falto colocar un tipo de acción.');
            return;
        }
        // if (texto === '') {
        //   this.avisos('Falto colocar un comentario.');
        //   return;
        // }
        this.fecha = this.usuario.getDìa();
        this.hora = this.usuario.getHora();
        this.confirmar(texto);
    };
    ModalPage.prototype.confirmar = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            header: '¿Se procede a enviar comentario?',
                            message: 'Comentario: \n' + msg,
                            position: 'bottom',
                            color: 'danger',
                            buttons: [
                                {
                                    side: 'start',
                                    text: 'Si',
                                    cssClass: 'text-toast-white',
                                    handler: function () {
                                        var mensaje = {
                                            numero: _this.dato.numero,
                                            asesor: _this.dato.perid,
                                            accion: _this.tipo,
                                            comentario: msg,
                                            fecha: _this.fecha,
                                            hora: _this.hora
                                        };
                                        _this.usuario.enviarComentario(mensaje)
                                            .subscribe(function (resp) {
                                            if (resp !== null) {
                                                _this.avisos('Se realizo el envio.');
                                                setTimeout(function () {
                                                    _this.route.navigate(['/cliente', JSON.stringify(_this.dato)]);
                                                }, 3000);
                                            }
                                            else {
                                                _this.avisos('Error al guardado.');
                                            }
                                        });
                                    }
                                }, {
                                    text: 'No',
                                    role: 'cancel',
                                    handler: function () {
                                        _this.avisos('Se cancelo el envío.');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage.prototype.avisos = function (msg) {
        var toast = this.toastController.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            color: 'danger'
        });
        toast.then(function (to) { return to.present(); });
    };
    ModalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-modal',
            template: __webpack_require__(/*! ./modal.page.html */ "./src/app/components/modal/modal.page.html"),
            styles: [__webpack_require__(/*! ./modal.page.scss */ "./src/app/components/modal/modal.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_usuario_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioService"],
            src_app_services_ws_service__WEBPACK_IMPORTED_MODULE_5__["WsService"]])
    ], ModalPage);
    return ModalPage;
}());



/***/ })

}]);
//# sourceMappingURL=components-modal-modal-module.js.map