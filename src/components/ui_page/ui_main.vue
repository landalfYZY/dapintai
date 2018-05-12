<template>
  <transition name="fade" mode="out-in">
    <div class="ui-container">
      <div class="ui-header">
        <div class="ui-logo" @click="navigateTo(0,'/ui_home')"><img src="../../assets/img/logo.png" alt=""></div>
        <div class="ui-nav-master">
          <div class="ui-nav-master-item" v-for="(item,index) in uiNavList" :key="index" v-if="index < 4" @click="navigateTo(index,item.path,{},{},item.target)">
            <span :class="item.active ? 'active':''">{{item.label}}</span>
          </div>
          
        </div>
        
        <el-dropdown style="float:right">
          <div class="ui-nav-user" v-show="!showlr">
              <img class="avatar" src="../../assets/img/logo.png" alt="">
              <div class="ell-1 nick-name">{{user.result ? user.result.phone:''}}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item ><div style="width:100px;text-align:center" @click="outLogin()">退出登录</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
        <div class="ui-nav-auxiliary">
          <div class="ui-nav-auxiliary-item"  v-for="(item,index) in uiNavList" :key="index" v-if="index >= 4" @click="navigateTo(index,item.path,{},{},item.target)" >
            <span :class="item.active ? 'active':''">{{item.label}}</span>
          </div>
          <div v-show="showlr" class="ui-nav-auxiliary-item" @click="navigateTo(-1,'/ui_login',{},{})"><span>登录</span></div>
          <div v-show="showlr" class="ui-nav-auxiliary-item" @click="navigateTo(-1,'/ui_register',{},{})"><span>注册</span></div>
        </div>
        
      </div>
      <div class="ui-body">
        <router-view></router-view>
      </div>
      <div class="ui-footer">
        <div class="ui-footer-nav">
          <div class="ui-footer-nav-item" v-for="(item,index) in uiFooterNav" :key="index">
            <div class="title">{{item.label}}</div>
            <div class="children" v-for="(li,lindex) in item.children" :key="lindex">
              <a :href="li.path" target="blank">{{li.label}}</a>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="about">
          <div class="qr-show">
            <div class="title">官方微信</div>
            <img class="qr-pic" src="../../assets/img/qr_wx.jpg" width="80px">
          </div>
          <div class="qr-show">
            <div class="title">官方微博</div>
            <img class="qr-pic" src="../../assets/img/qr_wx.jpg" width="80px">
          </div>
          <div class="qr-show">
            <div class="title">友情链接</div>
            <div class="interlink">
              <a class="interlink-item" v-for="(item,index) in interlink" :key="index" :href="item.path" target="blank"><span>{{item.label}}</span></a>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="record-number">杭州双沃网络科技有限公司©2017 双沃科技 浙ICP备18011227号</div>
        <div style="width:300px;margin:0 auto; padding:20px 0;text-align:center">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33018302000913" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../../assets/img/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33018302000913号</p></a>
        </div>
      </div>
      <div class="rightfix">
        <Tooltip content="操作答疑、定制咨询" placement="left">
          <div class="kf panel-center item-center">
            <img :src="fixicon[0]" width="30px" alt="">
          </div>
        </Tooltip>
        <br>
        <Tooltip content="400-500-50" placement="left">
          <div class="kf panel-center item-center">
            <img :src="fixicon[1]" width="20px" alt="">
          </div>
        </Tooltip>
        <br>
        <Tooltip content="返回顶部" placement="left">
          <div class="kf panel-center item-center" @click="backToTop()">
            <img :src="fixicon[2]" width="20px" alt="">
          </div>
        </Tooltip>
      </div>
    </div>
  </transition>
</template>

<style>
@import url("../../assets/css/common.css");
@import url("../../assets/css/ui_master.css");
</style>

