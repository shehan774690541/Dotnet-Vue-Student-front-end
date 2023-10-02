<template>
  <div class="container">
    <!-- <br>
    <hr>
    <h1>Vue + .NET Database</h1>
    <br> -->
    <div>
      <b-navbar>
        <template #start>
          <b-navbar-item href="#" type="is-danger">
            VUE APP
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/all_data">
              All data
            </router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/add_info">
              New Student
            </router-link>
          </b-navbar-item>
          
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <b-field>
              <b-input type="number" v-model="search_id" @input="searchStudent"></b-input>
              <b-button @click="searchStudent">SEARCH</b-button>
            </b-field>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>

    <div class="vlv_search">
      <br><br>

      <b-notification v-if="first_name !== '-'" type="is-success">
        <div>
          <!-- <b-image :src="'http://localhost:7056/uploads/' + img"  style="height: 75px;"></b-image> -->
          <img :src="'http://localhost:7056/uploads/' + img" height="200px" width="100px">
        </div>
        <p><b>First Name:</b> {{ first_name }}</p>
        <p><b>Last Name:</b> {{ last_name }}</p>
        <p><b>Address:</b> {{ address }}</p>
        <p><b>Email:</b> {{ email }}</p>
        <p><b>Phone:</b> {{ phone_number }}</p>
      </b-notification>
      <b-notification v-else type="is-danger">
        <br>
        {{ issues_search }}
      </b-notification>
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
      issues_search: "enter user id and click search",
      img: "",
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
        if (this.search_id == "") {
          this.issues_search = "Empty Input!";
        } else {
          this.issues_search = "Connections problem!";
        }

        console.error('An error occurred:', error);
      }
    },
  },
};
</script>
  
<!-- <style scoped>
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

.vue_search_data label {
  font-size: 1.1em;
  color: black;
  /* text-transform: uppercase; */
}
</style> -->
  