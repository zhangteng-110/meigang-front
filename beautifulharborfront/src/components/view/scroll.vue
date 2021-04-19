<template>
  <div class="wrap">
    <ul id="marquee">
      <li v-for="(item,index) in lists" :key="index" v-html="'##'+item.noticeText+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'">{{item.noticeText}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "Scroller",
  props: ["lists"],
 // 父组件传入数据， 数组形式
  methods: {
    move() {
      // 获取内容区宽度
      let width = document.getElementById("marquee").scrollWidth;
      let marquee = document.getElementById("marquee");
      let speed = 700; // 位移距离
      // 设置位移
        console.log(width)
      setInterval(function() {
        speed = speed - 1;
        // 如果位移超过文字宽度，则回到起点

        if (-speed >= width*15) {
          speed = 700;
        }
        marquee.style.transform = "translateX(" + speed + "px)";
      }, 40);
    }
  },
  mounted: function() {
    this.move();
  }
};
</script>
<style scoped>
/*样式的话可以写*/
  .wrap {
    overflow: hidden;
    color: red;
  }
  #box {
    height: 100%;
  }
  ul,
    li {
      margin: 0;
      padding: 0;
    }
  ul {
    white-space: nowrap;
    margin: 0 10px;
  }
  li {
    height: 100%;
    list-style: none;
    margin-right: 10px;
    display: inline-block;
  }
</style>