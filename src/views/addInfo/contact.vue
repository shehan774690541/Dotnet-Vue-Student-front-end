<template>
  <div class="bgDiv">
    <div class="content">
      <h4 class="title has-text-centered">{{ contact }}</h4>
      <b-field label="E-mail Address">
        <b-input v-model="store.email" type="email"></b-input>
      </b-field>
      <br /><br />
      <b-field label="Phone Number">
        <b-input v-model="store.phone" type="phone"></b-input>
      </b-field>
    </div>
  </div>
</template>
    
  <script>
import { useStore } from "./../../store/store";
export default {
  data() {
    return {
      contact: "Your Contact Details",
      email: "",
      phone: "",
      createContact: null,
    };
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  methods: {},
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