<template>
  <div :class="style">
    PRESS SPACE
  </div>
</template>

<script>

import chroma from "chroma-js";

export default {
  name: "MainHint",
  props: {
    colorHex: {
      type: String,
      required: true,
    }
  },
  computed: {
    style() {
      const luminance = chroma(this.$props.colorHex).luminance();
      return luminance > 0.5 ? ['textBlack', 'hint'] : ['textWhite', 'hint'];
    },
  }
}
</script>

<style scoped>
.hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0000001A;
  padding: 12px;
  border-radius: 8px;
}

.textWhite {
  color: #fff;
}

.textBlack {
  color: #000;
}

</style>