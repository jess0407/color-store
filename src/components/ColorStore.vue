<template>
  <div>
    <h1 class="text-2xl text-center mt-8">Color Store</h1>
    <div class="meta text-gray-700 text-center text-xs font-semibold h-16 mt-1">
      <div class="mb-2 flex justify-center align-middle">
        Results: {{pluralize(filtered.length)}}
        found
        <span
          @click="copy(filtered); copied = true"
          class="relative ml-4 w-4 h-4 rounded-full inline-block cursor-pointer"
        >
          <svg
            class="fill-current text-gray-700"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M13,8 L13,2 L7,2 L7,8 L2,8 L10,16 L18,8 L13,8 Z M0,18 L20,18 L20,20 L0,20 L0,18 Z"
            ></path>
          </svg>
          <span v-if="copied" class="msg ml-2 absolute top-0">Copied</span>
        </span>
      </div>
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
        @click="filter=f; if(searchText) searchText = '';"
        :key="f"
        :class="`focus:outline-none focus:border-2 px-3 py-1 m-2 font-semibold text-sm rounded-full text-black uppercase`"
        :style="{background: getBgColor(f), color: invertColor(getBgColor(f), true)}"
      >{{f}}</button>
    </nav>
    <div class="grid grid-cols-2 sm:grid-3 md:grid-cols-4 lg:grid-cols-8">
      <Swatch class="list-item" v-for="color in filtered" :key="color[0]" :color="color"></Swatch>
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
  name: "ColorStore",
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
    filtered() {
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
    },
    length() {
      return this.filtered.length;
    }
  },
  watch: {
    length: function() {
      this.copied = false;
    }
  },
  methods: {
    copy(content) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        `data:text/plain;charset=utf-8,${encodeURIComponent(
          JSON.stringify(content)
        )}`
      );
      element.setAttribute(
        "download",
        `${this.filter || this.searchText || this.filtered.length} colors.js`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
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
      copied: false,
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