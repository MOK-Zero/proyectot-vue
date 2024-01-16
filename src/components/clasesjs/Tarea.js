export default class Tarea {
    constructor(id, titulo, descripcion){
        // Manejar estos errores desde el frontend
        // Si llega aqui es un caso fatal

        if(id === undefined || titulo === undefined){
            throw new Error("Los campos, id y titulo son obligatorios")
        }

        if(descripcion === undefined){
            descripcion = ""
        }

        this._id = id
        this._titulo = titulo
        this._descripcion = descripcion
        this._estado = false
    }

    get id() {
        return this._id;
    }

    set id(nuevoId) {
        this._id = nuevoId;
    }

    get titulo() {
        return this._titulo;
    }
    set titulo(nuevoTitulo) {
        this._titulo = nuevoTitulo;
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(nuevoDescripcion) {
        this._descripcion = nuevoDescripcion;
    }

    get estado() {
        return this._estado;
    }

    set estado(nuevoEstado) {
        if(nuevoEstado === true || nuevoEstado === false){
            this._estado = nuevoEstado;
        }else{
            throw new Error("El estado solo puede ser true o false")
        }
    }
}