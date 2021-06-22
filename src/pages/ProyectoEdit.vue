<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md q-gutter-sm">    
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Edite el proyecto</div>
                </q-card-section>
                <q-form @submit="onSubmit">
                    <q-card-section class="q-pt-none">
                        <q-input label-color="green" v-model="nombre" label="Nombre del proyecto" :rules="[ val => val && val.length > 0 || 'Campo requerido']" /> 
                        <q-input label-color="green" v-model="descripcion" label="Descripcion" :rules="[ val => val && val.length > 1 || 'Campo requerido']" />            
                    </q-card-section>
                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancel" to="/" />
                        <q-btn flat color="green" label="Editar"  type="submit" />
                    </q-card-actions>
                </q-form>
            </q-card>
        </div>
    </q-page>  
</template>

<script>
import { api } from 'boot/axios'
import routes from 'src/router/routes';

export default {
    //name:'ProyectoEdit',
    data: function() {
        return{
          prompt: false,
          nombre: '', 
          descripcion: ''      
        } 
    },
    created(){
      this.getProyecto();
    },
    methods:{
      async getProyecto(){
        try {
          const proyectoBack = await api.get('/proyectos/' + this.$route.params.id)
            this.nombre = proyectoBack.data.nombre
            this.descripcion = proyectoBack.data.descripcion                                                  
        } catch (error) {
          console.log(error)              
        }
      },
      async editProyecto(){
        try {          
          let response = await api.patch('/proyectos/' + this.$route.params.id,{
            body:{
              nombre: this.nombre,
              descripcion: this.descripcion,
              estado: true
            }
          })
          if(response.status == 201){
          this.back()
          }
        } catch (error) {
          console.log(error)        
        }          
      },
      back(){
      this.$router.go(-1)
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
          this.editProyecto()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Se edito proyecto'
          })
          this.prompt = false          
        }
      }
    }
  }
</script>