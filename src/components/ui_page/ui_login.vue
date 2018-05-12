<template>
  <transition name="fade" mode="out-in">
    <div class="ui-login-container height-all" :style="'background-image:url('+bg+')'">
      <div class="height-all ui-login-panel">
        <div class="ui-login-header">
          <div class="ui-logo" @click="navTo('/ui_home')"><img src="../../assets/img/logo.png" alt=""></div>
          <div class="panel-end">
            <div class="pointer font-white"  @click="navTo('/ui_home')">首页</div>
            <div class="pointer font-white" style="margin-left:20px" @click="navTo('ui_register')">注册</div>
          </div>
          
        </div>
        <div class="width-1200 margin-center panel-center sds">
          <div>
            <h1 class="font-white " style="margin-top:150px">小程序功能组件随意拼凑</h1>
            <p class="font-white" style="font-size:18px ;line-height:30px">
              10倍性能提升，多场景规格族，最优性价比<br>
              2666MT/s AVX 512 450万pps<br>
              同配置价格最高下降48%，5年3折</p>
          </div>
          <div class="login-panel">
            <div class="title">登录Login</div>
            <div class="form-con">
              <Icon class="icon" type="android-phone-portrait" size="18"></Icon>
              <input class="fm" v-model="data.phone" type="text" placeholder="输入11位手机号">
            </div>
            <div class="form-con">
              <Icon class="icon" type="ios-unlocked" size="18"></Icon>
              <input class="fm" v-model="data.passWord" type="password" placeholder="输入密码">
            </div>
            <Checkbox v-model="loadPass"  style="margin-top:10px">记住密码</Checkbox>
            <div style="height:60px;width:100%;overflow:hidden;">
              <div class="login-btn" style="margin-top:10px" >登 录</div>
              <div id="captchaBox" style="height:60px;position:relative;top:-60px;margin-top:10px;opacity:0"></div>
            </div>
            
            <div class="panel-between" style="margin-top:20px">
              <div class="font-primary pointer fp-over" @click="navTo('ui_register')">免费注册</div>
              <div class="font-primary pointer fp-over">忘记密码?</div>
            </div>
          </div>
        </div>
        <div class="login-footer" >
          <div class="record-number" style="width:100%;text-align:center;color:#aaa">杭州双沃网络科技有限公司©2017 双沃科技 浙ICP备18011227号</div>
        <div style="width:300px;margin:0 auto; padding:20px 0;text-align:center">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33018302000913" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../../assets/img/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33018302000913号</p></a>
        </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
@import url("../../assets/css/common.css");
@import url("../../assets/css/ui_master.css");
</style>

<script>
import "../../assets/js/gt";
export default {
  data() {
    return {
      bg: sessionStorage.getItem("STATIC_API") + "static/bg3.jpg",
      loadPass: true,
      data: {
        phone: "",
        passWord: ""
      }
    };
  },
  mounted() {
    this.initWindow();
    this.getYzm();
    if (localStorage.getItem("phone")) {
      this.data.phone = localStorage.getItem("phone");
    }
    if (localStorage.getItem("passWord")) {
      this.data.passWord = localStorage.getItem("passWord");
    }
  },
  methods: {
    getYzm() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "user/firVali", // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function(data) {
          if (data.code) {
            initGeetest(
              {
                // 以下 4 个配置参数为必须，不能缺少
                gt: data.params.gt,
                challenge: data.params.challenge,
                offline: !data.code, // 表示用户后台检测极验服务器是否宕机
                new_captcha: true, // 用于宕机时表示是新验证码的宕机
                product: "popup", // 产品形式，包括：float，popup
                width: "120%"
                // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
              },
              function(captchaObj) {
                captchaObj.appendTo("#captchaBox");
                captchaObj.onReady(function() {
                  $("#wait").hide();
                });
                captchaObj.onSuccess(function(res) {
                  var result = captchaObj.getValidate();
                  $.ajax({
                    url: sessionStorage.getItem("API") + "user/login",
                    type: "post",
                    dataType: "json",
                    data: {
                      phone: that.data.phone,
                      passWord: that.data.passWord,
                      geetest_challenge: result.geetest_challenge,
                      geetest_seccode: result.geetest_seccode,
                      geetest_validate: result.geetest_validate
                    },
                    success(res) {
                      if (res.code) {
                        if (that.loadPass) {
                          localStorage.setItem("loadPass", true);
                          localStorage.setItem("phone", that.data.phone);
                          localStorage.setItem("passWord", that.data.passWord);
                        } else {
                          localStorage.setItem("loadPass", false);
                          localStorage.removeItem("phone");
                          localStorage.removeItem("passWord");
                        }
                        localStorage.setItem(
                          "user",
                          JSON.stringify(res.params)
                        );
                        localStorage.setItem(
                          "userId",
                          res.params.result.sunwouId
                        );
                        that.$Message.success(res.msg);
                        if (sessionStorage.getItem("tempPath")) {
                          var query = {};
                          if (sessionStorage.getItem("tempPathId")) {
                            query.id = sessionStorage.getItem("tempPathId");
                          }
                          that.$router.push({
                            path: sessionStorage.getItem("tempPath"),
                            query: query
                          });
                          sessionStorage.removeItem("tempPath");
                        } else {
                          that.$router.push({ path: "/ui_home" });
                        }
                      } else {
                        that.$Message.error(res.msg);
                        captchaObj.reset();
                      }
                    }
                  });
                });
                captchaObj.onError(function() {
                  captchaObj.reset();
                });
                captchaObj.onClose(function() {
                  captchaObj.reset();
                });
              }
            );
          } else {
            that.$Message.error(data.msg);
            captchaObj.reset();
          }
        }
      });
    },
   
    navTo(path, query, params, target) {
      this.$router.push({
        path: path,
        query: query,
        params: params,
        target: target
      });
    },
    initWindow() {
      $(".height-all").css({ height: window.innerHeight });
      $(".login-footer").css({
        height: window.innerHeight - $(".sds").height() - 60 - 100
      });
      $(window).resize(function() {
        $(".height-all").css({ height: window.innerHeight });
        $(".login-footer").css({
          height: window.innerHeight - $(".sds").height() - 60 - 100
        });
      });
    }
  }
};
</script>
