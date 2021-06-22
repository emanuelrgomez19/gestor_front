<template>
    <q-page padding>
        <div class="row justify-between items-center">
            <h4>Escenarios</h4>            
            <q-btn label="Nuevo escenario   " rounded icon="add" color="primary" @click="agregar" />
        </div>        
        <q-card flat bordered class="q-ma-xs my-card bg-grey-1"  v-for= "(item,index) in historias" :key="index">
            <q-card-section class=""  >
                <div class="row justify-center full-width">
                    <div class="col">
                        <div class="text-bold col text-center bg-lime-3">ID</div>
                        <div v-text="item.id" class="text-center"></div>
                    </div>
                    <div class="col">
                        <div class="text-bold col text-center bg-lime-2">TITULO</div>
                        <div v-text="item.titulo" class="text-center"></div>
                    </div>
                    <div class="col" >
                        <div class="text-bold text-center bg-cyan-2"> COMO  </div>
                        <div class="text-center q-ma-xm" v-html="item.como"></div>
                    </div>
                    <div class="col" >
                        <div class="text-bold text-center bg-cyan-3"> QUIERO  </div>
                        <div class="text-center q-ma-xm" v-html="item.quiero"></div>
                    </div>
                    <q-separator vertical />
                    <div class="col text-center" >
                        <div class="text-bold bg-cyan-4">PARA</div>
                        <div class="text q-ma-xm" v-html="item.para"></div>
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
            titulo:'',
            como:'',
            quiero:'',
            para:'',
            historias:[]
        }
    },
    created(){
    this.apiHistorias();
  },
  methods:{
      async apiHistorias(){
          try {
              const historias = await api.get('/historiasproyecto/' + this.$route.params.id, {})
              await historias.data.forEach(element => {
                  let item = {}
                  item.id = element.id
                  item.titulo = element.titulo
                  item.como = element.como
                  item.quiero = element.quiero
                  item.para = element.para
                  this.historias.push(item)
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