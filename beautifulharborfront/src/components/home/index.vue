<template>
  <el-card class="el-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <i :class="{'el-icon-s-fold':isCollapse,'el-icon-s-unfold':!isCollapse}" @click="isC()" style="color: black"></i> -->
      <el-breadcrumb-item :to="{ path: ''}">
        首页
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <div class="overview-layout">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="out-border">
              <div class="layout-title">用户总览(单位/人)</div>
              <div style="padding: 20px">
                <el-row :span="24">
                  <el-col :span="7" style="margin-top: 50px">
                    <el-row>
                      <el-col :span="7" class="color-danger overview-item-value">{{ usernumber }}</el-col>
                      <el-col :span="7" class="color-danger overview-item-value">{{ staffnumber-1 }}</el-col>
                      <el-col :span="7" class="color-danger overview-item-value">{{ uservipnum }}</el-col>
                    </el-row>
                    <el-row style="margin-top: 20px">
                      <el-col :span="7" class="overview-item-title">客户</el-col>
                      <el-col :span="7" class="overview-item-title">员工</el-col>
                      <el-col :span="7" class="overview-item-title">VIP</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="17">
                    <el-row>
                      <el-col style="text-align:center;margin-top: 20px;margin-bottom: 20px" :span="6">        
                        <el-progress :width="150" type="circle" :percentage="parseInt((this.uservipnum/this.usernumber)*100)" v-if="parseInt((this.uservipnum/this.usernumber)*100)"></el-progress>
                        <span style="color:#909399;font-size: 14px">VIP占比：{{ uservipnum }}/{{ usernumber }}</span>
                      </el-col>
                      <el-col :span="11" >
                        <div ref="echartsNumber" style="width: 400px;height:200px;margin-left:10px"></div>
                      </el-col>
                    </el-row>
                    
                  </el-col>
                </el-row>
              </div>
            </div> 
          </el-col>
        </el-row>
      </div>
      <div class="statistics-layout">
        <div class="layout-title">营业额统计</div>
        <el-row>
          <el-col :span="6">
            <div style="padding: 20px">
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">上月营业额</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">￥{{ lastmonthmoney }}</div>
                <!-- <div>
                  <span class="color-danger" style="font-size: 14px">-10%</span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                </div> -->
              </div>
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">昨日营业额</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">￥{{ tomorrowmoney }}</div>
                <!-- <div>
                  <span class="color-success" style="font-size: 14px">+10%</span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                </div> -->
              </div>        
              <div style="margin-top: 20px;">
                <div style="color: #909399;font-size: 14px">今年总营业额</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">￥{{ lastyearmoney }}</div>
                <!-- <div>
                  <span class="color-success" style="font-size: 14px">+10%</span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                </div> -->
              </div>
              <div style="margin-top: 20px;">
                <!-- <div style="color: #909399;font-size: 14px">本周销售总额</div>
                <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div> -->
                <!-- <div>
                  <span class="color-danger" style="font-size: 14px">-10%</span>
                  <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                </div> -->
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div ref="echarts" style="margin-top: 30px;width: 600px;height:400px;"></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="slot-layout">
      <el-tabs :stretch="true" type="border-card">
          <el-tab-pane label="店铺vip充值排行榜">
            <div v-for="(store,index) in storefront" :key="index" class="text item">
              <div style="padding:15px 10px;">
                <div style="background: #1e436e;color:#fff;margin-right: 5px;width: 20px;height: 20px;float: left;border-radius:50%;text-align:center;">{{index+1}}</div>
                <span style="font-style: oblique;font-size: 14px;">{{store.transactionStorefront}}</span>
                <div style="float:right;font-style: oblique;font-size: 14px;color:#851818;">{{store.transactionMoney}}￥</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="店铺营销排行榜">
            <div v-for="(shop,index) in store" :key="index" class="text item">
              <div style="padding:15px 10px;">
                <div style="background: #1e436e;color:#fff;margin-right: 5px;width: 20px;height: 20px;float: left;border-radius:50%;text-align:center;">{{index+1}}</div>
                <span style="font-style: oblique;font-size: 14px;">{{shop.consumptionStorefront}}</span>
                <div style="float:right;font-style: oblique;font-size: 14px;color:#851818;">{{shop.consumptionMoney}}￥</div>
              </div>
            </div>
          </el-tab-pane>
      </el-tabs>
      <!-- <div class="layout-title">
        
      </div> -->
      
    </div>
  </el-card>  
</template>

