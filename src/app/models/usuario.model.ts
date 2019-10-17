export class Gps {
    constructor(
        public imei: string,
        public idFerrum: number,
        public nombre: string,
        public rol: string,
        public email: string,
        public img: string,
        public lat: number,
        public lng: number,
        public time: number,
        public altitud: number,
        public exactitud: number,
        public velocidad: number,
        public activo: string,
        public _id: string
    ) { }
}