<template>
  <q-page padding>
    <div class="row justify-between items-center">

      <h4>Proyectos</h4>
      <NuevoProyecto></NuevoProyecto>
    </div>
      <q-input   
        class=""
        v-model="buscar"
        debounce="500"
        filled
        placeholder="Buscar"
      >
      <template v-slot:append>
        <q-icon name="find_in_page" />
      </template> 
      </q-input>
      <q-card class="row q-mt-xs bg-light-blue-1 items-center" >
            <q-card-section class="col-1  text-bold">ID</q-card-section>
            <q-card-section class="col-2 text-bold">NOMBRE</q-card-section>
            <q-card-section class="col q-pa-xs items-center text-bold">DESCRIPCION</q-card-section>
            <q-card-section class="text-center q-mr-xl text-bold">OPCIONES</q-card-section>
      </q-card>
    <q-card class="row q-mt-xs q-p q-pa-xs items-center"
      flat bordered v-for= "(item,index) in proyectos" :key="index">
      <q-card-section class="col-1 " v-html="item.id"/>
      <q-card-section class="col-2 q-pa-xs items-center" v-html="item.nombre"/>
      <q-card-section class="col q-pa-xs items-center" v-html="item.descripcion"/>
      <q-btn-group  row q-mt-xs q-p q-pa-xs items-center  >
        <q-btn  size="sm"  outline  class="col q-mr-xs" color="blue" label="" icon="visibility" push :to="{name:'casoid',params:{id: item.id}}" />
        <q-btn  size="sm"  outline  class="col q-mr-xs" color="green" label="" icon="edit" push :to="{name:'proyectoid',params:{id: item.id}}" />
        <q-btn  size="sm"  outline  class="col q-mr-xs" color="red" label="" icon="delete" push @click="eliminar(item.id)" />
       
      </q-btn-group>
    </q-card>

  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import NuevoProyecto from 'src/components/NuevoProyecto.vue';

export default {
  components: { NuevoProyecto },
  data () {
    return {
      nombre: null,
      descripcion: null,
      estado: true,
      proyectos:[],
      buscar:''
    }
    
  },
  created(){
    this.getProyectos();
  },
  methods: {
    async getProyectos(){
      try {
       const  proyectorDB = await api.get('/proyectos',{});
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
    async eliminar (index) {
      try {
        let response = await api.delete('/proyectos/' + index,{});
        console.log(response)
        if(response.status == 200){
          location.reload() //preguntar por eficiencia         
        }
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
      }
    },

    onReset () {
      this.nombre = ''
      this.descripcion = ''
    },
  }
}
</script>
