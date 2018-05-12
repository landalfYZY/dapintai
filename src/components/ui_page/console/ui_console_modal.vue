<template>
  <transition name="fade" mode="out-in">
    <div>
        <div class="console-title">
            <div class="draw-line"></div>
            <div class="title">发布小程序模板</div>
        </div>
        <div class="panel-start">
            <div>
                <div v-show="data.modelCover == ''" class="defimg" @click="swGalleryModal = true,tempModal = 'cover'">添加封面</div>
                <div v-show="data.modelCover != ''" class="defimg" @click="swGalleryModal = true,tempModal = 'cover'" :style="'background-image:url('+data.modelCover+');background-size:cover;background-position:center'"></div>
                <Form :model="data" label-position="top" style="margin-top:30px">
                    <FormItem label="发布状态">
                        <RadioGroup v-model="data.status">
                            <Radio label="上架">上架</Radio>
                            <Radio label="下架">下架</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="商户类型">
                        <CheckboxGroup v-model="data.businssType">
                            <Checkbox  v-for="(item,index) in shopTags" :key="index" :label="item.tagName"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="后台标识">
                        <Input v-model="data.relation" placeholder="后台标识" />
                    </FormItem>
                </Form>
            </div>
            
            <div style="width:500px;margin-left:30px">
                <Form :model="data" label-position="top">
                    <FormItem label="模板名称">
                        <Input v-model="data.modelName" placeholder="模板名称" />
                    </FormItem>
                    <FormItem label="模板价格">
                        <Input v-model="data.modelPrice" number placeholder="模板价格" />
                    </FormItem>
                    <FormItem label="服务器价格">
                        <Input v-model="data.serverPrice" number placeholder="服务器价格" />
                    </FormItem>
                    <FormItem label="模板类型">
                        <Select v-model="data.modelType" style="width:200px">
                            <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="适用行业">
                        <CheckboxGroup v-model="data.industry">
                            <Checkbox  v-for="(item,index) in tradeTags" :key="index" :label="item.tagName"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="模板风格">
                        <CheckboxGroup v-model="data.modelStyle">
                            <Checkbox  v-for="(item,index) in styleTags" :key="index" :label="item.tagName"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="功能描述">
                        <Input v-model="data.funcDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="简要概括功能描述" />
                    </FormItem>
                    <FormItem label="关联一篇文章">
                        <Select v-model="data.articleid" style="width:200px">
                            <Option v-for="item in msg" :value="item.sunwouId" :label="item.title" :key="item.sunwouId">{{ item.title }}</Option>
                        </Select>
                    </FormItem>
                </Form>
                
            </div>
        </div>
        <div>
            <div>模板截图</div>
            <div class="panel-start">
                <div class="tyui" @click="swGalleryModal = true,tempModal = 'imgs'">添加截图</div>
                <div class="tyui2" v-for="(item,index) in data.modelImage" :key="index" :style="'background-image:url('+item.url+');background-size:cover;background-position:center'">
                    <div class="panel-between item-center" style="height:40px;background:rgba(0,0,0,0.5);margin-top:210px;">
                        <div class="tgb" @click="index > 0 ? preChange(index):''"><Icon v-show="index > 0" type="arrow-left-a" size="15" color='#ffffff'></Icon></div>
                        <div class="tgb" @click="delImgs(index)"><Icon type="trash-a" size="15" color='#ffffff'></Icon></div>
                        <div class="tgb" @click="index < data.modelImage.length-1 ? nextChange(index):''"><Icon v-show="index < data.modelImage.length-1" type="arrow-right-a" size="15" color='#ffffff'></Icon></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pubibtn" @click="submitFrom()">发布模板</div>
        <Modal v-model="swGalleryModal" width="1000" >        
            <div v-if="swGalleryModal">
                <swGallery></swGallery>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long  @click="tempModal == 'cover' ? getModelCover():getModelImgs()">确定</Button>
            </div>
        </Modal>
    </div>
  </transition>
</template>
<style>
.defimg{
    width:200px;height:200px;background:#f3f3f3;text-align:center;line-height:200px;color:#888;cursor:pointer;border-radius: 2px
}
.defimg:hover{
    box-shadow: 0px 0px 1px 1px #0099FF
}
.mtitle{
    color: #444444;font-size: 14px;
    margin: 5px 0;
}
.tyui{
    cursor: pointer;
    width: 150px;
    height: 250px;
    background: #f3f3f3;
    line-height: 250px;
    text-align: center;
    color: #888;
    margin-right: 20px;
    margin-top: 10px;
}
.tyui2{
    width: 150px;
    height: 250px;
    background: #f3f3f3;
    margin-right: 20px;
    margin-top: 10px;
}
.tgb{
    width:33.33%;text-align:center;cursor:pointer;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center
}
.tgb:hover{
    background: rgba(0,0,0,0.3)
}
.pubibtn{
    width: 200px;
    line-height: 60px;
    text-align: center;
    background: #0099FF;
    color: #ffffff;
    float: right;
    margin-top: 20px;
    margin-right: 200px;
    margin-bottom: 50px;
    cursor: pointer;
}
</style>

