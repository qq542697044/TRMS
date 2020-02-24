<template>
  <div id="login">
    <div class="cover"><p>交通资源管理系统</p></div>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      menuTab:[
        {text:'登录',current:true},
        {text:'注册',current:false},
        {text:'管理员',current:false}
        ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu:function(data){
     this.menuTab.forEach(element => {
        element.current=false;
      });
      data.current=true;
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.cover{
  height: 72px;
  font-size: 40px;
  line-height: 72px;
  color: #fff;
  text-align: center;
}

.login-wrap{
  width:330px;
  margin:auto;
}

.menu-tab{
  text-align: center;
  li{
    display: inline-block;
    width:88px;
    line-height: 36px;
    font-size: 14px;
    color:#fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current{
    background-color: rgba(0,0,0, 0.1);
  }
}
</style>
