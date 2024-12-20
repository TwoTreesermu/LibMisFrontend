<template>
  <div>
    <!--查询栏开始-->
    <div style="margin: 10px 0" class="card">
      <el-input v-model="search" :prefix-icon="Search" placeholder="请输入用户名" style="width:240px">
      </el-input>
      <el-button style="margin-left: 10px" type="primary">查询</el-button>
    </div>
    <!--查询栏结束-->
    <!--操作栏开始-->
    <div style="margin: 10px 0"  class="card">
      <el-button type="primary" @click="openAddUserDialog">新增</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <!--操作栏结束-->
    <div  class="card" style="margin-bottom: 5px;height:600px">
      <!--表格区域开始-->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="userId" label="ID"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话号码"></el-table-column>
      <el-table-column prop="emailAdd" label="电子邮件地址"></el-table-column>
      <el-table-column prop="userPwd" label="用户密码"></el-table-column>
      <el-table-column prop="portrait" label="用户头像"></el-table-column>
      <el-table-column prop="role" label="用户角色"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
        title="新增/编辑用户"
        v-model="addUserDialogVisible"
        width="80%" height="80%"
        @close="resetForm"
    >
      <el-form :model="userForm">
        <!--private int userId;  // 用户ID-->
        <!--private String userName;  // 用户名-->
        <!--private String phoneNumber;  // 电话号码-->
        <!--private String emailAdd;  // 电子邮件地址-->
        <!--private String userPwd;  // 用户密码-->
        <!--private String portrait;  // 用户头像-->
        <!--private int role;  // 用户角色：1表示管理员，0表示普通用户-->

        <el-form-item label="用户名" >
          <el-input v-model="userForm.userName" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" >
          <el-input v-model="userForm.phoneNumber" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" >
          <el-input v-model="userForm.emailAdd" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" >
          <el-input v-model="userForm.userPwd" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" >
          <el-input v-model="userForm.portrait" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="用户角色" style="width: 80%">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addUser">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, reactive, toRefs, computed, onMounted} from 'vue';
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption
} from 'element-plus';
import {Search} from '@element-plus/icons-vue';
import request from "@/utils/request";



//  ----------------------------- data -----------------------------
// 使用 reactive 创建响应式数据对象
const data = reactive({
  search: '',
  addUserDialogVisible: false, // 控制新增用户对话框显示
  formLabelWidth: '120px', // 表单项的 label 宽度
  currentPage: 1,
  pageSize: 5,
  total: 10,
  tableData: [],// 用户列表数据
  userForm: { // 绑定到表单的数据
  },

});

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const {search, userForm, addUserDialogVisible, formLabelWidth, tableData} = toRefs(data);

//  ----------------------------- method -----------------------------

const list = () => {
  console.log("刷新列表发送请求前");
  // 查询、检索, 分页显示图书信息
  request.get("/api/users/BySearchPage", {
    params: {
      type: "person",   // 分页组件类型: book person
      pageNum: data.currentPage,
      pageSize: data.pageSize,
      search: data.search
    }
  }).then(res => {
    console.log("res", res)
    // 绑定tableData, 显示在表格
    data.tableData = res.data.records
    data.total = res.data.total;
  })
}

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

// 设置对话框为可见
const openAddUserDialog = () => {
  data.addUserDialogVisible = true;
};

const handleEdit = (row) => {
  // 编辑用户的逻辑
};

const handleDelete = (row) => {
  // 删除用户的逻辑
};

const addUser = () => {
  // 添加用户的逻辑
  data.addUserDialogVisible = false;
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
