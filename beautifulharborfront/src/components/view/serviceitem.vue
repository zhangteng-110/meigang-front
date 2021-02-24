import { default } from '../home/home.vue';
<template>
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '' }">服务项目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="div">
            <el-transfer style="text-align: left; display: inline-block;" v-model="value" filterable
                :titles="['Source', 'Target']"
                :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
                :props="{key: 'projectId',label: 'projectName'}"
                @change="handleChange"
                :data="data"
                >
                <el-button type="primary" class="transfer-footer" slot="left-footer" size="small" round>操作</el-button>
            </el-transfer>
        </div>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            data: [],
            value: [],
        };
    },
    created(){
        this.getProjectList();
    },
    methods: {
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        },
        getProjectList(){
            this.$axios.get('http://10.6.11.82:3000/meigang/service/getProjectList').then((result) => {
                if (result.data == null) {
                    
                }else{ 
                    this.data = result.data;
                    // this.value = result.data;
                }
            }).catch((result) => {});
        }
    }
}
</script>
<style>
    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }
    .div{
        margin-top: 40px;
        text-align: center;
        width:100%;
        height:100%
    }
    .el-transfer-panel{
        width: 400px;
        height: 600px;
        background-color: #d3ecf0;
        border: 1px solid black;
    }
    .el-transfer-panel .el-transfer-panel__footer{
        background: #d3ecf0;
        border-top: 0px;
        margin-bottom: 10px;
    }
    .el-transfer__buttons{
        padding:0 20px;
        width: 120px;
        text-align:center;
        line-height: 50px;
        height: 100px;
    }
    .el-transfer__buttons .el-transfer__button{
        margin-left: 0px;
        vertical-align:middle;
        border-radius:10%
    }
</style>
