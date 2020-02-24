<template>
  <div id="login">
    <div class="cover"><p>交通资源管理系统</p></div>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <!-- 表单 --> 
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="age" class="item-form">
          <label for="">用户名</label>
        <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>

        <el-form-item prop="pass" class="item-form">
          <label for="">密码</label>
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="false" prop="checkPass" class="item-form">
          <label for="">确认密码</label>
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
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
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
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
      menuTab:[
        {text:'登录',current:true},
        {text:'注册',current:false},
        {text:'管理员',current:false}
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
     this.menuTab.forEach(element => {
        element.current=false;
      });
      data.current=true;
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
  resetForm(formName) {
    this.$refs[formName].resetFields();
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
