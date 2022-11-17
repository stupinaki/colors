<template>
  <div class="container">
    <MainHint
        v-if="isHintVisible"
        :colorHex="middleColumnColor"
    />
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
import {updateColorsHash} from "@/helpers/updateColorsHash.js";
import ColumnComponent from "@/components/ColumnComponent.vue";
import MainHint from "@/components/MainHint.vue";

export default {
  name: 'App',
  data() {
    return {
      isHintVisible: true,
      middleColumnColor: undefined,
      columnQwt: 5,
      colors: [],
    }
  },
  components: {
    ColumnComponent,
    MainHint,
  },
  beforeMount() {
    this.$data.colors = initRandomColorsArray(this.$data.columnQwt);
    this.getMiddleColumnColor();
    updateColorsHash(this.$data.colors);

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.code.toLowerCase() === 'space') {
        this.$data.isHintVisible = false;
        this.$data.colors.forEach(col => {
            if(!col.isBlocked) {
              col.color = generateRandomColor();
            }
          })
        updateColorsHash(this.$data.colors);
      }
    })
  },
  created() {
    setTimeout(() => {
      this.$data.isHintVisible = false;
    }, 3000);
  },
  methods: {
    onDoNotChange (index) {
      const oldColor = this.$data.colors[index];
      this.$data.colors.splice(index, 1, {
        ...oldColor,
        isBlocked: !oldColor.isBlocked,
      })
    },
    getMiddleColumnColor() {
      const index = Math.floor(this.$data.columnQwt / 2);
      this.$data.middleColumnColor = this.$data.colors[index].color;
    }
  },
}
</script>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  .container {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

</style>
