<template>
  <div class="bgDiv">
    <div class="content">
      <h4 class="title has-text-centered">{{ store.firstName }} {{ store.lastName }}</h4>
      <b-field label="First Name">
        <b-input v-model="store.firstName" ></b-input>
      </b-field>
      <br /><br />
      <b-field label="Last Name">
        <b-input v-model="store.lastName" ></b-input>
      </b-field>
    </div>
  </div>
</template>
  
<script>
import { useStore } from './../../store/store'

export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
    };
  },
  
  
};
</script>


<style scoped>
.bgDiv {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 800px;
}
</style>