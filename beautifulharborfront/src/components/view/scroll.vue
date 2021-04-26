<template>
    <div class="textBox">
      <span style="float:left;margin-left:30%;padding-right:1%"><Myhorn></Myhorn></span>
      <transition name="slide">
        <p class="text" :key="text.id" v-html="text.val">{{text.val}}</p>
      </transition>
    </div>
</template>
 
<script>
  import Myhorn from "@/components/view/horn"
export default {
  name: 'scroll',
  components:{
    Myhorn
  },
  data () {
    return {
      noticeList: [],
      number: 0,
      data: []
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.data[this.number]
      }
    }
  },
  mounted () {
    this.startMove()
  },
  created(){
    this.getNotice()
  },
  methods: {
    getNotice(){
        this.$axios.get('http://10.6.11.82:3000/meigang/notice/selectNotice').then((result) => {
          if (result == null) {
            
          }else{
            // this.noticeList = result.data
            result.data.forEach(element => {
              this.data.push(element.noticeText)
            });
            // console.log(this.data)
          }
        }).catch((result) => {
            this.$message.error('网络异常');
        });
      },
    startMove () {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        if (this.number === 2) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
    }
  }
}
</script>
<style>
  .textBox {
    width: 100%;
    height: 30px;
    margin: 0 auto;
    /* overflow: hidden;
    position: relative; */
    /* text-align: center; */
  }
  .text {
    width: 100%;
    /* position: absolute; */
    bottom: 0;
    line-height: 30px;
  }
  .el-alert__content{
    width: 100%;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter{
    transform: translateY(20px) scale(1);
    opacity: 1;
  }
  .slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  }
  
</style>