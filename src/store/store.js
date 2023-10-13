import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    inputValue: 'yo',
  }),
  actions: {
    setInputValue(value) {
      this.inputValue = value;
    },
  },
});

// getter