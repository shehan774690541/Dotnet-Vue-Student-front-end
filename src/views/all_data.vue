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
            <b-button type="is-warning is-light">Danger Light</b-button>
          </router-link>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>