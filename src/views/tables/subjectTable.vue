<template>
  <div>
    <b-navbar>
      <template #start>
        <b-navbar-item href="">
          <router-link to="/studentTable">
            <b-button type="is-info is-light">All Students</b-button>
          </router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link to="/subjectTable">
            <b-button type="is-info">All Students</b-button>
          </router-link>
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <router-link to="/home">
            <b-button type="is-warning is-light" inverted outlined>Back To Home</b-button>
          </router-link>
        </b-navbar-item>
      </template>
    </b-navbar>

    <dataTable :tblColumns="tblColumns" :tblData="tblData" />
  </div>
</template>
  
  <script>
import dataTable from "@/components/dataTable.vue";
import axios from "axios";

export default {
  components: {
    dataTable,
  },
  data() {
    return {
      tblData: [],
      tblColumns: [
        { field: "id", label: "ID", width: "80", numeric: true },
        { field: "subject", label: "Subject Name" },
        { field: "check", label: "Status" },
      ],
    };
  },
  created() {
    this.fetchSubjectList();
  },
  methods: {
    async fetchSubjectList() {
      try {
        const response = await axios.get(
          "http://localhost:7056/api/Subject/List"
        );
        if (response.data.status_code === 200) {
          this.tblData = response.data.data.subjects;
          // console.log(this.tblData)
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  },
};
</script>
  <style>
</style>