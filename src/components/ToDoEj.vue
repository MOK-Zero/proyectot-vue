<template>

    <div>
        <h2>Lista de Tareas</h2>
        <ul>
            <li v-for="tarea in listaTareas" :key="tarea.id">
                {{ tarea.titulo }} - {{ tarea.descripcion }} - {{ tarea.estado ? 'Completada' : 'Pendiente' }}
                <button @click="agregarTarea('Esta es una prueba', 'descripcion de prueba')"> Editar Tarea </button>
            </li>            
        </ul>
    </div>
    <p>Hola mundo</p>

</template>
<script setup>
    import { ref, reactive } from "vue"
    import Tarea from "./clasesjs/Tarea"

    const tarea1 = new Tarea(1, "Tarea UNO prueba", "Tarea UNO prueba");
    const tarea2 = new Tarea(2, "Tarea DOS prueba", "Tarea DOS prueba");
    const tarea3 = new Tarea(3, "Tarea TRES prueba", "Tarea TRES prueba");
    const tarea4 = new Tarea(4, "Tarea CUATRO prueba", "Tarea CUATRO prueba");
    const tarea5 = new Tarea(5, "Tarea CINCO prueba", "Tarea CINCO prueba");

    const listaTareas = ref([tarea1, tarea2, tarea3, tarea4, tarea5])

    console.log("CONTENIDO LISTA DE TAREAS AL CREAR")
    console.log(listaTareas)


    // Agrega las tareas a la lista
    // listaTareas.value.push(tarea1, tarea2, tarea3, tarea4, tarea5);
    function agregarTarea(titulo, descripcion){
        if( (titulo != undefined && titulo != "") ){
            const id = listaTareas.length + 1
            const nuevaTarea = new Tarea(id, titulo, descripcion)
            listaTareas.value.push(nuevaTarea)

        }else{
            alert("El titulo debe contener datos")
        }

        console.log("CONTENIDO LISTA DE TAREAS AL AGREGAR")
        console.log(listaTareas)
    }

    function eliminarTarea(id){
        const indice = listaTareas.findIndex(tarea => tarea.id === id);
        if( indice != -1){
            listaTareas.splice(indice, 1)
        }else{
            alert("El indice no fue encontrado");
        }

        console.log("CONTENIDO LISTA DE TAREAS AL ELIMINAR")
        console.log(listaTareas)

    }

    function editarTarea(id, nuevoTitulo, nuevaDescripcion, nuevoEstado){
        const tarea = listaTareas.find(tarea => tarea.id === id);
        if(tarea){
            if(nuevoTitulo != undefined && nuevoTitulo != ""){
                tarea.titulo = nuevoTitulo;
                tarea.descripcion = nuevaDescripcion;
                tarea.estado = nuevoEstado;
            }
        }else{
            alert("No se encontró ninguna tarea con el id"+id)
        }

        console.log(" CONTENIDO LISTA DESPUES DE TOCAR EL BOTON ")
        console.log(listaTareas)
    }

    // El estado cambiara con un checkbox y solo tendra true o false
    function completarTarea(id, nuevoEstado){
        const tarea = listaTareas.find(tarea => tarea.id === id);
        if(tarea){
            tarea.estado = nuevoEstado
        }
    }

</script>