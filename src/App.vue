<script setup>
  import PrimerEj from './components/PrimerEj.vue'
  import SegundoEj from './components/SegundoEj.vue'
</script>

<template>
    
    <main>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        <!-- 
        <PrimerEj titulo="Primer ejercicio interpolación en Vue" />
         -->
        <SegundoEj msg="Probando el ciclo de vida de VueJS" />


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
