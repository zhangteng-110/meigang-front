import { default } from '../home/home.vue';
<template >
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: ''}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="el-search">
            <el-col>
                <el-input placeholder="请以姓名模糊匹配" v-model="query" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click.prevent="search()"></el-button>
                </el-input>
                <el-button plain type="primary" icon="el-icon-document-add" @click="dialogFormVisibleAdd = true"></el-button>
            </el-col>
        </el-row>
        <el-table :data="staffList" style="width: 100%" :header-cell-style="{background:'#c2cedb',color:'black'}" :default-sort = "{prop: 'startDate'}">
            <el-table-column header-align="center" align="center" prop="staffId" label="ID" width="60"></el-table-column>
            <el-table-column header-align="center" align="center" prop="staffName" label="姓名" width="70"></el-table-column>
            <el-table-column header-align="center" align="center" prop="staffSex" label="性别" width="60">
                <template slot-scope="scope">
                    <span v-if="scope.row.staffSex === 'MAN'">男</span>
                    <span v-if="scope.row.staffSex === 'WEMAN'">女</span>
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="staffCode" label="证件号" width="180">
                <template slot-scope="scope">
                    <span style="color:#910c1e">{{scope.row.staffCode}}</span>
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="phone" label="手机号" width="140"></el-table-column>
            <el-table-column header-align="center" align="center" prop="roleName" label="职位" width="70"></el-table-column>
            <el-table-column header-align="center" align="center" prop="startDate" label="工作日期" width="130">
                <template slot-scope="scope">
                    {{scope.row.startDate | fmtdate}}
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="endDate" label="离职日期" width="130">
                <template slot-scope="scope">
                    {{scope.row.endDate | fmtdate}}
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="salary" label="薪资" width="80"></el-table-column>
            <el-table-column header-align="center" align="center" prop="usercode" label="操作" width="150">
                <template slot-scope="scope">
                    <el-tooltip :content="scope.row.status==0 ?'上任':'离职'" class="item" effect="dark" placement="top">
                        <el-switch @change="changeStatus(scope.row.status,scope.row.staffId)" v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-tooltip>&nbsp;&nbsp;
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="selectStaffById(scope.row.staffId)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.staffId)"></el-button>
                    </el-tooltip>
                </template>
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

        <el-dialog title="员工新增" width="470px" :visible.sync="dialogFormVisibleAdd" @close='cancel()' close-on-press-escape>
            <el-form :model="staff" :rules="rules">
                <el-form-item label="员工姓名" prop="staffname" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staff.staffname" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="staff.staffsex" label="MAN">男</el-radio>
                    <el-radio v-model="staff.staffsex" label="WEMAN">女</el-radio>
                </el-form-item>
                <el-form-item label="证件号" prop="staffcode" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staff.staffcode" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staff.phone" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="薪资" prop="salary" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staff.salary" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="职位角色" prop="roleId" :label-width="formLabelWidth">
                    <el-select v-model="staff.roleId" clearable placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="userAdd()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="员工信息编辑" width="470px" :visible.sync="dialogFormVisibleEdit" @close='editCancel()' close-on-press-escape>
            <el-form :model="staffdetail" :rules="rules" ref="editForm">
                <el-form-item label="员工姓名" prop="staffname" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staffdetail.staffName" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="staffdetail.staffSex" label="MAN">男</el-radio>
                    <el-radio v-model="staffdetail.staffSex" label="WEMAN">女</el-radio>
                </el-form-item>
                <el-form-item label="证件号" prop="staffcode" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staffdetail.staffCode" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staffdetail.phone" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="薪资" prop="salary" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="staffdetail.salary" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="职位角色" prop="roleId" :label-width="formLabelWidth">
                    <el-select v-model="staffdetail.roleId" clearable placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editCancel()">取 消</el-button>
                <el-button type="primary" @click="staffEdit()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    data(){
        const phoneRules = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入联系方式'))
            } else {
                const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                callback()
                } else {
                return callback(new Error('请输入正确的电话'))
                }
            }
        }
        return{
            query: '',
            staffList: [],
            roleList: '',
            // 分页参数
            pageSize: 10,
            total: 0,
            currentPage: 1,
            // 控制用户添加框参数
            dialogFormVisibleAdd : false,
            // 控制用户修改框参数
            dialogFormVisibleEdit: false,
            staffdetail:{},

            status: '',
            formLabelWidth: '120px',
            value: 1,
            staff: {
                staffname: '',
                phone: '',
                staffcode: '',
                staffsex: '',
                salary: ''
            },
            rules: {
                staffname: [
                    { required: true, message: '请输入员工姓名', trigger: 'blur' },
                ],
                staffcode: [
                    { required: true, message: '请输入员工证件号', trigger: 'blur' },
                    { min: 18, max: 18, message: '证件号格式不正确', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator:phoneRules, trigger:'blur'}
                ],
            }
        }
    },
    created(){
        this.getUserList();
        this.getRoleList();
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
        userAdd(){
            this.dialogFormVisibleAdd = true;
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/register', {
                staffName:this.staff.staffname,
                staffCode:this.staff.staffcode,
                phone:this.staff.phone,
                staffSex:this.staff.staffsex,
                salary:this.staff.salary,
                staffPositionId:this.staff.roleId}).then((result) => {
                if (result.data == null) {
                    
                }else{
                    // this.total = result.data.length;
                    // this.userList = result.data;
                    this.$message.success(result.data.errorMessage);
                    this.getUserList();
                    this.dialogFormVisibleAdd = false;
                    
                }
            }).catch((result) => {
                // this.loading = false
                this.$message.error('网络异常');
            });
        },
        cancel(){
            this.dialogFormVisibleAdd = false;
            this.staff.staffname = '',
            this.staff.staffcode = '',
            this.staff.phone = '',
            this.staff.staffsex = '',
            this.staff.salary = ''
        },
        editCancel(){
            this.dialogFormVisibleEdit = false;
            this.staffdetail = {};
            this.$refs["editForm"].clearValidate();
        },
        deleteUser(staffId){
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/deleteStaffById?staffId='+staffId).then((result) => {
                        if (result.data == null) {
                            this.$notify({
                                title: '错误',
                                message: '员工删除失败请稍后重试',
                                type: 'error'
                            });
                        }else{
                            this.$notify({
                                title: '成功',
                                message: result.data.errorMessage,
                                type: 'success'
                            });
                        }
                        this.getUserList();
                }).catch((result) => {
                    this.$message.error('网络异常');
                });
        },
        getRoleList(){
            this.$axios.get('http://10.6.11.82:3000/meigang/role/getRoleList').then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.roleList = result.data;
                    
                }
            }).catch((result) => {
                // this.loading = false

            });
        },
        selectStaffById(staffId){
            this.dialogFormVisibleEdit=true;
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/selectStaffById?staffId='+staffId).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.staffdetail = result.data;
                    
                }
            }).catch((result) => {
                // this.loading = false

            });
        },
        staffEdit(){
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/updateStaffDetail', {
                staffId:this.staffdetail.staffId,
                staffName:this.staffdetail.staffName,
                staffCode:this.staffdetail.staffCode,
                phone:this.staffdetail.phone,
                staffSex:this.staffdetail.staffSex,
                salary:this.staffdetail.salary,
                staffPositionId:this.staffdetail.roleId}).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.$message.success(result.data.errorMessage);
                    this.dialogFormVisibleEdit = false;
                    this.getUserList();
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        },
        changeStatus(status,staffId){
            this.$axios.post('http://10.6.11.82:3000/meigang/staff/updateStatusById', {staffId:staffId,status:status}).then((result) => {
                    this.getUserList();
                    this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                    });
            }).catch((result) => {
                this.$message.error('网络异常');
            }); 
        },
        
    }
}
</script>
<style>

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