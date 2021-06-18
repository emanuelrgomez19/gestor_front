<template>
    <q-page padding>
        
        <ListHistorias :historias="historias" />
        <q-btn @click="back" icon="undo"/>
        
    </q-page>
    
</template>    

<script>
import ListHistorias from 'src/components/List_historias.vue'
import { api } from 'src/boot/axios';
export default {
    components: { ListHistorias },
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
      back(){
      this.$router.go(-1)
    },
      async apiHistorias(){
          try {
              console.log(this.$route.params.id)
              const historias = await api.get('/historias_proyecto/'+this.$route.params.id)
              await historias.data.forEach(element => {
                  let item = {}
                  item.id = element.id
                  item.titulo = element.titulo
                  item.como = element.como
                  item.quiero = element.quiero
                  item.para = element.para
                  console.log(item)
                  this.historias.push(item)
                  
              });
          } catch (error) {
              console.log(error)
              
          }
      }
  }

}
</script>