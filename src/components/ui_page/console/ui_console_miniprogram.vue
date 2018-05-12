<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">小程序信息</div>
      </div>
      <div class="panel-between">
        <div class="panel-start">
          <button class="ui-btn ui-btn-default" > <Icon type="ios-pause" color="#FF3333"></Icon>&nbsp;&nbsp;批量停止服务</button>
          <button class="ui-btn ui-btn-default"><Icon type="ios-play" color="#00CC66"></Icon>&nbsp;&nbsp;批量开启服务</button>
        </div>
        <div class="panel-end">
          <input type="text" class="search-input" v-model="searchText" @input="searchInput" placeholder="搜索">
          <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-search" color="#0099ff"></Icon>&nbsp;&nbsp;</button>
        </div>
      </div>
      <el-table style="margin-top:15px;width: 100%" :data="list">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="appName" label="名称" > </el-table-column>
        <el-table-column prop="appid" label="appId" width="180"> </el-table-column>
        <el-table-column prop="miniMod.modelName" label="模板名称" width="180"> </el-table-column>
        <el-table-column prop="status" label="状态" :filters="[{ text: '运行中', value: 1 }, { text: '已停止', value: 0 }]"
          :filter-method="filterTagStatus" filter-placement="bottom-end">
          <template slot-scope="scope">
            <span>{{scope.row.status == '未购买服务' ? "未购买服务":""}}</span>
            <Icon v-show="scope.row.status != '未购买服务'" type="ionic" :color="scope.row.status == '服务中' || scope.row.status == '即将停止服务' ?'#00CC66':'#FF3333'"></Icon>
            <span v-show="scope.row.status != '未购买服务'">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="到期时间"> 
          <template slot-scope="scope">
            {{scope.row.deadLine ? scope.row.deadLine:"未购买服务"}}
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-dropdown size="mini" split-button type="default" trigger="click">
              <div @click="manersd(scope.row.status,scope.row.miniMod.relation,scope.row.appName,scope.row.sunwouId,scope.row.modelid)" >管理</div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div style="width:70px;text-align:center" @click="navTo('/ui_console_miniprogram_create',{},{sunwouId:scope.row.sunwouId,modelId:scope.row.modelid,step:2},{})">{{scope.row.deadline ? '续费':'购买服务'}}</div></el-dropdown-item>

                <el-dropdown-item><div style="width:70px;text-align:center">停止服务</div></el-dropdown-item>
                <el-dropdown-item><div style="width:70px;text-align:center">开启服务</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right;margin-top:30px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="query.pages.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="query.pages.size"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
      <div class="clearfix"></div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      searchText:'',
      currentPage: 1,
      list: [],
      total: 0,
      query: {
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
        sorts: [],
        pages: {
          currentPage: 1,
          size: 10
        }
      },
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    manersd(status,relation,name,miniId,modelId){
      // if(status != "未购买服务"){

      
        if(relation){
          localStorage.setItem('miniId',miniId)
          localStorage.setItem('modelId',modelId)
          localStorage.setItem('appName',name)
          localStorage.setItem('relation',relation)
          window.open('https://www.sunwou.com/back/','_blank')
        }else{
          this.$Message.error('该模板还未绑定后台，请联系客服人员')
        }   
      // } else{
      //   this.$Message.error('您还没购买服务')
      // }   
    },
    navTo(path,query,params,target){
      sessionStorage.setItem('createMiniSunwouId',JSON.stringify(params))
      this.$router.push({path:path,query:query,params:params,target:target});
    },
    searchInput(){
      var temp = -1
      for(var i in this.query.wheres){
        if(this.query.wheres[i].value == 'appName'){
          temp = i;
        }
      }
      if(temp == -1){
        this.query.wheres.push({value:'appName',opertionType:'like',opertionValue:this.searchText})
      }else{
        this.query.wheres[temp].opertionValue = this.searchText
      }
      this.getList()
    },
    getList() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "miniPro/find",
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
    filterTagStatus(value, row) {
      return row.status === value;
    },
    handleSizeChange(val) {
      this.query.pages.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.query.pages.currentPage = val;
      this.getList();
    },
  }
};
</script>
