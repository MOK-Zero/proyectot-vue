<script setup>
  import PrimerEj from './components/PrimerEj.vue'
  import CicloVida from './components/CicloVida.vue'
  import ToDoEj from './components/ToDoEj.vue'
</script>

<template>
    
    <main>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        <!-- 
        <PrimerEj titulo="Primer ejercicio interpolación en Vue" /> 
        <CicloVida msg="Probando el ciclo de vida de VueJS" />
        -->
        <ToDoEj />

    </main>

</template>

<style scoped>
header{
  margin: 2rem auto 2rem;
  display: block;
}
.logo {
  display: block;
  margin: 2rem auto 2rem;
}
main {
  display: block;
}
a {
  border: 1px solid green;  
}
</style>
