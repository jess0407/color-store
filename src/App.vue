<template>
  <div id="app">
    <nav class="flex justify-center p-3">
      <router-link to="/font" class="px-2 text-blue-700">Font Store</router-link>|
      <router-link to="/" class="px-2 text-blue-700">Color Srore</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.list-item {
  transition: all 0.6s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: all 0.3;
}
</style>
