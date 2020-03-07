<template>
  <div id="resc">
    <el-form ref="form" :model="search_form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="类别：">
            <template>
              <el-select v-model="type" filterable placeholder="请选择" style="width:100px;">
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
        <el-col :span="5">
          <el-form-item label="地址：">
            <template>
              <el-select v-model="addr" filterable placeholder="请选择" style="width:150px;">
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
        <el-col :span="6">
          <el-form-item label="供应商：">
            <template>
              <el-select v-model="supp" filterable placeholder="请选择" style="width:150px;">
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
        <el-col :span="5">
          <el-input placeholder="请输入查询ID" v-model="search_id" clearable></el-input>
        </el-col>
        <el-col :span="1">
          <el-button icon="el-icon-search" circle></el-button>
        </el-col>

        <!--新增数据按钮 -->
        <el-col :span="2" class="float-right">
          <el-button type="primary" round @click="dialog = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增数据弹窗 -->
    <el-drawer
      title="新增数据"
      :visible.sync="dialog"
      direction="ltr"
      :before-close="handleClose"
      :with-header="true"
    >
      <div class="demo-drawer__content">
        <el-form :model="resData">
          <el-form-item label="编号" label-width="80px">
            <el-input v-model="resData.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" label-width="80px">
            <el-select v-model="resData.type" placeholder="请选择类别" filterable allow-create>
              <el-option
                v-for="item in options_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" label-width="80px">
            <el-select v-model="resData.address" placeholder="请选择地址" filterable allow-create>
              <el-option
                v-for="item in options_addr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" label-width="80px">
            <el-select v-model="resData.supplier" placeholder="请选择供应商" filterable allow-create>
              <el-option
                v-for="item in options_supp"
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
          <el-button
            type="primary"
            @click="handleClose"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%" max-height="430"> 
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="160"></el-table-column>
      <el-table-column prop="type" label="类型" width="120"></el-table-column>
      <el-table-column prop="state" label="状态" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="320"></el-table-column>
      <el-table-column prop="supplier" label="供应商" width="240"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!-- 表格页脚 -->
    <el-row>
      <el-col :span="8">
        <el-button type="danger">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination class="float-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total,sizes,prev, pager, next,jumper"
          :current-page.sync="currentPage"
          :page-sizes="[10, 50, 80, 100]"
          :page-size="10"
          :total="100"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "resc",
  setup(props, { root }) {
    //类型选项
    const options_type = reactive({
      item: [{
              value: "路灯",
              label: "路灯"
            },
            {
              value: "护栏",
              label: "护栏"
            },
            {
              value: "监控",
              label: "监控"
            }]
    });

    //地址选项
    const options_addr = reactive({
      item:[{
              value: "遂宁",
              label: "遂宁"
            },
            {
              value: "成都",
              label: "成都"
            },
            {
              value: "绵阳",
              label: "绵阳"
            }]
    });
    //供应商选项
    const options_supp = reactive({
      item:[{
              value: "腾讯",
              label: "腾讯"
            },
            {
              value: "阿里巴巴",
              label: "阿里巴巴"
            },
            {
              value: "字节跳动",
              label: "字节跳动"
            }]
      });
    const type = ref("");
    const addr = ref("");
    const supp = ref("");
    const search_id = ref("");

    //数据分类查询参数
    const search_form = reactive({
      type: "",
      addr: "",
      search_id: ""
    });
    //新增数据表单绑定对象
    const resData = reactive({
      //测试用例
      id: "",
      restype: "",
      address: "",
      supplier: "",
      resState: "",
      resNotice: ""
    });

    // 表格数据
    const tableData = reactive([
      {
        id: "L0001",
        type: "路灯",
        state: "正常",
        address: "上海市普陀区金沙江路 1518 弄",
        supplier: "xxx"
      },
      {
        id: "C0001",
        type: "监控",
        state: "正常",
        address: "上海市普陀区金沙江路 1519 弄",
        supplier: "xxx"
      },
      {
        id: "L0002",
        type: "路灯",
        state: "正常",
        address: "上海市普陀区金沙江路 1511 弄",
        supplier: "xxx"
      },
      {
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },
      {
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },
      {
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },{
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },{
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },{
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },{
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },{
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },{
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },
      {
        id: "H0001",
        type: "护栏",
        state: "正常",
        address: "上海市普陀区金沙江路 1512 弄",
        supplier: "xxx"
      },
       {
        id: "C0001",
        type: "监控",
        state: "正常",
        address: "上海市普陀区金沙江路 1519 弄",
        supplier: "xxx"
      }, 
      {
        id: "C0001",
        type: "监控",
        state: "正常",
        address: "上海市普陀区金沙江路 1519 弄",
        supplier: "xxx"
      }, 
      {
        id: "C0001",
        type: "监控",
        state: "正常",
        address: "上海市普陀区金沙江路 1519 弄",
        supplier: "xxx"
      },
    ]);

    const handleClick = row => {
      console.log(row);
    };

    /*查询资源信息*/



    /*删除资源*/




    /*更新资源信息*/



    /*新增资源弹窗*/
    //新增资源表单
    const timer = ref(null);
    const loading = ref(false);
    const dialog = ref(false);
    //新增资源
    const handleClose = done => {
      if (loading.value) {
        return;
      } else if (resData.id != "") {
        root
          .$confirm("确定新增资源吗？")
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
    const cancelForm = () => {
      loading.value = false;
      dialog.value = false;
      clearTimeout(timer.value);
    };





    //表格分页
    const currentPage=ref(1);
    const handleSizeChange=((val)=>{
        console.log(`每页 ${val} 条`);
      });
    
    const handleCurrentChange=((val) =>{
        console.log(`当前页: ${val}`);
      });

    //更新类别，地址，供应商选项  
    const getSortInfo=(()=>{
        root.$store
                .dispatch("resc/get_sort_info")
                .then(response => {
                  // options_type.item=response;
                  // options_addr.item=response;
                  // options_supp.item=response;
                })
                .catch(error => {});
    })

    onMounted(()=>{
        // getSortInfo();
    })
    return {
      //reactive
      search_form,options_type,options_addr,options_supp,tableData,resData,
      //ref
      addr,type,supp,search_id,dialog,timer,loading,currentPage,
      //methods
      handleClick,handleClose,cancelForm, handleSizeChange,handleCurrentChange,getSortInfo
    };
  }
};
</script>

<style lang="scss" scoped>
</style>