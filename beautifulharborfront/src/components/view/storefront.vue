import { default } from '../home/home.vue';
<template>
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '' }">店铺管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="div">
            <el-transfer style="text-align: left; display: inline-block;" v-model="value" filterable
                :titles="['未营业店铺', '已营业店铺']"
                :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
                :props="{key: 'storefrontId',label: 'storefrontName'}"
                @change="updateStatusById"
                @left-check-change="handleWHLeftChange"
                :data="data">
                <el-button type="primary" class="transfer-footer" slot="left-footer" size="small" round @click="insertStorefront">新增</el-button>
                <el-button type="primary" class="transfer-footer" slot="left-footer" size="small" round @click="changeStorefrontItem">编辑</el-button>
                <el-button type="danger" class="transfer-footer" slot="left-footer" size="small" round @click="deleteStorefrontItem">删除</el-button> 
            </el-transfer>
            <el-dialog title="新增店铺" width="470px" :visible.sync="dialogFormVisibleAdd" @close='cancel()' close-on-press-escape>
                <el-form :model="storefront" :rules="rules" ref="addForm">
                    <el-form-item label="店铺名称" prop="storefrontName" :label-width="formLabelWidth">
                        <el-input clearable size="medium" v-model="storefront.storefrontName" autocomplete="off" style ="width:230px;"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="storefrontAddress" :label-width="formLabelWidth">
                        <el-cascader
                        v-model="selectedOptions"
                        :options="options"
                        size="medium"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detailedAddress" :label-width="formLabelWidth">
                        <el-input clearable size="medium" v-model="storefront.detailedAddress" autocomplete="off" style ="width:230px;"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button @click="cancel()">取 消</el-button>
                    <el-button type="primary" @click="addStorefront()">确 定</el-button>
                </div>
            </el-dialog> 
            
            <el-dialog title="编辑店铺" width="470px" :visible.sync="dialogFormVisibleChange" @close='changeCancel()' close-on-press-escape>
                <el-form :model="item" :rules="rules" ref="changeForm">
                    <el-form-item label="店铺名称" prop="storefrontName" :label-width="formLabelWidth">
                        <el-input clearable size="medium" v-model="item.storefrontName" autocomplete="off" style ="width:230px;"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="storefrontAddress" :label-width="formLabelWidth">
                        <el-cascader
                        v-model="selectedOptions"
                        :options="options"
                        size="medium"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange">                            
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detailedAddress" :label-width="formLabelWidth">
                        <el-input clearable size="medium" v-model="item.detailedAddress" autocomplete="off" style ="width:230px;"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button @click="changeCancel()">取 消</el-button>
                    <el-button type="primary" @click="updateStorefront()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </el-card>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
