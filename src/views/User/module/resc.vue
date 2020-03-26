<template>
  <div id="resc-mobiler">
    <div class="control-box">
      <el-button type="primary" icon="el-icon-edit" circle @click="addDialogOpen"></el-button>
      <el-button type="primary" icon="el-icon-turn-off" circle @click="showSelect"></el-button>
      <div
        class="control-box-svg"
        style="display:inline-block;vertical-align:bottom;margin-left:5px;"
      >
        <span @click="showSelect('normal')">
          <svg-icon
            iconClass="res_normal"
            class="res_normal"
            style="font-size:30px;padding:0 10px;"
          />
        </span>
        <span @click="showSelect('error')">
          <svg-icon iconClass="res_error" class="res_error" style="font-size:30px;padding:0 10px;" />
        </span>
      </div>
    </div>
    <el-divider content-position="right">资源列表</el-divider>
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto"
      infinite-scroll-disabled="disabled"
    >
      <li v-for="(item,index) in showData.item" :key="index">
        <div class="float-left card-box">
          <el-card
            :body-style="{ padding: '0px',width:'250px',border:'solid 1px #f0f0f0'}"
            shadow="hover"
          >
            <div style="padding: 14px;">
              <h3 style="display:inline">资源-{{index+1}}</h3>
              <svg-icon
                iconClass="res_error"
                class="res_error float-right"
                style="font-size:30px;"
                v-if="item.state=='故障'"
              />
              <svg-icon
                iconClass="res_normal"
                class="res_normal float-right"
                style="font-size:30px;"
                v-if="item.state=='正常'"
              />
              <div>
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="编号">
                    <span>{{ item.id }}</span>
                  </el-form-item>
                  <br />
                  <el-form-item label="类型">
                    <span>{{ item.type }}</span>
                  </el-form-item>
                  <br />
                  <el-form-item label="状态">
                    <span :style="item.state=='故障'? 'color:red':''">{{ item.state }}</span>
                  </el-form-item>
                  <br />
                  <el-form-item label="地址">
                    <span>{{ item.address }}</span>
                  </el-form-item>
                  <br />
                  <el-form-item label="供应商">
                    <span>{{ item.supplier }}</span>
                  </el-form-item>
                </el-form>
              </div>

              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="dialogOpen(index)">编辑</el-button>
                <el-button type="text" class="button" @click="deleteRes(index)">删除</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </li>
    </ul>
    <p class="center" v-if="pageControl.loading">加载中...</p>
    <p class="center" v-if="pageControl.error">加载失败</p>
    <p class="center" v-if="noMore">没有更多了</p>
    <div style="height:60px"></div>

    <el-dialog title="新增资源" :visible.sync="addDialog.visible" width="380px">
      <div class="demo-drawer__content">
        <el-form :model="addDialog.form" class="add-form">
          <el-form-item label="编号" :label-width="dialogForm.formLabelWidth">
            <el-input v-model="addDialog.form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" :label-width="dialogForm.formLabelWidth">
            <el-select v-model="addDialog.form.type" placeholder="请选择类别" filterable allow-create>
              <el-option
                v-for="item in options_type.item"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" :label-width="dialogForm.formLabelWidth">
            <el-input v-model="addDialog.form.address" :disabled="'true'=='true'"></el-input>
          </el-form-item>
          <el-form-item label="供应商" :label-width="dialogForm.formLabelWidth">
            <el-select
              v-model="addDialog.form.supplier"
              placeholder="请选择供应商"
              filterable
              allow-create
            >
              <el-option
                v-for="item in options_supp.item"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="dialogForm.formLabelWidth">
            <el-select v-model="addDialog.form.state" placeholder="请选择资源状态">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="故障" value="故障"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="dialogForm.formLabelWidth">
            <el-input
              type="textarea"
              maxlength="45"
              show-word-limit
              v-model="addDialog.form.notice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="addDialog.visible=false">取 消</el-button>
          <el-button type="primary" @click="addRes" :loading="addDialog.loading">
            {{
            addDialog.loading ? "提交中 ..." : "确 定"
            }}
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="资源信息更新" :visible.sync="dialogForm.dialogFormVisible" width="380px">
      <el-form :model="dialogForm.form">
        <el-form-item label="编号" :label-width="dialogForm.formLabelWidth">
          <el-input v-model="dialogForm.form.id" autocomplete="off" :disabled="'true'=='true'"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="dialogForm.formLabelWidth">
          <el-select v-model="dialogForm.form.restype" allow-create filterable>
            <el-option
              v-for="item in options_type.item"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" :label-width="dialogForm.formLabelWidth">
          <el-select v-model="dialogForm.form.supplier" allow-create filterable>
            <el-option
              v-for="item in options_supp.item"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="dialogForm.formLabelWidth">
          <el-select v-model="dialogForm.form.resState">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="故障" value="故障"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="editRes">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getuserLoc } from "@/utils/cookie";
