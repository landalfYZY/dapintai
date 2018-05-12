<template>
  <transition name="fade" mode="out-in">
    <div style="padding-bottom:50px" >
      <div class="ui-template-bg " :style="'background-image:url('+bg+')'">
        <div class="back-bg" >
          <div class="width-900 margin-center">
            <div class="title">快应用模板</div>
            <div class="ui-template-form-search">
              <input type="text" class="ui-template-input-search" placeholder="输入功能名称、行业名称搜索">
              <div class="ui-template-btn-search" style="padding-top:5px"><Icon type="ios-search" size="25"  color="#ffffff"></Icon></div>
            </div>
          </div>
        </div>
      </div>

      <div class="width-1200 margin-center ui-function-panel ">
        <div class="ui-template-filter-panel">

        </div>
        <!-- <Spin >
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        </Spin> -->
        <div style="text-align:center">敬请期待，与官方同步</div>
      </div>
    </div>
  </transition>
</template>
<style>
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
<script>
export default {
  data(){
    return {
      bg:sessionStorage.getItem('STATIC_API')+'static/bg2.jpg',
      list:[

      ]
    }
  },

}
</script>
