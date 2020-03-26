<template>
  <div id="user-layout">
        <LayoutHead></LayoutHead>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
  </div>
</template>

<script>
import LayoutHead from "./Components/header";
import LayoutMain from "./Components/main";
import LayoutNav from "./Components/nav";
export default {
  name: "user-layout",
  components: { LayoutNav, LayoutMain, LayoutHead }
};
</script>
<style lang="scss" scoped>
</style>