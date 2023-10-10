<template>
  <div>
    <h1>Students</h1>
    <br>

    <BulletList :items="students" />
  </div>
</template>

<script>
import BulletList from '@/components/BulletList.vue'

export default {
  
  components: {
    BulletList
  },

  data() {
      return {
          students : ["Kalana", "Imalka", "Shehan"]
      }
  }
}
</script>

<style>

</style>