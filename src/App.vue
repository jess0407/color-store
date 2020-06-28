<template>
  <div id="app">
    <ColorStore/>
  </div>
</template>

<script>
import ColorStore from "./components/ColorStore";

export default {
  name: "App",
  components: {
    ColorStore
  }
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