<script>
export default {
  data() {
    return {
      fixicon: [
        sessionStorage.getItem("STATIC_API") + "/static/function/kf.png",
        sessionStorage.getItem("STATIC_API") + "/static/function/pho.png",
        sessionStorage.getItem("STATIC_API") + "/static/function/db.png"
      ],
      showlr: true,
      uiNavList: [
        { label: "首页", path: "/ui_home", active: true, target: "_blank" },
        { label: "小程序模板", path: "/ui_template" },
        { label: "快应用模板", path: "/ui_function" },
        { label: "站内素材", path: "/" },
        { label: "问题反馈", path: "/" },
        { label: "控制台", path: "/ui_console", target: "_blank" }
      ],
      uiFooterNav: [
        {
          label: "产品中心",
          children: [{ label: "微信小程序",path:'https://www.sunwou.com/#/ui_template'}]
        },
        {
          label: "诚意合作",
          children: [{ label: "商务合作" }, { label: "区域代理" }]
        },
        {
          label: "热门活动",
          children: [{ label: "微信活动" }, { label: "区域代理" }]
        },
        {
          label: "关注我们",
          children: [
            { label: "关于我们" },
            { label: "媒体报导" },
            { label: "帮助中心" }
          ]
        },
        {
          label: "联系我们",
          children: [
            { label: "咨询电话: 400-888-5555" },
            { label: "周一至周五 9:00~17:30" },
            { label: "公司地址：浙江省德清县科技新城" }
          ]
        }
      ],
      interlink: [
        { label: "大家地理", path: "http://www.7po.com/" },
        { label: "MongoDB", path: "https://www.mongodb.com/" },
        { label: "VueJS", path: "https://cn.vuejs.org/" },
        { label: "Spring", path: "https://spring.io/" },
        { label: "iviewUI", path: "https://www.iviewui.com/" },
        { label: "Element", path: "http://element.eleme.io/#/" },
        { label: "ReactJS", path: "https://reactjs.org/" },
        { label: "Mysql", path: "https://www.mysql.com/" },
        { label: "阿里云", path: "http://www.aliyun.com/" },
        { label: "微信公众平台", path: "https://mp.weixin.qq.com/" },
        { label: "GitHib", path: "https://github.com/" },
        { label: "nodeJS", path: "https://nodejs.org/en/" },
        { label: "Hadoop", path: "http://hadoop.apache.org/releases.html" },
        { label: "ubuntu", path: "https://www.ubuntu.com/download" },
        { label: "eclipse", path: "https://www.eclipse.org/downloads/" },
        { label: "Redis", path: "https://redis.io/" },
        { label: "小米商城", path: "https://www.mi.com/" },
        { label: "快应用", path: "https://www.quickapp.cn/" }
      ],
      user: {
        result: {}
      }
    };
  },
  mounted() {
    var tem = -1;
    for (var i in this.uiNavList) {
      if (this.uiNavList[i].path == this.$route.fullPath) {
        tem = i;
      }
    }
    if (tem == -1) {
      this.initUiNavList();
    } else {
      this.changeActive(tem);
    }

    if (this.$route.fullPath == "/") {
      this.$router.push({ path: "/ui_home" });
    }
    //登录  注册  入口  关闭
    if (localStorage.getItem("user")) {
      this.showlr = false;
      this.user = JSON.parse(eval("(" + "localStorage.getItem('user')" + ")"));
    }
  },
  watch: {
    $route() {
      if (this.$route.fullPath == "/") {
        this.$router.push({ path: "/ui_home" });
      }
      var tem = -1;
      for (var i in this.uiNavList) {
        if (this.uiNavList[i].path == this.$route.fullPath) {
          tem = i;
        }
      }
      if (tem == -1) {
        this.initUiNavList();
        if(this.$route.fullPath.indexOf('/ui_console') >= 0 || this.$route.fullPath.indexOf('/rich_text') >= 0 ){
          this.changeActive(5);
        }
      } else {
        this.changeActive(tem);
      }
    }
  },
  methods: {
    outLogin() {
      this.user = { result: {} };
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      this.showlr = true;
      this.$router.push("/ui_login");
    },
    backToTop() {
      document.documentElement.scrollTop = 0;
    },
    initUiNavList() {
      for (var i in this.uiNavList) {
        this.uiNavList[i].active = false;
      }
    },
    changeActive(index) {
      this.uiNavList[index].active = true;
    },
    navigateTo(index, path, query, params, target) {
      this.initUiNavList();
      if (index == -1) {
      } else {
        this.changeActive(index);
      }
      this.$router.push({
        path: path,
        query: query,
        params: params,
        target: target
      });
    }
  }
};
</script>
