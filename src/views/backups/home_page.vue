<template>
  <div>
    <img src="../assets/logo.png" alt="">
    <br>
    <hr>
    <h1>Vue + .NET Database</h1>
    <br>
    <div>
      <router-link to="/all_data">All Students</router-link>
      <router-link to="/add_info">New Student</router-link>
      <!-- <router-link to="/edit_student">Edit Student</router-link> -->
    </div>
    <div class="vlv_search">
      <br><br>
      <input type="number" v-model="search_id" v-on:keyup="searchStudent()">
      <button v-on:click="searchStudent()" v-on:keyup="searchStudent()">SEARCH</button>
      <div v-if="first_name !== '-'" class="vue_search_data">
          <div>
            <label for="">
              <img :src="'http://localhost:7056/uploads/' + img" width="75px" height="75px" style="border-radius: 50%;">
            </label>
            <p><label>first name : </label>{{ first_name }}<br></p>
            <p><label>last name : </label>{{ last_name }}<br></p>
            <p><label>address : </label>{{ address }}<br></p>
            <p><label>E mail : </label>{{ email }}<br></p>
            <p><label>phone : </label>{{ phone_number }}<br></p>
          </div>
      </div>
      <div v-else>
            <br>
            {{ issues_search }}
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'home_page',
  data() {
    return {
      search_id: 0,
      first_name: '-',
      last_name: '-',
      address: '-',
      email: '-',
      phone_number: '-',
      search_id: null,
      txt: null,
      issues_search:"enter user id and click search",
      img:"",
    };
  },
  created() {
    // this.searchStudent();
    this.search_id = 0
  },
  methods: {
    async searchStudent() {
      try {

        const response = await axios.get(`http://localhost:7056/api/Student/${this.search_id}`);
        if (response.data.status_code === 200) {
          const student = response.data.data.student;
          this.first_name = student.first_name;
          this.last_name = student.last_name;
          this.address = student.address;
          this.email = student.email;
          this.phone_number = student.phone_number;
          this.img = student.pic_url;

        } else {
          this.first_name = '-';
          this.issues_search = "invalid search id";
          console.error('Failed to fetch student data');
        }
      } catch (error) {
        this.first_name = '-';
        if(this.search_id == ""){
          this.issues_search = "Empty Input!";
        }else{
          this.issues_search = "Connections problem!";
        }
        
        console.error('An error occurred:', error);
      }
    },
  },
};
</script>
  
<style scoped>
a {
  text-decoration: none;
  margin: 0px 20px 0px 20px;
  padding: 5px 20px 5px 20px;
  border-radius: 15px;
  color: #222;
  border: 1px solid #222;
  transition: ease 0.26s;
}

a:hover {
  background-color: #222;
  color: #fff;
  box-shadow: #444 0px 0px 8px 4px;
}

.vlv_search {
  display: block;
}

.vlv_search input {
  margin-right: -3px;
  font-size: 1.2em;
  padding: 4px;
  border: solid 1px #222;
  border-radius: 10px 0px 0px 10px;
  text-align: right;
  padding-right: 3px;
}

.vlv_search button {
  margin-left: -3px;
  font-size: 1.2em;
  padding: 4px;
  border: solid 1px #222;
  border-radius: 0px 10px 10px 0px;
}
.vue_search_data {
  margin-top: 10px;
  width: 100%;
  align-items: center;
}
.vue_search_data p {
  margin: 5px;
}
.vue_search_data label{
  font-size: 1.1em;
  color: black;
  /* text-transform: uppercase; */
}
</style>
  