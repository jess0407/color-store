<template>
  <div
    @click="copy"
    class="h-48 flex flex-col justify-center text-center font-semibold p-2"
    :style="{background: color[1], color: invertColor(color[1], true)}"
    :class="{'cursor-copy' : !copied, 'cursor-auto':!copied}"
  >
    <p class="text-xs mt-2">{{color[2]}}</p>
    <p class="text-sm leading-tight">{{color[0]}}</p>
    <input
      readonly
      ref="color"
      class="mt-2 text-center text-sm uppercase focus:outline-none"
      :class="{'cursor-copy' : !copied, 'cursor-auto':!copied}"
      :style="{background: color[1]}"
      :value="text"
    >
  </div>
</template>


<script>
import { colorutil } from "../mixin";
export default {
  name: "Swatch",
  mixins: [colorutil],
  data() {
    return {
      copied: false
    };
  },
  computed: {
    text() {
      return this.copied ? "Color code copied" : this.color[1];
    }
  },
  props: {
    color: Array
  },
  methods: {
    copy() {
      this.$refs.color.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }
};
</script>
<style scoped>
.cursor-copy {
  cursor: copy;
}
</style>
