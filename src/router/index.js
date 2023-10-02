import Vue from 'vue'
import Router from 'vue-router'
import add_info from '@/views/add_info.vue'
import home_page from '@/views/home_page.vue';
import home from '@/views/home_page.vue';
import edit_student from '@/views/test.vue';
import all_data from '@/views/all_data.vue';
import edit from '@/views/edit.vue';

Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      component: home_page,
    },
    {
      path: '/add_info',
      name: 'add_info',
      component: add_info
    },
    {
      path: '/edit_student',
      name: 'edit_student',
      component: edit_student
    },
    {
      path: '/all_data',
      name: 'all_data',
      component: all_data
    },
    {
      path: '/home',
      name: 'home',
      component: home,
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit,
    },

  ]
})
