<template>
  <div>
    <!--查询栏开始-->
    <!--<div style="margin: 10px 0" class="card">-->
    <!--  <el-input v-model="search" :prefix-icon="Search" placeholder="请输入图书关键字" style="width:240px">-->
    <!--  </el-input>-->
    <!--  <el-button style="margin-left: 10px" type="primary" @click="list" >查询</el-button>-->
    <!--</div>-->
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
      <el-table :data="data.tableData" border stripe style="width: 100%">
        <el-table-column prop="notificationId" label="通知ID"  sortable></el-table-column>
        <el-table-column prop="title" label="通知标题"></el-table-column>
        <el-table-column prop="content" label="通知内容"></el-table-column>
        <el-table-column prop="adminId" label="发布者ID"></el-table-column>
        <el-table-column prop="publishDate" label="发布时间" :formatter="formatDate"></el-table-column>
        <el-table-column prop="expireDate" label="过期时间" :formatter="formatDate"></el-table-column>
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

    <!--private int notificationId;  // 通知ID-->
    <!--private String title;  // 通知标题-->
    <!--private String content;  // 通知内容-->
    <!--private int adminId;  // 发布者ID（外键关联user表）-->
    <!--private Date publishDate;  // 发布时间-->
    <!--private Date expireDate;  // 过期时间（可为空）-->
    <!--private int status;  // 状态（1表示已发布，0表示已撤回）-->

    <!--对话框组件开始-->
    <el-dialog
        title="新增/编辑通知"
        v-model="data.dialogVisible"
        width="80%" height="80%"
        @close="resetForm" >
      <el-form :model="data.notificationForm">
        <el-form-item label="通知标题" >
          <el-input v-model="data.notificationForm.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" >
          <el-input v-model="data.notificationForm.content" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="发布者ID" >
          <el-input v-model="data.notificationForm.adminId" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="发布时间"  >
          <el-date-picker v-model="data.notificationForm.publishDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="过期时间"  >
          <el-date-picker v-model="data.notificationForm.expireDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" >
          <el-select v-model="data.notificationForm.status" placeholder="请选择状态">
            <el-option label="已撤回" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--对话框组件结束-->
  </div>
</template>

<script setup>
import {
  ElButton,
  ElDatePicker,
  ElDialog,
  ElFormItem,
  ElInput, ElMessage,
  ElOption,
  ElSelect,
  ElTable,
  ElTableColumn
} from "element-plus";
import {onMounted, reactive} from "vue";
import request from "@/utils/request";

//  ----------------------------- data -----------------------------
// 使用 reactive 创建响应式数据对象
const data = reactive({
  dialogVisible: false, // 控制弹出框显示
  currentPage: 1,
  pageSize: 5,
  total: 10,
  tableData: [], // 表格数据
  notificationForm: { // 绑定到表单的数据

  }


})

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

// 设置对话框为可见
const openAddBookDialog = () => {
  data.dialogVisible = true;
};
// 显示通知信息
const list = () => {
  console.log("刷新列表发送请求前...")
  // 查询、检索, 分页显示图书信息
  request.get("/api/notification/BySearchPage", {
    params: {
      type: "notification",   // 分页组件类型: book person
      pageNum: data.currentPage,
      pageSize: data.pageSize,
    }
  }).then(res => {
    console.log("notificationlist.res--", res)
    // 绑定tableData, 显示在表格
    console.log("res.data", res.data);
    console.log("res.data.total = ", res.data.total)
    data.tableData = res.data.records
    data.total = res.data.total;
  })
}

// 编辑图书信息
const handleEdit = (row) => {
  console.log("handleEdit, row = ", row.notificationId);
  // 根据id到数据库查找数据
  request.get("/api/notification/find/" + row.notificationId).then(  // 找到就进行修改
      res => {
        // console.log("handleEdit.res = ", res)
        if (res.code === "200") {
          data.notificationForm = res.data;
          data.dialogVisible = true;
        }
      }
  )
};

// 删除图书
const handleDelete = (row) => {
  // console.log("row = ", row.notificationId);
  request.delete("/api/notification/del/" + row.notificationId).then(
      res =>{
        if (res.code === "200") {
          ElMessage({
            type:"success",
            message:"删除成功"
          })
        } else {
          ElMessage({
            type: "error",
            message:res.msg
          })
        }
        // 刷新列表
        list();
      })
};

const save = () => {
  // alert("确认按钮")
  if (data.notificationForm.notificationId) {  // 修改通知
    // alert("修改成功~~")
    request.put("/api/notification/update", data.notificationForm).then(
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
  } else {  // 添加通知
    // alert("添加成功~~");
    request.post("/api/notification/save", data.notificationForm).then(
        res => {
          console.log("res=", res)
          if (res.code === "200") {
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
        }
    )
  }
};

// 清空表单
const resetForm = () => {
  data.notificationForm = {};
};

onMounted(list)
</script>

<style scoped>

</style>