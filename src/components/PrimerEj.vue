<template>
    <h1>Este es un componente de Vue</h1>
    <h1>{{ titulo }}</h1>
    <p>Utilizamos la directiva v-model para realizarlo</p>
    <input type="text" v-model="unObjeto">
    <h4>{{ unObjeto }}</h4>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
    titulo: {
        type: String,
        requiered: true
    }
})

const unObjeto = ref('')
unObjeto.value = "Empezamos a aprender vue"

</script>

<style scoped>
input[type=text] {
    display: block;
    margin-right: auto;
    margin-left: auto;
    overflow-wrap: break-word;
    /* border: 5px solid red; */

    width: 50%;
    max-width: 50%;
    padding: 6px 10px;
    border-radius: 20px;
}
h1, h4, p {
    /*border: 5px solid blue ;*/
    font-size: 30px;
    max-width: 100%;
    overflow-wrap: break-word;
    padding: 20px;
    text-align: center;
}
h4 {
    font-size: 40px;
}

</style>