<template>
    <el-container class="el-container"> 
        <!-- 侧边菜单导航栏 -->
        <el-aside class="el-aside" width="auto" style="min-width:60px;">
            <!-- <h3>meigang</h3> -->
            <el-menu :router="true" :collapse="isCollapse" :default-active="$route.name" class="el-menu-vertical-demo" background-color="#7eb0d3" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose">        
                <div style="text-align: center;height: 70px;">
                    <img style="width: 180px; height: 40px;margin-top: 10px;" src="@/assets/images/index_logo.png">
                </div>
                <el-menu-item index="index" style="min-width:60px">
                    <i class="el-icon-s-home" style="color: black"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="2" style="min-width:60px">
                    <template slot="title">
                        <i class="el-icon-s-custom" style="color: black"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="users">客户信息</el-menu-item>
                        <el-menu-item index="staff">员工信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3" style="min-width:60px">
                    <template slot="title">
                        <i class="el-icon-money" style="color: black"></i>
                        <span>交易信息管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="recharge">VIP充值记录</el-menu-item>
                        <el-menu-item index="consumption">客户消费记录</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="serviceitem" style="min-width:60px">
                    <i class="el-icon-s-order" style="color: black"></i>
                    <span slot="title">服务项目管理</span>
                </el-menu-item>
                <el-menu-item index="storefront" style="min-width:60px">
                    <i class="el-icon-s-shop" style="color: black"></i>
                    <span slot="title">店铺管理</span>
                </el-menu-item>
                        <!-- <i class="el-icon-s-fold" style="color: black"></i> -->
                    
                    
                    <!-- <div style="position:fixed; bottom:0;right:0;height:20px;width:20px;">
                        <i class="el-icon-s-fold" style="color: black"></i>
                    </div> -->
                    <!-- <div style="margin-top:560px,width:auto;">
                        <el-row type="flex"  justify="center">
                            <el-row><i class="el-icon-s-fold" style="color: black" @click="isC()"></i></el-row>
                        </el-row>
                    </div> -->
            </el-menu>
        </el-aside>
    <el-container>
    <!-- 头部菜单栏 -->
        <el-header class="el-header" style="text-align: right; font-size: 12px">
            <el-row>
                <el-col :span="0.5">
                    <span v-if="this.isCollapse == false"><i style="font-size:20px" class="el-icon-s-fold" @click="menuOpen"></i></span>
                    <span v-if="this.isCollapse == true"><i style="font-size:20px" class="el-icon-s-unfold" @click="menuOpen"></i></span>
                </el-col>
                <el-dropdown>
                    <i class="el-icon-user-solid" style="margin-right: 15px"><span> {{username}}</span></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人</el-dropdown-item>
                        <el-dropdown-item><a href="#" @click.prevent="handleLogout()">退出</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>                
            </el-row>
        </el-header>
        <!-- 页面内容 -->
        <el-main class="el-main">
            <!-- <el-scrollbar size="5" color="red"> -->
            <router-view style="overflow-y:scroll;overflow-x:scroll;height:100%;">
                    
            </router-view>                    
            <!-- </el-scrollbar> -->
        </el-main>
    </el-container>
    
</el-container>
    
</template>
<script>
    export default {
        data(){
            const staffName = localStorage.getItem('staffName');
            return{
                username:staffName,
                isCollapse: false,
            };
        },
        beforeCreate(){
            const token = localStorage.getItem('token');
            if (!token) {
                this.$router.push({name:'login'})
            }else{
                if (this.$route.name == 'home') {
                    this.$router.push({name:'index'})
                }
                // this.$router.push({name:'index'})
                // console.log(this.$route)
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
            menuOpen(){
                this.isCollapse = !this.isCollapse
                console.log(this.isCollapse)
            },
            
        },
        // computed:{
        //     defaultMenu(){
        //         const { name } = this.$route;
        //         switch (name) {
        //             case 'home':
        //                 return 'index'
        //             case 'index':
        //                 return 'index'
        //             case 'users':
        //                 return 'users';
        //             case 'staff':
        //                 return 'staff';
        //             case 'recharge':
        //                 return 'recharge';
        //             case 'consumption':
        //                 return "consumption";
        //             case 'serviceitem':
        //                 return "serviceitem";
        //             case 'storefront':
        //                 return "storefront";
        //         }
        //     }
        // }
    };
</script>

<style>

    .el-container{
        height: 100%;
    }

    .el-header {
        background-color: #d3ecf0;
        color: #333;
        line-height: 80px;
    }
    
    .el-aside {
        background-color: #7eb0d3;
        /* width: 230px; */
        height: 100%;
        /* min-height: calc(100vh) ; */
    }
    
    .el-menu{
        border-right:solid 0px;
    }

    .el-main{
        background-color: #e9eef3;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        /* min-height: 100%; */
        height: 100%;   
    }

    ::-webkit-scrollbar {
        width: 10px;
        height: 1px;
    }
    ::-webkit-scrollbar-thumb { 
        border-radius: 5px;
        background-color:#c2cedb;
    }
    ::-webkit-scrollbar-track { 
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        /* background: #ededed; */
        border-radius: 5px;
    }
    
</style>

