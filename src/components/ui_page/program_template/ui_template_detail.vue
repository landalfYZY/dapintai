<template>
  <transition name="fade" mode="out-in">
    <div>
      <div v-for="(item,index) in msg" :key="index" class="width-1200 margin-center panel-between" style="padding:50px 0">
        <div class="mobile-model">
          <div class="panel-center item-center">
            <div class="mobile-car"></div>
            <div class="mobile-ting"></div>
          </div>
          <div class="mobile-kuang">
            <div class="modeil-main">
              <div >
                <el-carousel ref="elscarousel" :interval="5000" arrow="hover" height="530px" :autoplay="false" indicator-position="none" @change="changeImgs">
                  <el-carousel-item v-for="(li,sd) in item.modelImage" :key="sd">
                    <img :src="li.url" alt="" width="300px" height="530px">
                    <div :style="'background-image:url('+li.url+');background-size:cover;background-position:center;width:300px;height:530px'"></div>
                  </el-carousel-item>
                </el-carousel>
              </div><!-- tabbar end  -->
            </div>
          </div>
          
            <div style="width:320px">
              <div class="mobile-btn"></div>
            </div>
        </div>
        <div class="pro-panel">
          <div class="pro-panel-title">{{item.modelName}}</div>
          <div class="pro-panel-content">
            <div>{{item.funcDesc}}</div>
            <div class="panel-between item-end">
              <div class="price">￥{{item.modelPrice}}</div>
              <div style="font-size:12px;color:#aaa">发布日期:{{item.createDate}}</div>
            </div>
          </div>
          <div class="panel-start item-center" style="margin-top:20px">
            <div class="title">服务器价格</div>
            <div class="price" style="margin-left:20px;font-size:16px">￥{{item.serverPrice}}元/月</div>
          </div>
          
          <div class="pro-tags-panel">
            <div class="title">模板标签</div>
            <div class="panel-start">
              <div class="pro-tags pro-tags-1" v-for="li in item.industry" :key="li">{{li}}</div>
              <div class="pro-tags pro-tags-2" v-for="li in item.modelStyle" :key="li">{{li}}</div>
              <div class="pro-tags pro-tags-3" v-for="li in item.businssType" :key="li">{{li}}</div>
            </div>
          </div>
          <div class="pro-tags-panel">
            <div class="title">模板截图</div>
            <div class="panel-start" style="width:700px;height:180px">
              <div  
                v-for="(li,ins) in imgs" :key="ins"  :class="li.active ? 'pro-tags-img pro-tags-img-act':'pro-tags-img'" 
                @mouseover="changeImgs(ins)"
                :style="'background-image:url('+li.url+');background-size:cover;background-position:center'">
              </div>
            </div>
          </div>
          <div class="pro-tags-panel" style="width:80%;margin-top:50px">
            <div class="panel-end">
              <Button type="error" style="width:250px;height:70px" @click="navTo('/pay',{id:item.sunwouId})">立即购买</Button>
              <!-- <div class="pro-tags-panel-btn" ></div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="width-1200 margin-center" style="padding:50px 0;overflow:hidden" v-for="item in article" :key="item.sunwouId" v-html="item.richText"></div>
    </div>
  </transition>
</template>
<style>
@import url("../../../assets/css/program.css");
.el-carousel__indicators {
  display: none;
}
</style>
<script>
export default {
  data() {
    return {
      initialIndex: 0,
      msg: [],
      imgs: [],
      article: []
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    if (this.$route.query.id) {
      this.getDetail();
    } else {
      this.$Message.error("出错啦");
    }
  },
  methods: {
    changeImgs(ins) {
      for(var i in this.imgs){
        this.imgs[i].active = false
      }
      this.$refs.elscarousel[0].setActiveItem(ins)
      this.imgs[ins].active = true
    },
    navTo(path, query, params, target) {
      var that = this;
      if (localStorage.getItem("userId")) {
        sessionStorage.setItem("tempPath","/ui_template_detail")
        sessionStorage.setItem("tempPathId",query.id)
        this.$router.push({
          path: path,
          query: query,
          params: params,
          target: target
        });
      } else {
        this.$Modal.confirm({
          title: "您还没有登录",
          content: "<p>是否立刻前往登录?</p>",
          okText: "立刻前往",
          cancelText: "滚",
          onOk: () => {
            that.$router.push({ path: "/ui_console_miniprogram_modal" });
          },
          onCancel: () => {}
        });
      }
    },
    getArticle(id) {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "art/find",
        type: "POST",
        data: {
          query: JSON.stringify({
            wheres: [
              {
                value: "sunwouId",
                opertionType: "equal",
                opertionValue: id
              }
            ]
          })
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            res.params.result[0].richText = res.params.result[0].richText.replace(/<img/g,'<img style="max-width:1200px "')
            that.article = res.params.result;
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    },
    getDetail() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "miniProMod/find",
        type: "POST",
        data: {
          query: JSON.stringify({
            wheres: [
              {
                value: "sunwouId",
                opertionType: "equal",
                opertionValue: this.$route.query.id
              }
            ]
          })
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            res.params.result[0].businssType = JSON.parse(
              eval("(" + "res.params.result[0].businssType" + ")")
            );
            res.params.result[0].industry = JSON.parse(
              eval("(" + "res.params.result[0].industry" + ")")
            );
            res.params.result[0].modelStyle = JSON.parse(
              eval("(" + "res.params.result[0].modelStyle" + ")")
            );
            res.params.result[0].modelImage = JSON.parse(
              eval("(" + "res.params.result[0].modelImage" + ")")
            );
            for (var i in res.params.result[0].modelImage) {
              that.imgs.push({
                url: res.params.result[0].modelImage[i].url.replace(
                  "-",
                  "-thumbnail"
                ),
                active: false
              });
            }
            that.imgs[0].active = true;
            that.msg = res.params.result;
            if (res.params.result[0].articleid) {
              that.getArticle(res.params.result[0].articleid);
            }
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    }
  }
};
</script>
