<template  >
  <div class="login-warp">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div style="text-align: center">
          <el-image style="width: 35%; height: 35%" :src="logo_url" :fit="'fill'"></el-image>
        </div>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    clearable
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
            <span slot="prefix">
              <i class="el-icon-user-solid"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    clearable
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
            <span slot="prefix">
              <i class="el-icon-lock"></i>
            </span>
            <span slot="suffix" @click="showPwd">
              <i class="el-icon-view"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row :span="24">
            <el-col :span="13">
              <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" size=""
                        ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="login-code" width="100%" @click="refreshCode">
                <!--验证码组件-->
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 90%" type="primary" :plain="true" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  // import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  // import login_center_bg from '@/assets/images/login_center_bg.png';
  import url from "@/assets/images/meigang.png";
  import SIdentify from '@/components/login/SIdentify'
  export default {
    name: 'login',
    components: { SIdentify },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          code:''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
        },
        loading: false,
        pwdType: 'password',
        dialogVisible:false,
        logo_url:url,
        identifyCode:'',
        identifyCodes:'1234567890abcdefjhijklinopqrsduvwxyz'
      }
    },
    created() {
      // this.loginForm.username = getCookie("username");
      // this.loginForm.password = getCookie("password");
      // if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
      //   this.loginForm.username = 'admin';
      // }
      // if(this.loginForm.password === undefined||this.loginForm.password==null){
      //   this.loginForm.password = '';
      // }
      // 初始化验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        if (this.loginForm.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.$message.error('请填写正确验证码')
          this.refreshCode()
          return
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/login', {accountNumber:this.loginForm.username,password:this.loginForm.password}).then((result) => {
                console.log(result.data);
                if(result.data.errorCode == 200){
                  this.loading = false;
                  localStorage.setItem('token',result.data.token);
                  localStorage.setItem('staffName',result.data.staffName);
                  localStorage.setItem('url',result.data.profilePath);
                  this.$router.push({name:'home'});
                  this.$message.success(result.data.errorMessage);
                }else if(result.data.errorCode == 10010){
                  this.$message.warning(result.data.errorMessage);
                  this.loginForm.username = '';
                  this.loginForm.password = '';
                  this.$router.push({name:'login'});
                  this.loading = false;  
                }else if(result.data.errorCode == 20011){
                  this.$message.warning(result.data.errorMessage);
                  this.loginForm.username = '';
                  this.loginForm.password = '';
                  this.loading = false;  
                }
              }).catch((result) => {
                this.loading = false
              });
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      handleTry(){
        this.dialogVisible =true
      },
      dialogConfirm(){
        this.dialogVisible =false;
        setSupport(true);
      },
      dialogCancel(){
        this.dialogVisible = false;
        setSupport(false);
      },
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode (o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ]
        }
      }
    }
  }
</script>

<style scoped>

  .login-warp{
    height: 100%;
    background-image: url("~@/assets/images/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-warp .login-form{
    background-color: white;
    width: 25%;
    height: 40%;
    padding: 30px;
    border-radius: 5px;
  }

  .login-title {
    text-align: center;
  }


</style>
