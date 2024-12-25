<template>
  <div class="app-container">
    <!-- 个人信息部分 -->
    <div class="personal-info">
      <el-card class="info-card">
        <div class="header">
          <h2>个人信息</h2>
        </div>

        <div class="info-section">
          <div class="avatar">
            <el-upload
                class="avatar-uploader"
                action=""
                show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
            >
              <img v-if="user.avatar" :src="user.avatar" alt="头像" class="avatar-img" />
              <i v-else class="el-icon-plus avatar-icon"></i>
            </el-upload>
          </div>

          <el-form :model="user" ref="userForm" label-width="120px">
            <el-form-item label="用户名">
              <el-input v-model="user.userName" disabled></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="user.emailAdd"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="user.phoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input v-model="user.userPwd"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveChanges">保存更改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <!-- 用户借阅偏好部分 -->
    <div class="borrow-preference">
      <el-card class="info-card">
        <div class="header">
          <h2>用户借阅偏好</h2>
        </div>
        <div class="content">
          <!-- 查看借阅偏好的按钮 -->
          <el-button type="primary" @click="fetchBorrowPreferences">查看借阅偏好</el-button>

          <!-- 弹出框显示借阅偏好分析结果 -->
          <el-dialog :visible.sync="dialogVisible" title="借阅偏好分析结果">
            <div v-if="borrowPreferences.length">
              <el-list>
                <el-list-item v-for="(preference, index) in borrowPreferences" :key="index">{{ preference }}</el-list-item>
              </el-list>
            </div>
            <div v-else>
              <p>未能获取借阅偏好数据。</p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import request from '@/utils/request';
import axios from 'axios';





export default {
  data() {
    return {
      user: {
        userId: null,
        userName: '',
        phoneNumber: '',
        emailAdd: '',
        userPwd: '',
        avatar: ''
      },
      borrowPreferences: [],  // 用于存储借阅偏好分析结果
      dialogVisible: false,  // 控制显示借阅偏好分析结果的对话框
    };
  },
  created() {
    // 获取用户信息
    this.fetchUserInfo();
  },
  methods: {
    // 获取用户信息
    async fetchUserInfo() {
      try {
        // 假设userId是从某个地方获取的，可能是登录时存储在本地或者通过路由参数传递
        const userId = this.$route.params.userId || 1;  // 这里默认使用1号用户，实际中应该从登录状态或者路由参数中获取
        const response = await request.get(`/api/users/find/` + userId);
        if (response.code === '200') {
          this.user = response.data; // 成功时将返回的数据赋值给user
          console.log('用户信息', this.user); // 打印出来以确认数据
        } else {
          this.$message.error('获取用户信息失败');
        }
      } catch (error) {
        console.error('获取用户信息失败', error);
        this.$message.error('获取用户信息失败');
      }
    },


    // 更新用户信息
    async saveChanges() {
      try {
        const response = await request.put('/api/users/update', this.user);
        if (response.code === '200') {
          this.$message.success('更新成功');
        } else {
          this.$message.error('更新失败');
        }
      } catch (error) {
        console.error('更新用户信息失败', error);
        this.$message.error('更新失败');
      }
    },


    // 头像上传前检查
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isSizeLimit = file.size / 1024 / 1024 < 5; // 限制5MB
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像只能是 JPG/PNG 格式');
      }
      if (!isSizeLimit) {
        this.$message.error('上传头像大小不能超过 5MB');
      }
      return (isJPG || isPNG) && isSizeLimit;
    },

    // 头像上传成功处理
    handleAvatarSuccess(response, file) {
      this.user.avatar = URL.createObjectURL(file.raw);
      this.$message.success('头像上传成功');
    },

    // 头像上传失败处理
    handleAvatarError(error) {
      this.$message.error('头像上传失败');
    },

    // 借阅偏好分析
    async fetchBorrowPreferences() {
      // 从 localStorage 获取 token
      // const token = localStorage.getItem('token');
      // const token = 'your-temp-token-here';
      //
      // // 如果没有找到 token，提示用户未登录
      // if (!token) {
      //   this.$message.error('未找到登录凭证');
      //   return;
      // }

      try {
        // 调用借阅偏好的分析接口，传递 Authorization header
        console.log("checkPoint1.");
        const response = await axios.get('/api/users/userStaticAnalysis');

        // 如果接口返回数据，保存到 borrowPreferences 中，并显示对话框
        if (response.data) {
          console.log(response.data);
          this.borrowPreferences = response.data;
          this.dialogVisible = true;  // 打开对话框显示分析结果
        } else {
          console.log("nth happen.");
          this.$message.error('未能获取借阅偏好数据');
        }
      } catch (error) {
        console.error('Error fetching borrow preferences:', error);
        this.$message.error('获取借阅偏好数据失败');
      }
    }

  }
};

</script>

<style scoped>
/* 整体容器的布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 10px;
}

/* 个人信息部分 */
.personal-info {
  padding: 20px;
  margin-bottom: 0; /* Remove any extra margin at the bottom */
}

/* 借阅偏好部分 */
.borrow-preference {
  margin-top: 0; /* Adjust the top margin for borrow-preference */
}

/* card 样式 */
.info-card {
  max-width: 600px;
  margin: 0 auto;
}

/* 头部样式 */
.header {
  text-align: center;
  margin-bottom: 20px;
}

/* 头像部分 */
.avatar {
  text-align: center;
}

.avatar-uploader {
  display: inline-block;
}

.avatar-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar-icon {
  font-size: 28px;
  color: #ccc;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}

/* Optional: Adjust dialog padding or other spacing if needed */
.el-dialog__body {
  padding: 20px;
}
</style>
