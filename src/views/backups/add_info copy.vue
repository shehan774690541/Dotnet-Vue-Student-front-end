<template>
  <div class="form_bg">
    <form action="form.html" method="get">
      <div>
        <router-link to="/home">
          <div class="back_to_home">
            <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
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
      <h1>{{ msg }}</h1>
      <div class="input">
        <label>First name</label>
        <input type="text" class="form-control" id="f_name" ref="f_name" v-model="f_name" @input="checkSubmitEnable" />
      </div>
      <div class="input">
        <label>Last name</label>
        <input type="text" class="form-control" id="l_name" ref="l_name" v-model="l_name" @input="checkSubmitEnable" />
      </div>
      <div class="input">
        <label>Address</label>
        <input type="text" class="form-control" id="address" ref="address" v-model="address" @input="checkSubmitEnable" />
      </div>
      <div class="input">
        <label>Email</label>
        <input type="text" class="form-control" id="email" ref="email" v-model="email" @input="checkSubmitEnable" />
      </div>
      <br />
      <div class="input">
        <label>phone number</label>
        <input type="text" class="form-control" id="phone" ref="phone" v-model="phone" @input="checkSubmitEnable" />
      </div>
      <div class="input">
        <label>your picture</label>
        <input type="file" @input="image_file" v-on:change="checkSubmitEnable" />
      </div>
      <br />
      <span class="submit_btn" v-on:click="addData()" :disabled="!isSubmitEnable" v-show="isSubmitEnable">
        Submit
      </span>
      <span class="disabeled" :disabled="!isSubmitEnable" v-show="!isSubmitEnable">
        Submit
      </span>
    </form>

  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
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
      base64Image: '',
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
        this.imageInput != '';
    },
    image_file(event) {
          this.imageInput = event.target.files[0].name;
          try {
            const fileInput = event.target;
            if (fileInput.files.length > 0) {
              const selectedFile = fileInput.files[0];
              const reader = new FileReader();
              reader.onload = () => {
                const base64String = reader.result;
                // Remove the "data:image/jpeg;base64," prefix
                const base64ImageWithoutPrefix = base64String.split(',')[1];

                // Assign the Base64 image data without the prefix to your variable
                this.base64Image = base64ImageWithoutPrefix;
              };
              reader.readAsDataURL(selectedFile);
            } else {
              this.base64Image = null;
            }
          } catch (error) {
            console.log("ERROR | >" + error)
          }
          this.imageFile = event.target.files[0]
          // console.log(this.base64Image)
        },
    async addData() {
      try {
        let requestBody = {
          first_name: this.f_name,
          last_name: this.l_name,
          address: this.address,
          email: this.email,
          phone_number: this.phone,
          pic_url: this.base64Image,
        }
        // console.log(this.base64Image) 
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

<!-- <style scoped>
.error {
  position: absolute;
  background-color: beige;
  width: 500px;
  display: none;
}

.back_to_home {
  position: fixed;
  display: initial;
  width: 30px;
  margin-left: -280px;
}

.form_bg {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.form_bg form {
  width: 30em;
}

.form_bg label {
  margin-right: 31em;
  text-align: left;
  font-size: 13px;
  color: black;
  position: absolute;
  margin-top: -9px;
  margin-left: 10px;
  padding: 1px 2px 1px 2px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(87, 87, 244);
  border-radius: 10px;

}

form input {
  width: 100%;
  font-size: 1.6em;
  padding: 5px;
  margin-bottom: 20px;
  border: solid 1.6px rgb(87, 87, 244);
  border-radius: 10px;
}

.submit_btn {
  border: solid 3px rgb(67, 255, 67);
  padding: 6px 30px 6px 30px;
  border-radius: 20px;
  font-size: 1.6em;
  background-color: rgb(67, 255, 67);
  color: rgb(255, 255, 255);
  transition: ease 0.28s;
}

.submit_btn:hover {
  box-shadow: 0px 0px 5px 5px rgba(116, 255, 160, 0.629);
  border: solid 3px rgb(165, 255, 165);
  transition: ease 0.28s;
}

.disabeled {
  border: solid 3px rgb(216, 216, 216);
  padding: 6px 30px 6px 30px;
  border-radius: 20px;
  font-size: 1.6em;
  background-color: rgb(200, 200, 200);
  color: rgb(255, 255, 255);
  transition: ease 0.28s;
}
</style> -->
