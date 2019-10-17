(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~components-modal-modal-module~tab1-tab1-module~tab2-tab2-module~tab3-tab3-module~tab4-tab4-m~b03d38df"],{

/***/ "./src/app/services/network.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/network.service.ts ***!
  \*********************************************/
/*! exports provided: ConnectionStatus, NetworkService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionStatus", function() { return ConnectionStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkService", function() { return NetworkService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/network/ngx */ "./node_modules/@ionic-native/network/ngx/index.js");






var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Online"] = 0] = "Online";
    ConnectionStatus[ConnectionStatus["Offline"] = 1] = "Offline";
})(ConnectionStatus || (ConnectionStatus = {}));
var API_STORAGE_KEY = 'localData';
// Plugins

var API_URL_PHP = 'https://ferremayoristas.com.mx/api';
var NetworkService = /** @class */ (function () {
    function NetworkService(network, toastController, plt, storage, http) {
        var _this = this;
        this.network = network;
        this.toastController = toastController;
        this.plt = plt;
        this.storage = storage;
        this.http = http;
        this.status = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](ConnectionStatus.Offline);
        this.plt.ready().then(function () {
            _this.initializeNetworkEvents();
            var status = _this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
            _this.status.next(status);
        });
    }
    NetworkService.prototype.initializeNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            if (_this.status.getValue() === ConnectionStatus.Online) {
                _this.updateNetworkStatus(ConnectionStatus.Offline);
            }
        });
        this.network.onConnect().subscribe(function () {
            _this.updateNetworkStatus(ConnectionStatus.Online);
        });
    };
    NetworkService.prototype.updateNetworkStatus = function (status) {
        var _this = this;
        this.status.next(status);
        var connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
        if (connection === 'Online') {
            // this.mensajes('Obtener todos los mensajes guardados', 3000);
            this.getLocalData('mensaje-visita').then(function (mensajes) {
                console.log(mensajes.length);
                _this.http.post(API_URL_PHP + "/visitas.php?opcion=4", {
                    data: mensajes
                }, {
                    headers: { 'content-Type': 'application/x-www-form-urlencoded' }
                });
                // for (const e of mensajes) {
                //   console.log(e.fecha);
                //   console.log(e.hora);
                //   console.log(e.numero);
                //   console.log(e.asesor);
                //   console.log(e.accion);
                //   console.log(e.comentario);
                //   this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
                //     numero: e.numero,
                //     asesor: e.asesor,
                //     accion: e.accion,
                //     comentario: e.comentario,
                //     fecha: e.fecha,
                //     hora: e.hora
                //   }, {
                //     headers: {'content-Type': 'application/x-www-form-urlencoded'}
                //   });
                // }
            });
        }
        else {
            this.mensajes("Estas " + connection, 3000);
        }
    };
    NetworkService.prototype.onNetworkChange = function () {
        return this.status.asObservable();
    };
    NetworkService.prototype.getNetSatus = function () {
        return this.status.getValue();
    };
    NetworkService.prototype.mensajes = function (msg, time) {
        var toast = this.toastController.create({
            message: msg,
            duration: time,
            position: 'bottom'
        });
        toast.then(function (to) { return to.present(); });
    };
    NetworkService.prototype.getLocalData = function (key) {
        return this.storage.get(API_STORAGE_KEY + "-" + key);
    };
    NetworkService.prototype.setLocalData = function (key, data) {
        this.storage.set(API_STORAGE_KEY + "-" + key, data);
    };
    NetworkService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_6__["Network"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], NetworkService);
    return NetworkService;
}());



/***/ }),

/***/ "./src/app/services/usuario.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/usuario.service.ts ***!
  \*********************************************/
/*! exports provided: UsuarioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioService", function() { return UsuarioService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _network_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./network.service */ "./src/app/services/network.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/http/ngx */ "./node_modules/@ionic-native/http/ngx/index.js");
/* harmony import */ var _ws_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ws.service */ "./src/app/services/ws.service.ts");








// Servicios

