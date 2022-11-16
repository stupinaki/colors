<template>
  <div
      :style="background"
      class="column"
  >
    <h2
        :class="['text', textColor]"
        @click="copy"
    >
      {{ text }}
    </h2>

    <button
        :class="['button', textColor]"
        @click="isClose = !isClose"
    >
      <i
          v-if="isClose"
          class="fa-solid fa-lock"
      />
      <i
          v-else
          class="fa-solid fa-lock-open"
      />
    </button>
  </div>
</template>

<script>
import chroma from "chroma-js";

export default {
  name: "ColumnComponent",
  data() {
    return {
      isClose: true,
      isCopy: false
    }
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    colorHex: {
      type: String,
      required: true,
    },
  },
  computed: {
    background() {
      return 'background: ' + this.$props.backgroundColor;
    },
    textColor() {
      const luminance = chroma(this.$props.backgroundColor).luminance();
      return luminance > 0.5 ? 'textBlack' : 'textWhite';
    },
    text() {
      return this.$data.isCopy ? 'copy' : this.$props.colorHex;
    }
  },
  methods: {
    copy() {
      this.$data.isCopy = true;
      navigator.clipboard.writeText(this.$props.colorHex)
      setTimeout(() => this.$data.isCopy = false, 800)
    },

  }
}
</script>

<style scoped>
.column {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.text {
  font-size: 20px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 400ms;
}

.textWhite {
  color: #fff;
}

.textBlack {
  color: #000;
}

.button {
  background-color: transparent;
  padding: 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: background-color 400ms;
}

.button:hover,
.text:hover {
  background-color: #0000001A;
  cursor: pointer;
}

</style>