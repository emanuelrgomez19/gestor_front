<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Nuevo proyecto" rounded icon="add" color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
        
        

      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nuevo proyecto</div>
        </q-card-section>
        <q-form
            @submit="onSubmit"
            >

        <q-card-section class="q-pt-none">
          <q-input
            label-color="green"
            v-model="nombre"
            label="Nombre del proyecto"
            :rules="[ val => val && val.length > 0 || 'Campo requerido']"
             /> 
          <q-input 
            label-color="green"
            v-model="descripcion"
            label="Descripcion"
            :rules="[ val => val && val.length > 1 || 'Campo requerido']"
            />            
           <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup type="submit" />
          <q-btn flat color="green" label="Crear"  type="submit" />
        </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      prompt: false,
      nombre: null,
      descripcion: null,
      estado: true,
      address: ''
    }
  },
  methods:{
    async crearProyecto(){
      try {
          console.log("POR CA")
      await api.post('http://localhost:8081/proyecto',{
          body:{
            nombre:this.nombre,
            descripcion:this.descripcion,
            estado: this.estado
          }
        })        
      } catch (error) {
        console.log(error)
        
      }
          
    },
     onSubmit () {
      if (this.nombre == ''||this.descripcion == '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.crearProyecto()
        // this.proyectos.push({
        //   nombre:this.nombre,
        //   descripcion:this.descripcion,
        //   estado:true
        // })
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
        this.prompt = false
        this.onReset()
      }
    },
    onReset () {
     this.nombre = ''
     this.descripcion = ''
    },
  }
}
</script>



  methods: {
    async actualizar(){
      this.proyectos = []
      try {
       const  proyectorDB = await api.get('/proyectos',{
         
       });
       await proyectorDB.data.forEach(element => {
         console.log(element)
        let item ={}
        item.id = element.id
        item.nombre = element.nombre
        item.descripcion = element.descripcion
        item.estado = element.estado

        this.proyectos.push(item)
       })
      } catch (error) {
        console.log(error)
        
      }
  
    },

    async getProyectos(){
      try {
       const  proyectorDB = await api.get('/proyectos',{
         
       });
       await proyectorDB.data.forEach(element => {
         console.log(element)
        let item ={}
        item.id = element.id
        item.nombre = element.nombre
        item.descripcion = element.descripcion
        item.estado = element.estado
        this.proyectos.push(item)
       })
      } catch (error) {
        console.log(error)
        
      }
    },

    eliminar(index){
      this.$q.dialog({
        titile:'acccion',
        message:'real',
        cancel:true,
        persistent:true
      }).onOk(()=>{
      this.proyectos.splice(index, 1)

      })
    },
   


  }
}
</script>
