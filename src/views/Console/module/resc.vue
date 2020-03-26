<template>
  <div id="resc">
    <el-form ref="form" :model="search_form" label-width="80px">
      <el-row :gutter="15">
        <el-col :xs="24" :md="4">
          <el-form-item label="类别：">
            <template>
              <el-select
                v-model="search_form.type"
                filterable
                placeholder="请选择"
                style="width:100px;"
                clearable
              >
                <el-option
                  v-for="item in options_type.item"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="5">
          <el-form-item label="地址：">
            <template>
              <el-select
                v-model="search_form.addr"
                filterable
                placeholder="请选择"
                style="width:150px;"
                clearable
              >
                <el-option
                  v-for="item in options_addr.item"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="6">
          <el-form-item label="供应商：">
            <template>
              <el-select
                v-model="search_form.supplier"
                filterable
                placeholder="请选择"
                style="width:150px;"
                clearable
              >
                <el-option
                  v-for="item in options_supp.item"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-col>
        <!-- ID查询 -->
        <el-col :xs="24" :md="5">
          <el-input placeholder="请输入查询ID" v-model="search_form.id" clearable></el-input>
        </el-col>
        <el-col :xs="24" :md="1">
          <el-button icon="el-icon-search" circle @click="queryRes"></el-button>
        </el-col>

        <!--新增数据按钮 -->
        <el-col :xs="24" :md="2" class="float-right">
          <el-button type="primary" round @click="dialog = true">新增/编辑</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增数据弹窗 -->
    <el-drawer
      title="新增/更新数据"
      :visible="dialog"
      direction="ltr"
      :before-close="addRes"
      :with-header="true"
    >
      <div class="demo-drawer__content">
        <el-form :model="resData" class="add-form">
          <el-form-item label="编号" label-width="80px">
            <el-input v-model="resData.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" label-width="80px">
            <el-select v-model="resData.restype" placeholder="请选择类别" filterable allow-create>
              <el-option
                v-for="item in options_type.item"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" label-width="80px">
            <el-select v-model="resData.address" placeholder="请选择地址" filterable allow-create>
              <el-option
                v-for="item in options_addr.item"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" label-width="80px">
            <el-select v-model="resData.supplier" placeholder="请选择供应商" filterable allow-create>
              <el-option
                v-for="item in options_supp.item"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" label-width="80px">
            <el-select v-model="resData.resState" placeholder filterable allow-create>
              <el-option label="正常" value="正常"></el-option>
              <el-option label="故障" value="故障"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" label-width="80px">
            <el-input
              type="textarea"
              maxlength="45"
              show-word-limit
              v-model="resData.resNotice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="addRes" :loading="loading">
            {{
            loading ? "提交中 ..." : "确 定"
            }}
          </el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 数据表格 -->
    <div class="black-space-30"></div>
    <div style="width:100%">
      <el-table
        v-loading="tableLoading"
        :data="tableData.item"
        border
        style="width: 100%"
        max-height="430"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="160"></el-table-column>
        <el-table-column prop="type" label="类型" width="120"></el-table-column>
        <el-table-column prop="state" label="状态" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="320"></el-table-column>
        <el-table-column prop="supplier" label="供应商" width="160"></el-table-column>
        <!-- <el-table-column prop="notice" label="备注" width="320"></el-table-column> -->
        <el-table-column prop="createdDate" label="创建时间" width="360"></el-table-column>
        <el-table-column prop="createdBy" label="创建人" width="240"></el-table-column>
        <el-table-column prop="modifiedDate" label="修改时间" width="360"></el-table-column>
        <el-table-column prop="modifiedBy" label="修改人" width="240"></el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="deleteRes(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="black-space-30"></div>
    <!-- 表格页脚 -->
    <el-row>
      <el-col :xs="24" :md="8">
        <el-button type="danger" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :xs="24" :md="16">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 资源详情弹窗 -->
    <el-drawer
      title="资源详情"
      :visible="dialog1"
      direction="rtl"
      :before-close="infoBoxClose"
      :with-header="false"
      size="30%"
    >
      <div class="demo-drawer__content">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="编号">
            <span>{{ rowInfo.item.id }}</span>
          </el-form-item>
          <br />
          <el-form-item label="类型">
            <span>{{ rowInfo.item.type }}</span>
          </el-form-item>
          <br />
          <el-form-item label="状态">
            <span>{{ rowInfo.item.state }}</span>
          </el-form-item>
          <br />
          <el-form-item label="地址">
            <span>{{ rowInfo.item.address }}</span>
          </el-form-item>
          <br />
          <el-form-item label="供应商">
            <span>{{ rowInfo.item.supplier }}</span>
          </el-form-item>
          <br />
          <el-form-item label="创建时间">
            <span>{{ rowInfo.item.createdDate }}</span>
          </el-form-item>
          <br />
          <el-form-item label="创建人">
            <span>{{ rowInfo.item.createdBy }}</span>
          </el-form-item>
          <br />
          <el-form-item label="更新时间">
            <span>{{ rowInfo.item.modifiedDate }}</span>
          </el-form-item>
          <br />
          <el-form-item label="更新人">
            <span>{{ rowInfo.item.modifiedBy }}</span>
          </el-form-item>
          <br />
          <!-- <el-form-item label="备注">
            <span>{{ rowInfo.item.notice }}</span>
          </el-form-item>-->
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  watch,
  computed
} from "@vue/composition-api";
export default {
  name: "resc",
  setup(props, { root }) {
    //类型选项
    const options_type = reactive({
      item: []
    });

    //地址选项
    const options_addr = reactive({
      item: []
    });
    //供应商选项
    const options_supp = reactive({
      item: []
    });
    //数据分类查询参数
    const search_form = reactive({
      type: "",
      addr: "",
      supplier: "",
      id: ""
    });

    //数据过滤
    const filterData = () => {};

    //新增数据表单绑定对象
    const resData = reactive({
      id: "",
      restype: "",
      address: "",
      supplier: "",
      resState: "",
      resNotice: ""
    });

    // 表格数据
    const tableData = reactive({
      item: []
    });
    const tableLoading = ref(false);
    //表格中多选框记录
    const multipleSelection = reactive([]);
    const handleSelectionChange = val => {
      multipleSelection.values = val;
    };

    //分页
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);

    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
      pageSize.value = val;
      queryRes();
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
      currentPage.value = val;
      queryRes();
    };

    /*查询资源信息*/
    const queryRes = () => {
      let requestData = {
        type: search_form.type,
        address: search_form.addr,
        supplier: search_form.supplier,
        id: search_form.id,
        pageNumber: currentPage.value,
        pageSize: pageSize.value
      };
      tableLoading.value = true;
      root.$store
        .dispatch("resc/query_resource", requestData)
        .then(response => {
          let resData = response.data.data.data;
          /*返回时间数据格式处理 */
          resData.forEach(item => {
            if (item.createdDate != null) {
              let dateArray1 = item.createdDate.split("T");
              let dateArray2 = dateArray1[1].split(".");
              item.createdDate = dateArray1[0] + " " + dateArray2[0];
            }
            if (item.modifiedDate != null) {
              dateArray1 = item.modifiedDate.split("T");
              dateArray2 = dateArray1[1].split(".");
              item.modifiedDate = dateArray1[0] + " " + dateArray2[0];
            }
          });
          tableData.item = resData;

          total.value = response.data.data.total;
          tableLoading.value = false;
        })
        .catch(error => {
          tableLoading.value = false;
        });
    };

    /*删除资源*/
    const deleteRes = row => {
      root
        .$confirm("确定删除该条数据？", "提示", { type: "warning" })
        .then(_ => {
          root.$store
            .dispatch("resc/delete_resource", { ids: [row.id] })
            .then(response => {
              queryRes();
            })
            .catch(error => {});
        })
        .catch(_ => {});
    };

    /*批量删除 */
    const deleteAll = () => {
      console.log(multipleSelection.values);
      root
        .$confirm("确定删除选择的数据？", "提示", { type: "warning" })
        .then(_ => {
          let deleteData = {
            ids: []
          };
          multipleSelection.values.forEach(item => {
            deleteData.ids.push(item.id);
          });
          console.log(deleteData.ids);
          root.$store
            .dispatch("resc/delete_resource", deleteData)
            .then(response => {
              console.log("1");
              multipleSelection.values = [];
              queryRes();
            })
            .catch(error => {});
        })
        .catch(_ => {});
    };

    /*更新资源信息*/

    /*新增资源弹窗*/
    //新增资源表单
    const timer = ref(null);
    const loading = ref(false);
    const dialog = ref(false);
    //新增资源
    const addRes = done => {
      if (loading.value) {
        return;
      } else if (resData.id != "") {
        root
          .$confirm("确定新增或更新资源吗？")
          .then(_ => {
            loading.value = true;
            timer.value = setTimeout(() => {
              let requestData = {
                id: resData.id,
                restype: resData.restype,
                address: resData.address,
                supplier: resData.supplier,
                resState: resData.resState,
                resNotice: resData.resNotice
              };
              //新增资源请求函数
              root.$store
                .dispatch("resc/add_resource", requestData)
                .then(response => {
                  dialog.value = false;
                  queryRes();
                  clearSort();
                  getSortInfo();
                })
                .catch(error => {});
              // 动画关闭需要一定的时间
              setTimeout(() => {
                loading.value = false;
              }, 400);
            }, 1000);
          })
          .catch(_ => {});
      } else {
        cancelForm();
      }
    };
    //关闭新增窗口
    const cancelForm = () => {
      loading.value = false;
      dialog.value = false;
      clearTimeout(timer.value);
    };

    /*资源详情弹窗控制 */
    const dialog1 = ref(false);
    const rowInfo = reactive({
      item: {}
    });
    const handleClick = row => {
      dialog1.value = true;
      rowInfo.item = row;
    };
    const infoBoxClose = () => {
      dialog1.value = false;
    };

    //更新类别，地址，供应商选项
    const clearSort = () => {
      options_type.item = [];
      options_addr.item = [];
      options_supp.item = [];
    };
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
          data.address.forEach(item => {
            options_addr.item.push({
              value: item.address,
              label: item.address
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

    onMounted(() => {
      clearSort();
      getSortInfo();
      queryRes();
    });
    return {
      //reactive
      search_form,
      options_type,
      options_addr,
      options_supp,
      tableData,
      resData,
      multipleSelection,
      rowInfo,
      //ref
      dialog,
      timer,
      loading,
      dialog1,
      currentPage,
      pageSize,
      total,
      tableLoading,
      //methods
      handleClick,
      infoBoxClose,
      addRes,
      cancelForm,
      getSortInfo,
      deleteRes,
      deleteAll,
      queryRes,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.add-form {
  .el-form-item {
    margin-bottom: 10px;
  }
}
.demo-table-expand .el-form-item {
  width: 100%;
}
</style>
