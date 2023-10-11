<template>
  <div class="bgDiv">
    <div class="content">
      <h4 class="title has-text-centered">{{ name }}</h4>
      <b-field label="First Name">
        <b-input v-model="fName" @input="createName"></b-input>
      </b-field>
      <br><br>
      <b-field label="Last Name">
        <b-input v-model="lName" @input="createName"></b-input>
      </b-field>
<object data="




" type=""></object>
    </div>
  </div>
</template>
  
<script>
export default {
    data(){
        return{
            name:"Your Name",
            fName:'',
            lName:'',
        }
    },
    methods:{
        createName(){
            if(this.fName == '' && this.lName == ''){
                this.name = "Your Name"
            }
            else{
                this.name = this.fName + " " + this.lName 
            }
        }
    }
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