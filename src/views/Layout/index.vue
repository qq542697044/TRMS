<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Components/header";
import LayoutMain from "./Components/main";
import LayoutNav from "./Components/nav";
import { computed } from "@vue/composition-api";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.console.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped></style>