export default {
    data() {
        return {
            data: [],
            value: [],
            dialogFormVisibleAdd : false,
            formLabelWidth: '120px',
            storefront:{},
            dialogFormVisibleChange : false,
            items: 0,
            storefrontIds: [],
            item: {},
            dialogFormVisibleDelete : false,
            rules: {
                storefrontName: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                ],
                storefrontAddress: [
                    { required: true, message: '请输入店铺地址', trigger: 'blur' },
                ]
            },
            options: regionData,
            selectedOptions: []
        };
    },
    created(){
        this.getAllStorefront();
    },
    methods: {
        updateStatusById(value, direction, movedKeys) {
            console.log(direction)
            var isClose;
            if (direction == 'right') {
                isClose = '0';
            } else if(direction == 'left'){
                isClose = '1';
            }
            this.$axios.post('http://10.6.11.82:3000/meigang/storefront/updateStatusById',{storefrontIds:movedKeys,status:isClose}).then((result) => {
                if (result.data.errorCode == '200') {
                    // this.getAllStorefront();
                    this.items = 0,
                    this.storefrontIds = [],
                    // console.log(direction+"+++++++++++++"+movedKeys)
                    this.cancel();
                    this.changeCancel();
                }else{ 
                    this.getAllStorefront();
                    this.$message.error(result.data.errorMessage);
                }
            }).catch((result) => {});
            this.items = movedKeys
        },
        getAllStorefront(){
            this.$axios.get('http://10.6.11.82:3000/meigang/storefront/getAllStorefront').then((result) => {
                if (result.data == null) {
                    
                }else{ 
                    this.data = result.data;
                    result.data.forEach(element => {
                        if(element.status == 0){
                            this.value.push(element.storefrontId);
                        }
                    });
                    // this.$forceUpdate();
                }
            }).catch((result) => {});
        },
        insertStorefront(){
            this.dialogFormVisibleAdd = true;
        },
        cancel(){
            this.storefront={};
            this.$refs["addForm"].clearValidate();
            this.dialogFormVisibleAdd = false;
        },
        addStorefront(){
            // console.log(this.storefront.storefrontAddress)
            var addressCode = '';
            addressCode = this.selectedOptions.join(",");
            this.$axios.post('http://10.6.11.82:3000/meigang/storefront/addStorefront',{storefrontName:this.storefront.storefrontName,storefrontAddress:this.storefront.storefrontAddress,detailedAddress:this.storefront.detailedAddress,addressCode:addressCode}).then((result) => {
                if (result.data.errorCode == '200') {
                    this.selectedOptions = [];
                    this.getAllStorefront();
                    this.cancel();
                    // this.dialogFormVisibleAdd = false;
                }else{ 
                    this.getAllStorefront();
                    this.$message.error(result.data.errorMessage);
                }
                this.storefront.storefrontAddress = '';
            }).catch((result) => {});
        },
        changeStorefrontItem(){
            // console.log(this.storefrontIds.length+"------"+this.items)
            if (this.storefrontIds.length > 1 || this.storefrontIds.length == 0) {
                this.$message.error("请选择一项");
                this.storefrontIds = [];
                this.items = 0;
            }else{
                this.dialogFormVisibleChange = true;
                this.$axios.post('http://10.6.11.82:3000/meigang/storefront/getStorefrontById',{storefrontId:Number(this.items)}).then((result) => {
                    this.item = result.data;                    
                    this.selectedOptions = this.item.addressCode.split(',');                      
                }).catch((result) => {
                    this.$message.error("请重试");
                });
            }
        },
        changeCancel(){
            this.item={};
            this.$refs["changeForm"].clearValidate();
            this.dialogFormVisibleChange = false;
        },
        deleteStorefrontItem(){
            // console.log(this.storefrontIds)
            if (this.storefrontIds.length > 1 || this.storefrontIds.length == 0) {
                this.$message.error("请选择想要删除的店铺");
                this.storefrontIds = [];
                this.items = 0;
            }else{
                this.$axios.post('http://10.6.11.82:3000/meigang/storefront/deleteStorefrontById',{storefrontIds:this.storefrontIds}).then((result) => {
                    if (result.data.errorCode == '200') {
                        this.getAllStorefront();
                    }else{ 
                        this.getAllStorefront();
                        this.$message.error(result.data.errorMessage);
                    }
                }).catch((result) => {});
            }
        },
        handleWHLeftChange(value, direction){
            console.log(value)
            if (value.length > 1) {
                this.storefrontIds = value;
                // console.log(this.storefrontIds+"*****")
            } else {
                this.items = value;
                this.storefrontIds = value;
            }
        },
        updateStorefront(){
            var addressCode = '';
            addressCode = this.selectedOptions.join(",");
            console.log(addressCode)
            this.$axios.post('http://10.6.11.82:3000/meigang/storefront/updateStorefrontById',{storefrontId:this.item.storefrontId,storefrontName:this.item.storefrontName,storefrontAddress:this.item.storefrontAddress,detailedAddress:this.item.detailedAddress,addressCode:addressCode}).then((result) => {
                    if (result.data.errorCode == '200') {
                        this.selectedOptions = [];
                        this.getAllStorefront();
                        this.changeCancel();
                        // this.dialogFormVisibleChange = false;
                    }else{ 
                        this.getAllStorefront();
                        this.$message.error(result.data.errorMessage);
                        this.dialogFormVisibleChange = false;
                    }
                }).catch((result) => {});
        },
        handleChange() {
            var loc = "";
            for (let i = 0; i < this.selectedOptions.length; i++) {
                loc += CodeToText[this.selectedOptions[i]];
            }
            this.storefront.storefrontAddress = loc;
            this.item.storefrontAddress = loc
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
        padding-bottom: 15px;
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
