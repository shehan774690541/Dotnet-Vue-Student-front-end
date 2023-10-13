<template>
  <div class="bgDiv">
    <div class="content">
      <b-field label="">
        <b-field class="file" :class="{ 'has-name': !! store.image }">
          <b-upload
            v-model="store.image"
            class="file-label"
            rounded
            @input="viewImage()"
          >
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="store.image">
              {{ store.image.name }}
            </span>
          </b-upload>
        </b-field>
      </b-field>

      <img
        v-if="imageSrc"
        :src="imageSrc"
        style="height: 60vh; width: auto"
        alt="Uploaded Image"
      />
    </div>
  </div>
</template>
    
    <script>
import { useStore } from "./../../store/store";
export default {
  data() {
    return {
      file: {},
      rounded: null,
      imageSrc: null,
    };
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  methods: {
    viewImage() {
      if (this.store.image) {
        this.imageSrc = URL.createObjectURL(this.store.image);
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