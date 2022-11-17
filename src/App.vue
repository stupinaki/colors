<template>
  <div class="container">
    <MainHint
        v-if="hintVisible"
        :colorHex="middleColumnColor"
    />
    <ColumnComponent
        v-for="(color, i) in colors"
        :key="i"
        :color-hex="color.color"
        :is-blocked="color.isBlocked"
        @doNotChange="onDoNotChange(i)"
    />

    <ChangeButton
        v-if="buttonVisible"
        @onBtnClick="changeColors"
    />
  </div>
</template>

<script>
import { initRandomColorsArray } from "@/helpers/initRandomColorsArray.js";
import { generateRandomColor} from "@/helpers/generateRandomColor.js";
import {updateColorsHash} from "@/helpers/updateColorsHash.js";
import ColumnComponent from "@/components/ColumnComponent.vue";
import ChangeButton from "@/components/ChangeButton.vue";
import MainHint from "@/components/MainHint.vue";

export default {
  name: 'App',
  data() {
    return {
      middleColumnColor: undefined,
      isHintVisible: true,
      clientWidth: undefined,
      columnQwt: 5,
      colors: [],
    }
  },
  components: {
    ColumnComponent,
    ChangeButton,
    MainHint,
  },
  beforeMount() {
    this.$data.clientWidth = document.documentElement.clientWidth;
    this.$data.colors = initRandomColorsArray(this.$data.columnQwt);

    this.getMiddleColumnColor();
    updateColorsHash(this.$data.colors);

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.code.toLowerCase() === 'space') {
        this.changeColors();
      }
    })
  },
  created() {
    setTimeout(() => {
      this.$data.isHintVisible = false;
    }, 3000);
  },
  computed: {
    hintVisible() {
      return this.$data.isHintVisible && this.$data.clientWidth > 600;
    },
    buttonVisible() {
      return this.$data.clientWidth <= 600;
    }
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
    },
    changeColors() {
      this.$data.isHintVisible = false;
      this.$data.colors.forEach(col => {
        if(!col.isBlocked) {
          col.color = generateRandomColor();
        }
      })
      updateColorsHash(this.$data.colors);
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
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
  }

  @media screen  and (max-width: 600px){
    .container {
      flex-direction: column;
    }
  }

</style>
