<template>
  <body id="poster">
  <div class="login_container">
    <div class="login_box">
      <!--头像区-->
      <div class="avatar_box">
        <img src="../assets/loginLogo.jpg" alt="">
      </div>
      <!--登陆表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" name="username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" name="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btn">
          <el-button type="sure" @click="login" style="margin-right: 20px">登录</el-button>
          <el-button type="reset" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </body>
</template>

<script>
  export default {
    data () {
      return {
        loginForm: {
          username: 'hz',
          password: 'hz1234'
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      login () {
        this.$refs.loginFormRef.validate((valid) => {
          if (valid) {
            const _that = this
            this.$axios.post('http://localhost:8090/user/login', {'username': this.loginForm.username, 'password': this.loginForm.password}).then(res =>{
              /* 模拟服务器响应 */
              if (res.data.code === 200) {
                console.log(res.data.msg)
                _that.$router.push('/home')
              } else {
                console.log(res.data.msg)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetLoginForm () {
        this.$refs.loginFormRef.resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>

  #poster {
    background:url("../assets/login.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }

  .login_container{
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
      height: 130px;
      width: 130px;
      border:1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .btn{
      display: flex;
      padding-right: 90px;
      justify-content: flex-end;
    }

    .login_form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 50px;
      box-sizing: border-box;
    }

    .el-button--sure.is-active,
    .el-button--sure:active {
      background: #bfd1d5;
      border-color: #9cbbc0;
      color: #fff;
    }

    .el-button--sure:focus,
    .el-button--sure:hover {
      background:  linear-gradient(to top right, #7dabb8 0%, #aecdd2 25%, #aecdd2 100%);
      border-color: #bfd1d5;
      color: #4c7885;
    }

    .el-button--sure {
      color: #FFF;
      background: linear-gradient(to top right, #4c7885 0%, #aecdd2 25%, #607d88 100%);
      border-color: #a2b4b8;
    }


    .el-button--reset.is-active,
    .el-button--reset:active {
      background: #bfd1d5;
      border-color: #9cbbc0;
      color: #fff;
    }

    .el-button--reset:focus,
    .el-button--reset:hover {
      background: #ccdee2;
      border-color: #bfd1d5;
      color: #4c7885;
    }

    .el-button--reset {
      color: #FFF;
      background-color: #aecdd2;
      border-color: #f2ffe1;
    }

  }
</style>
