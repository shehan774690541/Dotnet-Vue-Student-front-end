import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    firstName :'',
    lastName:'',
    address:'',
    phone:'',
    email:'',
    image:null,
  }),
});

// getter