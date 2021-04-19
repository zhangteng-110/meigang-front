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
                <el-menu-item index="notice" style="min-width:60px">
                    <i class="el-icon-mic" style="color: black"></i>
                    <span slot="title">公告管理</span>
                </el-menu-item>
                <!-- <el-submenu index="4" style="min-width:60px">
                    <template slot="title">
                        <i class="el-icon-star-off" style="color: black"></i>
                        <span>账号权限管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="staffauthority">员工账号</el-menu-item>
                        <el-menu-item index="">客户账号</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
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
                <el-col :span="5" style="padding-top:10px">
                    <iframe allowtransparency="true" frameborder="0" width="180" height="36" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=1&v=0&d=3&bd=0&k=000000&f=&ltf=0080ff&htf=cc0000&q=1&e=0&a=1&c=54511&w=180&h=36&align=center"></iframe>
                </el-col>
                <el-col :span="16">
                    <div class="watch-layout">
                        <!-- <clock :time="time"></clock> -->
                        <span style="font-size:50px;font-family: newfont;" id="watch">{{ time }}</span>
                    </div>
                </el-col>
                <div style="padding:10px;height:60px;line-height:1.5;display: inline-block;vertical-align: middle;">
                    <el-dropdown >
                        <el-avatar :src="url"></el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-card :body-style="{ padding: '0px',width: '190px' }">
                                <img style="width:180px;height:180px;border-radius:50%;border: 1px #333 solid;margin:5px;" :src="url" class="image">
                                <div style="padding: 14px;">
                                    <span>User：{{username}}</span>
                                    <div class="bottom clearfix">
                                        <!-- <el-dropdown-item><i class="el-icon-user-solid"></i>个人</el-dropdown-item> -->
                                        <el-dropdown-item><i class="el-icon-switch-button"></i><a href="#" @click.prevent="handleLogout()">退出</a></el-dropdown-item>
                                    </div>
                                </div>
                            </el-card>
                        </el-dropdown-menu>
                    </el-dropdown>                
                </div>             
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
            const url = localStorage.getItem('url');
            return{
                username:staffName,
                url:url,
                isCollapse: false,
                time: ''
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
        mounted(){
            // this.gettime()
            setInterval(()=>{this.gettime()},1000)
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
                // this.$message.success('退出成功');
                this.$router.push({name:'login'});
            },
            menuOpen(){
                this.isCollapse = !this.isCollapse
                console.log(this.isCollapse)
            },
            gettime() {
                var t = new Date();
                var h = t.getHours(),
                    min = t.getMinutes(),
                    s = t.getSeconds();
                if( h < 10 ){ h = '0' + h }
                if( min < 10 ){ min = '0' + min }
                if( s < 10 ){ s = '0' + s }
                var full_time = h + ':' + min + ':' + s;
                document.getElementById('watch').innerText = full_time;
            }
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
    
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
</style>

