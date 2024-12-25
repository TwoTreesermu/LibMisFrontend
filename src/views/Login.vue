<template>
<div class="login-container">
  <div class="login-box">
    <div style="padding:50px 30px; background-color:white; margin-left: 180px; margin-top: -60px;
                border-radius:5px; box-shadow: 0 0 10px rgba(0, 0, 0, .2);" >
      <el-form ref="formRef" :rules="data.rules" :model="data.form" style="width:300px">
        <div style="margin-bottom: 30px; font-size: 24px;text-align: center; color: #0742b1;font-weight: bold">欢迎登录图书管理系统</div>
        <el-form-item prop="username">
          <el-input size="large" v-model="data.form.username"
                    placeholder="请输入账号" prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password size="large" v-model="data.form.password"
                    placeholder="请输入密码" prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="data.form.role" placeholder="请选择角色">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div style="margin-bottom: 20px">
          <el-button @click="login" size="large" style="width: 100%" type="primary">登录</el-button>
        </div>
        <div style="text-align: right">还没有账号？请<a style="color: #0742b1;text-decoration: none" href="/register">注册</a> </div>
      </el-form>
    </div>
  </div>
</div>
</template>

<script setup>
import router from "@/router";
import {reactive, ref} from "vue";
import {ElMessage, ElOption, ElSelect} from "element-plus";

const componentName ="Login"
const data = reactive({
  form: {},
  rules :{
    username: [
      { required: true, message: "请输入账号", trigger: "blur" }
    ],
    password :[
      {required: true, message: "请输入密码", trigger: "blur"}
    ]
  }
})

const formRef = ref()
const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (data.form.role == 0) { // 普通用户
        // request.post("/login", data.form).then((res) => {
        //   if (res.data.code == 200) { // 登录成功
        //    在这写代码
        //   } else{
        //     ElMessage.error(res.msg)
        //   }
        // })
        ElMessage.success("登录成功")
        // 改 data.form --> res.tata
        localStorage.setItem('userdata', JSON.stringify(data.form)) // 把json对象转换成json字符串

        setTimeout(() => {
          location.href = "/user"
        }, 500)
        // 储存后台返回的用户数据信息
      } else if (data.form.role == 1) {  // 管理员
        ElMessage.success("登录成功")
        localStorage.setItem('userdata', JSON.stringify(data.form)) // 把json对象转换成json字符串

        setTimeout(() => {
          location.href = "/manager"
        }, 500)
        // 储存后台返回的用户数据信息
      }

     }
  })
}
</script>



<style>
.login-container {
  height: 100vh;
  overflow:hidden;
  background-image: url("@/assets/login_bg.jpg");
  background-size:cover;
  background-position: 0 0;
}
.login-box{
  display:flex;
  align-items: center;
  width:50%;
  height:100%;
  right: 0;
  position: absolute;
}
</style>