<script>
import swGallery from './ui_console_gallery.vue'
export default {
  data(){
    return {
        msg:[],
        modelList:[
            {label:'微信小程序',value:'wx'},
            {label:'支付宝小程序',value:'my'},
            {label:'快应用',value:'qapp'},
        ],
        tempModal:'cover',
        tradeTags:[],
        shopTags:[],
        styleTags:[],
        defaultImg:true,
        swGalleryModal:false,
        modal_loading: false,
        data:{
            relation:'',
            modelType:'',
            modelCover:'',
            modelName:'',
            funcDesc:'',
            status:'',
            modelPrice:'',
            serverPrice:'',
            modelImage:[],
            industry:[],
            modelStyle:[],
            businssType:[]
        }
    }
  },
  components:{
    swGallery   
  },
  mounted(){
      this.getTags()
      this.getMsg()
  },
  methods:{
      getMsg() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "art/find",
        type: "POST",
        data: {
          query: JSON.stringify({
            fields: [],
            wheres: [ 
            {
                value: "userid",
                opertionType: "equal",
                opertionValue: localStorage.getItem('userId')
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
            size: 200
            }
          })
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            
            that.msg = res.params.result;
          } else {
            that.$Message.error(res.msg);
          }
        },
        complete() {
        }
      });
    },
      submitFrom(){
          var that = this;
          $.ajax({
                url:sessionStorage.getItem('API')+'miniProMod/add',
                type:'POST',
                data:{
                    relation:this.data.relation,
                    articleid:this.data.articleid,
                    userid:localStorage.getItem('userId'),
                    modelType:this.data.modelType,
                    modelCover:this.data.modelCover,
                    modelName:this.data.modelName,
                    funcDesc:this.data.funcDesc,
                    status:this.data.status,
                    modelPrice:this.data.modelPrice,
                    serverPrice:this.data.serverPrice,
                    modelImage:JSON.stringify(this.data.modelImage),
                    industry:JSON.stringify(this.data.industry),
                    modelStyle:JSON.stringify(this.data.modelStyle),
                    businssType:JSON.stringify(this.data.businssType)
                },
                dataType:'json',
                success(res){
                    
                    if(res.code){
                       that.$Message.success(res.msg);
                       that.$router.push({path:'/ui_console_miniprogram_modal',query:{tagsValue:'s2'}})
                    }else{
                        that.$Message.error(res.msg)
                    }
                    
                }
            })
      },
      getTags(){
          var that = this;
            $.ajax({
                url:sessionStorage.getItem('API')+'tag/find',
                type:'POST',
                data:{
                    query:'{}'
                },
                dataType:'json',
                success(res){
                    
                    if(res.code){
                        var li = res.params.result;
                        for(var i in li){
                            if(li[i].tagType == '适用行业'){
                                that.tradeTags.push(li[i])
                            }
                            if(li[i].tagType == '模板风格'){
                                that.styleTags.push(li[i])
                            }
                            if(li[i].tagType == '商户类型'){
                                that.shopTags.push(li[i])
                            }
                        }
                    }else{
                        that.$Message.error(res.msg)
                    }
                    
                }
            })
      },
      getModelCover(){
          this.data.modelCover = JSON.parse(sessionStorage.getItem('imgUrls'))[0].host + JSON.parse(sessionStorage.getItem('imgUrls'))[0].path;
          this.swGalleryModal = false;
      },
      getModelImgs(){
          var li = JSON.parse(sessionStorage.getItem('imgUrls'));
          for(var i in li){
              this.data.modelImage.push({"url":li[i].host+li[i].path});
          }
          sessionStorage.removeItem('imgUrls');
          this.swGalleryModal = false;
      },
      //往前移
      preChange(index){
          var temp = this.data.modelImage[index-1].url;
          this.data.modelImage[index-1].url = this.data.modelImage[index].url;
          this.data.modelImage[index].url = temp;
      },
      //往后移
      nextChange(index){
          var temp = this.data.modelImage[index+1].url;
          this.data.modelImage[index+1].url = this.data.modelImage[index].url;
          this.data.modelImage[index].url = temp;
      },
      //删除
      delImgs(index){
          this.data.modelImage.splice(index,1)
      }
  }
}
</script>
