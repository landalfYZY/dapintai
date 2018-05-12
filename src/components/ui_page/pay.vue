<template>
  <transition name="fade" mode="out-in">
    <div style="padding-bottom:50px;width:100%">
        <div class="width-1200 margin-center ui-template-show-panel" >
            <el-steps :active="act" finish-status="success" simple style="margin-top: 50px;width:1200px">
                <el-step title="确认购买" ></el-step>
                <el-step title="支付" ></el-step>
                <el-step title="支付成功" ></el-step>
            </el-steps>
            <div style="margin-top:20px;width:100%;border:1px solid #e1e1e1">
                <div style="padding:15px;border-bottom:dotted 1px #e1e1e1" class="panel-between">
                    <div style="font-size:18px;">订单信息</div>
                    <div style="font-size:18px;font-weight:bold;color:#888">￥{{msg.modelPrice}}</div>
                </div>
                <div style="padding:15px;border-bottom:2px solid #e1e1e1" class="panel-between item-center">
                    <div>
                        <img v-if="msg.modelCover" :src="msg.modelCover ? msg.modelCover:''" width="50px" alt="">
                    </div>
                    <div>{{msg.modelName}}</div>
                    <div>￥{{msg.modelPrice}}</div>
                </div>
            </div>
            <div style="margin-top:20px;width:100%;border:1px solid #e1e1e1">
                <div style="padding:15px;border-bottom:dotted 1px #e1e1e1" class="panel-between">
                    <div style="font-size:18px;">支付方式</div>
                    <div><span>支付 </span> <span style="color:#ff6633;font-size:16px">￥{{msg.modelPrice}}</span></div>
                </div>
                <div style="padding:15px" class="panel-start">
                    <div :class="payStyle == '支付宝' ? 'dopay payact':'dopay'" @click="payStyle = '支付宝'"><img src="../../assets/img/alipay.png" height="48px" alt=""></div>
                    <div :class="payStyle == '微信' ? 'dopay payact':'dopay'" @click="payStyle = '微信'"><img src="../../assets/img/wxpay.png" height="48px" alt=""></div>
                </div>
                <div style="margin-top:20px;width:100%;padding:15px" class="panel-end">
                  <form id="form" :action="action">
                    <input name="sunwouId" type="hidden" :value="sunwouId" />
                    <input name="userId" type="hidden" :value="userId" />
                    <Button type="error" style="width:150px;height:50px" @click="justPay()">立即支付</Button>
                  </form>
                </div>
            </div>
        </div>
    </div>
  </transition>
</template>
<style>
.dopay {
  margin-right: 50px;
  padding: 0 15px;
  padding-top: 2px;
  cursor: pointer;
}
.payact {
  outline: 2px solid #ff9933;
}
.dopay:hover {
  outline: 2px solid #ff9933;
}
</style>

<script>
export default {
  data() {
    return {
      sunwouId:this.$route.query.id,
      action:sessionStorage.getItem("API")+'alipay/miniMod',
      act: 1,
      payStyle: "支付宝",
      msg: [],
      userId:localStorage.getItem("userId")
    };
  },
  mounted() {
    this.getDetail();
    if(this.$route.query.orderid){
      console.log(this.$route.query.orderid)
      this.findOrder();
      this.$router.push({path:'/ui_console_miniprogram_modal'})
    }
  },
  methods: {
    findOrder(){
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "trans/findOrder",
        type: "POST",
        data: {
          query: JSON.stringify({
            wheres: [
              {
                value: "orderid",
                opertionType: "equal",
                opertionValue: this.$route.query.orderid
              }
            ]
          })
        },
        dataType: "json",
        success(res) {
          
        }
      });
    },
    justPay() {
      var that = this;
      $("#form").submit()
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
            res.params.result[0].modelCover = res.params.result[0].modelCover.replace(
              "-",
              "-thumbnail"
            );
            that.msg = res.params.result[0];
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    }
  }
};
</script>

