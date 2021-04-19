<template>
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: ''}">账号权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工账号</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="el-search">
            <el-col>
                <el-input placeholder="请以姓名模糊匹配" v-model="query" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click.prevent="search()"></el-button>
                </el-input>
                <!-- <el-button plain type="primary" icon="el-icon-document-add" @click="dialogFormVisibleAdd = true"></el-button> -->
            </el-col>
        </el-row>
        <el-table :data="staffList" stripe style="width: 100%" :header-cell-style="{background:'#c2cedb',color:'black'}">
            <el-table-column prop="staffId" label="ID">
            </el-table-column>
            <el-table-column prop="staffName" label="姓名">
            </el-table-column>
            <el-table-column prop="accountNumber" label="账号">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column prop="" label="操作">
            </el-table-column>
        </el-table>
        <template>
            <el-pagination class="el-pagination" background layout="total, sizes, prev, pager, next, jumper"  
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 200]"
                :current-page="currentPage"    
                :page-size="pageSize" :total="total">
            </el-pagination>
        </template>
    </el-card>
</template>
<script>
export default {
    data(){
        return{
            staffList: [],
            query: '',
            // 分页参数
            pageSize: 10,
            total: 0,
            currentPage: 1,
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        getUserList(){
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/selectAllStaff?pageNum='+this.currentPage+'&pageSize='+this.pageSize, {staffName:this.query}).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.total = result.data.total;
                    this.staffList = result.data.list;
                }
            }).catch((result) => {
                // this.loading = false
            });
        },
        search(){
            this.getUserList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUserList();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserList();
            // console.log(`当前页: ${val}`);
        },
    }
}
</script>
<style >
    .el-card{
        height: 100%;
    }

    .input-with-select{
        width: 250px;
    }

    .el-search{
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .el-pagination {
        margin-top: 10px;
        text-align: center; 
    }
</style>