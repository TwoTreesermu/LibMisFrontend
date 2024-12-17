<template>
  <div>
    <!--查询栏开始-->
    <div style="margin: 10px 0" class="card">
      <el-input v-model="search" :prefix-icon="Search" placeholder="请输入图书关键字" style="width:240px">
      </el-input>
      <el-button style="margin-left: 10px" type="primary">查询</el-button>
    </div>
    <!--查询栏结束-->
    <!--操作栏开始-->
    <div style="margin: 5px 0" class="card">
    <el-button type="primary" @click="openAddBookDialog">新增</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <!--操作栏结束-->

    <div class="card" style="margin-bottom: 5px;height:600px">
      <!--表格区域开始-->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="bookId" label="ID" sortable></el-table-column>
        <el-table-column prop="isbn" label="图书编号"></el-table-column>
        <el-table-column prop="categoryId" label="图书分类ID"></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="publisher" label="出版社"></el-table-column>
        <el-table-column prop="publishDate" label="出版时间"></el-table-column>
        <el-table-column prop="introduction" label="简介"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="coverPic" label="图书封面"></el-table-column>
        <el-table-column prop="borrowedCount" label="被借阅次数"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--表格区域结束-->
      <!--分页组件开始-->
      <div style="margin-top: 15px">
        <el-pagination
          v-model:current-page="data.pageNum"
          v-model:page-size="data.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total"/>
      </div>
      <!--分页组件结束-->
    </div>


    <!--对话框组件开始-->
    <el-dialog
        title="新增图书"
        v-model="dialogVisible"
        width="80%" height="80%"
        @close="resetForm">
      <el-form :model="bookForm">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="bookForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="bookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期"  :label-width="formLabelWidth">
          <el-date-picker v-model="bookForm.publishDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input v-model="bookForm.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="bookForm.publisher" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBook">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--对话框组件结束-->
  </div>
</template>

<script setup>
import {ref, reactive, toRefs, onMounted} from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker } from 'element-plus';
import { Search } from "@element-plus/icons-vue";
import request from "@/utils/request"



// 使用 reactive 创建响应式数据对象
const data = reactive({
  search: '',
  dialogVisible: false, // 控制弹出框显示
  formLabelWidth: '100px', // 表单项的 label 宽度
  pageNum: 1,
  pageSize: 10,
  total: 47,
  tableData: [
  ],

  bookForm: { // 绑定到表单的数据
    name: '',
    author: '',
    publishDate: '',
    isbn: '',
    publisher: ''
  },
});

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const { search, tableData, dialogVisible, bookForm, formLabelWidth } = toRefs(data);


// 显示家居信息
const list = () => {
  request.get("/api/booksList").then(res =>{
    console.log("res= ", res)
    data.tableData = res.data;
  })
}

// 设置对话框为可见
const openAddBookDialog = () => {
  data.dialogVisible = true;
};

const handleEdit = (row) => {
  // 编辑图书的逻辑
};

const handleDelete = (row) => {
  // 删除图书的逻辑
  const index = data.tableData.indexOf(row);
  if (index !== -1) {
    data.tableData.splice(index, 1);
  }
};

const addBook = () => {
  // 将新图书添加到 tableData 中
  data.tableData.push({
    name: data.bookForm.name,
    author: data.bookForm.author,
    publishDate: data.bookForm.publishDate,
    isbn: data.bookForm.isbn,
    publisher: data.bookForm.publisher
  });
  // 清空表单
  resetForm();
  // 关闭弹出框
  data.dialogVisible = false;
};

const resetForm = () => {
  data.bookForm = {
    name: '',
    author: '',
    publishDate: '',
    isbn: '',
    publisher: ''
  };
};
onMounted(list)
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>