import { ref, onMounted, reactive, computed } from "@vue/composition-api";
export default {
  name: "resc-mobile",
  setup(props, { root }) {
    //测试用
    const Test = () => {
      console.log(resData.item[[1]]);
    };
    //正常/故障筛选
    const showData = reactive({
      item: []
    });
    const showSelect = state => {
      if (state == "normal") {
        showData.item = [];
        resData.item.forEach(item => {
          if (item.state == "正常") {
            showData.item.push(item);
          }
        });
      } else if (state == "error") {
        showData.item = [];
        resData.item.forEach(item => {
          if (item.state == "故障") {
            showData.item.push(item);
          }
        });
      } else {
        showData.item = [];
        resData.item.forEach(item => {
          showData.item.push(item);
        });
      }
    };

    const clearSort = () => {
      options_type.item = [];
      options_addr.item = [];
      options_supp.item = [];
    };
    //分类选项
    const options_type = reactive({
      item: []
    });
    //供应商选项
    const options_supp = reactive({
      item: []
    });
    const getSortInfo = () => {
      root.$store
        .dispatch("resc/get_sort_info")
        .then(response => {
          let data = response.data.data;
          data.resType.forEach(item => {
            options_type.item.push({
              value: item.typeName,
              label: item.typeName
            });
          });
          data.supplier.forEach(item => {
            options_supp.item.push({
              value: item.supplierName,
              label: item.supplierName
            });
          });
        })
        .catch(error => {});
    };
    //资源数据
    const resData = reactive({
      item: []
    });
    
    //无限滑动窗口
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(1);
    const pageControl = reactive({
      count: 0,
      loading: false,
      error: false
    });
    const noMore = computed(() => pageControl.count >= total.value);

    const disabled = computed(() => pageControl.loading || noMore.value);
    const load = () => {
      pageControl.loading = true;
      currentPage.value += 1;
      queryRes();
      setTimeout(() => {}, 2000);
    };

    //查询
    const search_form = reactive({
      type: "",
      addr: getuserLoc(),
      supplier: "",
      id: ""
    });
    const queryRes = () => {
      let requestData = {
        type: search_form.type,
        address: search_form.addr,
        supplier: search_form.supplier,
        id: search_form.id,
        pageNumber: currentPage.value,
        pageSize: pageSize.value
      };
      root.$store
        .dispatch("resc/query_resource", requestData)
        .then(response => {
          let Data = response.data.data.data;
          /*返回时间数据格式处理 */
          // resData.forEach(item=>{
          //   item.createdDate=；
          //   item.modifiedDate=;
          // })
          resData.item = Data;
          showData.item = Data;
          total.value = response.data.data.total;
          pageControl.count += pageSize.value;
          pageControl.loading = false;
          pageControl.error = false;
          console.log(noMore.value);
          console.log(disabled.value);
        })
        .catch(error => {
          pageControl.loading = false;
          pageControl.error = true;
        });
    };
    //新增资源弹窗
    const addDialog = reactive({
      form: {
        id: "",
        type: "",
        state: "",
        address: getuserLoc(),
        supplier: "",
        notice: ""
      },
      visible: false,
      loading: false,
      timer: null
    });

    const addDialogOpen = () => {
      addDialog.visible = true;
    };

    const addRes = done => {
      if (addDialog.loading) {
        return;
      } else if (addDialog.form.id != "") {
        root
          .$confirm("确定新增或更新资源吗？")
          .then(_ => {
            addDialog.loading = true;
            addDialog.timer = setTimeout(() => {
              let requestData = {
                id: addDialog.form.id,
                restype: addDialog.form.type,
                address: addDialog.form.address,
                supplier: addDialog.form.supplier,
                resState: addDialog.form.state,
                resNotice: addDialog.form.notice
              };
              //新增资源请求函数
              root.$store
                .dispatch("resc/add_resource", requestData)
                .then(response => {
                  addDialog.visible = false;
                  queryRes();
                  clearSort();
                  getSortInfo();
                })
                .catch(error => {});
              // 动画关闭需要一定的时间
              setTimeout(() => {
                addDialog.loading = false;
              }, 400);
            }, 1000);
          })
          .catch(_ => {});
      } else {
        addDialog.visible = false;
        addDialog.loading = false;
      }
    };

    //编辑资源信息
    //弹窗表单
    const dialogForm = reactive({
      dialogFormVisible: false,
      form: {
        id: "",
        restype: "",
        supplier: "",
        resState: ""
      },
      currentIndex: 0,
      formLabelWidth: "60px"
    });

    const dialogOpen = index => {
      dialogForm.dialogFormVisible = true;
      dialogForm.form.id = resData.item[index].id;
      dialogForm.form.restype = resData.item[index].type;
      dialogForm.form.supplier = resData.item[index].supplier;
      dialogForm.form.resState = resData.item[index].state; //如果直接写为dialogForm.form=resData.item[index]会使form直接指向resData.item[index]的内存地址（绑定为同一对象），此时修改form会导致resData被修改
      dialogForm.currentIndex = index;
    };

    const editRes = () => {
      let date = new Date();
      let editData = dialogForm.form;
      editData.address = getuserLoc();
      editData.resNotice = date.toString() + "更新";
      root.$store
        .dispatch("resc/update_resource", editData)
        .then(response => {
          dialogForm.dialogFormVisible = false;
          queryRes();
          console.log("更新成功");
        })
        .catch(error => {});
    };
    //删除资源
    const deleteRes = index => {
      root
        .$confirm("此操作将永久删除该资源, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          root.$store
            .dispatch("resc/delete_resource", { ids: [resData.item[index].id] })
            .then(response => {
              root.$message({
                type: "success",
                message: "删除成功"
              });
              resData.item.pop(index);
            })
            .catch(error => {
              root.$message({
                type: "error",
                message: "删除失败，请联系管理员"
              });
            });
        })
        .catch(() => {
          root.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    };

    onMounted(() => {
      getSortInfo();
    });
    return {
      noMore,
      disabled,
      //ref
      options_type,
      options_supp,
      //reactive
      showData,
      pageControl,
      dialogForm,
      addDialog,
      //methods
      load,
      showSelect,
      dialogOpen,
      editRes,
      deleteRes,
      addDialogOpen,
      addRes,

      Test
    };
  }
};
</script>
<style lang="scss" scoped>
.control-box {
  margin-bottom: 5px;
}
.card-box {
  margin: 5px;
}
.center {
  text-align: center;
}
</style>