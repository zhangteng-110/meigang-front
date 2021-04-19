<template>
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: ''}">公告管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-row class="el-search">
            <el-col>
                <el-input placeholder="请以姓名模糊匹配" v-model="query" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click.prevent="search()"></el-button>
                </el-input>
                <el-button plain type="primary" icon="el-icon-document-add" @click="dialogFormVisibleAdd = true"></el-button>
            </el-col>
        </el-row> -->
        
        <div class="div">
            <el-table :data="noticeList" border height="330px" stripe style="width: 100%" :header-cell-style="{background:'#c2cedb',color:'black'}">
                <el-table-column header-align="center" align="center" type="selection" width="60" @click="toggleSelection(tableData)">
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="noticeId" label="ID" width="60">
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="noticeText" label="公告内容" :show-overflow-tooltip="true" width="650px">
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="noticeTime" label="发布时间">
                    <template slot-scope="scope">
                        <span v-if="scope.row.noticeTime !== null"><i class="el-icon-time"></i></span>
                        {{scope.row.noticeTime | fmtdate}}
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="" label="操作">
                </el-table-column>
            </el-table> 
        </div>
        <div style="padding:2% 10%;width:100%;height:300px;background:#f7f4f4">
            <vue-editor style="width:100%;height:200px;" v-model="content" :editorToolbar="customToolbar"></vue-editor><br><br><br><br>
            <div style="text-align:right">
                <el-button type="primary" :plain="true"  @click="submit">发布</el-button>
            </div>
        </div>
    </el-card>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            noticeList:[],
            customToolbar:[
                // [{'header':[false,1,2,3,4,5,6] }], //标题
                ['bold', 'italic', 'underline'],  //加粗\斜体\下划线
                //['italic'],  //斜体----也可以拆开来写，用于换位置顺序
                //[{'align':''},{'align':'center'},{'align':'right'}], //对齐
                //[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }], //有序无序列表
                [{'background':[]},{'color':[]}], //背景色
                // ['image','link'],  //图片、链接
                ['strike'],   //作废（文字中间一横）
                ['underline'],
                ['clean'],   //清楚格式（所谓去掉背景色这些花里胡巧）
                // ['code'],  //代码
                // ['code-block'], //代码块
                // ['video'] //视频
            ],
            content: 'Some initial content'  
        }
    },
    created(){
        this.getNotice();
    },
    methods:{
        submit(){
            this.$axios.post('http://10.6.11.82:3000/meigang/notice/addNotice',{noticeText:this.content}).then((result) => {
                if (result.data.errorCode == '200') {
                    this.$message({
                        message: '发布成功',
                        type: 'success'
                    });
                    this.getNotice();
                    this.content = 'Some initial content'
                }else{
                    this.$message.error('发布失败');
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
            console.log(this.content)
        },
        getNotice(){
            this.$axios.get('http://10.6.11.82:3000/meigang/notice/selectNotice').then((result) => {
                if (result == null) {
                    
                }else{
                    this.noticeList = result.data
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        }
    }
}
</script>
<style>
    .el-card{
        height: 100%;
    }
    .div{
        margin-top: 20px;
        margin-bottom: 10px;
        /* background: #f7f4f4; */
    }
</style>