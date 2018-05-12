<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="top" id="top"></div>
      <div class="file-bar" id="fileBar">
        <div class="panel-between title-bar item-center">
          <div class="title font-white">所有页面</div>
          <div>
            <Icon type="trash-a" size="20" color="#ffffff" style="margin-top:7px;cursor:pointer;margin-right:5px" title="删除所选项"></Icon>
            <Icon type="ios-plus-outline" size="20" color="#ffffff" style="margin-top:7px;cursor:pointer" title="添加页面"></Icon>
          </div>
        </div>
        <div class="file-bar-panel" id="fileBarPanel">
          <Tree :data="pages" show-checkbox></Tree>
        </div>
      </div>
      <div class="zuj-bar" id="zujBar">
        <div class="panel-between title-bar item-center">
          <div class="title font-white">组件</div>
          <div>
            <!-- <Icon type="trash-a" size="20" color="#ffffff" style="margin-top:7px;cursor:pointer;margin-right:5px" ></Icon>
            <Icon type="ios-plus-outline" size="20" color="#ffffff" style="margin-top:7px;cursor:pointer" ></Icon> -->
            <Icon type="android-refresh" size="20" color="#ffffff" style="margin-top:7px;cursor:pointer" title="刷新"></Icon>
          </div>
        </div>
        <div class="zuj-bar-panel" id="zujBarPanel">
          <draggable  v-model="fruit" :options="{group:'people'}">
            <div v-for="element in fruit" :key="element">{{element}}</div>
          </draggable>
        </div>
      </div>
      <div class="mobile-model">
        <div class="panel-center item-center">
          <div class="mobile-car"></div>
          <div class="mobile-ting"></div>
        </div>
        <div class="mobile-kuang">
          <div class="modeil-main">
            <!-- title bar -->
            <div class="mobile-titlebar" :style="'background:'+config.titleBar.backgroundColor">
              <div style="width:20px" class="pointer"><Icon type="ios-arrow-back" :color="config.titleBar.frontColor" size="20"></Icon></div>
              <div :style="'font-size:14px;color:'+config.titleBar.frontColor">{{config.titleBar.text}}</div>
              <div style="width:20px" class="panel-end pointer"><Icon type="ios-more" :color="config.titleBar.frontColor" size="20"></Icon></div>
            </div><!-- title bar end -->
            <div class="mobile-body" :style="config.tabBar.list.length <= 1 ?'height:455px;background-color:'+config.body.backgroundColor:'height:'+(455-config.tabBar.height)+'px;background-color:'+config.body.backgroundColor">
              <div class="panel-between" style="padding:0px 15px 10px 15px;background:#444444">
                <div class="font-white">杭州</div>
                <div></div>
              </div>
            </div>
            <!-- tabbar  -->
            <div v-show="config.tabBar.list.length > 1" class="mobile-footer" :style="'height:'+config.tabBar.height">

            </div><!-- tabbar end  -->
          </div>
        </div>
        <Tooltip content="点击设置全局配置" placement="bottom" :always="true">
          <div style="width:320px">
            <div class="mobile-btn"></div>
          </div>
        </Tooltip>
      </div>
      <!-- 样式修改板块 -->
      <div>

      </div><!-- 样式修改板块 end -->
    </div>
  </transition>
</template>
<style>
@import url('../../assets/css/common.css');
@import url('../../assets/css/program.css');
</style>
<script>
import draggable from 'vuedraggable'
export default {
  components:{
    draggable
  },
  data(){
    return {
      fruit:['apple','banana','orage'],
      girl:['linzhil','cjk','bdyjy'],
      components:[
        {module:'AdvertisingMap',
         styleData:[
           {label:'高度',type:'color',value:'#ff9900'}
         ],
         navData:[
           {label:'点击搜索跳转页面',page:'index'}
         ],
         translate(styleData){

         }
        }
      ],
      config:{
        titleBar:{
          "frontColor":'#ffffff',
          "backgroundColor":'#444444',
          "text":'达咖',
        },
        body:{
          "backgroundColor": '#f3f3f3',
          "backgroundImage": ''
        },
        pages:[
          'index','own'
        ],
        tabBar:{
          "height":"50",
          "backgroundColor":"#ffffff",
          "selectedTextColor":"#ff9900",
          "defaultTextColor":"#aaaaaa",
          "borderColor":"#fff",
          list:[
            {
              "pageUrl":"index",
              "text":"首页",
              "defaultIcon":"",
              "selectedIcon":""
            },
            {
              "pageUrl":"own",
              "text": "我的",
              "defaultIcon": "",
              "selectedIcon": ""
            }
          ]
        },
      },
      pages:[
        {
          title: '首页',
          expand: true,
          config:{
            tabBar:{
              "frontColor":'#ffffff',
              "backgroundColor":'#444444',
              "text":'达咖',
            },
            body:{
              "backgroundColor": '#f3f3f3',
              "backgroundImage": ''
            }
          },
          children: [
            {title: 'parent 1-1'},
            {title: 'parent 1-2'}
          ]
        }
      ]
    }
  },
  mounted(){
    this.loadUtils()
  },
  methods:{
    loadUtils(){
      $("#fileBar").css({height:window.innerHeight-60});
      $("#fileBarPanel").css({height:window.innerHeight-95})
      $("#zujBar").css({height:window.innerHeight-60});
      $("#zujBarPanel").css({height:window.innerHeight-95})
      $(window).resize(function() {
        $("#fileBar").css({height:window.innerHeight-60});
        $("#fileBarPanel").css({height:window.innerHeight-95})
        $("#zujBar").css({height:window.innerHeight-60});
        $("#zujBarPanel").css({height:window.innerHeight-95})
      });
    }
  }
}
</script>
