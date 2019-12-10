<template>
    <div class="login">
        <div class="slideSty" v-show="showSlide">
            <slide-verify
                    @success="onSuccess"
                    @fail="onFail"
                    :sliderText="text"
                    :w="350"
                    :h="175"
                    ref="slideDiv"
            ></slide-verify>
            <div class="iconBtn">
                <i class="el-icon-circle-close" @click="showSlide = false"></i
                ><i class="el-icon-refresh" @click="refresh"></i>
            </div>
        </div>

        <el-form ref="loginForm" class="loginCon" :rules="rules" :model="ruleForm">
            <div class="titleDiv">
                <h2>系统登录</h2>
            </div>
            <el-form-item prop="user">
                <el-input
                    placeholder="请输入账号"
                    prefix-icon="el-icon-user"
                    v-model="ruleForm.user">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                        v-model="ruleForm.password"
                        show-password
                >
                </el-input>
            </el-form-item>
            <el-button type="primary" class="loginBtn" @click="loginYz('loginForm')">
                登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
    /* 此处可以动态导入 api与store 的js代码*/
    import {login} from "../../api/login";
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                text:'向右滑动',
                showSlide:false,
                ruleForm: {
                    user: '',
                    password: ''
                },
                rules: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
                    ],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
                }
            }
        },
        methods: {
            /*  此处使用vuex的mapMutations 方法调用本地设计好的 突变方法 来设置本地数据保存*/
            ...mapMutations(['SET_TOKEN']),
            onSuccess(){
                /*  滑动验证成功后 采取调用 js里api的接口去登录请求数据 */
                this.showSlide = false
                this._login()
            },
            onFail(){
              this.$message.error('验证失败')
            },
            refresh(){
              this.$refs.slideDiv.reset()
            },
            loginYz(form){
                this.$refs[form].validate(valid => {
                    /* 填写好登录密码后 要先进行滑动条的测试 */
                    if(valid){
                        this.showSlide=true
                    }else{
                        return
                    }
                })
            },
            _login() {
                login(this.ruleForm).then(res=>{
                    if(res.code === 0){
                        this.SET_TOKEN(res.data.token)  //vuex保存token值
                        this.$message({
                            type:'success',
                            message:res.data.msg
                        })
                    }
                })
            }
        },
        components :{
        // SlideVerify
        }
    }
</script>

<style  lang="scss">
    .login {
        height: 100%;
        width: 100%;
        background-color: #2d3a4b;
    }
    .titleDiv {
        margin-bottom: 30px;
        h2 {
            font-size: 26px;
            color: #eee;
            text-align: center;
        }
    }
    .loginCon {
        width: 450px;
        margin: 0 auto;
        padding-top: 160px;
    }
    .loginBtn {
        width: 100%;
    }
    .slideSty {
        position: absolute;
        width: 380px;
        height: 311px;
        background: #e8e8e8;
        border: 1px solid #dcdcdc;
        left: 50%;
        margin-left: -188px;
        margin-top: 164px;
        z-index: 99;
        border-radius: 5px;
    }
    .iconBtn {
        padding: 9px 0 0 19px;
        color: #5f5f5f;
        border-top: 1px solid #d8d8d8;
        margin-top: 17px;
        i {
            font-size: 22px;
            cursor: pointer;
        }
        i:last-child {
            margin-left: 7px;
        }
    }
    </style>
    <style>
     .slideSty .slide-verify {
         margin: 13px auto 0 auto;
         width: 350px !important;
     }
    .slideSty .slide-verify-slider {
        width: 100% !important;
    }
    .slideSty .slide-verify-refresh-icon {
        display: none;
    }
</style>