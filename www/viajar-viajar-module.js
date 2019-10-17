(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["viajar-viajar-module"],{

/***/ "./node_modules/agm-direction/fesm5/agm-direction.js":
/*!***********************************************************!*\
  !*** ./node_modules/agm-direction/fesm5/agm-direction.js ***!
  \***********************************************************/
/*! exports provided: AgmDirectionModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgmDirectionModule", function() { return AgmDirectionModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return AgmDirection; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgmDirection = /** @class */ (function () {
    function AgmDirection(gmapsApi) {
        this.gmapsApi = gmapsApi;
        // Options
        this.travelMode = 'DRIVING';
        this.transitOptions = undefined;
        this.drivingOptions = undefined;
        this.waypoints = [];
        this.optimizeWaypoints = true;
        this.provideRouteAlternatives = false;
        this.avoidHighways = false;
        this.avoidTolls = false;
        // Remove or draw direction
        this.visible = true;
        // Direction change event handler
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Direction response for the new request
        this.onResponse = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Send a custom infowindow
        this.sendInfoWindow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Status of Directions Query (google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
        this.status = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Marker drag event handler
        this.originDrag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.destinationDrag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.directionsService = undefined;
        this.directionsDisplay = undefined;
        this.waypointsMarker = [];
        // Use for visible flag
        this.isFirstChange = true;
    }
    /**
     * @return {?}
     */
    AgmDirection.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.visible === true) {
            this.directionDraw();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AgmDirection.prototype.ngOnChanges = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /**
         * When visible is false then remove the direction layer
         */
        if (!this.visible) {
            try {
                this.removeMarkers();
                this.removeDirections();
            }
            catch (e) { }
        }
        else {
            if (this.isFirstChange) {
                /**
                 * When visible is false at the first time
                 */
                if (typeof this.directionsDisplay === 'undefined') {
                    this.directionDraw();
                }
                this.isFirstChange = false;
                return;
            }
            /**
             * When renderOptions are not first change then reset the display
             */
            if (typeof obj.renderOptions !== 'undefined') {
                if (obj.renderOptions.firstChange === false) {
                    this.removeMarkers();
                    this.removeDirections();
                }
            }
            this.directionDraw();
        }
    };
    /**
     * @return {?}
     */
    AgmDirection.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyMarkers();
        this.removeDirections();
    };
    /**
     * This event is fired when the user creating or updating this direction
     */
    /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    AgmDirection.prototype.directionDraw = /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    function () {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            if (typeof _this.directionsDisplay === 'undefined') {
                _this.directionsDisplay = new google.maps.DirectionsRenderer(_this.renderOptions);
                _this.directionsDisplay.setMap(map);
                _this.directionsDisplay.addListener('directions_changed', function () {
                    _this.onChange.emit(_this.directionsDisplay.getDirections());
                });
            }
            if (typeof _this.directionsService === 'undefined') {
                _this.directionsService = new google.maps.DirectionsService;
            }
            if (typeof _this.panel === 'undefined') {
                _this.directionsDisplay.setPanel(null);
            }
            else {
                _this.directionsDisplay.setPanel(_this.panel);
            }
            // Render exist direction
            if (typeof _this.renderRoute === 'object' && _this.renderRoute !== null) {
                _this.directionsDisplay.setDirections(_this.renderRoute);
                _this.renderRoute = null; // or set undefined, ''
            }
            else {
                // Request new direction
                _this.directionsService.route({
                    origin: _this.origin,
                    destination: _this.destination,
                    travelMode: _this.travelMode,
                    transitOptions: _this.transitOptions,
                    drivingOptions: _this.drivingOptions,
                    waypoints: _this.waypoints,
                    optimizeWaypoints: _this.optimizeWaypoints,
                    provideRouteAlternatives: _this.provideRouteAlternatives,
                    avoidHighways: _this.avoidHighways,
                    avoidTolls: _this.avoidTolls,
                }, function (response, status) {
                    _this.onResponse.emit(response);
                    // Emit Query Status
                    _this.status.emit(status);
                    /**
                     * DirectionsStatus
                     * https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus
                     */
                    switch (status) {
                        case 'OK':
                            _this.directionsDisplay.setDirections(response);
                            /**
                             * Emit The DirectionsResult Object
                             * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                             */
                            // Custom Markers
                            if (typeof _this.markerOptions !== 'undefined') {
                                _this.destroyMarkers();
                                // Set custom markers
                                /** @type {?} */
                                var _route_1 = response.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof _this.markerOptions.origin !== 'undefined') {
                                        _this.markerOptions.origin.map = map;
                                        _this.markerOptions.origin.position = _route_1.start_location;
                                        _this.originMarker = _this.setMarker(map, _this.originMarker, _this.markerOptions.origin, _route_1.start_address);
                                        if (_this.markerOptions.origin.draggable) {
                                            _this.originMarker.addListener('dragend', function () {
                                                _this.origin = _this.originMarker.position;
                                                _this.directionDraw();
                                                _this.originDrag.emit(_this.origin);
                                            });
                                        }
                                    }
                                    // Destination Marker
                                    if (typeof _this.markerOptions.destination !== 'undefined') {
                                        _this.markerOptions.destination.map = map;
                                        _this.markerOptions.destination.position = _route_1.end_location;
                                        _this.destinationMarker = _this.setMarker(map, _this.destinationMarker, _this.markerOptions.destination, _route_1.end_address);
                                        if (_this.markerOptions.destination.draggable) {
                                            _this.destinationMarker.addListener('dragend', function () {
                                                _this.destination = _this.destinationMarker.position;
                                                _this.directionDraw();
                                                _this.destinationDrag.emit(_this.destination);
                                            });
                                        }
                                    }
                                    // Waypoints Marker
                                    if (typeof _this.markerOptions.waypoints !== 'undefined') {
                                        _this.waypoints.forEach(function (waypoint, index) {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(_this.markerOptions.waypoints)) {
                                                _this.markerOptions.waypoints.map = map;
                                                _this.markerOptions.waypoints.position = _route_1.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints, _route_1.via_waypoints[index]));
                                            }
                                            else {
                                                _this.markerOptions.waypoints[index].map = map;
                                                _this.markerOptions.waypoints[index].position = _route_1.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints[index], _route_1.via_waypoints[index]));
                                            }
                                        }); // End forEach
                                    }
                                }
                                catch (err) {
                                    console.error('MarkerOptions error.', err);
                                }
                            }
                            break;
                        default:
                            // console.warn(status);
                            break;
                    } // End switch
                });
            }
        });
    };
    /**
     * Custom Origin and Destination Icon
     * @param map map
     * @param marker marker
     * @param markerOpts properties
     * @param content marker's infowindow content
     * @returns new marker
     * @memberof AgmDirection
     */
    /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    AgmDirection.prototype.setMarker = /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    function (map, marker, markerOpts, content) {
        var _this = this;
        if (typeof this.infoWindow === 'undefined') {
            this.infoWindow = new google.maps.InfoWindow({});
            this.sendInfoWindow.emit(this.infoWindow);
        }
        marker = new google.maps.Marker(markerOpts);
        marker.addListener('click', function () {
            /** @type {?} */
            var infowindoContent = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
            _this.infoWindow.setContent(infowindoContent);
            _this.infoWindow.open(map, marker);
        });
        return marker;
    };
    /**
     * This event is fired when remove markers
     */
    /**
     * This event is fired when remove markers
     * @return {?}
     */
    AgmDirection.prototype.removeMarkers = /**
     * This event is fired when remove markers
     * @return {?}
     */
    function () {
        if (typeof this.originMarker !== 'undefined') {
            this.originMarker.setMap(null);
        }
        if (typeof this.destinationMarker !== 'undefined') {
            this.destinationMarker.setMap(null);
        }
        this.waypointsMarker.forEach(function (w) {
            if (typeof w !== 'undefined') {
                w.setMap(null);
            }
        });
    };
    /**
     * This event is fired when remove directions
     */
    /**
     * This event is fired when remove directions
     * @return {?}
     */
    AgmDirection.prototype.removeDirections = /**
     * This event is fired when remove directions
     * @return {?}
     */
    function () {
        this.directionsDisplay.setPanel(null);
        this.directionsDisplay.setMap(null);
        this.directionsDisplay = undefined;
    };
    /**
     * This event is fired when destroy markers
     */
    /**
     * This event is fired when destroy markers
     * @return {?}
     */
    AgmDirection.prototype.destroyMarkers = /**
     * This event is fired when destroy markers
     * @return {?}
     */
    function () {
        // Remove origin markers
        try {
            if (typeof this.originMarker !== 'undefined') {
                google.maps.event.clearListeners(this.originMarker, 'click');
                if (this.markerOptions.origin.draggable) {
                    google.maps.event.clearListeners(this.originMarker, 'dragend');
                }
            }
            if (typeof this.destinationMarker !== 'undefined') {
                google.maps.event.clearListeners(this.destinationMarker, 'click');
                if (this.markerOptions.origin.draggable) {
                    google.maps.event.clearListeners(this.destinationMarker, 'dragend');
                }
            }
            this.waypointsMarker.forEach(function (w) {
                if (typeof w !== 'undefined') {
                    google.maps.event.clearListeners(w, 'click');
                }
            });
            this.removeMarkers();
        }
        catch (err) {
            console.error('Can not reset custom marker.', err);
        }
    };
    AgmDirection.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: 'agm-direction',
                },] }
    ];
    /** @nocollapse */
    AgmDirection.ctorParameters = function () { return [
        { type: _agm_core__WEBPACK_IMPORTED_MODULE_1__["GoogleMapsAPIWrapper"] }
    ]; };
    AgmDirection.propDecorators = {
        origin: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        destination: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        travelMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        transitOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        drivingOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        waypoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        optimizeWaypoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        provideRouteAlternatives: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        avoidHighways: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        avoidTolls: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        renderOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        panel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        markerOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        infoWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        visible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        renderRoute: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        onChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onResponse: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        sendInfoWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        status: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        originDrag: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        destinationDrag: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    return AgmDirection;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgmDirectionModule = /** @class */ (function () {
    function AgmDirectionModule() {
    }
    /**
     * @return {?}
     */
    AgmDirectionModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AgmDirectionModule,
        };
    };
    AgmDirectionModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [],
                    declarations: [
                        AgmDirection,
                    ],
                    exports: [
                        AgmDirection,
                    ]
                },] }
    ];
    return AgmDirectionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=agm-direction.js.map


