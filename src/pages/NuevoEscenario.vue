<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset">
      <q-input
        class="q-pa-xs"
        filled
        v-model="titulo"
        label="Nombre caso de prueba"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo requerido']"
      ></q-input>
      
        <q-input
          color="teal"
          filled
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          v-model="como"
          label="Descripcion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>  
        <q-input
          color="teal"
          filled
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          v-model="quiero"
          label="Pre condicion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>        
        <q-input
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="para"
          label="Secuencia"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
      
      <q-input
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="criterio"
          label="Pos condicion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
        <q-input readonly
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="id_proyecto"
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
      titulo:null,
      como:'',
      quiero:'',
      para:'',
      criterio:'',
      id_proyecto: ''
    }
  },
   created(){
      this.insertarIdProyecto();
    },
  
  methods: {
    async crearHistoria(){
      try {
       let response = await api.post('/historias',{
          body:{
            titulo:this.titulo,
            como:this.como,
            quiero: this.quiero,
            para: this.para,
            estado:true,
            criterio_aceptacion:this.criterio,
            id_proyecto: this.$route.params.id
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
      this.id_proyecto = this.$route.params.id
    },
    onReset () {
      this.como = ' '
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
         this.crearHistoria()
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
