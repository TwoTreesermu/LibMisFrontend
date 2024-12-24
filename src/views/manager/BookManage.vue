<template>
  <div>
    <!--查询栏开始-->
    <div style="margin: 10px 0" class="card">
      <el-input v-model="search" :prefix-icon="Search" placeholder="请输入图书关键字" style="width:240px">
      </el-input>
      <el-button style="margin-left: 10px" type="primary" @click="list" >查询</el-button>
    </div>
    <!--查询栏结束-->
    <!--操作栏开始-->
    <div style="margin: 10px 0"  class="card">
      <el-button type="primary" @click="openAddBookDialog">新增</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <!--操作栏结束-->

    <div class="card" style="margin-bottom: 5px;">
      <!--表格区域开始-->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="bookId" label="ID"  sortable></el-table-column>
        <el-table-column prop="isbn" label="ISBN"></el-table-column>
        <el-table-column prop="categoryId" label="图书类别ID"></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="publisher" label="出版社"></el-table-column>
        <el-table-column prop="publishDate" label="出版时间" :formatter="formatDate"></el-table-column>
        <el-table-column prop="introduction" label="简介"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="coverPic" label="图书封面"></el-table-column>
        <el-table-column prop="borrowedCount" label="被借阅次数"></el-table-column>
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
      <!--分页组件开始-->
      <div style="margin-top: 15px">
        <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
            :current-page="data.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="data.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total"/>
      </div>
      <!--分页组件结束-->
    </div>


    <!--对话框组件开始-->
    <el-dialog
        title="新增/编辑图书"
        v-model="dialogVisible"
        width="80%" height="80%"
        @close="resetForm" >
      <el-form ref="formRef" :model="bookForm" :rules="data.rules" >
        <el-form-item label="ISBN" >
          <el-input v-model="bookForm.isbn" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="图书类别ID" >
          <el-input v-model="bookForm.categoryId" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="书 名" >
          <el-input v-model="bookForm.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="作 者" >
          <el-input v-model="bookForm.author" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="出版社" >
          <el-input v-model="bookForm.publisher" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="出版日期"  >
          <el-date-picker v-model="bookForm.publishDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="简 介">
          <el-input
              v-model="bookForm.introduction" style="width: 80%" :rows="5" type="textarea"/>
        </el-form-item>
        <el-form-item label="价 格" >
          <el-input v-model="bookForm.price" style="width: 50px"></el-input>
        </el-form-item>
        <el-form-item label="图书封面" >
          <el-input v-model="bookForm.coverPic" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="被借阅次数" >
          <el-input v-model="bookForm.borrowedCount" style="width: 50px"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--对话框组件结束-->
  </div>
</template>

<script setup>
import {ref, reactive, toRefs, onMounted} from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker, ElMessage } from 'element-plus';

import { Search } from "@element-plus/icons-vue";
import request from "@/utils/request"



//  ----------------------------- data -----------------------------
// 使用 reactive 创建响应式数据对象
const data = reactive({
  search: '',
  dialogVisible: false, // 控制弹出框显示
  currentPage: 1,
  pageSize: 5,
  total: 10,
  tableData: [], // 表格数据
  rules: { // 表格校验规则
    isbn: [
      {required: true,message:"请填写ISBN",trigger:"blur"}
    ],
    categoryId: [
      {required:true, message: "请填写图书类别ID",trigger:"blur"}
    ],
    title: [
      {required:true, message: "请填写书名",trigger:"blur"}
    ],
    author: [
      {required:true, message: "请填写图书作者",trigger:"blur"}
    ],
    publisher: [
      {required:true, message: "请填写出版社",trigger:"blur"}
    ],
    publishDate: [
      {required:true, message: "请填写出版日期",trigger:"blur"}
    ],
    introduction: [
      {required:true, message: "请填写图书简介",trigger:"blur"}
    ],
    price:[
      {required: true, message: "请填写价格", trigger:"blur"},
      {pattern: /^(([1-9]\d*)|(0))|(\.\d+)?$/, message: "请输入数字", trigger: "blur"}
    ],
    borrowedCount: [
      {required:true, message:"请填写被借阅次数", trigger:"blur"},
      {pattern:/^(([1-9]\d*)|(0))$/, message:"请输入数字", trigger:"blur"}
    ],
  },
  bookForm: {  // 绑定到表单的数据
    // isbn: '',
    // categoryId: '',
    // title:'',
    // author: '',
    // publisher: '',
    // publishDate: '',
    // introduction: '',
    // price: '',
    // coverPic: '',
    // borrowedCount: ''
  },
});

