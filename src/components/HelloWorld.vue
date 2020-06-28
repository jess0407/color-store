<template>
  <div>
    <h1 class="text-2xl text-center mt-8">Color Store</h1>
    <div class="meta text-gray-700 text-center text-xs font-semibold h-16 mt-1">
      <p class="mb-2">
        Results: {{pluralize(filered.length)}}
        found
      </p>
      <p v-if="searchText">
        Search:
        <span
          @click="searchText=''"
          class="px-2 py-1 mx-px rounded-full cursor-pointer bg-blue-800 text-white"
        >{{searchText}} x</span>
      </p>
      <p v-if="filter">
        Filter:
        <span
          @click="filter=null"
          class="px-2 py-px mx-px rounded-full cursor-pointer"
          :style="{background: getBgColor(filter), color: invertColor(getBgColor(filter), true)}"
        >{{filter}} x</span>
      </p>
    </div>
    <input
      ref="search"
      @input="filter = null; searchText = lower(searchText)"
      placeholder="Type '/' to focus. Enter color code or name. Try 'apple'. "
      class="px-3 border-2 border-gray-600 h-12 w-4/5 mx-auto block rounded-lg focus:outline-none focus:border-blue-800"
      type="text"
      v-model="searchText"
    >
    <nav class="filter flex flex-wrap my-4 w-11/12 mx-auto">
      <button
        v-for="f in filters"
        @click="filter=f"
        :key="f"
        :class="`focus:outline-none focus:border-2 px-3 py-1 m-2 font-semibold text-sm rounded-full text-black uppercase`"
        :style="{background: getBgColor(f), color: invertColor(getBgColor(f), true)}"
      >{{f}}</button>
    </nav>
    <div class="grid grid-cols-2 sm:grid-3 md:grid-cols-4 lg:grid-cols-8">
      <Swatch class="list-item" v-for="color in filered" :key="color[0]" :color="color"></Swatch>
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
  mounted() {
    const input = this.$refs.search;
    if (!input) return;
    document.addEventListener("keyup", e => this.focus(e));
  },
  destroyed() {
    document.removeEventListener("keyup", this.focus);
  },
  computed: {
    filered() {
      if (this.searchText.length) {
        return colors.filter(c => {
          return (
            this.lower(c[0]).includes(this.searchText) ||
            this.lower(c[2]).includes(this.searchText)
          );
        });
      }
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
    pluralize(count) {
      if (count === 0) {
        return "no colors";
      } else if (count === 1) {
        return "1 color";
      } else {
        return count + " colors";
      }
    },
    focus(e) {
      if (e.keyCode === 191) {
        const input = this.$refs.search;
        input && input.focus();
      }
    },
    lower(s) {
      return s.toLowerCase();
    },
    getBgColor(filter) {
      return colors.find(c => c[2] === this.colorMap[filter][0])[1];
    }
  },
  data() {
    return {
      searchText: "",
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