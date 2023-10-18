<template>
  <div class="container">
    <div>
      <b-navbar>
        <template #start>
          <b-navbar-item href="#" type="is-danger"> VUE APP </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/studentTable"> All data </router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/addInfo"> New Student </router-link>
          </b-navbar-item>
          <b-navbar-item>
            <section>
              <b-field>
                <b-field>
                  <b-radio-button
                    v-model="radioButton"
                    :native-value="true"
                    type="is-success is-light is-outlined"
                  >
                    <span>Students</span>
                  </b-radio-button>

                  <b-radio-button
                    v-model="radioButton"
                    :native-value="false"
                    type="is-success is-light is-outlined"
                  >
                    Subjects
                  </b-radio-button>
                </b-field>
              </b-field>
            </section>
          </b-navbar-item>
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <b-field>
              <b-input
                type="number"
                v-model="search_id"
                @input="searchStudent"
              ></b-input>
              <b-button @click="searchStudent">SEARCH</b-button>
            </b-field>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>

    <div v-if="this.search_id != 0 || this.search_id != ''" class="vlv_search">
      <br /><br />
      <b-notification v-if="first_name !== '-'" type="is-success">
        <div>
          <img
            :src="'http://localhost:7056/uploads/' + img"
            height="200px"
            width="100px"
          />
        </div>
        <p><b>First Name:</b> {{ first_name }}</p>
        <p><b>Last Name:</b> {{ last_name }}</p>
        <p><b>Address:</b> {{ address }}</p>
        <p><b>Email:</b> {{ email }}</p>
        <p><b>Phone:</b> {{ phone_number }}</p>
      </b-notification>
      <b-notification v-else type="is-danger">
        <br />
        {{ issues_search }}
      </b-notification>
    </div>

    <!-- <b-table :data="data" :columns="columns"></b-table> -->

    <b-table :data="data" ref="table" detail-key="id" aria-next-label="Next page" aria-previous-label="Previous page"
      aria-page-label="Page" aria-current-label="Current page">

      <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="data.first_name" label="First Name" sortable v-slot="props" :visible="isStudent">
        {{ props.row.first_name }}
      </b-table-column>

      <b-table-column field="data.last_name" label="Last Name" sortable v-slot="props" :visible="isStudent">
        {{ props.row.last_name }}
      </b-table-column>

      <b-table-column field="data.phone_number" label="Phone" sortable centered v-slot="props" :visible="isStudent">
        {{ props.row.phone_number }}
      </b-table-column>

      <b-table-column field="data.email" label="Email" sortble centered v-slot="props" :visible="isStudent">
        {{ props.row.email }}
      </b-table-column>

      <b-table-column field="data.phone_number" label="Phone" sortble centered v-slot="props" :visible="isStudent">
        {{ props.row.phone_number }}
      </b-table-column>

      <b-table-column field="data.subject" label="subject" sortble centered v-slot="props" :visible="isSubject">
        {{ props.row.subject }}
      </b-table-column>

      <b-table-column field="data.check" label="check" sortble centered v-slot="props" :visible="isSubject">
        {{ props.row.check }}
      </b-table-column>

      <b-table-column field="data.pic_url" label="Picture" width="90" sortble centered v-slot="props"
        :visible="isStudent">
        <p class="image is-64x64">
          <img :src="'http://localhost:7056/uploads/' + props.row.pic_url" alt="Placeholder">
        </p>
      </b-table-column>
    </b-table>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "home_page",
  data() {
    return {
      search_id: 0,
      first_name: "-",
      last_name: "-",
      address: "-",
      email: "-",
      phone_number: "-",
      search_id: null,
      txt: null,
      issues_search: "enter user id and click search",
      img: "",
      radioButton: true,
      data: [],
      columns: [],
      isStudent: true,
      isSubject: true,
    };
  },
  created() {
    this.search_id = 0;
    this.fetchStudentList();
  },
  watch: {
    radioButton: function () {
      if (this.radioButton === false) {
        this.fetchSubjectList();
      } else {
        this.fetchStudentList();
      }
    },
  },
  methods: {
    async fetchStudentList() {
      try {
        this.isStudent = true;
        this.isSubject = false;
        const response = await axios.get(
          "http://localhost:7056/api/Student/List"
        );
        if (response.data.status_code === 200) {
          this.data = response.data.data.students;
          this.columns = [
            { field: "id", label: "ID", width: "40", numeric: true },
            { field: "first_name", label: "First Name" },
            { field: "last_name", label: "Last Name" },
            { field: "phone_number", label: "Phone", centered: true },
            { field: "address", label: "Address" },
            { field: "email", label: "E - mail" },
          ];
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async fetchSubjectList() {
      try {
        const response = await axios.get(
          "http://localhost:7056/api/Subject/List"
        );
        if (response.data.status_code === 200) {
          this.data = response.data.data.subjects;
          this.isStudent = false;
          this.isSubject = true;
          this.columns = [
            { field: "id", label: "ID", width: "80", numeric: true },
            { field: "subject", label: "Subject Name" },
            { field: "check", label: "Status" },
          ];
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async searchStudent() {
      try {
        const response = await axios.get(
          `http://localhost:7056/api/Student/${this.search_id}`
        );
        if (response.data.status_code === 200) {
          const student = response.data.data.student;
          this.first_name = student.first_name;
          this.last_name = student.last_name;
          this.address = student.address;
          this.email = student.email;
          this.phone_number = student.phone_number;
          this.img = student.pic_url;
        } else {
          this.first_name = "-";
          this.issues_search = "invalid search id";
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        this.first_name = "-";
        if (this.search_id == "") {
          this.issues_search = "Empty Input!";
        } else {
          this.issues_search = "Connections problem!";
        }

        console.error("An error occurred:", error);
      }
    },
  },
};
</script>
  