<template>
  <div class="container">
    <div class="column is-mobile">
      <div class="column ">
        <form action="form.html" method="get">
          <div>
            <router-link to="/home">
              <div>
                <svg width="20px" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72" enable-background="new 0 0 72 72"
                  xml:space="preserve">
                  <g>
                    <path
                      d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255
c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489
c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021
C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57
c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506
c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414
c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z" />
                  </g>
                </svg>
              </div>
            </router-link>
          </div>
          <center>
            <h1>{{ msg }}</h1>
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
            <b-field class="file is-primary" :class="{ 'has-name': !!file2 }">
              <b-upload v-model="file2" class="file-label" rounded>
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
        // Assuming this.file2 holds the file object selected by the user
        const fileInput = this.file2;
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result;
          // Remove the "data:image/jpeg;base64," prefix
          const base64ImageWithoutPrefix = base64String.split(',')[1];
          this.base64Image = base64ImageWithoutPrefix;
          console.log("base64 img: " + this.base64Image);
        };
        console.log("base64 img: " + this.base64Image);
        // Start reading the selected file as a data URL
        reader.readAsDataURL(fileInput);
      // } catch (error) {
      //   console.log("ERROR: " + error);
      // }

      // try {
        console.log("base64 img: " + this.base64Image);
        let requestBody = {
          first_name: this.f_name,
          last_name: this.l_name,
          address: this.address,
          email: this.email,
          phone_number: this.phone,
          pic_url: this.base64Image,
        }
        console.log(this.base64Image)
        const response = await axios.post('http://localhost:7056/api/Student/save', requestBody);
        console.log("sending...")
        if (response.status === 201) {
          alert("Data added successfully.");
          console.log('Data added successfully.');
        }
        // else {
        //   alert("Failed to add data.");
        //   console.error('Failed to add data.');
        // }
        this.$router.push('/all_data')
      } catch (error) {
        // console.error('An error occurred:', error);
        console.error('An error occurred:');
      }
    },

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
