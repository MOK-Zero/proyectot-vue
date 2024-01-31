<template>
    <div class="general">
        <div class="contenedor-input">
            <h1>
                Lista de Tareas 
            </h1>
            <input type="text"
                        placeholder="Agregar titulo"
                        v-model="nuevoTitulo"
            >
            <input  type="text"
                        placeholder="Agregar descripcion"
                        v-model="nuevaDescripcion"
            >
            <div class="padre-boton">
                <button @click="agregarTarea('Titulo tarea plantilla', 'Descripcion con plantilla')">Probar</button>
                <button id="agregarTarea" @click="agregarTarea(nuevoTitulo, nuevaDescripcion)">Agregar</button>   
            </div>
        </div>
        <ul v-if=" listaTareas.length>0 ">
            <li v-for="(tarea, index) in listaTareas" :key="tarea.id" :data-id="tarea.id" ref="refsLiNodes">
              <!-- TODO: Utilizar un estilo mas agradable cuando el elemento este en edicion -->
                <div class="grupo-info">                    
                    <span 
                        :contenteditable="!!tarea.inEdit" 
                        :style="{
                            'border': !!tarea.inEdit ? '1px solid red' : '',
                            'text-decoration': !!tarea.estado ? 'line-through' : 'none'
                            }" 
                        v-text="tarea.titulo"
                        >
                    </span>
                    <span
                        :contenteditable="!!tarea.inEdit"
                        :style="{
                        'border': !!tarea.inEdit ? '1px solid red' : '',
                        'text-decoration': !!tarea.estado ? 'line-through' : 'none'
                        }"
                        v-text="tarea.descripcion"
                        >
                    </span>
                </div>  
                <div class="grupo-botones">
                    <button  id="completar_btn"  @click="completarTarea(tarea.id)"><IconCheck/></button>
                    <!-- <button @click="iniciarEdicionTarea(tarea.id, index)"> Editar Tarea {{ editando }}</button> -->
                    <button  v-if="!!!tarea.inEdit" @click="activeEdit(tarea.id)"><IconPencil /></button>
                    <button v-else @click="saveTodo(tarea.id)"><IconSave/></button>
                    <!-- <button @click="editarTarea(tarea.id)"> Guardar Tarea {{ editando }}</button>  -->
                    <button id="eliminar_btn" @click="eliminarTarea(tarea.id)"> <IconTrashCan/> </button>   
                </div>
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
    import IconTrashCan from "./icons/IconTrashCan.vue"
    import IconPencil from "./icons/IconPencil.vue"
    import IconSave from "./icons/IconSave.vue"
    import IconCheck from "./icons/IconCheck.vue"

    const listaTareas = ref([])
    const refsLiNodes = ref([])
    const nuevoTitulo = ref("")
    const nuevaDescripcion = ref("")
    // Revisando esto
    const contenidoEdicion = ref(null);    
    const textoEdicion = ref("")
    //console.log("CONTENIDO LISTA DE TAREAS AL CREAR")
    //console.log(listaTareas)

    // Agrega las tareas a la lista
    function agregarTarea(titulo, descripcion){
        if( (titulo != undefined && titulo != "") ){

            console.log("ESTO ES EL OBJETO REF")
            console.log(refsLiNodes)
            console.log("ESTE ES EL VALOR QUE TIENE DICHO OBJETO")
            console.log(refsLiNodes.value)
            console.log("##################################")

            // const id = listaTareas.value.length ? listaTareas.value.length + 1 : 0
            const id = listaTareas.value.length ? listaTareas.value[listaTareas.value.length-1].id + 1 : 1
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
     /*
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
    */
    function saveTodo(id){
        console.log("Aprendiendo ando")
        console.log(refsLiNodes.value)
        const liNode = refsLiNodes.value.find(el => el.dataset.id == id)
        const [titleSpan, descriptionSpan] = liNode.getElementsByTagName('span')
        const actualTodo = listaTareas.value.find(t => t.id == id)
        actualTodo.titulo = titleSpan.innerText
        actualTodo.descripcion = descriptionSpan.innerText
        disableEdit(id)
    }
    function activeEdit(id){
        const tarea = listaTareas.value.find(tarea => tarea.id === id);
        tarea.inEdit = true
    }
    function disableEdit(id){
        const tarea = listaTareas.value.find(tarea => tarea.id === id);
        tarea.inEdit = false
    }
    function handleInputEdicion(event){
        textoEdicion.value = event.target.innerHTML
        console.log(textoEdicion.value)
    }
     /*
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
            * /
        }else{
            alert("No se encontró ninguna tarea con el id"+id)
        }

        console.log(" CONTENIDO LISTA DESPUES DE TOCAR EL BOTON ")
        console.log(listaTareas)
    }
    */
    function completarTarea(id){
        const tarea = listaTareas.value.find(tarea => tarea.id === id);
        if(tarea){
            tarea.estado = !tarea.estado
        }
    }
    function printTodos(){
        console.log("########## EN QUE MOMENTO SE USA ESTO ?")
        console.log(listaTareas.value)
    }
    window.printTodos = printTodos //TODO: Eliminar funcion, solo para funciones de depuracion
</script>
<style scoped>
 .general {
    margin: 0;
 }
.contenedor-input {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px 10px 10px 10px;
    border: 1px solid #ddd;
    background-color: #49413d;
    border-radius: 5px; /* 5px rounded corners */

}
.contenedor-input input::placeholder {
    color: #ddd;
}
.padre-boton {
    /* position: relative; */
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 0.25rem;
}
#agregarTarea{    
    background-color: #7dfa00;
}   
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #49413d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
}
li:hover{
    transform: scale(0.992);
}
.grupo-info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    width: 100%;
}
.grupo-botones {
    display: flex;
}
span {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
}
button {
    cursor: pointer;
    align-items: center;
    background-clip: padding-box;
    background-color: #fa7d00;
    border: 1px solid transparent;
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: #fff;
    display: inline-flex;
    font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
}
input {
    width: 100%;
    margin-bottom: 10px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
}
#completar_btn {
    background-color: #15fa00;
}
#eliminar_btn {
    background-color: #fa1500;
}
</style>