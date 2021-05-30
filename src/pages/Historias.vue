<template>
    <q-page padding>
        <q-card flat bordered class="q-ma-xs my-card bg-grey-1"  v-for= "(item,index) in historias" :key="index">
            <q-card-section class=""  >
                <div class="row justify-center full-width">
                    <div class="col">
                        <div class="text-bold col text-center bg-lime-2">TITULO</div>
                        <div v-text="item.titulo" class="text-center"></div>
                    </div>  
                    <div class="col">
                        <div class="text-bold col text-center bg-lime-3">ID</div>
                        <div v-text="item.id" class="text-center"></div>
                    </div>
                </div>
               
                <div class="full-width row  justify-center  content-start">
                    <div class="col" >
                        <div class="text-bold text-center bg-cyan-2"> COMO  </div>
                        <div class="text-center q-ma-xm" v-html="item.como"></div>
                    </div>
                   <q-separator vertical />
                    <div class="col text-center" >
                        <div class="text-bold bg-cyan-3"  > QUIERO </div>
                        <div class="text q-ma-xm" v-html="item.quiero"></div>
                    </div>
                  <q-separator vertical />

                    <div class="col text-center" >
                        <div class="text-bold bg-cyan-4">PARA</div>
                        <div class="text q-ma-xm" v-html="item.para"></div>
                    </div>
                    <q-btn-group class="full-width q-mt-xs">
                        <q-btn size="sm" outline  class="col" color="green" label="Agregar" icon="done_all" type="submit"/>
                        <q-btn  size="sm" outline  class="col" color="blue-5" label="Editar" icon="edit" type="reset" />
                     </q-btn-group>
                </div>
            </q-card-section>

        </q-card>
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
              const historias = await api.get('/historias')
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
      }
  }

}
</script>