<template>
  <div id="login">
    <div class="cover"><p>交通资源管理系统</p></div>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!-- 表单 --> 
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="userName" class="item-form">
          <label for="">用户名</label>
        <el-input type="text" v-model="ruleForm.userName" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item prop="userPass" class="item-form">
          <label for="">密码</label>
        <el-input type="password" v-model="ruleForm.userPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="checkPass" class="item-form" v-if="moudel=='signup'">
          <label for="">确认密码</label>
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button :type="moudel=='signup'?'danger':'primary'" @click="submitForm('ruleForm')" class="login-btn block" >{{moudel=='signup'?'注册':'登录'}}</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import {login} from "@/api/login"
import {reactive,ref,onMounted} from "@vue/composition-api";
export default {
  name: "login",
  setup(props,context){
    //函数对象
    let validateuserName = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]{3,15}$/;
      if (value === '') {
        return callback(new Error('用户名不能为空'));
      }else if(!reg.test(value)){
        return callback(new Error('用户名格式有误'));
      }else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      var reg=/^[a-zA-Z0-9]{5,15}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(!reg.test(value)){
        callback(new Error('密码应为长度6-15位的字母数字组合'));
      }
      else {
        if (ruleForm.checkPass !== '') {
          context.refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== ruleForm.userPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    //这里放置data数据、生命周期、自定义函数
    const menuTab = reactive([
          {text:'登录',current:true,type:'user'},
          {text:'注册',current:false,type:'signup'},
          {text:'管理员',current:false,type:'admin'}
        ]);
    //模块值
    const moudel = ref('user');
    //表单绑定数据
    const ruleForm = reactive({
        userName: '',
        userPass: '',
        checkPass: ''
    });
    //表单验证
    const rules = reactive({
        userName: [
          { validator: validateuserName, trigger: 'blur' }
        ],
        userPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
    });
    //函数
    const toggleMenu = ((data)=>{
      
      menuTab.forEach(element => {
        element.current=false;
      });
        //高光
      data.current=true;
        //修改模块值
      moudel.value=data.type;
        //清除表单
      resetForm();
    });

    //清除表单
    const resetForm = (()=>{
      context.refs['ruleForm'].resetFields();
    })
    //提交表单
    const submitForm = (formName =>{
      context.refs[formName].validate((valid) => {
          if (valid) {
            let obj={
              userName:ruleForm.userName,
              userPass:sha1(ruleForm.userPass),
              moudel:moudel.value
            }
            login(obj).then((response)=>{
                if(moudel.value=='user'){

                }else{

                }
            }).catch((error)=>{

            });
          }else {
            console.log('error submit!!');
            return false;
          }
      })
    });
    /*
    * 生命周期
    */ 
   //挂载完成后
   onMounted(()=>{
   });
   return{
     menuTab,
     moudel,
     toggleMenu,
     rules,
     ruleForm,
     submitForm,
     validateuserName,
     validatePass,
     validatePass2
   };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  background-image: url('../../img/background2.png');
  background-position: center center;
  background-size: 750px;
}

.cover{
  height: 72px;
  font-size: 40px;
  line-height: 72px;
  color: #fff;
  text-align: center;
  padding: 30px 0 30px 0;
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
    border-radius: 2px 2px 0 0;
    cursor: pointer;
    border-bottom: 2px solid white;
  }
  .current{
    background-color: rgba(0,0,0, 0.5);
  }
}

.login-form{
  margin-top:29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form{
    margin-bottom: 13px;
  }
  .block{
    display: block;
    width: 100%;
  }
  .login-btn{
    margin-top: 19px;
  }
}
</style>
