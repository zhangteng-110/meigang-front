import { default } from '../home/home.vue';
<template >
    <el-card class="el-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: ''}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="el-search">
            <el-col>
                <el-input :placeholder="placeholder" v-model="query" class="input-with-selects" clearable>
                    <el-select v-model="select" clearable slot="prepend" placeholder="查找方式" @change="secrchOption()">
                        <el-option label="客户姓名" value="1"></el-option>
                        <el-option label="卡号" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click.prevent="search()"></el-button>
                </el-input>
                <el-tooltip class="item" effect="dark" content="新增客户" placement="top">
                    <el-button plain type="primary" icon="el-icon-document-add" @click="dialogFormVisibleAdd = true"></el-button>
                </el-tooltip>
            </el-col>
        </el-row>
        <el-table :data="userList" style="width: 100%" :header-cell-style="{background:'#c2cedb',color:'black'}" :default-sort = "{prop: 'userId'}">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="手机号" prop="phone">
                                <span>{{scope.row.phone}}</span>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <span>{{scope.row.email}}</span>
                            </el-form-item>
                            <el-form-item label="卡号" prop="cardNumber">
                                <span>{{scope.row.cardNumber}}</span>
                            </el-form-item>
                            <el-form-item label="积分" prop="integral">
                                <span>{{scope.row.integral}}</span>
                            </el-form-item>
                            <el-form-item label="金额(元)" prop="money">
                                <span>{{scope.row.money}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
            <el-table-column header-align="center" align="center" prop="userId" label="ID" ></el-table-column>
            <el-table-column header-align="center" align="center" prop="realName" label="姓名" ></el-table-column>
            <el-table-column header-align="center" align="center" prop="userSex" label="性别" >
                <template slot-scope="scope">
                    <span v-if="scope.row.userSex === 'MAN'">男</span>
                    <span v-if="scope.row.userSex === 'WEMAN'">女</span>
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="userCode" label="证件号" width="250">
                <template slot-scope="scope">
                    <span style="color:#910c1e">{{scope.row.userCode}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column header-align="center" align="center" prop="phone" label="手机号" width="140"></el-table-column>
            <el-table-column header-align="center" align="center" prop="email" label="邮箱" width="180" :show-overflow-tooltip="true"></el-table-column> -->
            <el-table-column header-align="center" align="center" sortable prop="startDate" label="创建日期" >
                <template slot-scope="scope">
                    <span v-if="scope.row.startDate !== null"><i class="el-icon-time"></i></span>
                    {{scope.row.startDate | fmtdate}}
                </template>
            </el-table-column>
            <!-- <el-table-column header-align="center" align="center" prop="cardNumber" label="卡号" width="140"></el-table-column> -->
            <el-table-column header-align="center" align="center" prop="isVip" label="VIP状态" >
                <template slot-scope="scope">
                    <el-tooltip :content="'Switch value: ' + scope.row.isVip" placement="top">
                        <el-switch @change="changeStatus(scope.row.isVip,scope.row.userCode,scope.row.money)" v-model="scope.row.isVip" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-tooltip> 
                </template>        
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="usercode" label="操作" width="250">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="selectUserById(scope.row.userId)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="消费" placement="top">
                        <el-button plain size="mini" type="info" icon="el-icon-s-finance" circle @click="userConsumption(scope.row.userId)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="充值" placement="top">
                        <el-button plain size="mini" type="info" icon="el-icon-coin" circle @click="userRecharge(scope.row.userId)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.userId)"></el-button>
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

        <el-dialog title="VIP新增" width="470px" :visible.sync="dialogFormVisibleAdd" @close='cancel()' close-on-press-escape>
            <el-form :model="user" :rules="rules" ref="addForm">
                <el-form-item label="客户姓名" prop="realname" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="user.realname" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="user.usersex" label="MAN">男</el-radio>
                    <el-radio v-model="user.usersex" label="WEMAN">女</el-radio>
                </el-form-item>
                <el-form-item label="证件号" prop="usercode" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="user.usercode" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="user.phone" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="user.email" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="卡号" prop="cardNumber" :label-width="formLabelWidth" v-show="bisible">
                    <el-input clearable size="medium" v-model="user.cardNumber" autocomplete="off" placeholder="请输入开通卡号" style ="width:230px;"></el-input>
                </el-form-item>    
                <el-form-item label="开通VIP" prop="isVip" :label-width="formLabelWidth">
                    <el-tooltip :content="'Switch value: ' + user.isVip" placement="top">
                        <el-switch
                            v-model="user.isVip"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="0"
                            @change="showCardNumber(user.isVip)">
                        </el-switch>
                    </el-tooltip>
                </el-form-item>  
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="userAdd()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="客户信息编辑" width="470px" :visible.sync="dialogFormVisibleEdit" @close='editCancel()' close-on-press-escape>
            <el-form :model="userdetail" :rules="rules" ref="editForm">
                <el-form-item label="客户姓名" prop="realname" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="userdetail.realName" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="userdetail.userSex" label="MAN">男</el-radio>
                    <el-radio v-model="userdetail.userSex" label="WEMAN">女</el-radio>
                </el-form-item>
                <el-form-item label="证件号" prop="usercode" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="userdetail.userCode" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="userdetail.phone" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input clearable size="medium" v-model="userdetail.email" autocomplete="off" style ="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="卡号" prop="cardNumber" :label-width="formLabelWidth" v-show="bisible">
                    <el-input clearable size="medium" v-model="userdetail.cardNumber" autocomplete="off" placeholder="请输入开通卡号" style ="width:230px;"></el-input>
                </el-form-item>    
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editCancel()">取 消</el-button>
                <el-button type="primary" @click="userEdit()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="消费" width="450px" hight="200px" :visible.sync="dialogFormVisibleConsumption" @close='consumptionCancel()' close-on-press-escape>      
            <el-form :model="userdetail">
                <el-form-item label="客户姓名：" prop="realname" :label-width="formLabelWidth">
                    <span>{{userdetail.realName}}</span>
                </el-form-item>
                <el-form-item label="卡内金额：" prop="money" :label-width="formLabelWidth">
                    <span>{{userdetail.money}}</span>
                </el-form-item>
                <el-form-item label="积分：" prop="integral" :label-width="formLabelWidth">
                    <span>{{userdetail.integral}}</span>
                </el-form-item>  
                <el-form-item label="本次消费金额" prop="money" :label-width="formLabelWidth">
                    <el-input-number v-model="num" size="medium" :precision="1" :step="1" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="服务项目" prop="projectId" :label-width="formLabelWidth">
                    <el-select v-model="userdetail.projectId" placeholder="请选择">
                        <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label">
                            <el-option
                                v-for="item in group.project"
                                :key="item.projectId"
                                :label="item.projectName"
                                :value="item.projectId">
                            </el-option>
                        </el-option-group>
                    </el-select>    
                </el-form-item>
                <el-form-item label="消费店铺" prop="storefrontId" :label-width="formLabelWidth">
                    <el-select v-model="store.storefrontName" placeholder="请选择">
                        <el-option
                            v-for="item in store"
                            :key="item.storefrontId"
                            :label="item.storefrontName"
                            :value="item.storefrontName">
                        </el-option>
                    </el-select>    
                </el-form-item>        
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="consumptionCancel()">取 消</el-button>
                <el-button type="primary" @click="consumption()">消 费</el-button>
            </div>
        </el-dialog>

        <el-dialog title="金额充值" width="450px" hight="200px" :visible.sync="dialogFormVisibleRecharge" @close='rechargeCancel()' close-on-press-escape>    
            <el-form :model="userdetail">
                <el-form-item label="客户姓名：" prop="realname" :label-width="formLabelWidth">
                    <span>{{userdetail.realName}}</span>
                </el-form-item>
                <el-form-item label="卡内金额：" prop="money" :label-width="formLabelWidth">
                    <span>{{userdetail.money}}</span>
                </el-form-item>
                <el-form-item label="积分：" prop="integral" :label-width="formLabelWidth">
                    <span>{{userdetail.integral}}</span>
                </el-form-item>  
                <el-form-item label="充值金额" prop="money" :label-width="formLabelWidth">
                    <el-input-number v-model="num" size="medium" :precision="1" :step="1" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="消费店铺" prop="storefrontId" :label-width="formLabelWidth">
                    <el-select v-model="store.storefrontName" placeholder="请选择">
                        <el-option
                            v-for="item in store"
                            :key="item.storefrontId"
                            :label="item.storefrontName"
                            :value="item.storefrontName">
                        </el-option>
                    </el-select>    
                </el-form-item>         
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="rechargeCancel()">取 消</el-button>
                <el-button type="primary" @click="recharge()">充 值</el-button>
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
            //信息检索参数
            query: '',
            select: '',
            placeholder:'请以姓名模糊匹配',
            userList: [],
            // 分页参数
            pageSize: 10,//每页显示条数
            total: 0,
            currentPage: 1,//当前页
            // 控制用户添加框参数
            dialogFormVisibleAdd : false,
            bisible:false,    
            formLabelWidth: '120px',
            value: 1,
            user: {
                realname: '',
                phone: '',
                usercode: '',
                email: '',
                usersex: '',
                cardNumber: '',
                isVip: 0
            },
            rules: {
                realname: [
                    { required: true, message: '请输入客户姓名', trigger: 'blur' },
                ],
                usercode: [
                    { required: true, message: '请输入客户证件号', trigger: 'blur' },
                    { min: 18, max: 18, message: '证件号格式不正确', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator:phoneRules, trigger:'blur'}
                ],
                email: [
                    { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ]
            },
            // 控制用户编辑框参数
            userdetail:{},
            dialogFormVisibleEdit: false,
            // 控制用户消费框参数
            dialogFormVisibleConsumption: false,
            num:0,
            options: [{
                label: '男士',
                project: [],
            },{
                label: '女士',
                project: [],
            }],
            // 控制用户充值框参数
            dialogFormVisibleRecharge: false,
            store:[]
        }
    },
    created(){
        var _this = this;
        _this.getUserList();
        setInterval(function(){
            _this.getUserList();
        },60000)
        _this.getManProjectList();
        _this.getWemanProjectList();
        _this.getAllStorefront();
    },
    methods:{
        getUserList(){
            this.$axios.post('http://10.6.11.82:3000/meigang/user/selectAllVip?pageNum='+this.currentPage+'&pageSize='+this.pageSize, {
                realName:this.query
                }).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.total = result.data.total;
                    this.userList = result.data.list;
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        },
        selectCardNumber(){
            this.$axios.post('http://10.6.11.82:3000/meigang/user/selectAllVip?pageNum='+this.currentPage+'&pageSize='+this.pageSize, {
                cardNumber:this.query
                }).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.total = result.data.total;
                    this.userList = result.data.list;
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        },
        secrchOption(){
            if(this.select==2){
                this.placeholder = '请以卡号匹配';
            }else if(this.select==1){
                this.placeholder = '请以姓名模糊匹配';
            }
        },
        search(){
            if(this.select==2){
                this.selectCardNumber();
            }else{
                this.getUserList();
            } 
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserList();
        },
        showCardNumber(isVip){
            if (isVip==='1') {
                this.bisible=true;
            }else{
                this.bisible=false;
            }
        },
        userAdd(){
            this.dialogFormVisibleAdd = true;
            this.$axios.post('http://10.6.11.82:3000/meigang/user/register', {
                realName:this.user.realname,
                userCode:this.user.usercode,
                phone:this.user.phone,
                userSex:this.user.usersex,
                email:this.user.email,
                cardNumber:this.user.cardNumber,
                isVip:this.user.isVip}).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.$message.success(result.data.errorMessage);
                    this.dialogFormVisibleAdd = false;
                    this.getUserList();
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        },
        cancel(){
            this.dialogFormVisibleAdd = false;
            this.user.realname = '';
            this.user.phone = '';
            this.user.email = '';
            this.user.usersex = '';
            this.user.isVip = 0;
            this.user.usercode = '';
            this.user.cardNumber = '';
            this.$refs["addForm"].clearValidate();
        },
        editCancel(){
            this.dialogFormVisibleEdit = false;
            this.userdetail = {};
            this.$refs["editForm"].clearValidate();
        },
        consumptionCancel(){
            this.dialogFormVisibleConsumption= false;
            this.userdetail = {};
            this.num = '';
        },
        rechargeCancel(){
            this.dialogFormVisibleRecharge = false;
            this.userdetail = {};
            this.num = '';
        },
        changeStatus(isVip,userCode,money){
            if(isVip==1){
                this.$axios.post('http://10.6.11.82:3000/meigang/user/vipChange', {userCode:userCode,isVip:isVip}).then((result) => {
                        if (result.data == null) {
                            this.$notify({
                                title: '错误',
                                message: '开通失败请稍后重试',
                                type: 'error'
                            });
                        }else{
                            this.getUserList();
                            this.$notify({
                                title: '成功',
                                message: result.data.errorMessage,
                                type: 'success'
                            });
                        }
                }).catch((result) => {
                    this.$message.error('网络异常');
                });     
            }else{
                if(money != 0){
                    this.$confirm('该客户卡内余额'+money+'元,确定注销VIP吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios.post('http://10.6.11.82:3000/meigang/user/vipChange', {userCode:userCode,isVip:isVip}).then((result) => {
                            if (result.data == null) {
                                this.$notify({
                                    title: '错误',
                                    message: '开通失败请稍后重试',
                                    type: 'error'
                                });
                            }else{
                                this.$notify({
                                    title: '警告',
                                    message: result.data.errorMessage,
                                    type: 'warning'
                                });
                                this.getUserList();
                            }
                        }).catch((result) => {
                            this.$message.error('网络异常');
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消注销该客户VIP'
                        });
                        this.getUserList();          
                    });
                }else{
                    this.$axios.post('http://10.6.11.82:3000/meigang/user/vipChange', {userCode:userCode,isVip:isVip}).then((result) => {
                        if (result.data == null) {
                            this.$notify({
                                title: '错误',
                                message: '开通失败请稍后重试',
                                type: 'error'
                            });
                        }else{
                            this.$notify({
                                title: '警告',
                                message: result.data.errorMessage,
                                type: 'warning'
                            });
                            this.getUserList();
                        }
                    }).catch((result) => {
                        this.$message.error('网络异常');
                    })
                } 
            }   
        },
        deleteUser(userId){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    this.$axios.post('http://10.6.11.82:3000/meigang/user/deleteUserById?userId='+userId).then((result) => {
                        if (result.data == null) {
                            this.$notify({
                                title: '错误',
                                message: '用户删除失败请稍后重试',
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
                }).catch(() => {
                    this.$notify({
                            title: '取消',
                            message: '已取消删除',
                            type: 'info'
                        });
                    this.getUserList();
                });
        },
        selectUserById(userId){
            this.$axios.post('http://10.6.11.82:3000/meigang/user/selectUserById?userId='+userId).then((result) => {
                    this.userdetail = result.data;
                    this.dialogFormVisibleEdit = true;
                }).catch((result) => {
                    this.$message.error('网络异常');
                });
        },
        userEdit(){
            // this.dialogFormVisibleEdit = false;
            this.$axios.post('http://10.6.11.82:3000/meigang/user/userEdit', {
                userId:this.userdetail.userId,
                realName:this.userdetail.realName,
                userCode:this.userdetail.userCode,
                phone:this.userdetail.phone,
                userSex:this.userdetail.userSex,
                email:this.userdetail.email,
                cardNumber:this.userdetail.cardNumber}).then((result) => {
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
        userConsumption(userId){
            this.$axios.post('http://10.6.11.82:3000/meigang/user/selectUserById?userId='+userId).then((result) => {
                if(result.data.money<=0 && result.data.isVip!=0){
                    this.dialogFormVisibleConsumption = false;
                    this.$notify({
                        title: '警告',
                        message: '卡内余额为空，请前往充值',
                        type: 'warning'
                    });
                }else{
                    this.userdetail = result.data;
                    this.dialogFormVisibleConsumption = true;
                }
                }).catch((result) => {
                    this.$message.error('网络异常');
                });
        },
        userRecharge(userId){
            this.$axios.post('http://10.6.11.82:3000/meigang/user/selectUserById?userId='+userId).then((result) => {
                if (result.data.isVip==0) {
                    this.$notify({
                        title: '警告',
                        message: '该用户尚未开通vip，请前往开通',
                        type: 'warning'
                    });
                }else{
                    this.dialogFormVisibleRecharge = true;
                    this.userdetail = result.data;
                }
                }).catch((result) => {
                    this.$message.error('网络异常');
                });

        },
        consumption(){
            if(this.userdetail.money==0){
                this.$axios.post('http://10.6.11.82:3000/meigang/consumption/addConsumption', {
                    userId:this.userdetail.userId,
                    // userCode:this.userdetail.userCode,
                    consumptionMoney:this.num,
                    projectId:this.userdetail.projectId,
                    consumptionStorefront:this.store.storefrontName}).then((result) => {
                    if (result.data == null) {
                        
                    }else{
                        this.$message.success(result.data.errorMessage);
                        this.store.storefrontName = '';
                        this.getUserList();
                        this.dialogFormVisibleConsumption = false;
                    }
                }).catch((result) => {
                    this.$message.error('网络异常');
                });
            }else{
                this.$axios.post('http://10.6.11.82:3000/meigang/user/consumption', {
                    userId:this.userdetail.userId,
                    userCode:this.userdetail.userCode,
                    money:this.num,
                    projectId:this.userdetail.projectId,
                    consumptionStorefront:this.store.storefrontName}).then((result) => {
                    if (result.data == null) {
                        
                    }else{
                        this.$message.success(result.data.errorMessage);
                        this.getUserList();
                        this.dialogFormVisibleConsumption = false;
                    }
                }).catch((result) => {
                    this.$message.error('网络异常');
                });
            }
        },
        recharge(){
            this.$axios.post('http://10.6.11.82:3000/meigang/user/recharge', {
                userId:this.userdetail.userId,
                userCode:this.userdetail.userCode,
                money:this.num,
                consumptionStorefront:this.store.storefrontName}).then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.$message.success(result.data.errorMessage);
                    this.getUserList();
                    this.dialogFormVisibleRecharge = false;
                }
            }).catch((result) => {
                this.$message.error('网络异常');
            });
        },
        getManProjectList(){
            this.$axios.get('http://10.6.11.82:3000/meigang/service/getManProjectList').then((result) => {
                if (result.data == null) {
                    
                }else{ 
                    this.options[0].project = result.data;
                }
            }).catch((result) => {
            });
        },
        getWemanProjectList(){
            this.$axios.get('http://10.6.11.82:3000/meigang/service/getWemanProjectList').then((result) => {
                if (result.data == null) {
                    
                }else{
                    this.options[1].project = result.data;
                }
            }).catch((result) => {
            });
        },
        getAllStorefront(){
            this.$axios.get('http://10.6.11.82:3000/meigang/storefront/getAllStorefront').then((result) => {
                if (result.data == null) {
                    
                }else{ 
                    this.store = result.data;
                    
                    // this.$forceUpdate();
                }
            }).catch((result) => {});
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
        width: 115px;
    }
</style>