<template>
  <div class="bgDiv">
    <div class="content">
        <br>
        <p class="has-text-centered">{{ address }}</p>
        <br>
      <b-field label="Select Your Distric"  @input="createAddress">
        <b-select v-model="distric" placeholder="Select your Distric" icon="account" expanded>
          <optgroup label="Western Province:">
            <option value="Colombo">Colombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kalutara">Kalutara</option>
          </optgroup>

          <optgroup label="Central Province:">
            <option value="Kandy">Kandy</option>
            <option value="Matale">Matale</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
          </optgroup>

          <optgroup label="Southern Province:">
            <option value="Galle">Galle</option>
            <option value="Hambantota">Hambantota</option>
            <option value="Matara">Matara</option>
          </optgroup>

          <optgroup label="Northern Province:">
            <option value="Jaffna">Jaffna</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Mannar">Mannar</option>
            <option value="Mullaitivu">Mullaitivu</option>
            <option value="Vavuniya">Vavuniya</option>
          </optgroup>

          <optgroup label="Eastern Province:">
            <option value="Ampara">Ampara</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Trincomalee">Trincomalee</option>
          </optgroup>

          <optgroup label="North Western Province:">
            <option value="Kurunegala">Kurunegala</option>
            <option value="Puttalam">Puttalam</option>
          </optgroup>

          <optgroup label="North Central Province:">
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
          </optgroup>

          <optgroup label="Uva Province:">
            <option value="Badulla">Badulla</option>
            <option value="Monaragala">Monaragala</option>
          </optgroup>

          <optgroup label="Sabaragamuwa Province:">
            <option value="Kegalle">Kegalle</option>
            <option value="Ratnapura">Ratnapura</option>
          </optgroup>
        </b-select>
      </b-field>

      <br><br>
      <b-field label="Your Address">
        <b-input v-model="adr" @input="createAddress"></b-input>
      </b-field>
    </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            address:"Your address",
            distric:'',
            adr:'',
        }
    },
    methods:{
        createAddress(){
            this.address = this.adr + ", " + this.distric
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