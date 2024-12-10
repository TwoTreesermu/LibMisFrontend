<template>
  <div>
    <!--<el-button @click="dialogVisible = true">测试对话框</el-button>-->
    <!--<el-dialog-->
    <!--    title="测试"-->
    <!--    v-model="dialogVisible"-->
    <!--    width="30%">-->
    <!--  <p>这是一个测试对话框。</p>-->
    <!--  <span slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="dialogVisible = false">关闭</el-button>-->
    <!--  </span>-->
    <!--</el-dialog>-->

    <div style="margin: 10px 0">
      <el-button type="primary" @click="openAddBookDialog">新增图书</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入图书关键字" style="width:30%">
      </el-input>
      <el-button style="margin-left: 10px" type="primary">查询</el-button>
    </div>

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

    <!-- Element Plus 的对话框组件 -->
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
  </div>
</template>

<script>
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker } from 'element-plus';

export default {
  name: 'BookManageView',
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElTable,
    ElTableColumn,
    ElDatePicker
  },
  data() {
    return {
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
    }
  },
  methods: {
    openAddBookDialog() {
      this.dialogVisible = true; // 设置对话框为可见
    },
    handleEdit(row) {
      // 编辑图书的逻辑
    },
    handleDelete(row) {
      // 删除图书的逻辑
      const index = this.tableData.indexOf(row);
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }
    },
    addBook() {
      // 将新图书添加到 tableData 中
      this.tableData.push({
        name: this.bookForm.name,
        author: this.bookForm.author,
        publishDate: this.bookForm.publishDate,
        isbn: this.bookForm.isbn,
        publisher: this.bookForm.publisher
      });
      // 清空表单
      this.resetForm();
      // 关闭弹出框
      this.dialogVisible = false;
    },
    resetForm() {
      this.bookForm = {
        name: '',
        author: '',
        publishDate: '',
        isbn: '',
        publisher: ''
      };
    }
  }
}
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>