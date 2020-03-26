<template>
  <div id="nav-wrap">
    <div class="logo-box">
      <svg-icon iconClass="logo" class="logo" />
      <span>交通资源管理系统</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <template v-if="module=='admin'">
        <el-menu-item v-for="item in routers1.children" :key="item.id" :index="item.path">
          <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
          <span slot="title">{{ item.meta.name }}</span>
        </el-menu-item>
      </template>
      <template v-if="module!='admin'">
        <el-menu-item v-for="item in routers2.children" :key="item.id" :index="item.path">
          <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
          <span slot="title">{{ item.meta.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "nav-wrap",
  setup(props, { root }) {
    const isCollapse = computed(() => root.$store.state.console.isCollapse);
    const module = computed(() => root.$store.state.login.module);
    const routers1 = reactive(root.$router.options.routes[2]);
    const routers2 = reactive(root.$router.options.routes[3]);
    onMounted(() => {
    });

    return {
      isCollapse,
      module,
      routers1,
      routers2,
    };
  }
};
</script>

<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: linear-gradient(#37b9e9, #a2bcb1);
  @include webkit(transition, all 0.5s ease 0s);
  .logo-box {
    height: 150px;
    padding: 20px 50px 0 40px;
    svg {
      font-size: 100px;
      fill: currentColor;
      color: #fff;
    }
    span {
      font-size: 14px;
      color: #fff;
      font-family: "webfont";
    }
  }
  svg {
    font-size: 20px;
    margin-right: 15px;
  }
}

.el-menu-item.is-active {
  color: rgb(177, 55, 55);
}

.open {
  #nav-wrap {
    width: $menuWidth;
  }
}
.close {
  #nav-wrap {
    width: $cmenuWidth;
    .logo-box {
      padding: 20px 20px 0 20px;
      svg {
        display: none;
      }
      span {
        font-size: 18px;
      }
    }
  }
}
</style>
