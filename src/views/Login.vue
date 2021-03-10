<template>
    <div>
        <el-form  v-loading="loading"
                  element-loading-text="正在登陆..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  ref="loginForm"
                  :model="loginForm"
                  class="loginContainer"
                  :rules="rules"><!--ref对应submitLogin方法里的loginForm-->
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username"><!--prop对应rule中的Username-->
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item prop="code" >
                <div style="display: flex;align-content: center">
                    <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 240px;margin-right: 5px"></el-input>
                    <img :src="captchaUrl" @click="updateCaptcha" title="点击更换" >
                </div>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%; " @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>



<script>



 export default {
        name: "Login",
        data(){
            return{
                captchaUrl:'/captcha?time='+new Date(),
                loginForm:{
                    username:'admin',
                    password:'123',
                    code:''
                },
                loading: false,
                checked: true,
                rules:{
                    username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                    password:[{required:true,message:'请输入密码',trigger:'blur'}],
                    code:[{required:true,message:'请输入验证码',trigger:'blur'}]
                }
            }
        },
        methods:{
            updateCaptcha(){
              this.captchaUrl = '/captcha?time='+new Date();
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postRequest('/login',this.loginForm).then(resp=>{
                            if(resp){
                                this.loading = true;
                                //存储用户token
                                const tokenStr = resp.obj.tokenHead+resp.obj.token;
                                window.sessionStorage.setItem('token',tokenStr);
                                //页面跳转
                                //this.$router.replace('/home') //push可以后退回登陆页面，replace不能
                                let path = this.$route.query.redirect; //获取redirect参数，在钩子函数里设置的
                                this.$router.replace((path=='/'||path==undefined)?'/home':path);
                            }
                        });
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0px auto 40px auto;
        text-align: center;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .el-form-item__content{
        display: flex;
        align-content: center;
    }
</style>