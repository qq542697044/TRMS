<template>
  <div id="resc-mobile">
    <ul class="infinite-list" v-infinite-scroll="load"  style="overflow:auto" infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in resData.item" :key="item.id">
        <div class="float-left card-box">
          <el-card :body-style="{ padding: '0px',width:'250px',border:'solid 1px #f0f0f0'}" shadow="hover">
            <div style="padding: 14px;">
                <h3>资源{{index+1}}</h3>
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
                    <span>{{ item.state }}</span>
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
                <el-button type="text" class="button">编辑</el-button>
                <el-button type="text" class="button">删除</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </li>
    </ul>
    <p class="center" v-if="pageControl.loading">加载中...</p>
    <p class="center" v-if="pageControl.error">加载失败</p>
    <p class="center" v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
import { ref, onMounted, reactive, computed } from "@vue/composition-api";
export default {
  name: "resc-mobile",
  setup(props, { root }) {
    const resData = reactive({
      item: []
    });
    //分类查询
    const search_form = reactive({
      type: "",
      addr: "",
      supplier: "",
      id: ""
    });
    //无限滑动窗口
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(1);
    const pageControl = reactive({
      count: 0,
      loading: false,
      error:false,
    });
    const noMore = computed(() => pageControl.count >= total.value);

    const disabled=computed(() => pageControl.loading || noMore.value);
    const load = () => {
      pageControl.loading = true;
      currentPage.value+=1;
      queryRes();
      setTimeout(() => {
        
      }, 2000);
    };
    //查询
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
          total.value = response.data.data.total;
          pageControl.count += pageSize.value;
          pageControl.loading = false;
          pageControl.error=false;
          console.log(noMore.value)
          console.log(disabled.value)
        })
        .catch(error => {
          pageControl.loading = false;
          pageControl.error=true;
        });
    };

    onMounted(() => {
    });
    return {
      noMore,
      disabled,
      //ref
      //reactive
      resData,
      pageControl,
      //methods
      load
    };
  }
};
</script>
<style lang="scss" scoped>
.card-box {
  margin: 5px;
}
.center{
    text-align: center;
}
</style>