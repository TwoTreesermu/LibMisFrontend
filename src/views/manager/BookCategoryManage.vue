<template>
  <div>
    <!--操作栏开始-->
    <div style="margin: 10px 0"  class="card">
      <el-button type="primary" @click="openAddBookDialog">新增</el-button>
    </div>
    <!--操作栏结束-->
    <div class="card" style="margin-bottom: 5px;">
      <!--表格区域开始-->
      <el-table :data="data.tableData" border style="width: 50%; margin: auto;">
        <el-table-column prop="categoryId" label="类别ID"  sortable></el-table-column>
        <el-table-column prop="categoryName" label="类型"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-popconfirm
                title="确定删除吗？" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button size="mini" type="text">删除</el-button>
              </template>
            </el-popconfirm>
             </template>
        </el-table-column>
      </el-table>
      <!--表格区域结束-->
    </div>

    <!--对话框组件开始-->
    <el-dialog title="新增/编辑图书类别"
               v-model="data.dialogVisible"
               width="500px" height="80%"
               @close="resetForm" >
      <el-form :model="data.bookCategoryForm">
        <!--<el-form-item label="类别ID" >-->
        <!--  <el-input v-model="data.bookCategoryForm.categoryId" style="width: 80%"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="类 型" >
          <el-input v-model="data.bookCategoryForm.categoryName" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--对话框组件结束-->

  </div>

</template>

<script setup>

import {ElButton, ElDialog, ElFormItem, ElInput, ElMessage, ElTableColumn} from "element-plus";
import {onMounted, reactive} from "vue";
import request from "@/utils/request";



//  ----------------------------- data -----------------------------
const data = reactive({
  dialogVisible: false, // 控制弹出框显示
  tableData:[
    // {categoryId: 1, categoryName:"小说"},
    // {categoryId: 2, categoryName:"文学"},
  ],
  bookCategoryForm:{},


})

//  ----------------------------- method -----------------------------
// 设置对话框为可见
const openAddBookDialog = () => {
  data.dialogVisible = true;
};

// 显示图书分类信息
const list = () => {
  // alert("刷新列表发送请求前...")
  request.get("/api/bookCategory/categoryList").then(res =>{
    console.log("res= ", res)
    data.tableData = res.data;
  })
}

// 将新的图书类别添加到 tableData 中
// 或者编辑图书类别
const save = () => {
  if (data.bookCategoryForm.categoryId) {  // 修改图书分类信息
    // alert("修改成功~~")
    request.put("/api/bookCategory/update", data.bookCategoryForm).then(
        res => {
          console.log("res=", res);
          if (res.code === "200") {
            // 提示成功
            ElMessage({
              type: "success",
              message: "编辑成功"
            })
          } else {
            // 提示失败
            ElMessage({
              type: "error",
              // message: res.msg
              message: "编辑失败"
            })
          }
          resetForm(); // 清空表单
          data.dialogVisible = false; // 关闭弹出框
          list(); // 刷新列表
        }
    )
  } else {  // 添加图书分类信息
    // alert("添加成功~~");
    request.post("/api/bookCategory/save", data.bookCategoryForm).then(
        res => {
          // console.log("res=", res)
          if (res.code == 200) {
            ElMessage({
              type: "success",
              message: "添加成功!"
            })
          } else {
            ElMessage({
              type: "error",
              message: "添加失败"
            })
          }
          resetForm(); // 清空表单
          data.dialogVisible = false; // 关闭弹出框
          list();  // 刷新列表
        })
  }
}


// 编辑图书分类信息
const handleEdit = (row) => {
  // alert("编辑按钮");
  // alert("handleEdit, row = " + row.categoryId);
  // 根据id到数据库查找数据
  request.get("/api/bookCategory/find/" + row.categoryId).then(  // 找到就进行修改
      res => {
        // console.log("handleEdit.res = ", res)
        if (res.code == 200) {
          data.bookCategoryForm = res.data;
          data.dialogVisible = true;
        }
      }
  )
};

// 删除图书类别
const handleDelete = (row) => {
  // alert("删除按钮")
  // console.log("row = ", row.bookId);
  request.delete("/api/bookCategory/del/" + row.categoryId).then(
      res =>{
        // console.log("res.delete = ", res);
        // console.log("res.code =", res.code);
        if (res.code === "200") {
          console.log("hello01")
          ElMessage({
            type:"success",
            message:"删除成功"
          })
        } else {
          console.log("hello02~~")
          ElMessage({
            type: "error",
            // message:res.msg
            message: "删除失败"
          })
        }
        // 刷新列表
        list();
      })
  };

// 清空表单
const resetForm = () => {
  data.bookCategoryForm = {};
};

onMounted(list)

</script>

<style scoped>

</style>