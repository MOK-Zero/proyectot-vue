<template>
  <div class="hello">
    <h1>CICLO DE VIDA</h1>
    <h1>{{ msg }}</h1>


    <h2>{{ mensaje }}</h2>
    <h1 @click="incrementa" >{{ variable }}</h1>
   
  </div>
</template>

<script>
export default {

  name: 'HelloWorld',
  
  props: {
    msg: String
  },

  data() {
    return {

      mensaje: 'Hola mundo',
      variable: 0
    
    }
  },


  computed: {
    
    ambosDatos() {
      return this.mensaje + ' ' + this.variable
    }
 
 },

  methods:{

    incrementa(){
      this.variable++;
    },

  },


  beforeCreate() {
    console.log('beforeCreate')
    this.mensaje = 'Antes de crear'
  },

  created(){
    console.log('created')
  },

  beforeMount() {
    console.log('beforeMount')
  },

  mounted(){
    console.log('mounted')
  },

  beforeUpdate () {
    console.log('beforeUpdate: ')
  },

  updated(){
    console.log('Updated: ')
  },

  beforeUnmount() {
    console.log('beforeUnmount')
  },

  unmounted(){
    console.log('unmounted')
    window.alert("Se desmontó helloWorld, noo mi piernita");
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
