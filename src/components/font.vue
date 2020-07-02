<template>
  <div class="flex flex-col text-center justify-center bg-gray-100 rounded shadow h-64 relative">
    <button @click="toggle" class="absolute top-0 right-0 p-2 focus:outline-none">details</button>
    <h1
      v-if="!showMore"
      class="text-4xl p-3 text-gray-800"
      :style="{'font-family': family}"
    >{{family}}</h1>
    <p v-if="!showMore" class="mt-3 px-3 text-xs">{{category}}</p>
    <div v-if="showMore" class="p-3 text-left text-sm" v-html="description"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMore: false
    };
  },
  methods: {
    toggle() {
      this.showMore = !this.showMore;
    }
  },
  props: {
    family: {
      type: String
    },
    category: {
      type: String
    },
    license: {
      type: String
    },
    designers: {
      type: Array
    },
    pairings: {
      type: Array
    },
    description: {
      type: String
    }
  },
  mounted() {
    let style = document.createElement("link");
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = `https://fonts.googleapis.com/css?family=${this.family}`;
    document.head.appendChild(style);
  }
};
</script>