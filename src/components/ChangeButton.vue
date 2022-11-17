<template>
    <button
        class="button"
        @click="onClick"
    >
      PRESS ME
    </button>
</template>

<script>
export default {
  name: "ChangeButton",
  emits: ['onBtnClick'],
  methods: {
    onClick() {
      this.$emit('onBtnClick');
    }
  }
}
</script>

<style scoped>
  .button {
    position: fixed;
    bottom: 4%;
    left: 74%;
    background-color: #0000001A;
    border: none;
    outline: none;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    width: 80px;
    height: 80px;
    font-weight: bold;
  }

  .button:hover {
    background-color: #00000033;
  }

  .button:active {
    box-shadow: 0 0 2px #00000066;
  }
</style>