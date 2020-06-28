<template>
  <div>
    <nav class="filter flex flex-wrap">
      <button
        @click="filter=null"
        class="focus:outline-none focus:border-2 bg-gray-600 px-3 py-1 m-2 font-semibold text-sm rounded-full text-white uppercase"
      >All</button>
      <button
        v-for="f in filters"
        @click="filter=f"
        :key="f"
        :class="`focus:outline-none focus:border-2 px-3 py-1 m-2 font-semibold text-sm rounded-full text-black uppercase`"
        :style="{background: getBgColor(f), color: invertColor(getBgColor(f), true)}"
      >{{f}}</button>
    </nav>
    <div class="meta m-6 font-bold">Including {{filered.length}} {{filter}} colors</div>
    <div v-if="colors" class="grid grid-cols-2 sm:grid-3 md:grid-cols-4 lg:grid-cols-8">
      <Swatch v-for="color in filered" :key="color[0]+Math.random()" :color="color"></Swatch>
    </div>
  </div>
</template>

<script>
import {
  colors,
  green,
  yellow,
  dark,
  neutral,
  red,
  natural,
  blue,
  paletone,
  midtone,
  strongtone,
  darktone,
  soft
} from "../assets/colors";
import Swatch from "./swatch";
function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}
export default {
  name: "HelloWorld",
  components: {
    Swatch
  },
  computed: {
    filered() {
      if (!this.filter) return colors;
      switch (this.filter) {
        case "neutral":
          return colors.filter(c => neutral.includes(c[2]));
        case "green":
          return colors.filter(c => green.includes(c[2]));
        case "natural":
          return colors.filter(c => natural.includes(c[2]));
        case "blue":
          return colors.filter(c => blue.includes(c[2]));
        case "red":
          return colors.filter(c => red.includes(c[2]));
        case "yellow":
          return colors.filter(c => yellow.includes(c[2]));
        case "dark":
          return colors.filter(c => dark.includes(c[2]));
        case "midtone":
          return colors.filter(c => midtone.includes(c[2]));
        case "paletone":
          return colors.filter(c => paletone.includes(c[2]));
        case "strongtone":
          return colors.filter(c => strongtone.includes(c[2]));
        case "darktone":
          return colors.filter(c => darktone.includes(c[2]));
        case "soft":
          return colors.filter(c => soft.includes(c[2]));
        default:
          return colors.filter(c => c[0].toLowerCase().includes(this.filter));
      }
    }
  },
  methods: {
    getBgColor(filter) {
      return colors.find(c => c[2] === this.colorMap[filter][0])[1];
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
  },
  data() {
    return {
      colors: colors,
      filter: null,
      filters: [
        "green",
        "red",
        "yellow",
        "blue",
        "dark",
        "midtone",
        "paletone",
        "darktone",
        "strongtone",
        "neutral",
        "natural",
        "soft"
      ],
      colorMap: {
        green,
        red,
        yellow,
        blue,
        dark,
        midtone,
        paletone,
        darktone,
        strongtone,
        neutral,
        natural,
        soft
      }
    };
  }
};
</script>