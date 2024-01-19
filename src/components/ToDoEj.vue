<template>

    <div>
        <h2>Lista de Tareas <button @click="agregarTarea('Tarea Nueva', 'Descripcion')">Agregar Nueva</button></h2>
        <h2>Agregue un titulo: </h2> <input type="text" v-model="nuevoTitulo">
        <h2>Agregue una descripcion: </h2> <input type="text" v-model="nuevaDescripcion">
        <button @click="agregarTarea(nuevoTitulo, nuevaDescripcion)">Agregar una nueva tarea</button>
        <h1>Indice a editar {{editando}}</h1>
        <ul v-if=" listaTareas.length>0 ">
            <li v-for="(tarea, index) in listaTareas" :key="tarea.id">

              <!--Referenciamos las variables con v-text para solo mostrarlas y que no estén unidas bidereccionalmente
              de esta manera ya podemos editar sin perjudicar los setters -->  
              
              <!-- content editable necesita recibir una cadena con true o false pero no puede ingresar en bruto el valor (cadenita) -->
              <span 
                :contenteditable="edicion ? 'true' : 'false' " 
                v-text="tarea.titulo"
             ></span> -
            
            <span
                :contenteditable="edicion ? 'true' : 'false' "
                ref="contenidoEdicion"
                @input="handleInputEdicion"
                v-text="tarea.descripcion"
                ></span>
              
              <h1 v-if="index === editando">Estamos editando {{tarea.id}}</h1>

              <!-- 
                <button @click="completarTarea(tarea.id)">{{ tarea.estado ? 'Completada' : 'Pendiente' }}</button>
                <button @click="eliminarTarea(tarea.id)">X</button>

              -->  
                <button @click="iniciarEdicionTarea(tarea.id, index)"> Editar Tarea {{ editando }}</button>
                <button @click="editarTarea(tarea.id)"> Editar Tarea {{ editando }}</button> 
                <!--- TODO: Habiliitar la funcionaliidad de edicion, se recomienda agregar la propiedad editable a los nodos SPAN -->
                
            </li>
        </ul>
        <div v-else>
            Sin Tareas
        </div>   
    </div>

</template>
<script setup>
    import { ref, reactive } from "vue"
    import Tarea from "./clasesjs/Tarea"

    const listaTareas = ref([])

    const nuevoTitulo = ref("")
    const nuevaDescripcion = ref("")
    const editando = ref(-1)
    const edicion = ref(true)

    // Revisando esto
    const contenidoEdicion = ref(null);
    
    const textoEdicion = ref("")

    console.log("CONTENIDO LISTA DE TAREAS AL CREAR")
    console.log(listaTareas)


    // Agrega las tareas a la lista
    function agregarTarea(titulo, descripcion){
        if( (titulo != undefined && titulo != "") ){
            // const id = listaTareas.value.length ? listaTareas.value.length + 1 : 0
            const id = listaTareas.value.length + 1
            const nuevaTarea = new Tarea(id, titulo, descripcion)
            listaTareas.value.push(nuevaTarea)

            nuevaDescripcion.value = ""
            nuevoTitulo.value = ""

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

    function iniciarEdicionTarea(id, index){
        const tarea = listaTareas.value.find(tarea => tarea.id === id);
        if(tarea){
            nuevoTitulo.value = tarea.titulo
            nuevaDescripcion.value = tarea.descripcion
            editando.value = index
            
            console.log("Valor de los atributos es : ", tarea.titulo, tarea.descripcion)
            console.log("Los valores auxiliares son:  Titulo -> ", nuevoTitulo.value," y  Desc -> ",nuevaDescripcion.value)
        }else{
            alert("No se encontró ninguna tarea con el id"+id)
        }
    }

    function handleInputEdicion(event){
        textoEdicion.value = event.target.innerHTML
        console.log(textoEdicion.value)
    }

    // argumentos previos                           id, nuevoTitulo, nuevaDescripcion, nuevoEstado
    function editarTarea(id){
        const tarea = listaTareas.value.find(tarea => tarea.id === id);

        if(tarea){
            console.log(contenidoEdicion)
            /*
            if(nuevoTitulo != undefined && nuevoTitulo != ""){
                tarea.titulo = nuevoTitulo;
                tarea.descripcion = nuevaDescripcion;
                tarea.estado = nuevoEstado;
            }
            */
        }else{
            alert("No se encontró ninguna tarea con el id"+id)
        }

        console.log(" CONTENIDO LISTA DESPUES DE TOCAR EL BOTON ")
        console.log(listaTareas)
    }

    // El estado cambiara con un checkbox y solo tendra true o false
    function completarTarea(id){
        const tarea = listaTareas.value.find(tarea => tarea.id === id);
        if(tarea){
            tarea.estado = !tarea.estado
        }
    }

</script>