/***/ }),

/***/ "./src/app/services/geo.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/geo.service.ts ***!
  \*****************************************/
/*! exports provided: GeoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeoService", function() { return GeoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");


// Plugins

var GeoService = /** @class */ (function () {
    function GeoService(geolocation) {
        this.geolocation = geolocation;
    }
    GeoService.prototype.ubicacionGPS = function () {
        // return this.geolocation.getCurrentPosition();
        return this.geolocation.watchPosition();
    };
    GeoService.prototype.gps = function () {
        return this.geolocation.getCurrentPosition();
    };
    GeoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["Geolocation"]])
    ], GeoService);
    return GeoService;
}());



/***/ }),

/***/ "./src/app/viajar/viajar.module.ts":
/*!*****************************************!*\
  !*** ./src/app/viajar/viajar.module.ts ***!
  \*****************************************/
/*! exports provided: ViajarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViajarPageModule", function() { return ViajarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _viajar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viajar.page */ "./src/app/viajar/viajar.page.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var agm_direction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! agm-direction */ "./node_modules/agm-direction/fesm5/agm-direction.js");







// Maps


var routes = [
    {
        path: '',
        component: _viajar_page__WEBPACK_IMPORTED_MODULE_6__["ViajarPage"]
    }
];
var ViajarPageModule = /** @class */ (function () {
    function ViajarPageModule() {
    }
    ViajarPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyApgyf9zpctTzuckqSRRYiA9wgrVKeWGFY'
                }),
                agm_direction__WEBPACK_IMPORTED_MODULE_8__["AgmDirectionModule"]
            ],
            declarations: [_viajar_page__WEBPACK_IMPORTED_MODULE_6__["ViajarPage"]]
        })
    ], ViajarPageModule);
    return ViajarPageModule;
}());



