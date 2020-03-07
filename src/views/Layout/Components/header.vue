<template>
    <div id="header-wrap">
        <a class="float-left header-icon" @click="navMenustate"><svg-icon iconClass="menu" className="menu"/></a>
        <div class="float-right">
            <div class="user-info float-left">{{userName}}</div>
            <div class=" header-icon float-left" @click="signout"><svg-icon iconClass="exit" className="exit"/></div>
        </div>
    </div>
</template>

<script>
import { getuserName,removeToken } from "@/utils/cookie"
export default {
    name:"header-wrap",
    setup(props,{root}){
        const userName=getuserName();
        const navMenustate=() => {
           root.$store.dispatch("console/isCollapse");   
        }
        const signout=()=>{
            root.$confirm("确定登出吗？","提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'})
            .then(_=>{
                removeToken();
                root.$message({
                    type: 'success',
                    message: '已退出!'
                });
                setTimeout(()=>{
                    root.$router.push({
                        name: "Login"
                    }); 
                }, 1000);
            }).catch(_ => {});
        }
        return {
            userName,
            navMenustate,
            signout
        }
    }

}
</script>

<style lang="scss" scoped>
#header-wrap{
    position: fixed;
    top:0;
    right: 0;
    height: 75px;
    background-color: #fff;
    @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,0.1));
    @include webkit(transition,all .5s ease 0s);
    line-height: 75px;
    .header-icon{
        padding: 0 32px;
        svg{
            font-size:25px;
            margin-bottom: -8px;
            cursor: pointer;
        }
    }   
    .user-info{
            height: 100%; 
            padding: 0 32px;
            border-right: 1px solid #ededed;
            + .header-icon{
                padding: 0 28px !important;
            }
    }
}
.open{
  #header-wrap{
    left:$menuWidth;
  }
}
.close{
  #header-wrap{
    left:$cmenuWidth;
  }
}
</style>