<template>
  <transition name="fade" mode="out-in">
    <div class="panel-center">
      <div class="console-sidebar">
        <div class="sidebar-item" v-for="(item,index) in sidebarList" :key="index">
          <div class="title">
            <Icon :type="item.icon" size="20"></Icon>
            <div class="label">{{item.label}}</div>
          </div>
          <div  v-for="(li,lindex) in item.children" :key="lindex" class="sub-sidebar-item" :style="li.active ? 'background:#e1e1e1':''" @click="navigateTo(index,lindex)">
            <span>{{li.label}}</span>
          </div>
        </div>
      </div>
      <div class="console-body" id="consoleBody">
        <div class="cb-panel">
          <router-view></router-view>
        </div>

      </div>
    </div>
    
  </transition>
</template>
<style >
@import url('../../../assets/css/common.css');
@import url('../../../assets/css/ui_console.css');
</style>

<script>
export default {
  data () {
    return {
      sidebarList:[
        {icon:'stats-bars',label:'概览',children:[
          {label:'信息总览',path:'/ui_console_overview'}
        ]},
        {icon:'link',label:'小程序',children:[
          {label:'小程序信息',path:'/ui_console_miniprogram'},
          {label:'创建小程序',path:'/ui_console_miniprogram_create'},
          {label:'小程序模板',path:'/ui_console_miniprogram_modal'},
          {label:'发布小程序模板',path:'/ui_console_modal'}
        ]},
        {icon:'images',label:'文件库',children:[
          {label:'文件管理',path:'/ui_console_gallery'},
          {label:'空间管理',path:'/'}
        ]},
        {icon:'cash',label:'交易记录',children:[
          {label:'交易记录',path:'/ui_console_trans'}
        ]},
        {icon:'document-text',label:'文章管理',children:[
          {label:'文章列表',path:'/rich_text_list'},
          {label:'编辑文章',path:'/rich_text'}
        ]}
      ]
    }
  },
  watch:{
    $route(){
      for(var i in this.sidebarList){
        for(var j in this.sidebarList[i].children){
          if(this.sidebarList[i].children[j].path == this.$route.fullPath){
            this.changeActive(i,j)
          }
        }
      }
      if(this.$route.fullPath == '/ui_console'){
        this.$router.push({path:'/ui_console_overview'})
      }
    },
  },
  
  mounted () {
    $("#consoleBody").css("width",window.innerWidth-200)
    this.initSidebarList();
    this.sidebarList[0].children[0].active = true;
    if(this.$route.fullPath == '/ui_console'){
      this.$router.push({path:'/ui_console_overview'})
    }
    if(!localStorage.getItem('user')){
      sessionStorage.setItem('tempPath','/ui_console')
      this.$router.push('/ui_login');
    }
  },
  methods: {
    initSidebarList(){
      for(var i in this.sidebarList){
        for(var j in this.sidebarList[i].children){
          this.sidebarList[i].children[j].active = false;
        }
      }
    },
    changeActive(i,j){
      this.initSidebarList();
      this.sidebarList[i].children[j].active = true;
    },
    navigateTo(i,j){
      this.$router.push({path:this.sidebarList[i].children[j].path});
      //this.changeActive(i,j)
    }
  }
}
</script>
