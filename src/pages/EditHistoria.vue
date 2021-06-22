<template>
  <q-page padding>
    <q-form
      @submit="onSubmit">
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
          filled
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
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
        <q-input readonly
          color="teal"
          class="col-xs-12  col-md-4 q-pa-xs q-mt-xl"
          filled
          v-model="id_proyecto"
          label="N° proyecto"          
        ></q-input>
        <q-btn-group spread class="q-mt-xl">
          <q-btn color="blue" label="Volver" icon="back" @click="back" />
          <q-btn color="green" label="Editar" icon="done_all" type="submit" />
        </q-btn-group>

    </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data: function() {
      return{
        titulo:null,
        como:'',
        para:'',
        quiero: '',
        criterio:'',
        id_proyecto:''
      }
  },
  created(){
      this.getHistoria();
    },
  methods: {
      async getHistoria(){
        try {
          const historiaBack = await api.get('/historias/' + this.$route.params.id)
            this.titulo = historiaBack.data.titulo
            this.como = historiaBack.data.como
            this.criterio = historiaBack.data.criterio_aceptacion
            this.para = historiaBack.data.para
            this.quiero = historiaBack.data.quiero
            this.id_proyecto = historiaBack.data.id_proyecto
        } catch (error) {
          console.log(error)              
        }
      },
      async editHistoria(){
        try {
         let response = await api.patch('/historias/' + this.$route.params.id,{
           body:{
             titulo:this.titulo,
             como:this.como,
             para:this.para,
             quiero: this.quiero,
             criterio_aceptacion:this.criterio,
             id_proyecto: this.id_proyecto
          }
        })
        console.log(response)
        if(response.status == 201){
          this.back()
        }                
      } catch (error) {
        console.log(error)
      }               
    },
    onReset () {
      this.como = ' '
      this.para = ' '
      this.titulo = ' '
      this.quiero = ' '
      this.criterio = ' '
      this.id_proyecto = ' '
    },
    back(){
      this.$router.go(-1)
    },
    onSubmit () {
      if(this.como ==''|| this.titulo =='' || this.para =='' || this.criterio =='' || this.id_proyecto =='' ){        
        console.log('CAMPOS VACIO')
      }else{
         this.editHistoria()
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