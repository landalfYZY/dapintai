<template>
  <transition name="fade" mode="out-in">
    <div>
        <div class="console-title">
            <div class="draw-line"></div>
            <div class="title">小程序模板</div>
        </div>
        <Tabs :value="tagsValue" >
            <TabPane label="我购买的" name="s1">
              <el-table style="margin-top:15px;width: 100%" :data="list" >
                <el-table-column label="模板封面" > 
                  <template slot-scope="scope">
                    <div :style="'width:50px;height:50px;background-size:cover;background-position:center;background-image:url('+scope.row.miniModel.modelCover+')'"></div>
                  </template>
                </el-table-column>
                <el-table-column prop="miniModel.modelName" label="模板名称" > </el-table-column>
                <el-table-column prop="total_amount" label="支付金额"> </el-table-column>
                <el-table-column prop="trade_status" label="交易状态"> 
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.trade_status == 'TRADE_SUCCESS'" type="success"> 支付成功 </el-tag>
                    <el-tag v-if="scope.row.trade_status == 'TRADE_FINISHED'" type=""> 交易完成 </el-tag>
                    <el-tag v-if="scope.row.trade_status == 'WAIT_BUYER_PAY'" type="warning"> 交易创建 </el-tag>
                    <el-tag v-if="scope.row.trade_status == 'TRADE_CLOSED'" type="info"> 交易已关闭 </el-tag>
                    <el-tag v-if="scope.row.trade_status == 'WAIT_PAY'" type="danger"> 等待支付 </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="购买时间" width="180"> </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-dropdown size="mini" split-button type="default" trigger="click">
                      <div @click="navTo('/ui_template_detail',{id:scope.row.miniModel.sunwouId})">查看</div> 
                       <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><div style="width:100px;text-align:Center" @click="navTo('/ui_template_detail',{id:scope.row.miniModel.sunwouId})">查看</div></el-dropdown-item>
                       </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="float:right;margin-top:30px" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                :current-page="query.pages.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="query.pages.size"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </TabPane>
            <TabPane label="我发布的" name="s2">
              <div class="panel-between">
                <div class="panel-start">
                  <button class="ui-btn ui-btn-default" @click="multiDel()"><Icon type="trash-a" color="#FF3333"></Icon>&nbsp;&nbsp;批量删除</button>
                  <button class="ui-btn ui-btn-default"><Icon type="arrow-up-a" color="#00CC66"></Icon>&nbsp;&nbsp;批量上架</button>
                  <button class="ui-btn ui-btn-default"><Icon type="arrow-down-a" color="#FF9900"></Icon>&nbsp;&nbsp;批量下架</button>
                </div>
                <div class="panel-end">
                  <input type="text" v-model="pubSearchText" class="search-input" placeholder="搜索" @input="pubSearch()">
                  <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-search" color="#0099ff"></Icon>&nbsp;&nbsp;</button>
                </div>
              </div>
              <el-table style="margin-top:15px;width: 100%" :data="pubList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="模板封面" > 
                  <template slot-scope="scope">
                    <div :style="'width:50px;height:50px;background-size:cover;background-position:center;background-image:url('+scope.row.modelCover+')'"></div>
                  </template>
                </el-table-column>
                <el-table-column prop="modelName" label="模板名称" > </el-table-column>
                <el-table-column prop="modelPrice" label="模板价格"> </el-table-column>
                <el-table-column prop="serverPrice" label="服务器价格"> </el-table-column>
                <el-table-column label="标签" > 
                  <template slot-scope="scope">
                    <el-tag size="mini" v-for="li in scope.row.industry" :key="li">{{li}}</el-tag>
                    <el-tag size="mini" type="warning" v-for="li in scope.row.modelStyle" :key="li">{{li}}</el-tag>
                    <el-tag size="mini" type="success" v-for="li in scope.row.businssType" :key="li">{{li}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" :filters="[{ text: '上架', value: '上架' }, { text: '下架', value: '下架' }]"
                  :filter-method="filterTagStatus" filter-placement="bottom-end">
                  <template slot-scope="scope">
                    <Icon type="ionic" :color="scope.row.status === '上架' ?'#00CC66':'#FF3333'"></Icon>
                    {{scope.row.status === '上架' ? '上架':'下架'}}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="发布时间" width="180"> </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-dropdown size="mini" split-button type="default" trigger="click">
                      <div @click="navTo('/ui_template_detail',{id:scope.row.sunwouId})">查看</div> 
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><div style="width:100px;text-align:Center" @click="scope.row.status == '上架' ? changeStatus(scope.row.sunwouId,'下架'):changeStatus(scope.row.sunwouId,'上架')">{{scope.row.status == '上架' ? '下架':'上架'}}</div></el-dropdown-item>
                        <el-dropdown-item><div style="width:100px;text-align:Center" @click="navTo('/ui_console_modal_update',{id:scope.row.sunwouId})">修改</div> </el-dropdown-item>
 
                        <el-dropdown-item><div style="width:100px;text-align:Center" @click="multiDel(scope.row.sunwouId)">删除</div></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="float:right;margin-top:30px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pubQuery.pages.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pubQuery.pages.size"
                layout="total, sizes, prev, pager, next, jumper" :total="pubTotal">
              </el-pagination>
              <div class="clearfix"></div>
            </TabPane>
        </Tabs>
    </div>
  </transition>
</template>


<script>
export default {
  data() {
    return {
      tagsValue: "s1",
      pubList: [],
      pubTotal: 0,
      pubSearchText: "",
      multipleSelection: [],
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

        sorts: [],
        pages: {
          currentPage: 1,
          size: 10
        }
      }
    };
  },
  mounted() {
    if (this.$route.query.tagsValue == "s2") {
      this.tagsValue = "s2";
    }
    this.getPubList();
    this.getList();
  },
  methods: {
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
    getIds(){
      var ids = [];
      for(var i in this.multipleSelection){
        ids.push(this.multipleSelection[i].sunwouId)
      }
      return ids
    },
    //批量删除
    multiDel(id) {
      var ids = null;
      if(this.getIds().length == 0){
        ids = id;
      }else{
        ids = this.getIds().toString();
      }
      var that = this;
      this.$Modal.confirm({
        title: "警告",
        content: "<p>删除后数据将无法恢复，确定要继续吗？</p>",
        loading: true,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          var ui = this;
          $.ajax({
            url: sessionStorage.getItem("API") + "miniProMod/remove",
            type: "POST",
            data: {
              ids: ids,
            },
            dataType: "json",
            success(res) {
              if (res.code) {
                ui.$Modal.remove();
                that.$Message.success(res.msg);
                that.getPubList();
              } else {
                that.$Message.error(res.msg);
              }
            }
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    //上架下架状态改变
    changeStatus(id, st) {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "miniProMod/update",
        type: "POST",
        data: {
          sunwouId: id,
          status: st
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            that.$Message.success(res.msg);
            that.getPubList();
          } else {
            that.$Message.error(res.msg);
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
    pubSearch() {
      if (this.pubQuery.wheres.length == 2) {
        this.pubQuery.wheres.push({
          value: "modelName",
          opertionType: "like",
          opertionValue: this.pubSearchText
        });
      } else {
        this.pubQuery.wheres[2].opertionValue = this.pubSearchText;
      }
      this.getPubList();
    },
    filterTagStatus(value, row) {
      return row.status === value;
    },
    handleSizeChange(val) {
      this.pubQuery.pages.size = val;
      this.getPubList();
    },
    handleCurrentChange(val) {
      this.pubQuery.pages.currentPage = val;
      this.getPubList();
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
        }
      });
    }
  }
};
</script>
