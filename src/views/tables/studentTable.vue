<template>
  <div>
    <b-navbar>
      <template #start>
        <b-navbar-item href="">
          <router-link to="/studentTable">
            <b-button type="is-info">All Students</b-button>
          </router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link to="/subjectTable">
            <b-button type="is-info is-light">All Students</b-button>
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
        { field: "id", label: "ID", width: "40", numeric: true },
        { field: "first_name", label: "First Name" },
        { field: "last_name", label: "Last Name" },
        { field: "phone_number", label: "Phone", centered: true },
        { field: "address", label: "Address" },
        { field: "email", label: "E - mail" },
        { field: "pic_url", label: "picture" },

      ],
    };
  },
  created(){
    this.fetchStudentList()
  },
  methods: {
    async fetchStudentList() {
      try {
        const response = await axios.get(
          "http://localhost:7056/api/Student/List"
        );
        if (response.data.status_code === 200) {
          this.tblData = response.data.data.students;
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