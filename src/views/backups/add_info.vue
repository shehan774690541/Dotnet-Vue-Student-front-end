<template>
  <div class="container">
    <div class="getHome">
      <router-link to="/home">
        <b-button type="is-primary" size="is-large">
          <b-icon icon="home"></b-icon>
        </b-button>
      </router-link>
    </div>
    <div class="column is-mobile">
      <div class="column ">
        <form action="form.html" method="get">
          <center>
            <h1 style="font-size: 1.6em;">{{ msg }}</h1>
          </center>
          <b-field label="First Name">
            <b-input v-model="f_name" @input="checkSubmitEnable"></b-input>
          </b-field>

          <b-field label="Last Name">
            <b-input v-model="l_name" @input="checkSubmitEnable"></b-input>
          </b-field>

          <b-field label="Address">
            <b-input v-model="address" @input="checkSubmitEnable"></b-input>
          </b-field>

          <b-field label="Email">
            <b-input v-model="email" @input="checkSubmitEnable"></b-input>
          </b-field>

          <b-field label="Phone">
            <b-input v-model="phone" @input="checkSubmitEnable"></b-input>
          </b-field>

          <b-field label="Separated filename">
              <b-field class="file is-info" :class="{ 'has-name': !!file2 }">
                <b-upload v-model="file2" class="file-label" rounded @input="checkSubmitEnable">
                  <span class="file-cta">
                    <b-icon class="file-icon" icon="upload"></b-icon>
                    <span class="file-label">Click to upload</span>
                  </span>
                  <span class="file-name" v-if="file2">
                    {{ file2.name }}
                  </span>
                </b-upload>
              </b-field>
          </b-field>

          <!-- <div>
          <label>your picture</label>
          <input type="file" @input="image_file" v-on:change="checkSubmitEnable" />
        </div> -->
          <!-- <p v-on:click="chk()">
          CHK
        </p> -->
          <br />
          <b-button type="is-success" v-on:click="addData()" :disabled="!isSubmitEnable" v-show="isSubmitEnable">
            Submit
          </b-button>
          <b-button type="is-success" :disabled="!isSubmitEnable" v-show="!isSubmitEnable">
            Submit
          </b-button>
          <!-- <label @click="chk()">chk</label> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';


export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Student Informations'.toUpperCase(),
      f_name: '',
      l_name: '',
      address: '',
      email: '',
      phone: '',
      isSubmitEnable: false,
      errorMessage: '',
      imageInput: '',
      imageFile: [],
      base64Image: null,
      file2: null,
    };
  },
  methods: {
    checkSubmitEnable() {
      this.isSubmitEnable =
        this.f_name != '' &&
        this.l_name != '' &&
        this.address != '' &&
        this.phone != '' &&
        this.email != '' &&
        this.file2 != null;
    },
    // chk() {
    //   alert("chekd!")
    // },
    async addData() {
      try {
        const fileInput = this.file2;
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result;
          const base64ImageWithoutPrefix = base64String.split(',')[1];
          this.base64Image = base64ImageWithoutPrefix;

          let requestBody = {
            first_name: this.f_name,
            last_name: this.l_name,
            address: this.address,
            email: this.email,
            phone_number: this.phone,
            pic_url: this.base64Image,
          };

          console.log(requestBody)
          // Send the request inside the onload callback to ensure base64Image is loaded
          axios.post('http://localhost:7056/api/Student/save', requestBody)
            .then((response) => {
              console.log("sending...");
              if (response.status === 201) {
                alert("Data added successfully.");
                console.log('Data added successfully.');
                this.$router.push('/all_data');
              }
              //  else {
              //   alert("Failed to add data.");
              //   console.error('Failed to add data.');
              // }
              this.$router.push('/all_data')
            })
            .catch((error) => {
              console.error('An error occurred:', error);
              // Handle the error here
            });
        };

        reader.readAsDataURL(fileInput);
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error here if it's a synchronous error
      }
    }


  },
  created() {
    this.checkSubmitEnable();
  },
};
</script>
<style>
@import 'https://use.fontawesome.com/releases/v5.2.0/css/all.css';
@import 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css';
</style>
