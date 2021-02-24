import { default } from '../home/home.vue';
<template >
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: ''}">交易信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>VIP充值记录</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="el-search">
            <el-col>
                <el-input
                placeholder="请输入姓名"
                v-model="realName"
                prefix-icon="el-icon-search"
                style="width:200px;"
                clearable>
                </el-input>
                <el-date-picker
                v-model="datetime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="center">
                </el-date-picker>
                <el-tooltip class="item" effect="dark" content="搜索"  placement="top">
                    <el-button icon="el-icon-search" type="primary" @click.prevent="search()" plain></el-button>
                </el-tooltip>
            </el-col>
        </el-row>
        <el-table :data="rechargeList" style="width: 100%" :header-cell-style="{background:'#c2cedb',color:'black'}" :default-sort = "{prop: 'userId'}">
            <el-table-column header-align="center" align="center" prop="transactionId" label="交易ID" width="100"></el-table-column>
            <el-table-column header-align="center" align="center" sortable prop="transactionMoney" label="充值金额(元)" width="150"></el-table-column>
            <el-table-column header-align="center" align="center" sortable prop="transactionDate" label="充值日期" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    {{scope.row.transactionDate | fmtdatetime}}
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="realName" label="客户姓名" width="150"></el-table-column>
            <el-table-column header-align="center" align="center" prop="usercode" label="操作" width="200">
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
            rechargeList: [],
            datetime:'',
            realName:'',
            // 分页参数
            pageSize: 10,//每页显示条数
            total: 0,
            currentPage: 1,//当前页 
            value: 1,
            pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
                }
            }]
            },
        }
    },
    created(){
        var _this = this;
        _this.getRecharge();
        setInterval(function(){
            _this.getRecharge();
        },10000)
    },
    methods:{
        getRecharge(){
            this.$axios.post('http://10.6.11.82:3000/meigang/transaction/selectTransactionList?pageNum='+this.currentPage+'&pageSize='+this.pageSize, {
                startDate:this.datetime[0],endDate:this.datetime[1],realName:this.realName}).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.total = result.data.total;
                    this.rechargeList = result.data.list;
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getRecharge();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getRecharge();
        },
        search(){
            if (this.datetime == null) {
                this.datetime = '';
            }
            this.getRecharge();
        }
    }
}
</script>
<style>

    .el-card{
        height: 100%;
    }

    .input-with-selects{
        width: 450px;
    }

    .el-search{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    
    .el-pagination {
        margin-top: 10px;
        text-align: center; 
    }

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        color:#99a9bf;
    }
    .input-with-selects .el-select .el-input {
        width: 105px;
    }
</style>