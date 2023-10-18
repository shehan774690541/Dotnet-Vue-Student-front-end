<template>
  <section class="container">
    <br />
    <h1 class="title has-text-centered">Students Informations</h1>
    <br />

    <b-steps v-model="activeStep">
      <b-step-item step="1" label="Name" :clickable="isStepsClickable">
        <YourName />
      </b-step-item>

      <b-step-item
        step="2"
        label="Address"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
      >
        <YourAddress />
      </b-step-item>

      <b-step-item
        step="3"
        :visible="showSocial"
        label="Contact"
        :clickable="isStepsClickable"
      >
        <your-contact />
      </b-step-item>

      <b-step-item
        step="4"
        label="Image"
        :clickable="isStepsClickable"
        disabled
      >
        <yourPicture />
      </b-step-item>

      <template v-if="false" #navigation="{ previous, next }">
        <b-button
          outlined
          type="is-danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
          style="position: fixed"
        >
          Previous
        </b-button>
        <b-button
          outlined
          type="is-success"
          icon-pack="fas"
          icon-right="forward"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </b-button>

        <b-button>next</b-button>
        hi
        <!-- <input v-model="inputValue"> -->
      </template>
    </b-steps>
    <div class="btns">
      <b-button @click="resetData()" class="submitButton">Reset</b-button>
      <b-button @click="addData()" class="submitButton">submit</b-button>
    </div>

    <br /><br />
    <hr />
  </section>
</template>

<script>
import YourName from "@/views/addInfo/name.vue";
import YourAddress from "@/views/addInfo/address.vue";
import YourContact from "@/views/addInfo/contact.vue";
import yourPicture from "@/views/addInfo/picture.vue";
import dbSave from "./../database/addInfo.json";
import { useStore } from "./../store/store";
import axios from "axios";

export default {
  components: {
    YourName,
    YourAddress,
    YourContact,
    yourPicture,
  },
  data() {
    return {
      activeStep: "",
      isStepsClickable: "",
      isProfileSuccess: "",
      showSocial: "",
      rounded: null,
      users: dbSave,
      exp: null,
      // inputValue:null,
    };
  },
  watch: {
    inputValue(newValue) {
      this.$store.inputValue = newValue;
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  methods: {
    async addData() {
      try {
        const fileInput = this.store.image;
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result;
          const base64ImageWithoutPrefix = base64String.split(",")[1];
          this.base64Image = base64ImageWithoutPrefix;

          let requestBody = {
            first_name: this.store.firstName,
            last_name: this.store.lastName,
            address: this.store.address,
            email: this.store.email,
            phone_number: this.store.phone,
            pic_url: this.base64Image,
          };

          console.log(requestBody);
          axios
            .post("http://localhost:7056/api/Student/save", requestBody)
            .then((response) => {
              console.log("sending...");
              if (response.status === 200) {
                this.alertCustom("added", "Successfull Add New Data!", "is-success", "check")
                console.log("Data added successfully.");
              }
              this.$router.push("/gi");
            })
            .catch((error) => {
              console.error("An error occurred:", error);
            });
        };

        reader.readAsDataURL(fileInput);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    resetData() {
      try {
        const storeId = this.store.$id;
        console.log(this.store);

        if (localStorage.getItem(storeId)) {
          this.store.$reset();
          localStorage.removeItem(storeId);
          this.alertCustom("reset", "Removed All inputs!", "is-danger", "check")
          // window.location.replace("/addInfo");
        }
      } catch (error) {
        console.log(error);
      }
    },
    alertCustom(title, message, type, icon) {
      this.$buefy.dialog.alert({
        title: title,
        message: message,
        type: type,
        hasIcon: true,
        icon: icon,
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true,
      });
    },
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>

<style scoped>
.btns {
  position: absolute;
  right: 20vh;
}
.submitButton {
  margin: 10px;
}
</style>