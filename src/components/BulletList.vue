<template>
  <div> :
    <ul>
        <li v-for="(item,index) in items" :key="index">
            {{ item }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    name : "BulletListComponent",
    props : {
        items : {
            type : Array,
            required : true,
        }
    },
    data(){
        return {
        }
    }
}
</script>

<style>

</style>