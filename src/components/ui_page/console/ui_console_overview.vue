<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">信息总览</div>
      </div>
      <div class="panel-between" style="width:1000px">
        <div class="miniprogram-panel">
          <div class="title">小程序</div>
          <div class="panel-around">
            <div class="mp-item" v-for="(item,index) in miniProList" :key="index">
              <div class="title">{{item.label}}</div>
              <div :class="'text '+item.color">{{item.value}}</div>
            </div>
          </div>
        </div>
        <div class="space-panel">
          <div class="title">云盘空间</div>
          <div class="panel-around">
            <div class="mp-item" >
              <div class="title">总空间</div>
              <div class="text font-primary">5G</div>
            </div>
            <div class="mp-item" >
              <div class="title">已使用</div>
              <div class="text font-primary">2.2G</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>

export default {
  data () {
    return {
      miniProList:[
        {label:'总数量',value:0,color:'font-primary'},{label:'运行中',value:0,color:'font-success'},
        {label:'即将过期',value:0,color:'font-danger'},{label:'已过期',value:0,color:'font-danger'}
      ]
    }
  },
  mounted(){
    this.initCharts()
  },
  methods: {
    initCharts(){
    }
  }
}
</script>


<style>
.space-panel{
  width: 326px;
  padding: 10px 0;
  background: #f3f3f3;
  border-radius: 5px
}
.space-panel > .title{
  width: 100%;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.space-panel > .title:hover{
  color: #888
}
.space-panel .mp-item{
  text-align: center
}
.space-panel .mp-item > .title{
  line-height: 30px
}
.space-panel .mp-item > .text{
  font-size: 20px
}
.miniprogram-panel{
  width: 653px;
  padding: 10px 0;
  background: #f3f3f3;
  border-radius: 5px
}
.miniprogram-panel > .title{
  width: 100%;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.miniprogram-panel > .title:hover{
  color: #888
}
.miniprogram-panel .mp-item{
  text-align: center
}
.miniprogram-panel .mp-item > .title{
  line-height: 30px
}
.miniprogram-panel .mp-item > .text{
  font-size: 20px
}
</style>

