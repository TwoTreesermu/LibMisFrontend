<template>
  <div>
    <!--查询栏开始-->
    <div style="margin: 10px 0" class="card">
      <el-input v-model="search" :prefix-icon="Search" placeholder="请输入管理员姓名" style="width:240px">
      </el-input>
      <el-button style="margin-left: 10px" type="primary">查询</el-button>
    </div>
    <div style="margin: 10px 0" class="card">
      <el-button type="primary" @click="openAddAdminDialog">新增</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <!--查询栏结束-->
    <!--操作栏开始-->
    <el-table :data="adminList" stripe style="width: 100%">
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

    <el-dialog
        title="新增/编辑管理员"
        v-model="adminDialogVisible"
        width="80%" height="80%">
      <el-form :model="adminForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="adminForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="adminForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="adminForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="adminDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAdmin">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElSelect, ElOption } from 'element-plus';
import {Search} from "@element-plus/icons-vue";

// 使用 reactive 创建响应式数据对象
const data = reactive({
  search: '',
  adminDialogVisible: false, // 控制新增/编辑管理员对话框显示
  formLabelWidth: '120px', // 表单项的 label 宽度
  adminList: [], // 管理员列表数据
  adminForm: { // 新增/编辑管理员表单数据
    id: '',
    username: '',
    email: '',
    password: '',
    role: '管理员' // 默认角色为管理员
  },

});

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const { adminList, adminForm, adminDialogVisible, formLabelWidth } = toRefs(data);

// 定义方法
const openAddAdminDialog = () => {
  data.adminDialogVisible = true;
  data.adminForm = { // 重置表单
    id: '',
    username: '',
    email: '',
    password: '',
    role: 'admin'
  };
};

const handleEdit = (row) => {
  data.adminForm = Object.assign({}, row); // 复制当前行数据到表单
  data.adminDialogVisible = true;
};

const handleDelete = (row) => {
  // 删除管理员的逻辑
  const index = adminList.value.indexOf(row);
  if (index !== -1) {
    adminList.value.splice(index, 1);
  }
};

const saveAdmin = () => {
  // 保存管理员信息的逻辑
  if (data.adminForm.id) {
    // 更新管理员信息
    const index = adminList.value.findIndex(admin => admin.id === data.adminForm.id);
    if (index !== -1) {
      adminList.value[index] = Object.assign({}, data.adminForm);
    }
  } else {
    // 添加新管理员
    adminList.value.push(Object.assign({}, data.adminForm));
  }
  data.adminDialogVisible = false;
};
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>