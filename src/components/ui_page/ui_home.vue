<template>
  <transition name="fade" mode="out-in">
    <div>
      <Carousel autoplay v-model="carouselCurrent" loop :autoplay-speed="8000">
        <CarouselItem>
            <div class="carousel-item" :style="'background-image:url('+carsouelImg[0]+')'">
              <div class="carousel-item-bg panel-center item-center">
                <div>
                  <img :src="carsouelImg[2]" alt=""><br>
                  <div style="font-size:20px;color:#fff;margin-left:20px;margin-top:30px">一键快速接入使用</div>
                  <div class="btn-ui-ui">立刻接入使用</div>
                </div>
              </div>
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="carousel-item" :style="'background-image:url('+carsouelImg[1]+')'"></div>
        </CarouselItem>
      </Carousel>
      <div class="panel ui-home-function">
        <div class="title">小程序核心功能</div>
        <div class="width-1200 margin-center panel-around">
          <div v-show="tmp" class="icon-item" v-for="(item,index) in iconList" :key="index" @mouseover="changeIconSelect(index)">
            <div class="icon"><img :src="item.active ? item.selectedIcon : item.icon"  width="40px"></div>
            <div class="label" :style="item.active ? 'color:#0099ff':''">{{item.label}}</div>
          </div>
        </div>
        <div class="width-1200 margin-center">
          <div class="flag" ><img src="../../assets/img/down.png"></div>
        </div>
        <div class="show-function" style="overflow:hidden">
          <div v-show="tmp" style="height:500px" class="animated fadeInUp panel-center item-center" v-for="(item,index) in iconList" :key="index" v-if="index == iconListFlag">
            <div  >
              <img :src="iconList[index].image"  :width="iconList[index].width" >
            </div>
            <div style="margin-left:300px;">
              <div v-html="iconList[index].content" style="width:400px"></div>
            </div>
          </div>
        </div>

      </div>
      <div class="panel ui-home-function">
        <div class="title">各行各业的小程序模板</div>
        <div class="width-1200 margin-center panel-around item-center" style="margin-top:30px">
          <div class="idu-item" v-for="(item,index) in industryList" :key="index" :style="'background-image:url('+item.url+')'">
            <div class="id-panel">
              <div class="title">{{item.title}}</div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel ui-home-function">
        <div :style="'background:url('+bg[0]+') ;background-position:center;background-size: cover;background-attachment:fixed;'">
          <div class="show-function"  style="padding:50px;background-color:rgba(41,44,54,0.8)">
            <div class="title">小程序核心场景</div>
            <div class="width-1200 margin-center panel-around item-center" style="margin-top:30px;padding-top:30px">
              <div v-for="(item,index) in sceneList" :key="index" style="width:20%;text-align:center;padding:20px" >
                <div><img :src="item.url" width="40px" alt=""></div>
                <div class="font-white" style="font-size:16px;margin-top:5px">{{item.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel ui-home-function">
        <div class="title">热门小程序推荐</div>
        <div class="width-1200 margin-center panel-around item-center" style="margin-top:30px">
          <div class="ui_home_mini" v-for="(item,index) in pubList" :key="index" @click="navTo('ui_template_detail',{id:item.sunwouId})">
            <div class="iu_home_mini_bg" :style="'background-image:url('+item.modelCover+');background-size:cover;background-position:center'"></div>
            <div class="ell-1 ui-home-mini-txt">{{item.modelName}}</div>
          </div>
        </div>
        <div class="ui_home_mini_btn" @click="navTo('ui_template')">查看更多</div>
      </div>
      <div class="panel ui-home-function">
        <div class="title">小程序使用流程</div>
        <div class="width-1200 margin-center panel-center item-center" style="margin-top:50px">
          <div class="panel-start item-center">
            <div class="ui-home-cri">1</div>
            <div class="ui-home-cri-text">注册微信小程序并完成微信认证</div>
          </div>
          <div class="ui-home-line"></div>
          <div class="panel-start item-center">
            <div class="ui-home-cri">2</div>
            <div class="ui-home-cri-text">创建小程序并选择一个模板</div>
          </div>
          <div class="ui-home-line"></div>
          <div class="panel-start item-center">
            <div class="ui-home-cri">3</div>
            <div class="ui-home-cri-text">上传并提交审核</div>
          </div>
          <div class="ui-home-line"></div>
          <div class="panel-start item-center">
            <div class="ui-home-cri">4</div>
            <div class="ui-home-cri-text">小程序上线</div>
          </div>
          
        </div>
        <div class="ui_home_mini_btn" style="margin-top:50px">创建小程序</div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import url('../../assets/css/ui_home.css');
@import url('../../assets/css/animate.css');
.ui_home_mini_btn{
  width: 120px;
  margin: auto;
  line-height: 40px;
  background: #0099ff;
    
  background: linear-gradient(left bottom,#0099ff,#e665bf); 
  background: -webkit-linear-gradient(left bottom,#0099ff,#e665bf);  
  background: -o-linear-gradient(left bottom,#0099ff,#e665bf);    
  background: -moz-linear-gradient(left bottom,#0099ff,#e665bf);
   
  color: #ffffff;
  text-align: center;
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
}
.ui_home_mini_btn:hover{
  background: #0099ff
}
.ui-home-cri{
  width: 40px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  background: #0099ff;
  background: linear-gradient(left bottom,#0099ff,#e665bf);  
  background: -webkit-linear-gradient(left bottom,#0099ff,#e665bf);  
  background: -o-linear-gradient(left bottom,#0099ff,#e665bf);    
  background: -moz-linear-gradient(left bottom,#0099ff,#e665bf);
}
.btn-ui-ui{
  width: 150px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  margin-top: 30px;
  margin-left:20px;
  color:#fff;
  cursor: pointer;
  border-radius: 40px;
  background: #0099ff;
  background: linear-gradient(left bottom,#0099ff,#e665bf);  
  background: -webkit-linear-gradient(left bottom,#0099ff,#e665bf);  
  background: -o-linear-gradient(left bottom,#0099ff,#e665bf);  
  background: -moz-linear-gradient(left bottom,#0099ff,#e665bf); 
}
.btn-ui-ui:hover{
  background: #0099ff
}
</style>
<script>
export default {
  data () {
    return {
      bg:[
        sessionStorage.getItem('STATIC_API')+'static/bg2.jpg'
      ],
      carsouelImg:[
        sessionStorage.getItem('STATIC_API')+'static/function/bg1.jpg',
        sessionStorage.getItem('STATIC_API')+'static/function/bg2.jpg',
        sessionStorage.getItem('STATIC_API')+'static/function/kj.png',
      ],
      tmp:true,
      iconListFlag:0,
      carouselCurrent:0,
      iconList:[
        {icon:sessionStorage.getItem('STATIC_API')+'/static/function/f1.png',selectedIcon:sessionStorage.getItem('STATIC_API')+'/static/function/q1.png',label:'附近',image:sessionStorage.getItem('STATIC_API')+'/static/function/se1.png',width:'400px',
          content:'<div style="width:400px"><div style="font-size:25px;color:#ffffff">附近的小程序</div><div style="font-size:16px;color:#e1e1e1;line-height:30px">帮助商户快速、低门槛地在指定地点展示小程序，以方便被周围的用户找到并使用。“附近的小程序”是一种典型的线下场景集合。你的附近，可能会出现：公众号关联的“门店小程序”和普通小程序。</div></div>'},
        {icon:sessionStorage.getItem('STATIC_API')+'/static/function/f2.png',selectedIcon:sessionStorage.getItem('STATIC_API')+'/static/function/q2.png',label:'卡券',image:sessionStorage.getItem('STATIC_API')+'/static/function/se3.png',width:'400px',
          content:'<div style="width:400px"><div style="font-size:25px;color:#ffffff">微信卡包</div><div style="font-size:16px;color:#e1e1e1;line-height:30px">主要是增加了卡券使用的便捷和易用性,管理银行卡、优惠券等信息。将原来存在于各服务商公众号或服务号里面的优惠券、打折券等信息，从更加底层的公众号/服务号菜单中提取出来，集中在卡券菜单里显示</div></div>'},
        {icon:sessionStorage.getItem('STATIC_API')+'/static/function/f3.png',selectedIcon:sessionStorage.getItem('STATIC_API')+'/static/function/q3.png',label:'扫码',image:sessionStorage.getItem('STATIC_API')+'/static/function/se4.png',content:'dsfdsfsd',width:'400px',
          content:'<div style="width:400px"><div style="font-size:25px;color:#ffffff">微信卡包</div><div style="font-size:16px;color:#e1e1e1;line-height:30px">通过微信扫描二维码跳转到了我指定的小程序页面,使小程序的线下使用更加灵活。</div></div>'},
        {icon:sessionStorage.getItem('STATIC_API')+'/static/function/f4.png',selectedIcon:sessionStorage.getItem('STATIC_API')+'/static/function/q4.png',label:'支付',image:sessionStorage.getItem('STATIC_API')+'/static/function/se2.png',width:'400px',content:'sdfdsfsd'},
        {icon:sessionStorage.getItem('STATIC_API')+'/static/function/f5.png',selectedIcon:sessionStorage.getItem('STATIC_API')+'/static/function/q5.png',label:'生物识别',image:sessionStorage.getItem('STATIC_API')+'/static/function/se6.png',width:'400px',content:'sdfdsf'},
        {icon:sessionStorage.getItem('STATIC_API')+'/static/function/f6.png',selectedIcon:sessionStorage.getItem('STATIC_API')+'/static/function/q6.png',label:'数据分析',image:sessionStorage.getItem('STATIC_API')+'/static/function/se7.png',width:'400px',content:'sdfsdfsdf'}
      ],
      industryList:[
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h1.png',title:'酒店民宿',text:'打通线上线下预约'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h2.jpg',title:'堂食餐饮',text:'到店消费，智慧点餐'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h3.jpg',title:'新闻论坛',text:'将资源聚合以全新的形式提供资讯服务'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h4.jpg',title:'旅游',text:'为旅游行业客户提供高效的特色推荐功能'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h5.jpg',title:'家居',text:'低成本助商家打造购物社交化平台'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h6.jpg',title:'摄影',text:'线上运营、线下消费'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h7.jpg',title:'同城',text:'租房、二手房、二手车、宠物等行业小程序'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h8.jpg',title:'预约',text:'线上运营、线下消费'}
      ],
      sceneList:[
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/l1.png',title:'分享到群'},{url:sessionStorage.getItem('STATIC_API')+'/static/function/l2.png',title:'线下扫码'},{url:sessionStorage.getItem('STATIC_API')+'/static/function/l3.png',title:'微信搜索'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/l4.png',title:'聊天顶部'},{url:sessionStorage.getItem('STATIC_API')+'/static/function/l5.png',title:'推荐给好友'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/l6.png',title:'附近的小程序'},{url:sessionStorage.getItem('STATIC_API')+'/static/function/l7.png',title:'支付完成页'},{url:sessionStorage.getItem('STATIC_API')+'/static/function/l8.png',title:'小程序列表'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/l9.png',title:'公众号主页'},{url:sessionStorage.getItem('STATIC_API')+'/static/function/l10.png',title:'公众号文章'},
      ],
      miniprogramList:[
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h1.png',title:'莫干民宿'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h2.jpg',title:'西式餐厅'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h3.jpg',title:'新闻咨询'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h4.jpg',title:'浪漫旅行'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h5.jpg',title:'家居生活'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h1.png',title:'牛比小程序'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h2.jpg',title:'牛比小程序'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h3.jpg',title:'牛比小程序'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h4.jpg',title:'牛比小程序'},
        {url:sessionStorage.getItem('STATIC_API')+'/static/function/h5.jpg',title:'牛比小程序'},
      ],
      pubQuery: {
        fields: ["modelCover","modelName"],
        wheres: [
          {
            value: "isDelete",
            opertionType: "equal",
            opertionValue: false
          },
          {
            value: "status",
            opertionType: "equal",
            opertionValue: "上架"
          }
        ],
        sorts: [
          {value:'createTime',asc:false}
        ],
        pages: {
          currentPage: 1,
          size: 10
        }
      },
      pubList: [],
    }
  },
  mounted () {
    document.body.scrollTop = 0
    this.initIconList();
    this.iconList[this.iconListFlag].active = true;
    $(".flag").animate({'margin-left':60});
    this.getPubList()
  },
  methods: {
    navTo(path,query,params,target){
      this.$router.push({path:path,query:query,params:params,target:target});
    },
    /**初始化 功能 列表 */
    initIconList(){
      for(var i in this.iconList){
        this.iconList[i].active = false;
      }
    },
    getPubList() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "miniProMod/find",
        type: "POST",
        data: {
          query: JSON.stringify(this.pubQuery)
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            
            that.pubList = res.params.result;
          } else {
            that.$Message.error(res.msg);
          }
        },
        complete(){
        }
      });
    },
    /** mouseover 到 图标  改变事件 */
    changeIconSelect(index){
      //this.initIconList();
      this.iconList[this.iconListFlag].active = false;
      this.iconListFlag = index;
      this.iconList[index].active = true;
      $(".flag").animate({'margin-left':60+index*200});
      this.tmp = false;
      this.tmp = true
    }
  }
}
</script>
