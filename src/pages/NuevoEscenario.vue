<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset">
      <q-input
        class="q-pa-xs"
        filled
        v-model="objetivo"
        label="Nombre caso de prueba"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo requerido']"
      ></q-input>
      
        <q-input
          color="teal"
          filled
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          v-model="descripcion"
          label="Descripcion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>  
        <q-input
          color="teal"
          filled
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          v-model="preCondicion"
          label="Pre condicion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>            
      <q-input
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="posCondicion"
          label="Pos condicion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
        <q-input readonly
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="id_historia"
          label="Historia"          
        ></q-input>
        <q-btn-group spread class="q-mt-xl">
          <q-btn color="blue" label="Volver" icon="back" @click="back" />
          <q-btn color="green" label="Crear" icon="done_all" type="submit" />          
        </q-btn-group>

    </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data(){
    return{
      objetivo:'',
      descripcion:'',
      preCondicion:'',
      secuencia:'',
      posCondicion:'',
      id_historia: ''
    }
  },
   created(){
      this.insertarIdProyecto();
    },
  
  methods: {
    async crearEscenario(){
      try {
       let response = await api.post('/escenarios',{
          body:{
            objetivo:this.objetivo,
            descripcion:this.descripcion,
            pre_condicion: this.preCondicion,
            pos_condicion:this.posCondicion,
            estado:true,
            id_historia: this.$route.params.id
          }
        })
        if(response.status == 201){
            this.back()
          }       
      } catch (error) {
        console.log(error)
      }
      this.onReset()
      
    },
    back(){
      this.$router.go(-1)
    },
    insertarIdProyecto(){
      this.id_historia = this.$route.params.id
    },
    onReset () {
      this.nombre = ' '
      this.quiero = ' '
      this.para = ' '
      this.titulo = ' '
      this.criterio = ' '
    },
    onSubmit () {
      if(this.como===''|| this.titulo==='' || this.para==='' || this.quiero==='' || this.criterio==='' ){
        console.log(this.como)
        console.log('CAMPOS VACIO')

      }else{
         this.crearEscenario()
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
      })
      }
      
    },

    
  },


}
</script>
