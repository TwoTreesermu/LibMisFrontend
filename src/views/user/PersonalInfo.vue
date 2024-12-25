<template>
  <div class="app-container">
    <!-- 用户头部 -->
    <UserHeader />

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
              <el-input v-model="user.username" disabled></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="user.phone"></el-input>
            </el-form-item>

            <el-form-item label="地址">
              <el-input v-model="user.address"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveChanges">保存更改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <!-- 页脚，固定在页面底部 -->
    <Footer />
  </div>
</template>

<script>
import UserHeader from "@/components/UserHeader.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: { Footer, UserHeader },
  data() {
    return {
      user: {
        avatar: '', // 用户头像
        username: '张三', // 用户名
        email: 'zhangsan@example.com', // 邮箱
        phone: '13800000000', // 电话
        address: '北京市朝阳区' // 地址
      }
    };
  },
  methods: {
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('只能上传图片文件');
      }
      return isImage;
    },
    handleAvatarSuccess(response, file) {
      // 头像上传成功后的逻辑，可以根据返回的 response 更新头像
      this.user.avatar = URL.createObjectURL(file.raw);
    },
    handleAvatarError() {
      this.$message.error('头像上传失败');
    },
    saveChanges() {
      // 在这里处理保存更改的逻辑（例如通过 API 保存）
      this.$message.success('个人信息已保存');
      console.log('保存的用户信息：', this.user);
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
