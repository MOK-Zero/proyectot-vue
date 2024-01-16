<template>
<div class="wrapper">
    <h1>{{ titulo }}</h1>

    <h2>Llamar a funciones</h2>
    <p>Directiva v-on con modificador :click , atajo @click</p>
    <h2>{{ numero }}</h2>
    <div class="botones"> 
        <button v-on:click="incrementar">Incrementar</button>
        <button @click="decrementar">Decrementar</button>
    </div>
    
    <h2>CSS Dinámico</h2>
    <h2 v-bind:class="cssDinamico">Un título cualquiera</h2>
    <p> Directiva v-bind con modificador :class , atajo :class </p>
    <div class="botones"> 
        <button @click="cambiarColor()">Cambiar Color</button>
    </div>


</div>
    
</template>

<script setup>
import { ref } from 'vue'
import { watch } from 'vue'
// En este ejericicio vamos a trabajar con directivas
// Propiedades como computed, methods y watchers
defineProps({
    titulo: {
        type: String,
        requiered: true,
    }
})

// Recuerde que utilizamos esta "funcion" para decirle a Vue
// que queremos que el objeto tenga un estado reactivo
const numero = ref(0)

const incrementar = () => {
    numero.value++
}

// Tambien podemos trabajar indicando la palabra function 
function decrementar(){
    numero.value--
}

const cssDinamico = ref("rojo")

//Estos nombres son los que tenemos en el CSS
const cambiarColor = () => {
    if(cssDinamico.value === "azul"){
        cssDinamico.value = "rojo";
    }else{
        cssDinamico.value = "azul";
    }
}

// Los watchers nos sirven para vigilar el estado actual de un elemento 
// y compararlo con su estado previo
watch(numero, (numero, numeroAnterior) => { 
    if(numero > numeroAnterior){
        console.log("El watcher dice: número está incrementando")
    }else{
        console.log("El watcher dice: número está decrementando")
    }
})


</script>


<style scoped>
.wrapper {
    text-align: center;
    border: 2px solid green;
}

.wrapper .azul {
    color: blue;
}

.wrapper .rojo {
    color: red;
}

.wrapper .botones {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 5px solid red;
    padding: 5px;
}
.botones > button {
    flex: 1 1 150px;
    border-radius: 10px;
    border: 3px solid green;
    text-align: center;
    margin: 5px;
}

</style>