var API_STORAGE_KEY = 'localData';
var API_URL_PHP = 'https://ferremayoristas.com.mx/api';
var API_URL4111 = 'https://ferremayoristas.com.mx:4111';
var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, httpIonic, net, storage, ws) {
        this.http = http;
        this.httpIonic = httpIonic;
        this.net = net;
        this.storage = storage;
        this.ws = ws;
        this.getLocalData('mensaje-visita').then(function (info) {
            if (info !== null) {
                localStorage.removeItem('mensaje-visita');
                localStorage.setItem('mensaje-visita', JSON.parse(info));
            }
        });
    }
    UsuarioService.prototype.usuario = function (forceRefresh, imei) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('usuario'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL4111 + "/gps/app/imei?imei=" + imei, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.gps = res.respuesta;
                _this.setLocalData('usuario', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.clientes = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cliente'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=24&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cliente', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.porBajar = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('porbajar'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=1&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('porbajar', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.porSurtir = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('porsurtir'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=2&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('porsurtir', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.facturado = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('facturado'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=3&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('facturado', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.cancelado = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cancelado'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=4&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cancelado', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.pedidosTotales = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('total-pedidos'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=5&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('total-pedidos', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.diaVisita = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('dia-visita'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=6&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('dia-visita', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.pedidosDia = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('pedidos-dia'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=12&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('pedidos-dia', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.pedDiaDiferente = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('pedidos-dia-diferente'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=11&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('pedidos-dia-diferente', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.carteraTotal = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cartera-total'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=22&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cartera-total', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.carteraVencida = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cartera-vencida'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=8&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cartera-vencida', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.carteraDiaSana = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cartera-dia-sana'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=23&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cartera-dia-sana', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.carteraDiaVencida = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cartera-dia-vencida'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=9&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cartera-dia-vencida', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.cobroDia = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('cobro-dia'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=10&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('cobro-dia', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.ventaMensual = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('venta-mes'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=7&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('venta-mes', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.ventaMesAnterior = function (forceRefresh, idFerrum) {
        var _this = this;
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline || !forceRefresh) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.getLocalData('venta-mes-anterior'));
        }
        else {
            var h = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.get(API_URL_PHP + "/asesores.php?opcion=13&perid=" + this.gps.idFerrum, { headers: h }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
                _this.setLocalData('venta-mes-anterior', res);
                return res;
            }));
        }
    };
    UsuarioService.prototype.enviarComentario = function (mensaje) {
        if (this.net.getNetSatus() === _network_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionStatus"].Offline) {
            var array = [];
            if (localStorage.getItem('mensaje-visita')) {
                array = JSON.parse(localStorage.getItem('mensaje-visita'));
                array.push(mensaje);
            }
            else {
                array.push(mensaje);
            }
            localStorage.removeItem('mensaje-visita');
            localStorage.setItem('mensaje-visita', JSON.stringify(array));
            this.setLocalData('mensaje-visita', array);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(JSON.parse(localStorage.getItem('mensaje-visita')));
        }
        else {
            this.ws.acciones('comentario-asesor', mensaje);
            var array = [];
            array.push(mensaje);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(array);
            // return this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
            //   numero: mensaje.numero,
            //   asesor: mensaje.asesor,
            //   accion: mensaje.accion,
            //   comentario: mensaje.comentario,
            //   fecha: mensaje.fecha,
            //   hora: mensaje.hora
            // }, {
            //   headers: {'content-Type': 'application/x-www-form-urlencoded'}
            // }).pipe(
            //   map((resp: any) => {
            //     return resp;
            //   })
            // );
        }
    };
    UsuarioService.prototype.agregarMarker = function (vendedor, data) {
        return this.http.post(API_URL_PHP + "/markers.php?opcion=1", { asesor: vendedor, datos: data }, { headers: { 'content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    UsuarioService.prototype.getLocalData = function (key) {
        return this.storage.get(API_STORAGE_KEY + "-" + key);
    };
    UsuarioService.prototype.setLocalData = function (key, data) {
        this.storage.set(API_STORAGE_KEY + "-" + key, data);
    };
    UsuarioService.prototype.getDìa = function () {
        var h = new Date();
        var dia;
        if (h.getDate() < 10) {
            dia = '0' + h.getDate();
        }
        else {
            dia = h.getDate();
        }
        var mes;
        if ((h.getMonth() + 1) < 10) {
            mes = '0' + (h.getMonth() + 1);
        }
        else {
            mes = h.getMonth() + 1;
        }
        var anio = h.getFullYear();
        var fecha = anio + '-' + mes + '-' + dia;
        return fecha;
    };
    UsuarioService.prototype.getHora = function () {
        var h = new Date();
        var sec;
        if (h.getSeconds() < 10) {
            sec = '0' + h.getSeconds();
        }
        else {
            sec = h.getSeconds();
        }
        var min;
        if (h.getMinutes() < 10) {
            min = '0' + h.getMinutes();
        }
        else {
            min = h.getMinutes();
        }
        var hor = h.getHours();
        var hora = hor + ':' + min + ':' + sec;
        return hora;
    };
    UsuarioService.prototype.enviarPago = function (data) {
        var url = 'http://177.244.55.122/api/visitas.php?opcion=2';
        return this.http.post(url, {
            datos: data
        }, {
            headers: { 'content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    UsuarioService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_7__["HTTP"],
            _network_service__WEBPACK_IMPORTED_MODULE_3__["NetworkService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"],
            _ws_service__WEBPACK_IMPORTED_MODULE_8__["WsService"]])
    ], UsuarioService);
    return UsuarioService;
}());



/***/ }),

/***/ "./src/app/services/ws.service.ts":
/*!****************************************!*\
  !*** ./src/app/services/ws.service.ts ***!
  \****************************************/
/*! exports provided: WsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WsService", function() { return WsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-socket-io */ "./node_modules/ngx-socket-io/index.js");


// Socket

var WsService = /** @class */ (function () {
    function WsService(socket) {
        this.socket = socket;
        this.socketStatus = false;
        this.checkStatusServer();
    }
    WsService.prototype.checkStatusServer = function () {
        var _this = this;
        this.socket.on('connect', function () {
            console.log('OnLine-Server');
            _this.socketStatus = true;
        });
        this.socket.on('disconnect', function () {
            console.log('OffLine-Server');
            _this.socketStatus = false;
        });
    };
    WsService.prototype.acciones = function (evento, payload, callback) {
        this.socket.emit(evento, payload, callback);
    };
    WsService.prototype.escuchar = function (evento) {
        return this.socket.fromEvent(evento);
    };
    WsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]])
    ], WsService);
    return WsService;
}());



/***/ })

}]);
//# sourceMappingURL=default~components-modal-modal-module~tab1-tab1-module~tab2-tab2-module~tab3-tab3-module~tab4-tab4-m~b03d38df.js.map