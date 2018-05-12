<template>
  <transition name="fade" mode="out-in">
    <div style="padding-bottom:50px">
      <div class="ui-template-bg" :style="'background-image:url('+bg+')'">
        <div class="back-bg">
          <div class="width-900 margin-center">
            <div class="title">小程序精品模板</div> 
            <div class="ui-template-form-search">
              <input type="text" v-model="searchText" class="ui-template-input-search" @keyup.enter="searchModel()" placeholder="输入模板名称、行业名称风格搜索">
              <div class="ui-template-btn-search" @click="searchModel()" style="padding-top:5px"><Icon type="ios-search" size="25"  color="#ffffff"></Icon></div>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#f3f3f3;padding:15px;width:100%;">
        <div class="width-1200 margin-center">
          <div class="panel-start item-center">
            <div style="margin-bottom:5px">适用行业</div>
            <div style="width:1130px" class="panel-start">
              <div v-for="(item,index) in tradeTags" :key="index" :class="item.active ? 'tagsss tagact ':'tagsss'" @click="handleCheckedTradesChange(index,'checkedTrades','tradeTags',item.tagName)">{{item.tagName}}</div>
            </div>
          </div>
          <div class="panel-start item-center" style="margin-top:5px">
            <div style="margin-bottom:5px">模板风格</div>
            <div style="width:1130px" class="panel-start">
              <div v-for="(item,index) in styleTags" :key="index" :class="item.active ? 'tagsss tagact':'tagsss'" @click="handleCheckedTradesChange(index,'checkedStyle','styleTags',item.tagName)">{{item.tagName}}</div>
            </div>
          </div>
          <div class="panel-between">
            <div class="panel-start item-center" style="margin-top:5px">
              <div style="margin-bottom:5px">商户性质</div>
              <div style="width:1030px" class="panel-start">
                <div v-for="(item,index) in shopTags" :key="index" :class="item.active ? 'tagsss tagact':'tagsss'" @click="handleCheckedTradesChange(index,'checkedShop','shopTags',item.tagName)">{{item.tagName}}</div>
              </div>
            </div>
            <div style="margin-right:30px;margin-top:10px;color:#888888;cursor:pointer" @click="clearChecked()">清除筛选</div>
          </div>
          
        </div>
      </div>
      <div class="panel-center" style="padding:40px" v-show="load">
          <Spin>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            </Spin>
        </div>
      <div class="width-1200 margin-center ui-template-show-panel" >
        
        <div class="ui-template-item" v-for="(item,index) in pubList" :key="index" @click="navTo('/ui_template_detail',{id:item.sunwouId})">
          <div class="ui-bg" :style="'background-image:url('+item.modelCover+');background-size:cover;background-position:center'">
            <div class="ui-label ell-1" title="外卖 / 餐饮 / ">
              <span v-for="li in item.industry" :key="li">{{li}} /</span>
              <span v-for="(li,index) in item.modelStyle" :key="index">{{li}} {{index == item.modelStyle.length-1 ? '':'/'}}</span>
            </div>
          </div>
          <div class="ui-con">
            <div class="panel-between title item-center">
              <div class="tit ell-1">{{item.modelName}}</div>
              <div class="font-danger tit1 ">￥{{item.modelPrice}}</div>
            </div>

            <div class="panel-between tit">
              <div class="font-error tit1"><span v-for="(li,index) in item.businssType" :key="index">{{li}} {{index == item.businssType.length-1 ? '':'/'}}</span></div>
              <div class="font-primary tit2">查看</div>
            </div>
          </div>
        </div>
        <div class="width-1200">
          <el-pagination style="float:right;margin-top:50px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pubQuery.pages.currentPage"  :page-size="24"
            layout="total, prev, pager, next, jumper" :total="pubTotal">
          </el-pagination>
          <div class="clearfix"></div>
        </div>

      </div>

    </div>
  </transition>
</template>
<style>
.tagsss{
margin-left:30px;margin-bottom:5px;cursor:pointer
}
.tagsss:hover{
  color: #0099ff
}
.tagact{
  color: #0099ff
}
</style>

