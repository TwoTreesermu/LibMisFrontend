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
        <el-table-column prop="isbn" label="ISBN"></el-table-column>
        <el-table-column prop="categoryId" label="图书类别ID"></el-table-column>
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
            <el-popconfirm
                title="确定删除吗？" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button size="mini" type="text">删除</el-button>
              </template>
            </el-popconfirm>
            <!--<el-button @click="handleDelete(scope.row.id)" type="text">删除</el-button>-->
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
        @close="resetForm">
      <el-form :model="bookForm">
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
          <!--<el-textarea v-model="bookForm.introduction" style="width: 80%" :rows="4"></el-textarea>-->
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
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker } from 'element-plus';
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

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const { search, tableData, dialogVisible, bookForm, } = toRefs(data);

//  ----------------------------- method -----------------------------
// 响应页数变化
const handlePageSizeChange  = (pageSize) => {
  data.pageSize = pageSize;
  list();
}

const handleCurrentChange = (pageNum) => {
  data.currentPage = pageNum;
  list();
}

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

// 编辑图书信息
const handleEdit = (row) => {
    console.log("handleEdit, row = ", row.bookId);
    // 根据id到数据库查找数据

  // request.get("/api/find/" + row.id).then(  // 找到就进行修改
  //     res => {
  //       if (res.code == 200) {
  //         console.log("res.data = ",res.data);
  //         data.tableData = res.data;
  //         data.dialogVisible = true;
  //       }
  //     }
  // )
};

// 删除图书
const handleDelete = (row) => {
  console.log("row = ", row.bookId);
  // request.delete("/api/del/" + row.bookId).then(
  //     res =>{
  //   if (res.code === 200) {
  //     this.$message({
  //       type:"success",
  //       message:"删除成功"
  //     })
  //   } else {
  //     this.$message({
  //       type: "error",
  //       message:res.msg
  //     })
  //
  //   }
  //   // 刷新列表
  //   list();
  // })
};

// 将新图书添加到 tableData 中
// 或者编辑图书
const save = () => {
  if (data.bookForm.bookId) {  // 修改图书信息
    alert("修改成功~~")
    // request.put("/api/update", data.bookForm).then(
    //     res => {
    //       if (res.code === "200") {
    //         // 提示成功
    //         this.$message({
    //           type: "success",
    //           message: "更新成功"
    //         })
    //       } else {
    //         this.$message({
    //           type: "error",
    //           // message: res.msg
    //           message: "更新失败"
    //         })
    //       }
    //       // 清空表单
    //       resetForm();
    //       // 关闭弹出框
    //       data.dialogVisible = false;
    //       // 刷新列表
    //       list();
    //     }
    // )
  } else {  // 添加图书信息
    alert("添加成功~~");
    // 清空表单

    // request.post("/api/save", data.bookForm).then(
    //     res => {
    //       console.log("res=", res)
    //
    //       // 清空表单
    //       resetForm();
    //       // 关闭弹出框
    //       data.dialogVisible = false;
    //       // 刷新列表
    //       list();
    //     }
    // )
  }
  // 测试代码开始
  resetForm();
  // 关闭弹出框
  data.dialogVisible = false;
  // 刷新列表
  list();
  //测试代码结束
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