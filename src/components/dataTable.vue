<template>
  <div>
    <b-table :data="tblData" :columns="tblColumns"></b-table>
  </div>
</template>

<script>
export default {
    name:"dataTable",
    props:{
        tblData:{
            type:Array,
            required:true,
        },
        tblColumns:{
            type:Array,
            required:true,
        }
    },
    data(){
        return{

        }
    }
}
</script>

<style>

</style>