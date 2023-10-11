<template>
  <section>
    <br />
    <h1 class="title has-text-centered">Students Informations</h1>
    <br />

    <b-steps
      v-model="activeStep"
    >
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

      <template v-if="false" #navigation="{ previous, next }" >
        
        <b-button
          outlined
          type="is-danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
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
      </template>
    </b-steps>
  </section>
</template>

<script>
import YourName from "@/views/addInfo/name.vue";
import YourAddress from "@/views/addInfo/address.vue";
import YourContact from "@/views/addInfo/contact.vue";
import yourPicture from "@/views/addInfo/picture.vue";

export default {
    data(){
        return{
            activeStep:'',
            isStepsClickable:'',
            isProfileSuccess:'',
            showSocial:'',
            rounded:null,

        }
    },
  components: {
    YourName,
    YourAddress,
    YourContact,
    yourPicture,
  },
};
</script>

<style scoped>
</style>