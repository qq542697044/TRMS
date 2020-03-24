<template>
  <div id="userc">
    <el-row :gutter="20">
      <el-col :xs="24" :md="4">
        <el-input
          v-model="searchUser"
          placeholder="输入用户名搜索"
          class="searchUserBox"
        />
      </el-col>
      <el-col :xs="24" :md="6" hidden-lg-and-down>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="queryUser"
            >搜索</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="centerDialogOpen('edit')"
            >编辑</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-delete"
            @click="centerDialogOpen('delete')"
            >删除</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>

    <el-dialog
      :title="centerDialogTitle"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <el-form
        class="input-centerdialog-box"
        :rules="rules"
        ref="dialogData"
        :model="dialogData"
        status-icon
      >
        <el-form-item prop="userName">
          <el-input v-model="dialogData.userName" placeholder="请输入用户名" />
        </el-form-item>

        <div
          class="black-space-30"
          v-if="centerDialogTitle != '删除用户'"
        ></div>
        <el-form-item v-if="centerDialogTitle != '删除用户'">
          <el-input
            v-model="dialogData.userLoc"
            placeholder="设置用户管辖范围"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit('dialogData')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-table
      v-loading="tableLoading"
      :data="tableData.item"
      border
      style="width: 100%"
      max-height="430"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="160"
        sortable
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="userPhone"
        label="联系方式"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="userType"
        label="用户类型"
        width="120"
        :filters="[
          { text: '普通用户', value: '普通用户' },
          { text: '管理员', value: '管理员' }
        ]"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column prop="userLoc" label="管辖范围"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="light"
            content=" 该操作不可逆！！"
            placement="bottom"
          >
            <el-button
              :type="scope.row.userType == '管理员' ? 'danger' : 'success'"
              size="small"
              @click="setUser(scope.row)"
              >{{
                scope.row.userType == "管理员" ? "取消" : "设为"
              }}管理员</el-button
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { Query_user, Set_user, Update_user, Delete_user } from "@/api/userc.js";
export default {
  name: "userc",
  setup(props, { root, refs }) {
    //弹窗控制器
    const centerDialogVisible = ref(false);
    const centerDialogTitle = ref("");
    const centerDialogOpen = type => {
      centerDialogVisible.value = true;
      centerDialogTitle.value = type == "edit" ? "更新用户信息" : "删除用户";
    };
    const centerDialogClose = () => {
      centerDialogVisible.value = false;
    };

    //弹窗表格
    const dialogData = reactive({
      userName: "",
      userLoc: ""
    });

    //清除弹窗表格
    const resetForm = () => {
      dialogData.userName = "";
      dialogData.userLoc = "";
    };
    watch(
      () => centerDialogTitle.value,
      () => {
        resetForm();
      }
    );
    //弹窗表格验证
    let validateuserName = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]{3,15}$/;
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      userName: [{ validator: validateuserName, trigger: "blur" }]
    });

    const dialogSubmit = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          console.log(centerDialogTitle);
          if (centerDialogTitle.value == "删除用户") {
            deleteUser();
          } else {
            updateUser();
          }
        }
      });
    };
    const tableLoading = ref(false);
    //表格数据
    const tableData = reactive({
      item: [
        {
          id: "1",
          userName: "xhy",
          userPhone: "123",
          userType: "管理员",
          userLoc: "dsd"
        }
      ]
    });
    //表格数据总数
    const total = ref(0);
    //表格中多选框记录
    const multipleSelection = reactive([]);
    const handleSelectionChange = val => {
      multipleSelection.values = val;
    };
    //用户名搜索数据
    const searchUser = ref("");
    //用户类型过滤器
    const filterHandler = (value, row, column) => {
      const property = column["property"];
      return row[property] === value;
    };

    //用户数据查询接口
    const queryUser = () => {
      let queryData = {
        userName: searchUser.value,
        pageNumber: "1",
        pageSize: "100"
      };
      tableLoading.value = true;
      Query_user(queryData)
        .then(response => {
          let data = response.data.data.data;
          total.value = response.data.data.total;
          console.log(data);
          tableData.item = data;
          tableLoading.value = false;
        })
        .catch(error => {
          console.log("用户查询失败");
          tableLoading.value = false;
        });
    };

    //更新用户信息接口
    const updateUser = () => {
      let updateData = {
        userName: dialogData.userName,
        userLoc: dialogData.userLoc
      };
      Update_user(updateData)
        .then(response => {
          centerDialogVisible.value = false;
          console.log("设置管辖范围成功");
          queryUser();
        })
        .catch(error => {
          console.log("设置失败");
        });
    };

    //删除用户接口
    const deleteUser = () => {
      let deleteData = {
        userName: dialogData.userName
      };
      Delete_user(deleteData)
        .then(response => {
          centerDialogVisible.value = false;
          console.log("删除用户成功");
          console.log(response);
          queryUser();
        })
        .catch(error => {
          console.log("删除用户失败");
        });
    };

    //管理员设置\取消接口
    const setUser = user => {
      let setData = {
        userName: user.userName,
        controlType: user.userType == "管理员" ? "cancel" : "set"
      };
      Set_user(setData)
        .then(response => {
          console.log("操作成功");
          queryUser();
        })
        .catch(error => {
          console.log("操作失败");
        });
    };
    onMounted(() => {
      queryUser();
    });
    return {
      //ref
      searchUser,
      centerDialogVisible,
      centerDialogTitle,
      dialogData,
      tableLoading,
      total,
      //reactive
      tableData,
      multipleSelection,
      rules,
      //methods
      handleSelectionChange,
      filterHandler,
      centerDialogClose,
      centerDialogOpen,
      queryUser,
      updateUser,
      deleteUser,
      setUser,
      dialogSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
.searchUserBox {
  width: 200px;
  margin-bottom: 20px;
}
.input-centerdialog-box {
  width: 70%;
  margin: 0 auto;
}
.item {
  margin: 4px;
}
</style>
