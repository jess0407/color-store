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
function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}
export default {
  name: "Swatch",
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
    },
    invertColor(hex, bw) {
      if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
      }
      var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + padZero(r) + padZero(g) + padZero(b);
    }
  }
};
</script>
<style scoped>
.cursor-copy {
  cursor: copy;
}
</style>
