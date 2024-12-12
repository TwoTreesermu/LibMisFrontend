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
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
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
        title="新增用户"
        v-model="addUserDialogVisible"
        width="80%" height="80%"
    >
      <el-form :model="userForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="userForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user"></el-option>
            <el-option label="管理员" value="admin"></el-option>
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
import {ref, reactive, toRefs, computed} from 'vue';
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

// 使用 reactive 创建响应式数据对象
const data = reactive({
  search: '',
  addUserDialogVisible: false, // 控制新增用户对话框显示
  formLabelWidth: '120px', // 表单项的 label 宽度
  pageNum: 1,
  pageSize: 10,
  total: 47,
  tableData: [],
  userList: [], // 用户列表数据
  userForm: { // 新增用户表单数据
    id: '',
    username: '',
    email: '',
    password: '',
    role: ''
  },

});

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const {search, userList, userForm, addUserDialogVisible, formLabelWidth} = toRefs(data);

// 定义计算属性
const SearchIcon = computed(() => Search);

// 定义方法
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
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>
