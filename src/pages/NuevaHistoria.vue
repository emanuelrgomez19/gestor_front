<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset">
      <q-input
        class="q-pa-xs"
        filled
        v-model="titulo"
        label="Titulo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo requerido']"
      ></q-input>
      <div class="row col-2">
        <q-input
          color="teal"
          filled
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          v-model="como"
          label="Como"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
        <q-input
          color="teal"
          class="col-xs-12 col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="quiero"
          label="Quiero"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
        <q-input
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="para"
          label="Para"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
      </div>
      <q-input
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="criterio"
          label="Criterio de aceptacion"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo requerido']"
        ></q-input>
        <q-btn-group spread class="q-mt-xl">
          <q-btn color="green" label="Agregar" icon="done_all" type="submit"/>
          <q-btn color="red" label="Limpiar" icon="dangerous" type="reset" />
        </q-btn-group>

    </q-form>
    <q-btn @click="back" icon="undo"/>
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
      criterio:''
    }
   

  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    async crearHistoria(){
      try {
       await api.post('/historias',{
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
      } catch (error) {
        console.log(error)
      }
      this.onReset()
      
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
          message: 'Se agrego nueva Historia'
      })
      }
      
    },

    
  },


}
</script>
