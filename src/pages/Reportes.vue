<template>
  <div class="q-pa-md">
    <h4>Reportes</h4>
    <q-table
      title="Historias por proyecto"
      :data="reportes"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
<script>

import { api } from 'boot/axios'

export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Proyecto',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name:'descripcion', align: 'center', label: 'Historias', field: 'descripcion', sortable: true },
      ],
      reportes:[]
    }
  },
   created(){
    this.reporte();
  },
  methods:{
      async reporte(){
          try {
            const reportes =  await api.get('reportes')
            await reportes.data.forEach(element => {
            let item ={}
            item.id = element.id
            item.descripcion = element.descripcion
            item.name = element.nombre
            item.estado  = element.estado
            console.log(item)
            this.reportes.push(item)
          })     
          } catch (error) {
            console.log(error)              
          }
      }
  }
}
</script>