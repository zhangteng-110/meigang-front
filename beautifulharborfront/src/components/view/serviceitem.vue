import { default } from '../home/home.vue';
<template>
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '' }">服务项目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="div">
            <el-transfer style="text-align: left; display: inline-block;" v-model="value" filterable
                :titles="['未上架服务项目', '已上架服务项目']"
                :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
                :props="{key: 'projectId',label: 'projectName'}"
                @change="handleChange"
                :data="data">
                <el-button type="primary" class="transfer-footer" slot="left-footer" size="small" round @click="addProjectItem">操作</el-button>
            </el-transfer>
        <el-dialog title="新增服务项目" width="470px" :visible.sync="dialogFormVisibleAdd" @close='cancel()' close-on-press-escape>
            <el-form :model="serviceItem" :rules="rules" ref="addForm">
                <el-form-item label="服务项目" prop="projectName" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="serviceItem.projectName" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="serviceItem.sex" label="MAN">男士</el-radio>
                    <el-radio v-model="serviceItem.sex" label="WEMAN">女士</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="addServiceItem()">确 定</el-button>
            </div>
        </el-dialog>
        </div>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            data: [],
            value: [],
            dialogFormVisibleAdd : false,
            formLabelWidth: '120px',
            serviceItem:{},
            rules: {
                projectName: [
                    { required: true, message: '请输入服务项目', trigger: 'blur' },
                ]
            },
        };
    },
    created(){
        this.getProjectList();
    },
    methods: {
        handleChange(value, direction, movedKeys) {
            var isClose;
            if (direction == 'right') {
                isClose = '0';
            } else if(direction == 'left'){
                isClose = '1';
            }
            this.$axios.post('http://10.6.11.82:3000/meigang/service/updateStatusById',{projectIds:movedKeys,isClose:isClose}).then((result) => {
                console.log(result.data)
                if (result.data.errorCode == '200') {
                    this.getProjectList();
                }else{ 
                    this.getProjectList();
                    this.$message.error(result.data.errorMessage);
                }
            }).catch((result) => {});
        },
        getProjectList(){
            this.$axios.get('http://10.6.11.82:3000/meigang/service/getProjectList').then((result) => {
                if (result.data == null) {
                    
                }else{ 
                    this.data = result.data;
                    result.data.forEach(element => {
                        if(element.isClose == 0){
                            this.value.push(element.projectId);
                        }
                    });
                }
            }).catch((result) => {});
        },
        addProjectItem(){
            this.dialogFormVisibleAdd = true;
        },
        cancel(){
            this.dialogFormVisibleAdd = false;
            this.serviceItem.projectName = '';
            this.serviceItem.sex = '';
            this.$refs["addForm"].clearValidate();
        },
        addServiceItem(){
            this.$axios.post('http://10.6.11.82:3000/meigang/service/addServiceItem',{projectName:this.serviceItem.projectName,sex:this.serviceItem.sex}).then((result) => {
                console.log(result.data)
                if (result.data.errorCode == '200') {
                    this.getProjectList();
                    this.dialogFormVisibleAdd = false;
                }else{ 
                    this.getProjectList();
                    this.$message.error(result.data.errorMessage);
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
