<template>
  <div>
    <h1 class="text-2xl text-center mt-8">Font Store</h1>
    <div class="meta text-gray-700 text-center text-xs font-semibold h-16 mt-1">
      <div class="mb-2 flex justify-center align-middle">
        Results: {{pluralize(displayedFonts.length)}}
        displayed
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
          <span v-if="copied" class="msg ml-2 absolute top-0">A color config is downloaded.</span>
        </span>
      </div>
      <p v-if="searchText">
        Search:
        <span
          @click="searchText=''"
          class="px-2 py-1 mx-px rounded-full cursor-pointer bg-blue-800 text-white"
        >{{searchText}} x</span>
      </p>
    </div>
    <input
      ref="search"
      @input="searchText = searchText.trim()"
      placeholder="Type '/' to focus.  "
      class="px-3 border-2 border-gray-600 h-12 w-4/5 mx-auto block rounded-lg focus:outline-none focus:border-blue-800"
      type="text"
      v-model="searchText"
    >
    <nav class="filter flex flex-wrap my-4 w-11/12 mx-auto"></nav>
    <div class="grid grid-cols-1 sm:grid-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-11/12 mx-auto">
      <font class v-for="font in displayedFonts" :key="font.family" v-bind="font"/>
    </div>
  </div>
</template>
<script>
import { search } from "../services/fonts";
import font from "./font.vue";
import { debounce } from "lodash";
export default {
  name: "FontStore",
  components: {
    font
  },
  data: function() {
    return {
      loading: false,
      searchText: "",
      filtered: [],
      copied: false,
      allfonts: []
    };
  },
  watch: {
    length: function() {
      this.copied = false;
    },
    searchText: debounce(function() {
      if (this.searchText.length > 2) {
        this.searchFonts();
      }
    }, 500)
  },
  computed: {
    displayedFonts() {
      if (this.searchText) {
        return this.filtered;
      }
      const slice = this.allfonts.slice(0, 20);
      return slice;
    }
  },
  methods: {
    focus(e) {
      if (e.keyCode === 191) {
        const input = this.$refs.search;
        input && input.focus();
      }
    },
    copy(content) {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        `data:text/plain;charset=utf-8,const colors=${encodeURIComponent(
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
      let displayedCount;
      if (count === 0) {
        displayedCount = "no fonts";
      } else if (count === 1) {
        displayedCount = "1 font";
      } else {
        displayedCount = count + " fonts";
      }
      return `${displayedCount} (of ${this.allfonts.length})`;
    },
    async searchFonts() {
      console.log(this.searchText);
      this.loading = true
      const data = await search(this.searchText);
      this.filtered = data;
      this.loading = false;
    }
  },
  mounted() {
    const input = this.$refs.search;
    if (!input) return;
    document.addEventListener("keyup", e => this.focus(e));
  },
  created() {
    console.log("created");
    this.allfonts = localStorage.getItem("fonts");
    this.allfonts = JSON.parse(localStorage.getItem("fonts") || "[]");
    if (!this.allfonts.length) {
      search("").then(data => {
        this.allfonts = data;
        localStorage.setItem("fonts", JSON.stringify(data));
      });
    }
  },
  destroyed() {
    document.removeEventListener("keyup", this.focus);
  }
};
</script>

