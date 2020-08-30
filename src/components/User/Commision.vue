<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务中心</el-breadcrumb-item>
      <el-breadcrumb-item>员工提成核对</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-select v-model="value" @change="getEmpCommByName" filterable placeholder="请选择">
          <el-option
            v-for="item in emplist"
            :key="item.empId"
            :label="item.empName"
            :value="item.empId">
          <span style="float: left">{{ item.empId }}</span>
          <span style="float: left">{{ item.empName }}</span>
          </el-option>
        </el-select>
          <el-date-picker
            v-model="timetotime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" @click="getEmpCommByDate">查询</el-button>
      </el-row>
      <!--用户表格区域-->
      <el-table :data="(commisionlist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="员工编号" prop="empId"></el-table-column>
        <el-table-column label="员工姓名" prop="empName"></el-table-column>
        <el-table-column label="员工类型" prop="empLevel"></el-table-column>
        <el-table-column label="散客服务提成" prop="sankeCommoney"></el-table-column>
        <el-table-column label="会员服务提成" prop="servieceCommoney"></el-table-column>
        <el-table-column label="开卡业绩提成" prop="kaikaCommoney"></el-table-column>
        <el-table-column label="总提成" prop="totalCommoney"></el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        :total="commisionlist.length"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-card>
    <!--添加用户-->

  </div>
</template>

<script>
    export default {
        data() {
            return {
                // 获取用户列表的参数对象
                queryInfo: {
                    quert: '',
                    pagenum: 1,
                    pagesize: 2
                },
                total:'',
                commisionlist: [],
                emplist:[],
                addDialogVisible: false,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                timetotime: '',
                searchForm: {
                    startDate: "", //开始时间
                    endDate: "", //结束时间
                },
                value7: '',
                value: '全部员工'
            }
        },
        watch: {
            // 被检测的成员：function(newV,oldV){
            //newV:数据变化后的样子，oldV:数据变化前的样子
            // }
            //被检查成员一般就是data成员
            timetotime: function(newV) {
                //把接收到的时间信息一分为二的给beginTime和endTime
                if (newV) {
                    this.searchForm.startDate = newV[0];
                    this.searchForm.endDate = newV[1];
                } else {
                    //清空时间
                    this.searchForm.startDate = "";
                    this.searchForm.endDate = "";
                }
            }
        },
        methods: {
            getEmpCommByName(val){
                var obj = {}
                obj = this.emplist.find(function(item){
                    return item.empId === val
                });
                console.log(val)
                this.$axios.get('http://localhost:8090/emp/commissionById?empId=' +val).then(res=>{
                    if(res.data.code===200) {
                        console.log(res.data.msg)
                        this.commisionlist = res.data.data
                        this.total = res.data.total
                    }else{
                        console.log(res.data.msg+'ccc')
                    }
                })
            },
            getEmpCommByDate(){
                this.$axios.post('http://localhost:8090/emp/commissionByDate',{
                    "startDate":this.searchForm.startDate,
                    "endDate":this.searchForm.endDate
                }).then(res=>{
                    if(res.data.code===200) {
                        console.log(res.data.msg)
                        this.commisionlist = res.data.data
                        this.total = res.data.total
                    }else{
                        console.log(res.data.msg+'ccc')
                    }
                })
            },
            async getCommisionList(){
                this.$axios.get('http://localhost:8090/emp/commission').then(res=>{
                    if(res.data.code===200) {
                        console.log(res.data.msg)
                        console.log(res.data.data)
                         this.commisionlist = res.data.data
                        this.emplist=res.data.data
                        //this.$set(this,'commisionlist',res.data.data)
                        this.total = res.data.total
                    }else{
                        console.log(res.data.msg+'ccc')
                    }
                })
            },
            handleSizeChange(newSize) {
                //  console.log(newSize)
                this.queryInfo.pagesize = newSize
                this.getCommisionList()
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                //  console.log(newPage)
                this.queryInfo.pagenum = newPage
                this.getCommisionList()
            }
        },
        mounted () {
            this.getCommisionList()
            //this. getEmpCommByName(value)
        }
    }

</script>
<style lang='less' scoped>
  .el-select-dropdown__item span{
    width:100px;
    text-align:center;
  }
</style>
