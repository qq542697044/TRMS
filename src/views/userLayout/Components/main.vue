<template>
  <div id="userMain">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "userMain"
};
</script>
<style lang="scss" scoped>
#userMain {
  height: 88vh;
  width: 100%;
  box-sizing: border-box;
  padding: 15px 15px 0 15px;
}
</style>