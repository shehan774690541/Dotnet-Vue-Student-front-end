<template>
    <section>

        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="useTransition">Use transition (fade) when toggling details</b-switch>
            </div>
        </b-field>

        <b-table
            :data="data"
            ref="table"
            paginated
            per-page="5"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="id"
            :detail-transition="transitionName"
            @details-open="(row) => $buefy.toast.open(`Expanded ${row.user.first_name}`)"
            :show-detail-icon="showDetailIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="user.first_name" label="First Name" sortable v-slot="props">
                <template v-if="showDetailIcon">
                    {{ props.row.user.first_name }}
                </template>
                <template v-else>
                    <a @click="props.toggleDetails(props.row)">
                        {{ props.row.user.first_name }}
                    </a>
                </template>
            </b-table-column>

            <b-table-column field="user.last_name" label="Last Name" sortable v-slot="props">
                {{ props.row.user.last_name }}
            </b-table-column>

            <b-table-column field="date" label="Date" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ new Date(props.row.date).toLocaleDateString() }}
                </span>
            </b-table-column>

            <b-table-column label="Gender" v-slot="props">
                <span>
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                </span>
            </b-table-column>

            <template #detail="props">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="/static/img/placeholder-128x128.png">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                                <small>@{{ props.row.user.first_name }}</small>
                                <small>31m</small>
                                <br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>

    </section>
</template>

<script>
    const data = require('@/data/sample.json')

    export default {
        data() {
            return {
                data,
                defaultOpenedDetails: [1],
                showDetailIcon: true,
                useTransition: false
            }
        },
        computed: {
            transitionName() {
                if (this.useTransition) {
                    return 'fade'
                }
            }
        }
    }
</script>










<!-- ==================================================================================================================== -->


<template>
    <div>
      <b-table :data="students" striped hoverable>
        <b-table-column label="ID" field="id"></b-table-column>
        <b-table-column label="First Name" field="first_name"></b-table-column>
        <b-table-column label="Last Name" field="last_name"></b-table-column>
        <b-table-column label="Address" field="address"></b-table-column>
        <b-table-column label="Email" field="email"></b-table-column>
        <b-table-column label="Phone" field="phone_number"></b-table-column>
        
        <b-table-column label="Picture">
          <template slot-scope="props">
            <img :src="'http://localhost:7056/uploads/' + props.row.pic_url" alt="User Picture" width="50px" height="50px">
          </template>
        </b-table-column>
        <b-table-column label="Actions">
          <template slot-scope="props">
            <b-button @click="editStudent(props.row)" type="is-info" size="is-small">Edit</b-button>
            <b-button @click="deleteStudent(props.row.id)" type="is-danger" size="is-small">Delete</b-button>
          </template>
        </b-table-column>
      </b-table>

      <!-- <d-table>
        <d-table-column v-for="student in students" :key="student.id" :field=student.field :label="student.label" v-slot="props">
          <span>{{ student.id }}</span>
        </d-table-column>
      </d-table> -->

      <div class="add_new">
        <router-link to="/add_info">
          <b-button type="is-primary" size="is-large">
            <b-icon icon="plus"></b-icon>
          </b-button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        students: []
      };
    },
    created() {
      this.fetchStudentList();
    },
    methods: {
      async fetchStudentList() {
        try {
          const response = await axios.get('http://localhost:7056/api/Student/List');
          if (response.data.status_code === 200) {
            this.students = response.data.data.students;
          } else {
            console.error('Failed to fetch student data');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      },
      async deleteStudent(id) {
        try {
          const response = await axios.delete(`http://localhost:7056/api/Student/${id}`);
          if (response.status === 204) {
            console.log('Item deleted successfully.');
            this.fetchStudentList(); // Refresh the table after deletion
          } else {
            console.error('Failed to delete item.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      },
      editStudent(student) {
        // Handle edit action here, for example, redirect to edit page
        // this.$router.push(`/edit/${student.id}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .add_new {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  </style>
  