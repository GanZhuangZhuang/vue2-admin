<template>
  <div class="login-container">
    <h1>智慧服务平台</h1>
    <div class="login-form">
      <h2>欢迎登录</h2>
      <el-form ref="form" :rules="rules" :model="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入账号"
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model.trim="loginForm.password"
            show-password
            placeholder="请输入密码"
            suffix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="verify">
            <el-input
              v-model.trim="loginForm.code"
              placeholder="请输入验证码"
            ></el-input>
            <el-image
              @click.stop="handleCodeRefresh"
              :src="codeImageUrl"
            ></el-image>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button-from"
            :loading="loadingStatus"
            @click="handleVerifyForm"
            type="danger"
            >{{ loadingStatus ? '登录中...' : '立即登录' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import UserApi from '@/api/user.js'
import rules from './rules'
import { mapActions } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      // loding加载状态
      loadingStatus: false,
      // 验证码路径
      codeImageUrl: '',
      // 表单验证数据
      loginForm: {
        username: 'duck',
        password: 'admin888',
        code: '',
        token: ''
      },
      // 表单验证
      rules: rules
    }
  },
  created() {
    this.handleGetCaptcha()
  },
  methods: {
    /**
     * 0调用接口获取登录验证码
     */
    async handleGetCaptcha() {
      const { captchaImg, token } = await UserApi.getCaptcha()

      this.codeImageUrl = captchaImg
      this.loginForm.token = token
    },
    /**
     * 登录验证
     */
    handleVerifyForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleSubmitLogin()
        }
      })
    },
    /**
     * 验证码点击刷新
     */
    handleCodeRefresh() {
      this.loginForm.code = ''
      this.handleGetCaptcha()
    },
    /**
     * 登录提交
     */
    async handleSubmitLogin() {
      try {
        const token = await this.$store.dispatch('user/login', this.loginForm)
        // const token = await this.login(this.loginForm)
        if (!token) return
        this.$notify({ title: '提示', message: '登录成功', type: 'success' })
        this.loadingStatus = true
        await this.$router.push('/layout')
      } catch (e) {
        console.log(e)
      }
      this.loadingStatus = false

      // this.$store.dispatch
    },
    /**
     * vuex的登录
     */
    ...mapActions({
      login: 'user/login'
    })
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: Verdana;
  background-size: cover;
  background: url('../../assets/images/bg.jpg') no-repeat fixed center;
}
.el-image {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.verify {
  width: 100%;
  display: flex;
  align-items: center;
}
.login-form {
  // 居中
  margin: 10% auto 13%;
  width: 25%;
}
h1 {
  text-align: center;
  font-size: 42px;
  margin-top: 50px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 5px;
}
h2 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px;
}
.button-from {
  width: 100%;
  border-radius: 5px;
  background: #66b1ff;
  border: 1px solid #66b1ff;
}
</style>
