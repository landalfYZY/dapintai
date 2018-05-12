<template>
    <transition name="fade" mode="out-in">
        <div class=" margin-center" style="margin-bottom:50px;width:1000px;overflow:hidden" v-for="item in msg" :key="item.sunwouId">
            <div style="text-align:center;font-size:30px;padding-top:50px">
                {{item.title}}
            </div>
            <div style="text-align:center;color:#888888;margin-top:20px">
                <span>作者:{{item.sonTitle}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>发表日期:{{item.createDate}}</span>
            </div>
            <div style="margin-top:50px" v-html="item.richText"></div>
        </div>
    </transition>
</template>
<script>
export default {
  data() {
    return {
      msg: [],
      query: {
        fields: [],
        wheres: [
          {
            value: "sunwouId",
            opertionType: "equal",
            opertionValue: this.$route.query.id
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
    this.getMsg();
  },
  methods: {
    getMsg() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "art/find",
        type: "POST",
        data: {
          query: JSON.stringify(this.query)
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            that.msg = res.params.result;
          } else {
            that.$Message.error(res.msg);
          }
        },
        complete() {}
      });
    }
  }
};
</script>
