<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="console-title">
        <div class="draw-line"></div>
        <div class="title">交易记录</div>
      </div>
      <div class="panel-between">
        <div class="panel-start">
          <button class="ui-btn ui-btn-default" > <Icon type="share"  color="#0099ff"></Icon>&nbsp;&nbsp;导出</button>
          
        </div>
        <div class="panel-end">
          <input type="text" class="search-input" v-model="searchText" @input="searchInput" placeholder="搜索">
          <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-search" color="#0099ff"></Icon>&nbsp;&nbsp;</button>
        </div>
      </div>
      <el-table style="margin-top:15px;width: 100%" :data="list">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="sunwouId" label="单号" > </el-table-column>
        <el-table-column prop="out_trade_no" label="交易号" > </el-table-column>
        <el-table-column prop="body" label="产品" > </el-table-column>
        <el-table-column prop="payType" label="支付类型">
        </el-table-column>
        <el-table-column prop="total_amount" label="交易金额"> </el-table-column>
        <el-table-column prop="trade_status" label="交易状态"> 
          <template slot-scope="scope">
            <el-tag v-if="scope.row.trade_status == 'TRADE_SUCCESS'" type="success"> 支付成功 </el-tag>
            <el-tag v-if="scope.row.trade_status == 'TRADE_FINISHED'" type=""> 交易完成 </el-tag>
            <el-tag v-if="scope.row.trade_status == 'WAIT_BUYER_PAY'" type="warning"> 交易创建 </el-tag>
            <el-tag v-if="scope.row.trade_status == 'TRADE_CLOSED'" type="info"> 交易已关闭 </el-tag>
            <el-tag v-if="scope.row.trade_status == 'WAIT_PAY'" type="danger"> 等待支付 </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="runTime" label="期限(月)/数量"> 
          <template slot-scope="scope">
            {{scope.row.runTime ? scope.row.runTime:'无'}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="交易时间"></el-table-column>
        
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
            value: "userId",
            opertionType: "equal",
            opertionValue: localStorage.getItem('userId')
          },       
          {
            value: "isDelete",
            opertionType: "equal",
            opertionValue: false
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
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    navTo(path,query,params,target){
      sessionStorage.setItem('createMiniSunwouId',JSON.stringify(params))
      this.$router.push({path:path,query:query,params:params,target:target});
    },
    searchInput(){
      var temp = -1
      for(var i in this.query.wheres){
        if(this.query.wheres[i].value == 'sunwouId'){
          temp = i;
        }
      }
      if(temp == -1){
        this.query.wheres.push({value:'sunwouId',opertionType:'like',opertionValue:this.searchText})
      }else{
        this.query.wheres[temp].opertionValue = this.searchText
      }
      this.getList()
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
