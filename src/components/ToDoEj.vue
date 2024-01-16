<template>

    <div>
        <h2>Lista de Tareas <button @click="agregarTarea('Tarea Nueva', 'Descripcion')">Agregar Nueva</button></h2> <!--- TODO: Definir estilos sobre la lisa -->
        <ul>
            <li v-if="listaTareas.length > 0" v-for="tarea in listaTareas" :key="tarea.id"> <!-- Si la lista esta vacia no se ejecuta el For -->
                <span>{{ tarea.titulo }}</span> - <span>{{ tarea.descripcion }}</span> - {{ tarea.estado ? 'Completada' : 'Pendiente' }}
                <button> Editar Tarea </button> <!--- TODO: Habiliitar la funcionaliidad de edicion, se recomienda agregar la propiedad editable a los nodos SPAN -->
                <button @click="eliminarTarea(tarea.id)">X</button>
            </li>
            <div v-else>
                Sin Tareas
            </div>      
        </ul>
    </div>

</template>
<script setup>
    import { ref, reactive } from "vue"
    import Tarea from "./clasesjs/Tarea"

    const listaTareas = ref([])

    console.log("CONTENIDO LISTA DE TAREAS AL CREAR")
    console.log(listaTareas)


    // Agrega las tareas a la lista
    function agregarTarea(titulo, descripcion){
        if( (titulo != undefined && titulo != "") ){
            const id = listaTareas.length ? listaTareas.length + 1 : 0
            const nuevaTarea = new Tarea(id, titulo, descripcion)
            listaTareas.value.push(nuevaTarea)

        }else{
            alert("El titulo debe contener datos")
        }

        console.log("CONTENIDO LISTA DE TAREAS AL AGREGAR")
        console.debug(listaTareas.value)
    }

    function eliminarTarea(id){
        const indice = listaTareas.value.findIndex(tarea => tarea.id === id);
        if( indice != -1){
            listaTareas.value.splice(indice, 1)
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