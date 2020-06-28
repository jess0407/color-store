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
import { colorutil } from "../mixin";
export default {
  name: "HelloWorld",
  mixins: [colorutil],
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