<template>
  <div class="container">
    <ColumnComponent
        v-for="n in 5"
        :key="n"
        :background-color="getRandomColor()"
        :color-hex="color"
    />
  </div>
</template>

<script>
import {gerenerateRandomColor} from "@/helpers/generateRandomColor.js";
import ColumnComponent from "@/components/ColumnComponent.vue";

export default {
  name: 'App',
  data() {
    return {
      color: undefined,
    }
  },
  components: {
    ColumnComponent,
  },
  beforeMount() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.code.toLowerCase() === 'space') {
        this.getRandomColor();
      }
    })
  },
  methods: {
    getRandomColor() {
      const color = gerenerateRandomColor();
      this.$data.color = color;
      return color;
    },
  },

}
</script>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  .container {
    display: flex;
    width: 100%;
    height: 100%;
  }

</style>