/***/ }),

/***/ "./src/app/viajar/viajar.page.html":
/*!*****************************************!*\
  !*** ./src/app/viajar/viajar.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"\">\r\n        <ion-buttons slot=\"start\">\r\n            <ion-back-button></ion-back-button>\r\n        </ion-buttons>\r\n        <ion-title class=\"titulo-comercio-viaje\" *ngIf=\"dato.lat > 0\">Viajar a {{comercio}}</ion-title>\r\n        <ion-title class=\"titulo-comercio-viaje\" *ngIf=\"dato.lat === 0\">Agregar GPS de {{comercio}}</ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content color=\"\" *ngIf=\"latEscucha > 0\">\r\n\r\n    <ion-fab vertical=\"top\" horizontal=\"end\" edge slot=\"fixed\">\r\n        <ion-fab-button color=\"danger\">\r\n            <ion-icon name=\"settings\"></ion-icon>\r\n        </ion-fab-button>\r\n        <ion-fab-list side=\"start\">\r\n            <ion-fab-button (click)=\"info()\">\r\n                <ion-icon name=\"help\"></ion-icon>\r\n            </ion-fab-button>\r\n        </ion-fab-list>\r\n    </ion-fab>\r\n\r\n    <agm-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\" [minZoom]=\"zoom\" (mapClick)=\"agregarMarker($event)\" *ngIf=\"dato.lat > 0\">\r\n        <agm-direction [origin]=\"origin\" [destination]=\"destiny\" [provideRouteAlternatives]=\"alternativa\" [panel]=\"setPanel()\" (onResponse)=\"getStatus($event)\" [renderOptions]=\"renderOptions\" [markerOptions]=\"markerOptions\"></agm-direction>\r\n        <agm-marker *ngIf=\"latMarker > 0\" [latitude]=\"latMarker\" [longitude]=\"lngMarker\"></agm-marker>\r\n    </agm-map>\r\n\r\n    <agm-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"19\" [minZoom]=\"19\" (mapClick)=\"agregarMarker($event)\" *ngIf=\"dato.lat === 0\">\r\n        <agm-marker *ngIf=\"latMarker > 0\" [latitude]=\"latMarker\" [longitude]=\"lngMarker\"></agm-marker>\r\n    </agm-map>\r\n\r\n    <ion-button expand=\"block\" fill=\"clear\" (click)=\"iniciar()\" *ngIf=\"dato.lat > 0\">\r\n        <ion-icon name=\"play\" color=\"\"></ion-icon>\r\n    </ion-button>\r\n\r\n    <ion-card color=\"light\" id=\"myPanel\" style=\"height: 100%;\" *ngIf=\"dato.lat > 0\"></ion-card>\r\n\r\n</ion-content>\r\n\r\n<ion-content text-center color=\"\" *ngIf=\"latEscucha === 0\">\r\n\r\n    <h1 class=\"sin-datos-viaje\">Sin datos de viaje o Cargando Información</h1>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/viajar/viajar.page.scss":
/*!*****************************************!*\
  !*** ./src/app/viajar/viajar.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 50%; }\n\n.titulo-comercio-viaje {\n  font-size: 13px; }\n\n.sin-datos-viaje {\n  position: relative;\n  top: 40%;\n  bottom: 50%; }\n\n.sin-p {\n  margin-bottom: 0;\n  color: black; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlhamFyL0M6XFxVc2Vyc1xcRGVzYXJyb2xsb1xcRG9jdW1lbnRzXFxBUFBTXFx2aXNvci9zcmNcXGFwcFxcdmlhamFyXFx2aWFqYXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBVyxFQUFBOztBQUdmO0VBQ0ksZUFBZSxFQUFBOztBQUduQjtFQUNJLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsV0FBVyxFQUFBOztBQUdmO0VBQ0ksZ0JBQWdCO0VBQ2hCLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3ZpYWphci92aWFqYXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYWdtLW1hcCB7XHJcbiAgICBoZWlnaHQ6IDUwJTtcclxufVxyXG5cclxuLnRpdHVsby1jb21lcmNpby12aWFqZSB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbi5zaW4tZGF0b3MtdmlhamUge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdG9wOiA0MCU7XHJcbiAgICBib3R0b206IDUwJTtcclxufVxyXG5cclxuLnNpbi1wIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/viajar/viajar.page.ts":
/*!***************************************!*\
  !*** ./src/app/viajar/viajar.page.ts ***!
  \***************************************/
