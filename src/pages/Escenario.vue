<template>
    <q-page padding>
        <div class="row justify-between items-center">
            <h4>Escenarios</h4>            
            <q-btn label="Nuevo escenario   " rounded icon="add" color="primary" @click="agregar" />
        </div>        
        <q-card flat bordered class="q-ma-xs my-card bg-grey-1"  v-for= "(item,index) in escenarios" :key="index">
            <q-card-section class=""  >
                <div class="row justify-center full-width">
                    <div class="col">
                        <div class="text-bold col text-center bg-amber-2">ID</div>
                        <div v-text="item.id" class="text-center"></div>
                    </div>
                    <div class="col">
                        <div class="text-bold col text-center bg-amber-3">Caso de uso</div>
                        <div v-text="item.objetivo" class="text-center"></div>
                    </div>
                    <div class="col" >
                        <div class="text-bold text-center bg-amber-3"> Descripcion  </div>
                        <div class="text-center q-ma-xm" v-html="item.descripcion"></div>
                    </div>
                     <div class="col text-center" >
                        <div class="text-bold bg-amber-3">Pre Condicion</div>
                        <div class="text q-ma-xm" v-html="item.pre_condicion"></div>
                    </div>
                    <div class="col" >
                        <div class="text-bold text-center bg-amber-3"> Pos Condicion  </div>
                        <div class="text-center q-ma-xm" v-html="item.pos_condicion"></div>
                    </div>
            
                    <div class="col text-center" >
                        <q-btn  size="sm" outline  class="col q-ma-xs" color="blue" label="" icon="visibility" type="reset" :to="{name:'escenarioid',params:{id: item.id}}" />
                        <q-btn  size="sm" outline  class="col q-ma-xs" color="green" label="" icon="edit" type="reset" :to="{name:'casoidedit',params:{id: item.id}}" />
                        <q-btn  size="sm" outline  class="col q-ma-xs" color="red" label="" icon="delete" type="reset" :to="{name:'casoidedit',params:{id: item.id}}" />

                    </div>                    
                </div>               
                <div class="full-width row  justify-center  content-start">
                    
                </div>
            </q-card-section>
        </q-card>
        <div class="row justify-between items-center">
            <q-btn label="Volver" size="sm" outline  class="col" color="blue-5"  icon="done_all" @click="back" />
        </div>        
    </q-page>    
</template>    

<script>
import { api } from 'src/boot/axios';
export default {
    data(){
        return{
            id:'',
            objetivo:'',
            pos_condicion:'',
            pre_condicion:'',
            descripcion:'',
            escenarios:[]
        }
    },
    created(){
    this.apiescenarios();
  },
  methods:{
      async apiescenarios(){
          try {
              const escenarios = await api.get('/escenariohistoria/' + this.$route.params.id, {})
              console.log(escenarios)
              await escenarios.data.forEach(element => {
                  let item = {}
                  item.id = element.id
                  item.objetivo = element.objetivo
                  item.pos_condicion = element.pos_condicion
                  item.pre_condicion = element.pre_condicion
                  item.descripcion = element.descripcion
                  this.escenarios.push(item)
                 
              });
          } catch (error) {
              console.log(error)              
          }
      },
      agregar(){
            this.$router.push('nueva/'+ this.$route.params.id)            
      },
      back(){
      this.$router.go(-1)
    },
  }
}
</script>