<template>
  <div>
    <h1>subjects</h1>

    <br>
    <BulletList :items="subjects"/>
  </div>
</template>

<script>
import BulletList from '@/components/BulletList.vue';
export default {

  components : {
    BulletList
  },


  data(){
    return {
      subjects : ["Subject 1", "Subject 2","Subject 3"]
    }
  }
}
</script>

<style>

</style>