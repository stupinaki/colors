<template>
  <div
      id="app"
      class="container"
  >
    <ColumnComponent
        v-for="(color, i) in colors"
        :key="i"
        :color-hex="color.color"
        :is-blocked="color.isBlocked"
        @doNotChange="onDoNotChange(i)"
    />
  </div>
</template>

<script>
import { initRandomColorsArray } from "@/helpers/initRandomColorsArray.js";
import { generateRandomColor} from "@/helpers/generateRandomColor.js";
import ColumnComponent from "@/components/ColumnComponent.vue";
import {updateColorsHash} from "@/helpers/updateColorsHash.js";

export default {
  name: 'App',
  data() {
    return {
      columnQwt: 5,
      colors: [],
    }
  },
  components: {
    ColumnComponent,
  },
  beforeMount() {
    this.$data.colors = initRandomColorsArray(this.$data.columnQwt);
    updateColorsHash(this.$data.colors);

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.code.toLowerCase() === 'space') {
        this.$data.colors.forEach(col => {
            if(!col.isBlocked) {
              col.color = generateRandomColor();
            }
          })
        updateColorsHash(this.$data.colors);
      }
    })
  },
  methods: {
    onDoNotChange (index) {
      const oldColor = this.$data.colors[index];
      this.$data.colors.splice(index, 1, {
        ...oldColor,
        isBlocked: !oldColor.isBlocked,
      })
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