const formRef = ref()

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const { search, tableData, dialogVisible, bookForm, rules } = toRefs(data);

//  ----------------------------- method -----------------------------
// 响应 每页显示记录数 的变化
const handlePageSizeChange  = (pageSize) => {
  // console.log("pageSize---", pageSize)
  data.pageSize = pageSize;
  list();
}

const handleCurrentChange = (pageNum) => {  // pageNum 跳转页数
  // console.log("pageNum---", pageNum)
  data.currentPage = pageNum;
  list();
}

const formatDate = (row, column, value) => {
  if (!value) return '';

  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

// 显示图书信息
const list = () => {
  console.log("刷新列表发送请求前...")
  // request.get("/api/books/booksList").then(res =>{
  //   console.log("res= ", res)
  //   data.tableData = res.data;
  // })

  // 分页查询
  // console.log("data.currentPage = ", data.currentPage);
  // console.log("data.pageSize = ", data.pageSize);
  // request.get("/api/books/booksByPage",{
  //   params: {
  //     pageNum: data.currentPage,
  //     pageSize: data.pageSize
  //   }
  // }).then(res => {
  //   //绑定tableData, 显示在表格
  //   console.log("返回的res=", res);
  //   console.log("res.data", res.data);
  //   data.tableData = res.data.records;
  //   console.log("res.data.total = ", res.data.total)
  //   data.total = res.data.total;
  // })

  // 查询、检索, 分页显示图书信息
  request.get("/api/books/BySearchPage", {
    params: {
      type: "book",   // 分页组件类型: book person
      pageNum: data.currentPage,
      pageSize: data.pageSize,
      search: data.search
    }
  }).then(res => {
    console.log("list.res--", res)
    // 绑定tableData, 显示在表格
    data.tableData = res.data.records
    data.total = res.data.total;

    // console.log("res.data", res.data);
    // console.log("res.data.total = ", res.data.total)
  })
}

// 设置对话框为可见
const openAddBookDialog = () => {
  data.dialogVisible = true;
};

// 编辑图书信息
const handleEdit = (row) => {
    // console.log("handleEdit, row = ", row.bookId);
    // 根据id到数据库查找数据
    request.get("/api/books/find/" + row.bookId).then(  // 找到就进行修改
        res => {
          // console.log("handleEdit.res = ", res)
          if (res.code == 200) {
            data.bookForm = res.data;
            data.dialogVisible = true;
          }
        }
    )
};

// 删除图书
const handleDelete = (row) => {
  console.log("row = ", row.bookId);
  request.delete("/api/books/del/" + row.bookId).then(
      res =>{
        console.log("res.delete = ", res);
        console.log("res.code =", res.code);
        if (res.code == 200) {
          console.log("hello01")
          ElMessage({
            type:"success",
            message:"删除成功"
          })
        } else {
          console.log("hello02~~")
          ElMessage({
            type: "error",
            message:res.msg
          })
        }
        // 刷新列表
        list();
  })
};

// 将新图书添加到 tableData 中
// 或者编辑图书
const save = () => {
  if (data.bookForm.bookId) {  // 修改图书信息
    // alert("修改成功~~")
    request.put("/api/books/update", data.bookForm).then(
        res => {
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
  } else {  // 添加图书信息
    // alert("添加成功~~");
    formRef.value.validate((valid) => {
      if (valid) {
        // alert("通过验证");
        request.post("/api/books/save", data.bookForm).then(
            res => {
              console.log("res=", res)
              if (res.code == 200) {
                ElMessage({
                  type: "success",
                  message: "添加成功!"
                })
              } else {
                ElMessage({
                  type: "error",
                  message: "更新失败"
                })
              }
              resetForm(); // 清空表单
              data.dialogVisible = false; // 关闭弹出框
              list();  // 刷新列表
            }
        )
      } else {
        ElMessage({ // 弹出更新失败信息
          type: "error",
          message:"验证失败，不提交"
        })
        return false
      }
    })

  }
};

// 清空表单
const resetForm = () => {
  data.bookForm = {};
};

onMounted(list)

</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>