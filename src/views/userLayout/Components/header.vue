<template>
  <div id="userheader">
    <div class="float-right">
      <div class="user-info float-left">{{ userInfo.userName }}</div>
      <div class="header-icon float-left" @click="signout">
        <svg-icon iconClass="exit" class="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { getuserName, removeToken } from "@/utils/cookie";
import { onMounted,reactive } from "@vue/composition-api";
export default {
  name: "userheader",
  setup(props, { root }) {
    const userInfo = reactive({
      userName: getuserName() || ""
    });
    const navMenustate = () => {
      root.$store.dispatch("console/isCollapse");
    };
    const signout = () => {
      root
        .$confirm("确定登出吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(_ => {
          removeToken();
          root.$message({
            type: "success",
            message: "已退出!"
          });
          setTimeout(() => {
            root.$router.push({
              name: "Login"
            });
          }, 1000);
        })
        .catch(_ => {});
    };
    onMounted(() => {
      if (localStorage.getItem("userInfo") != "") {
        userInfo.userName = JSON.parse(
          localStorage.getItem("userInfo")
        ).userName;
      }
    });
    return {
      userInfo,
      navMenustate,
      signout
    };
  }
};
</script>

<style lang="scss" scoped>
#userheader {
  overflow: hidden;
  top: 0;
  right: 0;
  height: 60px;
  width: 100%;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  line-height: 60px;
  .header-icon {
    padding: 0 16px;
    svg {
      font-size: 25px;
      margin-bottom: -8px;
      cursor: pointer;
    }
  }
  .user-info {
    height: 100%;
    padding: 0 16px;
    border-right: 1px solid #ededed;
    + .header-icon {
      padding: 0 28px !important;
    }
  }
}
</style>
