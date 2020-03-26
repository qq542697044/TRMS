<template>
  <div>
    <div style="margin-bottom:30px;font-size:30px;">
      <span>个人信息</span>
      <div class="float-right">
        <el-tooltip
          class="item"
          effect="dark"
          content="删除本地缓存的用户信息"
          placement="top-end"
        >
          <el-button type="danger" @click="clearLocal" :disabled="dis"
            >清除用户数据</el-button
          >
        </el-tooltip>
      </div>
    </div>

    <div style="margin-bottom:20px;width:60%" class="float-left">
      <el-form
        id="info"
        ref="form"
        :model="form.item"
        label-width="75px"
        class="float-left"
        style="margin-right:40px;"
      >
        <el-form-item label="姓名">
          <el-input v-model="form.item.userName" :disabled="dis"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.item.userPhone" :disabled="dis"></el-input>
        </el-form-item>
        <el-form-item label="管辖范围">
          <el-input v-model="form.address" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.item.sex" :disabled="dis"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.item.age" :disabled="dis"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="form.item.date"
            type="date"
            placeholder="选择日期"
            :disabled="dis"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div id="head-box" style="overflow:hidden;">
        <el-image
          ref="headImg"
          fit="cover"
          style="width:120px;height:160px;border-radius:10px;"
          :src="url"
          :preview-src-list="srcList"
        ></el-image>
      </div>
      <div class="clearfloat"></div>
    </div>
    <div class="float-right" style="width:40%;height:88vh"></div>
    <el-button type="primary" v-if="dis == true" @click="Edit">编辑</el-button>
    <el-button type="success" v-if="dis == false" @click="Handle"
      >保存</el-button
    >
    <el-button type="warning" v-if="dis == false" @click="HandletoServe"
      >上传</el-button
    >
  </div>
</template>

<script>
import { getuserLoc } from "@/utils/cookie.js";
import {
  reactive,
  ref,
  onMounted,
  watch,
  computed,
  toRefs
} from "@vue/composition-api";
import { getuserName} from "@/utils/cookie";
export default {
  
  setup(props, { refs }) {
    const url =
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
    const srcList = [
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
    ];

    const form = reactive({
      item: {
        userName: getuserName(),
        userPhone: "123",
        sex: "男",
        age: "24",
        date: "1998-09-15"
      },
      address: getuserLoc() || "暂无"
    });
    const dis = ref(true);
    const Init = () => {
      if (localStorage.getItem("userInfo")) {
        form.item = JSON.parse(localStorage.getItem("userInfo"));
      }
    };
    const Edit = () => {
      dis.value = false;
    };
    const Handle = () => {
      localStorage.setItem("userInfo", JSON.stringify(form.item));
      dis.value = true;
    };
    const HandletoServe = () => {
      /**/
      dis.value = true;
    };
    const clearLocal = () => {
      dis.value = true;
      localStorage.removeItem("userInfo");
    };

    onMounted(() => {
      Init();
    });
    return {
      //methods
      Init,
      Edit,
      Handle,
      HandletoServe,
      clearLocal,

      form,
      dis,

      url,
      srcList
    };
  }
};
</script>

<style lang="scss" scoped>
#info {
  .el-form-item {
    width: 100%;
    margin-bottom: 10px;
  }
}
.clearfloat {
  clear: both;
}
.item {
  margin: 4px;
}
</style>