<script>
export default {
  data() {
    return {
      bg:sessionStorage.getItem('STATIC_API')+'static/bg1.jpg',
      load:false,
      searchText:'',
      tradeAll:false,
      styleAll:false,
      shopAll:false,
      checkedTrades: [],
      checkedStyle:[],
      checkedShop:[],
      tradeTags:[],
      styleTags:[],
      shopTags:[],
      pubQuery: {
        fields: ["businssType","industry","modelCover","modelName","modelPrice","modelStyle"],
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
          size: 24
        }
      },
      pubList: [],
      pubTotal: 0
    };
  },
  mounted() {
    this.getPubList();
    this.getTags();
  },
  methods: {
    navTo(path,query,params,target){
      this.$router.push({path:path,query:query,params:params,target:target});
    },
    //清楚筛选
    clearChecked(){
      for(var i in this.tradeTags){
        this.tradeTags[i].active = false
      }
      for(var i in this.styleTags){
        this.styleTags[i].active = false
      }
      for(var i in this.shopTags){
        this.shopTags[i].active = false
      }
      this.checkedTrades = [];
      this.checkedStyle = [];
      this.checkedShop = [];
      this.initWheres();
    },
    //筛选
    handleCheckedTradesChange(index,name,tag,str) {
      var temp = -1;
      for(var i in this[name]){
        if(this[name][i] == str){
          temp = i
        }
      }
      if(temp == -1){
        this[name].push(str)
        this[tag][index].active = true;
      }else{
        this[name].splice(temp,1);
        this[tag][index].active = false;
      }
      this.initWheres();
    },
    //帅选条件写入
    initWheres(){
      var pubTemp = JSON.stringify(this.pubQuery)
      var tags = [];
      for(var i in this.checkedTrades){
        this.pubQuery.wheres.push({value:'industry',opertionType: "like", opertionValue: this.checkedTrades[i]})
      }
      for(var i in this.checkedStyle){
        this.pubQuery.wheres.push({value:'modelStyle',opertionType: "like", opertionValue: this.checkedStyle[i]})
      }
      for(var i in this.checkedShop){
        this.pubQuery.wheres.push({value:'businssType',opertionType: "like", opertionValue: this.checkedShop[i]})
      }
      
      this.getPubList();
      this.pubQuery = JSON.parse(pubTemp)
    },
    //搜索模型
    searchModel(){
      var temp = -1;
      for(var i in this.pubQuery.wheres){
        if(this.pubQuery.wheres[i].value == 'modelName'){
          temp = i;
        }
      }
      if (temp == -1) {
        this.pubQuery.wheres.push({
          value: "modelName",
          opertionType: "like",
          opertionValue: this.searchText
        });
      } else {
        this.pubQuery.wheres[i].opertionValue = this.searchText;
      }
      this.getPubList();
    },
    getTags() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "tag/find",
        type: "POST",
        data: {
          query: "{pages:{size:200}}"
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            var li = res.params.result;
            for (var i in li) {
              li[i].active = false;
              if (li[i].tagType == "适用行业") {
                that.tradeTags.push(li[i]);
              }
              if (li[i].tagType == "模板风格") {
                that.styleTags.push(li[i]);
              }
              if (li[i].tagType == "商户类型") {
                that.shopTags.push(li[i]);
              }
            }
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    },
    getPubList() {
      this.load = true;
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
            for (var i in res.params.result) {
              res.params.result[i].modelCover = res.params.result[
                i
              ].modelCover.replace("-", "-thumbnail");
              res.params.result[i].businssType = JSON.parse(
                eval("(" + "res.params.result[i].businssType" + ")")
              );
              res.params.result[i].industry = JSON.parse(
                eval("(" + "res.params.result[i].industry" + ")")
              );
              res.params.result[i].modelStyle = JSON.parse(
                eval("(" + "res.params.result[i].modelStyle" + ")")
              );
            }
            that.pubList = res.params.result;
            that.pubTotal = res.params.total;
          } else {
            that.$Message.error(res.msg);
          }
        },
        complete(){
          that.load = false;
        }
      });
    },
    handleSizeChange(val) {
      this.pubQuery.pages.size = val
      this.getPubList()
    },
    handleCurrentChange(val) {
      this.pubQuery.pages.currentPage = val
      this.getPubList()
    }
  }
};
</script>
