<template>
  <div>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="openAddAdminDialog">新增管理员</el-button>
    </div>

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

<script>
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElSelect, ElOption } from 'element-plus';

export default {
  name: "AdministratorManageView",
  components: {

  },
  data() {
    return {
      adminList: [], // 管理员列表数据
      adminForm: { // 新增/编辑管理员表单数据
        id: '',
        username: '',
        email: '',
        password: '',
        role: '管理员' // 默认角色为管理员
      },
      adminDialogVisible: false, // 控制新增/编辑管理员对话框显示
      formLabelWidth: '120px' // 表单项的 label 宽度
    }
  },
  methods: {
    openAddAdminDialog() {
      this.adminDialogVisible = true;
      this.adminForm = { // 重置表单
        id: '',
        username: '',
        email: '',
        password: '',
        role: 'admin'
      };
    },
    handleEdit(row) {
      this.adminForm = Object.assign({}, row); // 复制当前行数据到表单
      this.adminDialogVisible = true;
    },
    handleDelete(row) {
      // 删除管理员的逻辑
      const index = this.adminList.indexOf(row);
      if (index !== -1) {
        this.adminList.splice(index, 1);
      }
    },
    saveAdmin() {
      // 保存管理员信息的逻辑
      if (this.adminForm.id) {
        // 更新管理员信息
        const index = this.adminList.findIndex(admin => admin.id === this.adminForm.id);
        if (index !== -1) {
          this.adminList[index] = Object.assign({}, this.adminForm);
        }
      } else {
        // 添加新管理员
        this.adminList.push(Object.assign({}, this.adminForm));
      }
      this.adminDialogVisible = false;
    }
  }
}
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>