<script>
  // import {str2Date} from '@/utils/date';
  // import img_home_order from '@/assets/images/home_order.png';
  // import img_home_today_amount from '@/assets/images/home_today_amount.png';
  // import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  export default {
    name: 'home',
    data() {
      return {
        staffnumber: 0,
        usernumber: 0,
        uservipnum: 0,
        tomorrowmoney: 0,
        lastmonthmoney: 0,
        lastyearmoney: 0,
        isCollapse: true,
        storefront: [],
        store: []
      }
    },
    created(){
      this.getStaffNumber();
      this.getUserNumber();
      this.getUserVipNumber();
      this.getTomorrowMoney();
      this.getLastMonthMoney();
      this.getLastYearMoney();
      this.$nextTick(() => {
        this.myEcharts();
      });
      this.getAllStorefront();
      this.getAllStore();
      setInterval(()=>{
        this.getStaffNumber();
        this.getUserNumber();
        this.getUserVipNumber();
        this.getTomorrowMoney();
        this.getLastMonthMoney();
        this.getLastYearMoney();
        this.$nextTick(() => {
          this.myEcharts();
        });
        this.getAllStorefront(); 
        this.getAllStore();   
      },10000)
      
    },
    updated(){
      this.$nextTick(() => {
          this.myEchartsNum();
      });  
      setInterval(()=>{
        this.$nextTick(() => {
          this.myEchartsNum();
        });   
      },10000)
    },
    methods:{
      getStaffNumber(){
        this.$axios.get('http://10.6.11.82:3000/meigang/staff/getStaffNumber').then((result) => {
            this.staffnumber = result.data
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
      getUserNumber(){
        this.$axios.get('http://10.6.11.82:3000/meigang/user/getUserNumber').then((result) => {
            this.usernumber = result.data
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
      getUserVipNumber(){
        this.$axios.get('http://10.6.11.82:3000/meigang/user/getUserVipNumber').then((result) => {
            this.uservipnum = result.data
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
      getTomorrowMoney(){
        this.$axios.get('http://10.6.11.82:3000/meigang/transaction/selectTomorrowTransactionMoney').then((result) => {
            this.tomorrowmoney = result.data
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
      getLastMonthMoney(){
        this.$axios.get('http://10.6.11.82:3000/meigang/transaction/selectMonthTransactionMoney').then((result) => {
            this.lastmonthmoney = result.data
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
      getLastYearMoney(){
        this.$axios.get('http://10.6.11.82:3000/meigang/transaction/selectLastYearMoney').then((result) => {
            this.lastyearmoney = result.data
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
      myEcharts(){
        // 基于准备好的dom，初始化echarts实例
        var bar_dv = this.$refs.echarts;
        let myChart = this.$echarts.init(bar_dv);
        // 指定图表的配置项和数据
        this.$axios.get('http://10.6.11.82:3000/meigang/transaction/selectEveryYearMoney').then((result) => {
            var option = {
              title: {
                text: '年度营业额'
              },
              tooltip: {},
              legend: {
                data:['营业额']
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["1","2","3","4","5","6","7","8","9","10","11","12"]
                
              },
              yAxis: {
                type: 'value',
          
              },
              series: [{
                name: '营业额',
                type: 'line',
                data: result.data,
                areaStyle: {
                }
              }]
            };
          myChart.setOption(option);
          // window.addEventListener('resize', () => {
          //       // 自动渲染echarts
          //       myChart.resize();
          //   })
        }).catch((result) => {
            this.$message.error('网络异常');
        });
        
        // 使用刚指定的配置项和数据显示图表。
      },
      myEchartsNum(){
        let myEchartsNum = this.$echarts.init(this.$refs.echartsNumber);
        myEchartsNum.setOption({
          series : [
              {
                  name: '人数占比',
                  type: 'pie',
                  radius: '70%',
                  center: ['50%', '50%'],
                  color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                  data:[
                      {value:this.usernumber, name:'客户'},
                      {value:this.staffnumber-1, name:'员工'}
                  ],
                  lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  },
                  textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  },
                  itemStyle:{ 
                    normal:{ 
                      label:{ 
                        show: true, 
                        formatter: '{b} : {c} ({d}%)' 
                      }, 
                      labelLine :{show:true} 
                    } 
                  },
                  
                  
              }
          ]
        });
      },
      isC(){
        this.isCollapse = !this.isCollapse
        if (this.$store.state.isCollapse==false) {
          this.$store.commit('increment')
          alert(this.$store.state.isCollapse)
        }else{
          this.$store.state.isCollapse = false;
        }
      },
      getAllStorefront(){
        this.$axios.get('http://10.6.11.82:3000/meigang/transaction/selectSlotStorefront').then((result) => {
          if (result.data == null) {
                    
          }else{ 
            this.storefront = result.data;
            // this.$forceUpdate();
          }
        }).catch((result) => {});
      },
      getAllStore(){
        this.$axios.get('http://10.6.11.82:3000/meigang/consumption/selectSlotStorefront').then((result) => {
          if (result.data == null) {
                    
          }else{ 
            this.store = result.data;
            // this.$forceUpdate();
          }
        }).catch((result) => {});
      },
    }
  }
</script>

<style scoped>
  .app-container {
    /* margin-top: 40px; */
    /* margin-left: 120px;
    margin-right: 120px; */
    width: 70%;
    float: left;
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 10px;
    height: 70px;
  }

  .total-icon {
    color: #721919;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606366;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #a9c3eb;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
    /* width: 80%; */
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
    /* width: 80%; */
  }
  
  .address-content{
    padding: 20px;
    font-size: 18px
  }

  .left{
    float:left;
    width:600px;
  }

  .slot-layout{
    width: 29%;
    float: right;
    margin-top: 20px;
    margin-left: 10px;
    /* border: 1px solid #DCDFE6; */
    height: 1048px;
  }

  .el-tabs{
    height: 1048px;
  }

  .el-tabs /deep/ .el-tabs__header{
    height: 50px;
    background: #409eff;
  }
  
  .el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active{
    height: 50px;
    /* background: #409eff; */
    color: #606266;
    padding-top: 5px;
    background: #a9c3eb;
    font-weight: bold;
  }

  .el-tabs /deep/ .el-tabs__header .el-tabs__nav-wrap{
    height: 50px;
    background: #a9c3eb;
  }
  
  .el-tabs /deep/ .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll{
    background: #a9c3eb;
    height: 50px;
  }

  .el-tabs /deep/ .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav.is-stretch{
    background: #a9c3eb;
    height: 50px;
  }
</style>
