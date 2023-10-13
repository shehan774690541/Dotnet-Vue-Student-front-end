<template>
  <div class="bgDiv">
    <div class="content">
      <h4 class="title has-text-centered">{{ name }}</h4>
      <b-field label="First Name">
        <b-input v-model="fName" @input="createName"></b-input>
      </b-field>
      <br /><br />
      <b-field label="Last Name">
        <b-input v-model="lName" @input="createName"></b-input>
      </b-field>

      <!-- <input :value="modelValue" @input="$emit('input', $event.target.value)" /> -->
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      name: "Your Name",
      fName: "",
      lName: "",
      formData: {
        fName: this.fName,
        lName: this.lName,
      },
      // modelValue:'',
    };
  },
  methods: {
    createName() {
      if (this.fName == "" && this.lName == "") {
        this.name = "Your Name";
      } else {
        this.name = this.fName + " " + this.lName;
        this.saveData();
      }
    },
    // props: {
    //   modelValue: String,
    // },
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