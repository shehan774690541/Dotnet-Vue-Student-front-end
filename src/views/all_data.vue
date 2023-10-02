<template>
  <section>
    <!-- <b-field grouped group-multiline>
      <div class="control">
        <b-switch v-model="showDetailIcon">Show detail icon</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="useTransition">Use transition (fade) when toggling details</b-switch>
      </div>
    </b-field> -->
    <div class="addNew">
      <router-link to="/add_info">
        <b-button type="is-primary" size="is-large">
          <b-icon icon="plus"></b-icon>
        </b-button>
      </router-link>
    </div>
    <div class="getHome">
      <router-link to="/home">
        <b-button type="is-primary" size="is-large">
          <b-icon icon="home"></b-icon>
        </b-button>
      </router-link>
    </div>
    <b-table :data="students" ref="table" paginated per-page="10" :opened-detailed="defaultOpenedDetails" detailed
      detail-key="id" :detail-transition="transitionName"
      @details-open="(row) => $buefy.toast.open(`Expanded ${row.user.first_name}`)" :show-detail-icon="showDetailIcon"
      aria-next-label="Next page" aria-previous-label="Previous page" aria-page-label="Page"
      aria-current-label="Current page">
      <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="user.first_name" label="First Name" sortable v-slot="props">
        <template v-if="showDetailIcon">
          {{ props.row.first_name }}
        </template>
      </b-table-column>

      <b-table-column field="user.last_name" label="Last Name" sortable v-slot="props">
        {{ props.row.last_name }}
      </b-table-column>

      <b-table-column field="user.phone_number" label="Phone" sortable centered v-slot="props">
        {{ props.row.phone_number }}
      </b-table-column>

      <b-table-column field="user.email" label="Email" sortble centered v-slot="props">
        {{ props.row.email }}
      </b-table-column>

      <b-table-column field="user.phone_number" label="Phone" sortble centered v-slot="props">
        {{ props.row.phone_number }}
      </b-table-column>

      <template #detail="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="'http://localhost:7056/uploads/' + props.row.pic_url" alt="Placeholder">
            </p>
          </figure>
          <figure class="media-left">
            <p class="image is-64x64">
              <b-button type="is-danger" @click="deleteStudent(props.row.id)">Remove</b-button>
              <br> <br>
              <router-link :to="{ path: '/edit', query: { id: props.row.id } }">
                <b-button type="is-warning">Change</b-button>
              </router-link>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
              <ul class="expanPanel">
                <li>
                  <caption>SUBJECTS:</caption>
                  <ul v-for="subject in subjects">
                    <li>{{ subject }}</li>
                  </ul>
                </li>
              </ul>



              </p>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false,
      students: [],
      subjects: ["maths", "phisics", "science", "ict"],
    };
  },
  created() {
    this.fetchStudentList();
  },
  computed: {
    transitionName() {
      if (this.useTransition) {
        return 'fade';
      }
    }
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
      id = id
      try {
        const response = await axios.delete(`http://localhost:7056/api/Student/${id}`);
        if (response.status === 204) {
          console.log('Item deleted successfully.');

        } else {
          console.error('Failed to delete item.');
        }
        this.alertCustomError("account removed!", "index: " + id + " account is removing complete!");
        this.fetchStudentList();
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        fetchStudentList()
      }
    },
    editStudent(student) {
      // Handle edit action here, for example, redirect to edit page
      // this.$router.push(`/edit/${student.id}`);
    },
    alertCustomError(title, message,) {
      this.$buefy.dialog.alert({
        title: title,
        message: message,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true,
        
      })
    }
  }
};
</script>
<style>
.addNew {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
.getHome {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 999;
}

.expanPanel li {
  display: inline;
}
</style>