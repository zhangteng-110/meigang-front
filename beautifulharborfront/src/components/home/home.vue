<template>
    <el-container class="el-container">
        <!-- 头部菜单栏 -->
        <el-header class="el-header" style="text-align: right; font-size: 12px">
            <el-row>
                <el-col :span="4">
                    <div>
                        <img style="width: 200px; height: 60px" src="@/assets/images/index_logo.png">
                    </div>
                </el-col>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"><span> {{username}}</span></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item><a href="#" @click.prevent="handleLogout()">退出</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
            </el-row>
        </el-header>
        <el-container>
            <!-- 侧边菜单导航栏 -->
            <el-aside class="el-aside">
                <!-- <h3>meigang</h3> -->
                <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" background-color="#7eb0d3" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="index">
                        <i class="el-icon-s-home" style="color: black"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-custom" style="color: black"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="users">客户信息</el-menu-item>
                            <el-menu-item index="staff">员工信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-money" style="color: black"></i>
                            <span>交易信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="recharge">VIP充值记录</el-menu-item>
                            <el-menu-item index="2">用户消费记录</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 页面内容 -->
            <el-main class="el-main">
                <router-view></router-view>                    
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data(){
            const staffName = localStorage.getItem('staffName');
            return{
                username:staffName
            }
        },
        beforeCreate(){
            const token = localStorage.getItem('token');
            if (!token) {
                this.$router.push({name:'login'})
            }else{
                this.$router.push({name:'index'})
            }

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleLogout(){
                localStorage.clear();
                this.$message.success('退出成功');
                this.$router.push({name:'login'});
            },
            isC(){
                this.isCollapse = !this.isCollapse
            }
        }
    };
</script>
<style>

    .el-container{
        height: 100%;
    }

    .el-header {
        background-color: #d3ecf0;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #c2cedb;
        width: 170px;
    }

    .el-main{
        background-color: #e9eef3;
    }

</style>

