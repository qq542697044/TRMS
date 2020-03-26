<template>
  <div id="userNav">
    <el-menu
      default-active="/user/index"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-row>
        <el-col :span="8" v-for="item in routers.children" :key="item.id" :index="item.path">
          <el-menu-item :index="item.path">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "userNav",
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes[3]);
    return {
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
#userNav {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.el-menu-item {
  svg {
    display: block;
    padding-top: 10px;
    margin-bottom: 2px;
    height: 20px;
    width: 100%;
  }
  span {
    display: block;
    height: 25px;
    width: 100%;
    text-align: center;
    line-height: 25px;
    font-weight: bold;
  }
}
</style>