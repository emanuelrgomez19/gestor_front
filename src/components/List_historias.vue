<template>
    <q-page padding>
    <div class="row justify-between items-center q-pa-sm">
        <h6>Historias</h6>
        <q-btn label="Nueva historia" rounded icon="add" color="primary" @click="agregar" />
    </div>
        <q-table
        bordered
        class=""
        :data="historias"
        :columns="colums"
        selection="single"
        :selected.sync="selected"
        row-key="id"
        color="secondary"
        >
        <!-- gets displayed only when there's at least one row selected -->
            <template slot="top-selection" slot-scope="">
                <q-btn color="primary" flat label="Agregar escenario" icon="add"/>
                <q-btn color="primary" flat label="Editar" class="q-mr-sm" icon="edit" @click="editar"/>
                <div class="col" />
                <q-btn color="negative" label="Eliminar" flat round delete icon="delete"/>
    
            </template>
        </q-table>
        
    </q-page>
</template>
  
<script>
import routes from 'src/router/routes'


const filas = [
    {
        titulo:"HCE",
        como:"usuario",
        quiero:"hacer algo",
        para:"q funcione",
    },
    {
        titulo:"HOLa",
        como:"admin",
        quiero:"hfajafjafj",
        para:"q funcione",
    },
]

const colums = [

    { 
        name:'titulo',
        label:'Titulo',
        align:'center',
        field:'titulo',
        sortable:true,
        classes: 'bg-grey-2 ellipsis',
        style: 'max-width: 100px',
        headerClasses: 'bg-light-blue-1'
    },
        {
        name:'como',
        label:'Como',
        align:'left',
        field:'como',
        sortable:true
    },
        {
        name:'quiero',
        label:'Quiero',
        align:'left',
        field:'quiero',
        sortable:true
    },
     {
        name:'para',
        label:'Para',
        align:'left',
        field:'para',
        sortable:true
        
    },
     
]
export default {
    props:{
    historias: Array
},
    data(){
        return{
            colums,
            filas,
            selected: [],
        }

    },
    methods:{
        agregar(){
            this.$router.push('nueva/'+ this.$route.params.id)
            alert(this.selected[0].id)
            

        },
        editar(){
            alert('editar')

        }
    }
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #e1f5fe


  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>