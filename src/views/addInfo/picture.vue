<template>
  <div class="bgDiv">
    <div class="content">
      <b-field label="">
        <b-field class="file" :class="{ 'has-name': !!file2 }">
          <b-upload
            v-model="file2"
            class="file-label"
            rounded
            @input="viewImage()"
          >
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

      <img v-if="imageSrc" :src="imageSrc" style="height: 60vh; width: auto;" alt="Uploaded Image">

    </div>
  </div>
</template>
    
    <script>
export default {
  data() {
    return {
      file: {},
      file2: null,
      rounded: null,
      imageSrc:null
    };
  },
//   watch:{
//     "file2":function(){
//         this.viewImage()
//     }
//   },
  methods: {
    viewImage() {
      if (this.file2) {
        this.imageSrc = URL.createObjectURL(this.file2);

      } else {
        this.imageSrc = null;
      }
    },
    getFileType(type) {
      const extension = type.split("/")[1];
      return extension.toUpperCase();
    },
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