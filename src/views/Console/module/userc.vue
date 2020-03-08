<template>
    <div id="userc">
        <el-table :data="tableData" border style="width: 100%" max-height="430" @selection-change="handleSelectionChange"> 
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="编号" width="160"></el-table-column>
            <el-table-column prop="type" label="类型" width="120"></el-table-column>
            <el-table-column prop="state" label="状态" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" width="320"></el-table-column>
            <el-table-column prop="supplier" label="供应商" width="240"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="deleteRes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
    name:'userc',
    setup(){
        //表格数据
        const tableData = reactive([]);
        //表格中多选框记录
        const multipleSelection=reactive([]);
        const handleSelectionChange=(val) =>{
            multipleSelection.values = val;
      }
      return {
          //reactive
          tableData,multipleSelection,
          //methods
          handleSelectionChange
      }
    }
}
</script>

<style lang="scss" scoped>

</style>