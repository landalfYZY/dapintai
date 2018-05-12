<style>
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
.mini-modal {
  height: 180px;
  width: 180px;
  background-color: #e1e1e1;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}
.mini-modal-active {
  height: 180px;
  width: 180px;
  background-color: #e1e1e1;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 2px solid #ff6600;
}
.mini-panel-active {
  background: #ff6600;
}
.mini-modal:hover {
  border: 2px solid #ff6600;
}
.mini-modal-active > .text-panel {
  width: 100%;
  padding: 10px;
  background: #ff6600;
  color: #ffffff;
}
.mini-modal > .text-panel {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
}
.sapanel {
  padding: 10px;
  background: #f3f3f3;
  width: 960px;
  margin-top: 5px;
}
</style>
<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">创建小程序</div>
      </div>
      <div class="ui-console-step">
        <el-steps :active="stepActive" finish-status="success">
          <el-step title="基础信息 1"></el-step>
          <el-step title="选择一个模板 2"></el-step>
          <el-step title="服务器 3"></el-step>
        </el-steps>
      </div>
      <div v-show="stepActive == 0">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" >
              <FormItem label="小程序名称" prop="name">
                  <Input v-model="formValidate.appName" placeholder="小程序名称" size="large" style="width:500px"/>
              </FormItem>
              <FormItem label="AppID" prop="appid">
                  <Input v-model="formValidate.appid" placeholder="AppID" size="large" style="width:500px"/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Poptip confirm title="微信小程序的唯一标识。查看详细操作？" placement="right" trigger="hover" ok-text="确定" cancel-text="取消" @on-ok="confirmAppID" @on-cancel="cancelAppID">
                    <Icon type="help" style="cursor:pointer" color="#0099FF"></Icon>
                  </Poptip>
              </FormItem>
              <FormItem label="AppSecret" prop="appSecret">
                  <Input v-model="formValidate.appSecret" placeholder="AppSecret" size="large" style="width:500px"/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Poptip confirm title="微信小程序的唯一标识。查看详细操作？" placement="right" trigger="hover" ok-text="确定" cancel-text="取消" @on-ok="confirmAppID" @on-cancel="cancelAppID">
                    <Icon type="help" style="cursor:pointer" color="#0099FF"></Icon>
                  </Poptip>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="nextStep()">下一步</Button>
              </FormItem>
        </Form>
      </div>
      <div v-show="stepActive == 1">
        <div>请选择一个模板</div>
        <div class="panel-center" style="padding:40px" v-show="load">
          <Spin>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            </Spin>
        </div>
        <div style="padding:15px 0" class="panel-start">
          <div v-show="tmp" v-for="(ul,index) in list" :key="index" @click="chooseMiniprogram(index,1)" :class="ul.active ? 'mini-modal-active':'mini-modal'" :style="'background-image:url('+ul.miniModel.modelCover+');background-size:cover;background-position:center'" >
            <div v-bind:class="ul.active ? 'text-panel ell-1':'text-panel ell-1' ">{{ul.miniModel.modelName}}</div>
            <img v-if="ul.active" src="../../../assets/img/right.png" width="30px" alt="" style="margin-left:148px;margin-top:108px">
          </div>
        </div>
        <div style="width:100%">
          <el-pagination v-show="pubList.length > 0" style="float:right;margin:30px 0" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
            :current-page="query.pages.currentPage"  :page-size="10"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <div class="clearfix"></div>
        </div>
        <div style="padding:15px 0" class="panel-start">
          <div v-show="tmp" v-for="(ul,index) in pubList" :key="index" @click="chooseMiniprogram(index,2)" :class="ul.active ? 'mini-modal-active':'mini-modal'" :style="'background-image:url('+ul.modelCover+');background-size:cover;background-position:center'" >
            <div v-bind:class="ul.active ? 'text-panel ell-1':'text-panel ell-1' ">{{ul.modelName}}</div>
            <img v-if="ul.active" src="../../../assets/img/right.png" width="30px" alt="" style="margin-left:148px;margin-top:108px">
          </div>
        </div>
        <div style="width:100%">
          <el-pagination style="float:right;margin:30px 0" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pubQuery.pages.currentPage"  :page-size="10"
            layout="total, prev, pager, next, jumper" :total="pubTotal">
          </el-pagination>
          <div class="clearfix"></div>
        </div>
        <div class="pull-right" style="margin-top:30px">
          <Button  @click="preStep()">上一步</Button>
          <Button type="primary" @click="nextStep()">下一步</Button>
        </div>
        <div class="clearfix"></div>
      </div>
      <div v-show="stepActive == 2">
        
        <div class="sapanel" >
          <div class="font-main" >短信服务</div>
          <p>产品免费开通，短信服务采用预先充值、按量付费的付费模式。根据短信的发送条数实时扣费。费用为0.5元/条。<a href="https://help.aliyun.com/document_detail/55317.html?spm=5176.8911205.order.2.23201cbeageaTp" target="blank">查看服务协议</a><br>
          <!-- <Checkbox v-model="formValidate.smsOpen" class="pull-right">开通服务</Checkbox> -->
          <div class="clearfix"></div></p>
        </div>
        
        <div class="sapanel" >
          <div class="font-main" >微信支付</div>
          <p>已通过微信认证的小程序开通此服务才有效。<a href="https://mp.weixin.qq.com/debug/wxadoc/product/renzheng.html" target="blank">去认证</a>。
            确保已认证之后请填写
            <a href="https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F" target="blank">商户号</a>和
            <a href="https://jingyan.baidu.com/article/75ab0bcbbf7034d6864db2c3.html" target="blank">商户密钥</a>
            <br>
          <!-- <Checkbox v-model="formValidate.wxpayOpen" class="pull-right">开通服务</Checkbox> -->
          <div class="clearfix"></div></p>
        </div>
        
        <div class="sapanel" >
          <div class="font-main" >微信服务通知</div>
          <p>提醒用户及时查看并操作。<br>
            <div class="pull-right">
              <!-- <span style="color:#ff6600">10元/月</span> -->
              <!-- <Checkbox v-model="formValidate.smsOpen" >开通服务</Checkbox> -->
            </div>
            <div class="clearfix"></div>
          </p>
        </div>
        
        <div class="sapanel" >
          <div class="font-main" >微信卡包</div>
          <p>将原来存在于各服务商公众号或服务号里面的优惠券、打折券等信息，从更加底层的公众号/服务号菜单中提取出来，集中在卡券菜单里显示。<br>
            <div class="pull-right">
              <!-- <span style="color:#ff6600">35元/月</span> -->
              <!-- <Checkbox v-model="formValidate.smsOpen" >开通服务</Checkbox> -->
            </div>
            <div class="clearfix"></div>
          </p>
        </div>
        
        <div class="sapanel" >
          <div class="font-main" >物流查询服务</div>
          <p>产品免费开通，按量计费。<br>
          <!-- <Checkbox v-model="formValidate.smsOpen" class="pull-right">开通服务</Checkbox> -->
          <div class="clearfix"></div></p>
        </div>

        <div class="sapanel" >
          <div class="font-main" >服务器租用</div>
          <p>双沃科技为您提供可靠的，高效的计算能力。按月计费。</p>
        </div>

        <div style="padding:15px 0;width:500px"  >
          <p>使用期限（单位月）<br>
          <Slider v-model="formValidate.mouth" :max="120" show-input></Slider>
          <ButtonGroup style="margin-top:10px">
              <Button v-for="item in mouthLength" :key="item.value" @click="mouthData(item.value)">{{item.label}}</Button>
          </ButtonGroup>
          </p>
        </div>

        <div>
          <Button class="pull-left" disabled  @click="preStep()">上一步</Button>
          <div class="pull-right">
            <span>费用: <span style="font-size:25px;color:#ff6600">￥{{msg.serverPrice*parseInt(formValidate.mouth)}}</span> <!--span style="font-size:12px;color:#33CC66">省￥125.5</span--></span>&nbsp;&nbsp;&nbsp;&nbsp;
            <form id="fform" :action="api+'alipay/server'">
              <input type="hidden" name="miniId" v-model="formValidate.miniId">
              <input type="hidden" name="month" v-model="formValidate.mouth">
              <input type="hidden" name="userId" v-model="formValidate.userid">
              <Button  type="error" @click="nextStep()">确认提交</Button>
            </form>
            
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <Spin size="large" fix v-show="stload"></Spin>
    </div>
  </transition>
</template>


<script>
export default {
  data() {
    return {
      api:sessionStorage.getItem("API"),
      msg:{
        serverPrice:0
      },
      stload:false,
      sunwouId:'',
      load:false,
      tmp: true,
      list:[],
      total: 0,
      query: {
        fields: [],
        wheres: [ 
          {
            value: "userId",
            opertionType: "equal",
            opertionValue: localStorage.getItem('userId')
          },       
          {
            value: "isDelete",
            opertionType: "equal",
            opertionValue: false
          },       
          {
            value: "body",
            opertionType: "equal",
            opertionValue: 'miniMod'
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
      pubTotal: 0,
      pubQuery: {
        fields: [],
        wheres: [
          {
            value: "userid",
            opertionType: "equal",
            opertionValue: localStorage.getItem("userId")
          },
          {
            value: "isDelete",
            opertionType: "equal",
            opertionValue: false
          }
        ],

        sorts: [{value:'createTime',asc:false}],
        pages: {
          currentPage: 1,
          size: 10
        }
      },
      miniprogramList: [
        { name: "通用餐饮小程序" },
        { name: "婚庆定制小程序" },
        { name: "垃圾小程序" },
        { name: "DJ定制小程序" },
        { name: "YIN小程序" }
      ],
      mouthLength: [
        { label: "1个月", value: 1 },
        { label: "2个月", value: 2 },
        { label: "3个月", value: 3 },
        { label: "6个月", value: 6 },
        { label: "1年", value: 12 },
        { label: "2年", value: 24 },
        { label: "3年", value: 36 },
        { label: "4年", value: 48 },
        { label: "5年", value: 60 }
      ],
      formValidate: {
        userid:localStorage.getItem('userId'),
        appName: "",
        appid: "",
        miniId:'',
        appSecret: "",
        merchantNumber: "",
        merchantSecret: "",
        modelid: "",
        smsOpen: false,
        wxpayOpen: false,
        mouth: 12
      },
      ruleValidate: {
        appName: [
          { required: true, message: "请填写小程序名称", trigger: "blur" }
        ],
        appid: [{ required: true, message: "请填写AppID", trigger: "blur" }],
        appSecret: [
          { required: true, message: "请填写AppSecret", trigger: "blur" }
        ]
      },
      stepActive: 0
    };
  },
  mounted(){
    if(sessionStorage.getItem('createMiniSunwouId')){
      this.stepActive = JSON.parse(sessionStorage.getItem('createMiniSunwouId')).step;
      this.sunwouId = JSON.parse(sessionStorage.getItem('createMiniSunwouId')).modelId;
      this.formValidate.miniId = JSON.parse(sessionStorage.getItem('createMiniSunwouId')).sunwouId;
      this.getModel()
      sessionStorage.removeItem('createMiniSunwouId')
    }
  },
  methods: {
    getModel() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "miniProMod/find",
        type: "POST",
        data: {
          query: JSON.stringify({
            fields: [],
            wheres: [
              {
                value: "isDelete",
                opertionType: "equal",
                opertionValue: false
              },
              {
                value: "sunwouId",
                opertionType: "equal",
                opertionValue: this.sunwouId
              }
            ],
            sorts: [],
            pages: {
              currentPage: 1,
              size: 10
            }
          })
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            that.msg = res.params.result[0];
          } else {
            that.$Message.error(res.msg);
          }
        },
        complete() {
          that.load = false;
        }
      });
    },
    getList() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "trans/find",
        type: "POST",
        data: {
          query: JSON.stringify(this.query)
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            for (var i in res.params.result) {
              res.params.result[i].active = false;
            }
            that.list = res.params.result;
            that.total = res.params.total;
          } else {
            that.$Message.error(res.msg);
          }
        },
        complete() {
          that.load = false;
        }
      });
    },
    handleSizeChange1(val) {
      this.query.pages.size = val;
      this.getList();
    },
    handleCurrentChange1(val) {
      this.query.pages.currentPage = val;
      this.getList();
    },
    confirmAppID() {},
    cancelAppID() {},
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
              res.params.result[i].active = false;
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
    mouthData(val) {
      this.formValidate.mouth = val;
    },
    //初始化小程序选择
    miniprogramInit() {
      for (var i in this.list) {
        this.list[i].active = false;
      }
      for (var i in this.pubList) {
        this.pubList[i].active = false;
      }
    },
    //选择一个小程序
    chooseMiniprogram(index,ty) {
      this.miniprogramInit();
      if(ty == 1){
        this.list[index].active = true;
        this.formValidate.modelid = this.list[index].miniModel.sunwouId;
      }else{
        this.pubList[index].active = true;
        this.formValidate.modelid = this.pubList[index].sunwouId;
      }
      
      
      
      this.tmp = false;
      this.tmp = true;
    },
    handleSizeChange(val) {
      this.pubQuery.pages.size = val
      this.getPubList()
    },
    handleCurrentChange(val) {
      this.pubQuery.pages.currentPage = val
      this.getPubList()
    },
    //上一步
    preStep() {
      this.stepActive -= 1;
    },
    //下一步
    nextStep() {
      var that = this;
      if (this.stepActive == 0) {
        this.$refs["formValidate"].validate(valid => {
          if (valid) {
            that.stepActive = 1;
          } else {
            this.$Message.error("请根据提示填写信息哦!");
          }
        });
        this.getList();
        this.getPubList();
      } else if (this.stepActive == 1) {
        this.$Modal.warning({
          title: "警告",
          content: "点击下一步之后，将无法返回上一步，确定要继续吗？",
          okText: "确定",
          cancelText: "取消",
          loading: true,
          onOk() {
            var thisOk = this;
            $.ajax({
              url: sessionStorage.getItem("API") + "miniPro/add",
              type: "POST",
              data: that.formValidate,
              dataType: "json",
              success(res) {
                if (res.code) {
                  that.$Message.success(res.msg);
                  that.stepActive = 2;
                  that.$router.push({path:'/ui_console_miniprogram'})
                } else {
                  that.$Message.error(res.msg);
                }
              },
              complete(){
                thisOk.$Modal.remove();
              }
            });
          }
        });
      } else if (this.stepActive == 2) {
        
        $("#fform").submit()
      }
    }
  }
};
</script>

