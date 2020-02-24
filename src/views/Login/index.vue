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
        <el-input v-model.number="ruleForm.userName"></el-input>
        </el-form-item>

        <el-form-item prop="userPass" class="item-form">
          <label for="">密码</label>
        <el-input type="password" v-model="ruleForm.userPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="checkPass" class="item-form" v-if="type=='signup'">
          <label for="">确认密码</label>
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block" v-if="type=='user'">登录</el-button>
        <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" v-if="type=='signup'">注册</el-button>
        <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" v-if="type=='admin'">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateuserName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'));
      }
      else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      type:'user',
      menuTab:[
        {text:'登录',current:true,type:'user'},
        {text:'注册',current:false,type:'signup'},
        {text:'管理员',current:false,type:'admin'}
      ],
      ruleForm: {
        useName: '',
        userPass: '',
        checkPass: ''
        
      },
      rules: {
       userName: [
          { validator: validateuserName, trigger: 'blur' }
        ],
        userPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }  
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu:function(data){
     this.$refs['ruleForm'].resetFields();
     this.menuTab.forEach(element => {
        element.current=false;
      });
      data.current=true;
      if(data.type=='signup'){
        this.type='signup';
      }else if(data.type=='user'){
        this.type='user';
      }else{
        this.type='admin';
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
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
