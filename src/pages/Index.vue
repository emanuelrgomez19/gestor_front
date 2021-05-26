<template>
  <q-page padding>
    <div class="row q-mt-sm q-pa-xs justify-between items-center">

      <h4>Proyectos</h4>
      <Dialogo></Dialogo>
    </div>
      <q-input
        v-model="buscar"
        debounce="500"
        filled
        placeholder="Buscar"
        hint="Buscar proyecto"
      >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
      </q-input>

    <p></p>
    <q-card class="row q-mt-xs q-p q-pa-xs items-center"
      flat bordered v-for= "(item,index) in proyectos" :key="index">
      <q-card-section class="col-1 " v-html="item.id"/>
      <q-card-section class="col q-pa-xs items-center" v-html="item.nombre"/>
      <q-card-section class="col q-pa-xs items-center" v-html="item.descripcion"/>
      <q-btn-group rounded row q-mt-xs q-p q-pa-xs items-center  >
        <q-btn padding="xs lg" rounded color="cyan-3" glossy text-color="black" push icon="visibility" :to="{name:'casoid',params:{id: item.id}}" />
        <q-btn padding="xs lg" rounded color="cyan-12" glossy text-color="black" push icon="edit" /> 
        <q-btn color="deep-orange-3" rounded glossy text-color="black" push  icon="delete"  @click="eliminar(index)"/>
      </q-btn-group>
    </q-card>

  </q-page>
</template>

<script>

import { api } from 'boot/axios'
import Dialogo from 'src/components/NuevoProyecto.vue';

export default {
  components: { Dialogo },
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
    async crearProyecto(){
      try {
      const proyecto =  await api.post('http://localhost:8081/proyecto',{
          body:{
            nombre:this.nombre,
            descripcion:this.descripcion,
            estado: this.estado
          }
        })        
      } catch (error) {
        console.log(error)
        
      }
      this.nombre=null
      this.descripcion=null
      this.actualizar()
          
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