/*! exports provided: ViajarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViajarPage", function() { return ViajarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_text_to_speech_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/text-to-speech/ngx */ "./node_modules/@ionic-native/text-to-speech/ngx/index.js");
/* harmony import */ var _services_geo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/geo.service */ "./src/app/services/geo.service.ts");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _services_network_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/network.service */ "./src/app/services/network.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





// Plugins

// Servicios




var API_STORAGE_KEY = 'localData';
var API_URL_PHP = 'http://177.244.55.122/api';
var API_URL4111 = 'http://177.244.55.122:4111';
var ViajarPage = /** @class */ (function () {
    function ViajarPage(router, toastCtl, geo, storage, usuario, net, tts) {
        var _this = this;
        this.router = router;
        this.toastCtl = toastCtl;
        this.geo = geo;
        this.storage = storage;
        this.usuario = usuario;
        this.net = net;
        this.tts = tts;
        // Marcadores
        this.markerDraggable = true;
        this.lat = 0;
        this.lng = 0;
        this.latMarker = 0;
        this.lngMarker = 0;
        this.latEscucha = 0;
        this.lngEscucha = 0;
        // Datos de Direction
        this.zoom = 9.7;
        this.alternativa = true;
        this.origin = {
            lat: 0,
            lng: 0
        };
        this.destiny = {
            lat: 0,
            lng: 0
        };
        this.renderOptions = {
            suppressMarkers: true,
        };
        this.markerOptions = {
            origin: {
                label: 'Asesor'
            },
            destination: {
                label: 'Cliente'
            },
        };
        this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
        this.observar = this.regresar().subscribe(function (escuchando) {
            _this.latEscucha = escuchando.coords.latitude;
            _this.lngEscucha = escuchando.coords.longitude;
            // // Ruta
            _this.origin.lat = escuchando.coords.latitude;
            _this.origin.lng = escuchando.coords.longitude;
            _this.lat = escuchando.coords.latitude;
            _this.lng = escuchando.coords.longitude;
        }, function (error) { return _this.mensaje(error); }, function () { return console.log('Salimos'); });
        // Ubicación de Escucha
        // this.geo.ubicacionGPS().subscribe((resp: any) => {
        //   this.latEscucha = resp.coords.latitude;
        //   this.lngEscucha = resp.coords.longitude;
        //   // Ruta
        //   this.origin.lat = resp.coords.latitude;
        //   this.origin.lng = resp.coords.longitude;
        //   this.lat = resp.coords.latitude;
        //   this.lng = resp.coords.longitude;
        // });
    }
    ViajarPage.prototype.regresar = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_9__["Observable"](function (observer) {
            // Ubicación de Escucha
            _this.geo.ubicacionGPS().subscribe(function (resp) {
                observer.next(resp);
            });
        });
    };
    ViajarPage.prototype.ngOnInit = function () {
        this.comercio = this.dato.comercio;
        this.asesor = this.dato.asesor;
        // Info Cliente
        this.img = this.dato.img;
        this.clienteid = this.dato.clienteid;
        this.numero = this.dato.numero;
        this.nombre = this.dato.nombre;
        this.domicilio = this.dato.domicilio;
        this.limite = this.dato.limite;
        this.saldo = this.dato.saldo;
        this.disponible = this.dato.limite - this.dato.saldo;
        this.ultima = this.dato.ultima;
        this.email = this.dato.email;
        // Ruta
        this.destiny.lat = this.dato.lat;
        this.destiny.lng = this.dato.lng;
    };
    ViajarPage.prototype.ngOnDestroy = function () {
        this.observar.unsubscribe();
    };
    ViajarPage.prototype.iniciar = function () {
        this.zoom = 19;
        this.lat = this.origin.lat;
        this.lng = this.origin.lng;
    };
    ViajarPage.prototype.setPanel = function () {
        return document.querySelector('#myPanel');
    };
    // Para ver la respuesta, aquí se ven los pasos a seguir
    // Metodo en AGM_DIRECTION: (onResponse)="getStatus($event)"
    ViajarPage.prototype.getStatus = function (event) {
        // console.log(event);
    };
    ViajarPage.prototype.hablar = function () {
        this.tts.speak('Hello World')
            .then(function () { return console.log('success'); })
            .catch(function (reason) { return console.log(reason); });
    };
    ViajarPage.prototype.agregarMarker = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var msg, toast;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.latMarker = event.coords.lat;
                        this.lngMarker = event.coords.lng;
                        msg = 'Nuevas Coordenadas:\n' +
                            event.coords.lat +
                            '\n' + event.coords.lat
                            + '\nal cliente # ' + this.numero + '?';
                        return [4 /*yield*/, this.toastCtl.create({
                                header: 'Agregar GPS',
                                message: msg,
                                position: 'bottom',
                                color: 'danger',
                                buttons: [
                                    {
                                        side: 'start',
                                        text: 'Si',
                                        handler: function () {
                                            if (_this.net.getNetSatus() === _services_network_service__WEBPACK_IMPORTED_MODULE_8__["ConnectionStatus"].Offline) {
                                                _this.usuario.getLocalData('markers').then(function (marks) {
                                                    var markersAnt = [];
                                                    if (marks !== null) {
                                                        markersAnt.push(marks);
                                                        _this.storage.remove(API_STORAGE_KEY + "-markers");
                                                    }
                                                    var markerNew = {
                                                        cliente: _this.numero,
                                                        coordenadas: event.coords
                                                    };
                                                    markersAnt.push(markerNew);
                                                    _this.usuario.setLocalData('markers', markersAnt);
                                                    var msg = 'Envio Cancelado';
                                                    var toast = _this.toastCtl.create({
                                                        header: 'Se guardo localmente.',
                                                        message: msg,
                                                        position: 'bottom',
                                                        buttons: [
                                                            {
                                                                text: 'Ok',
                                                                role: 'cancel',
                                                                handler: function () {
                                                                    console.log('Cancel clicked');
                                                                }
                                                            }
                                                        ]
                                                    });
                                                    toast.then(function (to) { return to.present(); });
                                                });
                                            }
                                            else {
                                                _this.usuario.getLocalData('markers').then(function (marks) {
                                                    var markersAnt = [];
                                                    if (marks !== null) {
                                                        markersAnt.push(marks);
                                                        _this.storage.remove(API_STORAGE_KEY + "-markers");
                                                    }
                                                    var markerNew = {
                                                        cliente: _this.numero,
                                                        coordenadas: event.coords
                                                    };
                                                    markersAnt.push(markerNew);
                                                    _this.usuario.agregarMarker(_this.asesor, markerNew).subscribe(function (resp) {
                                                        var msg;
                                                        if (resp[0].msh === 'ok') {
                                                            msg = 'GPS Enviado correctamente';
                                                        }
                                                        else {
                                                            msg = 'GPS No Enviado';
                                                        }
                                                        var toast = _this.toastCtl.create({
                                                            header: 'Información del Cliente',
                                                            message: 'GPS Enviado correctamente',
                                                            position: 'bottom',
                                                            buttons: [
                                                                {
                                                                    text: 'Ok',
                                                                    role: 'cancel',
                                                                    handler: function () {
                                                                        console.log('Cancel clicked');
                                                                    }
                                                                }
                                                            ]
                                                        });
                                                        toast.then(function (to) { return to.present(); });
                                                    });
                                                });
                                            }
                                        }
                                    },
                                    {
                                        text: 'No',
                                        role: 'cancel',
                                        handler: function () {
                                            _this.latMarker = 0;
                                            _this.lngMarker = 0;
                                            var msg = 'Envio Cancelado';
                                            var toast = _this.toastCtl.create({
                                                header: 'Información del Cliente',
                                                message: msg,
                                                position: 'bottom',
                                                buttons: [
                                                    {
                                                        text: 'Ok',
                                                        role: 'cancel',
                                                        handler: function () {
                                                            console.log('Cancel clicked');
                                                        }
                                                    }
                                                ]
                                            });
                                            toast.then(function (to) { return to.present(); });
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
    ViajarPage.prototype.info = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var msg, toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '# ' + this.numero + ' ' + this.nombre
                            + '\nLímite: ' + this.limite + ' Saldo: ' + this.saldo
                            + '\nUltima Compra: ' + this.ultima
                            + '\nEmail Registrado: \n' + this.email;
                        return [4 /*yield*/, this.toastCtl.create({
                                header: 'Información del Cliente',
                                message: msg,
                                position: 'bottom',
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
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
    ViajarPage.prototype.mensaje = function (msg) {
        var toast = this.toastCtl.create({
            message: msg,
            duration: 1000,
            position: 'bottom'
        });
        toast.then(function (to) { return to.present(); });
    };
    ViajarPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-viajar',
            template: __webpack_require__(/*! ./viajar.page.html */ "./src/app/viajar/viajar.page.html"),
            styles: [__webpack_require__(/*! ./viajar.page.scss */ "./src/app/viajar/viajar.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _services_geo_service__WEBPACK_IMPORTED_MODULE_6__["GeoService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            _services_usuario_service__WEBPACK_IMPORTED_MODULE_7__["UsuarioService"],
            _services_network_service__WEBPACK_IMPORTED_MODULE_8__["NetworkService"],
            _ionic_native_text_to_speech_ngx__WEBPACK_IMPORTED_MODULE_5__["TextToSpeech"]])
    ], ViajarPage);
    return ViajarPage;
}());



/***/ })

}]);
//# sourceMappingURL=viajar-viajar-module.js.map