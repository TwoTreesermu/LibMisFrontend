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
    <!--表格区域开始-->
    <div class="card" style="margin-bottom: 5px;height:300px">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column sortable prop="publishDate" label="出版日期"></el-table-column>
        <el-table-column prop="name" label="书名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="isbn" label="ISBN"></el-table-column>
        <el-table-column prop="publisher" label="出版社"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表格区域结束-->

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
import { ref, reactive, toRefs } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker } from 'element-plus';
import { Search } from "@element-plus/icons-vue";

// 使用 reactive 创建响应式数据对象
const state = reactive({
  search: '',
  tableData: [], // 初始为空数组
  dialogVisible: false, // 控制弹出框显示
  bookForm: { // 绑定到表单的数据
    name: '',
    author: '',
    publishDate: '',
    isbn: '',
    publisher: ''
  },
  formLabelWidth: '100px', // 表单项的 label 宽度
});

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const { search, tableData, dialogVisible, bookForm, formLabelWidth } = toRefs(state);

// 定义方法
const openAddBookDialog = () => {
  state.dialogVisible = true; // 设置对话框为可见
};

const handleEdit = (row) => {
  // 编辑图书的逻辑
};

const handleDelete = (row) => {
  // 删除图书的逻辑
  const index = state.tableData.indexOf(row);
  if (index !== -1) {
    state.tableData.splice(index, 1);
  }
};

const addBook = () => {
  // 将新图书添加到 tableData 中
  state.tableData.push({
    name: state.bookForm.name,
    author: state.bookForm.author,
    publishDate: state.bookForm.publishDate,
    isbn: state.bookForm.isbn,
    publisher: state.bookForm.publisher
  });
  // 清空表单
  resetForm();
  // 关闭弹出框
  state.dialogVisible = false;
};

const resetForm = () => {
  state.bookForm = {
    name: '',
    author: '',
    publishDate: '',
    isbn: '',
    publisher: ''
  };
};
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>