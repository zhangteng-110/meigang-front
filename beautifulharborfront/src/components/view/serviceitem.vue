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
                @left-check-change="handleWHLeftChange"
                :data="data">
                <el-button type="primary" class="transfer-footer" slot="left-footer" size="small" round @click="addProjectItem">新增</el-button>
                <el-button type="primary" class="transfer-footer" slot="left-footer" size="small" round @click="changeProjectItem">编辑</el-button>
                <el-button type="danger" class="transfer-footer" slot="left-footer" size="small" round @click="deleteProjectItem">删除</el-button>
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

            <el-dialog title="修改服务项目" width="470px" :visible.sync="dialogFormVisibleChange" @close='changeCancel()' close-on-press-escape>
                <el-form :model="item" :rules="rules" ref="changeForm">
                    <el-form-item label="服务项目" prop="projectName" :label-width="formLabelWidth">
                        <el-input clearable size="medium" v-model="item.projectName" autocomplete="off" style ="width:230px;"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-radio v-model="item.sex" label="MAN">男士</el-radio>
                        <el-radio v-model="item.sex" label="WEMAN">女士</el-radio>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button @click="changeCancel()">取 消</el-button>
                    <el-button type="primary" @click="updateServiceitem()">确 定</el-button>
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
            dialogFormVisibleChange : false,
            items: 0,
            projectIds: [],
            item: {},
            dialogFormVisibleDelete : false,
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
                if (result.data.errorCode == '200') {
                    // this.getProjectList();
                }else{ 
                    this.getProjectList();
                    this.$message.error(result.data.errorMessage);
                }
            }).catch((result) => {});
            this.items = movedKeys
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
                if (result.data.errorCode == '200') {
                    this.getProjectList();
                    this.dialogFormVisibleAdd = false;
                }else{ 
                    this.getProjectList();
                    this.$message.error(result.data.errorMessage);
                }
            }).catch((result) => {});
        },
        changeProjectItem(){
            console.log(this.projectIds.length+"------"+this.items)
            if (this.projectIds.length > 1 || this.projectIds.length == 0) {
                this.$message.error("请选择一项");
                this.projectIds = [];
                this.items = 0;
            }else{
                this.dialogFormVisibleChange = true;
                this.$axios.post('http://10.6.11.82:3000/meigang/service/getProjectById',{projectId:Number(this.items)}).then((result) => {
                    this.item = result.data
                }).catch((result) => {
                    this.$message.error("请重试");
                });
            }
        },
        changeCancel(){
            this.dialogFormVisibleChange = false;
            this.serviceItem.projectName = '';
            this.serviceItem.sex = '';
            this.$refs["changeForm"].clearValidate();
        },
        deleteProjectItem(){
            console.log(this.projectIds)
            if (this.projectIds.length > 1 || this.projectIds.length == 0) {
                this.$message.error("请选择想要删除的服务项目");
                this.projectIds = [];
                this.items = 0;
            }else{
                this.$axios.post('http://10.6.11.82:3000/meigang/service/deleteProjectById',{projectIds:this.projectIds}).then((result) => {
                    if (result.data.errorCode == '200') {
                        this.getProjectList();
                    }else{ 
                        this.getProjectList();
                        this.$message.error(result.data.errorMessage);
                    }
                }).catch((result) => {});
            }
        },
        handleWHLeftChange(value, direction){
            console.log(value)
            if (value.length > 1) {
                this.projectIds = value;
                console.log(this.projectIds+"*****")
            } else {
                this.items = value;
                this.projectIds = value;
            }
        },
        updateServiceitem(){
            this.$axios.post('http://10.6.11.82:3000/meigang/service/updateNameById',{projectId:this.item.projectId,projectName:this.item.projectName,sex:this.item.sex}).then((result) => {
                    if (result.data.errorCode == '200') {
                        this.getProjectList();
                        this.dialogFormVisibleChange = false;
                    }else{ 
                        this.getProjectList();
                        this.$message.error(result.data.errorMessage);
                        this.dialogFormVisibleChange = false;
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
        width: 500px;
        height: 700px;
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

    .el-transfer-panel__body {
        height: 91%;
    }

    .el-transfer-panel__list.is-filterable{
        height: 91%;
    }
    
    .el-transfer-panel__list{
        padding: 0;
    }
</style>
