<template>
  <div id="main-wrap">
    <!-- 路由子组件 -->
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main-wrap {
  height: 88vh;
  border: 20px solid #f7f7ff;
  border-right: none;
  border-bottom: none;
  box-sizing: border-box;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.5s ease 0s);
  padding: 15px 15px 0 15px;
}

.open {
  #main-wrap {
    margin: 75px 0 0 $menuWidth;
  }
}
.close {
  #main-wrap {
    margin: 75px 0 0 $cmenuWidth;
  }
}
</style>
