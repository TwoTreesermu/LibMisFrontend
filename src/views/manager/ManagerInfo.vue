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


  </div>
</template>

<script>
import request from '@/utils/request';
import UserHeader from "@/components/UserHeader.vue";
import Footer from "@/components/Footer.vue";

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
    }
  }
};

</script>

<style scoped>
/* 整体容器的布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 页面高度至少占满视口 */
}

/* 个人信息部分 */
.personal-info {
  flex: 1; /* 使内容部分占据剩余空间 */
  padding: 20px;
}

.info-card {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

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

/* 页脚样式：固定在页面底部 */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}
</style>
