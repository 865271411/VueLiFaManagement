<template xmlns:el-row="http://www.w3.org/1999/html">
  <div class="Achievement">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务中心</el-breadcrumb-item>
      <el-breadcrumb-item>员工业绩核对</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-radio v-model="radio" label="1">按天明细</el-radio>
        <el-radio v-model="radio" label="2">按月明细</el-radio>
        <el-date-picker
          v-model="value6"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="getEmpCommByDate">查询</el-button>
        <div id="chart1" ref="chart1"></div>
      </el-row>
        <!--用户表格区域-->
      <el-table id="table" :data="(achievementlist ||'').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe>
        <el-table-column label="时间" prop="consumetime"></el-table-column>
        <el-table-column v-for="(item, index) in achievementlist[0].empAcheDemos" :key="Date.now()">
          <template slot="header" slot-scope="scope">
            {{item.empName}}
          </template>
          <template slot-scope="scope">{{scope.row.empAcheDemos[index].totalAche}}</template>
        </el-table-column>

      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        :total="achievementlist.length"
        :next="queryInfo.pagenum+1"
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
                name:'Achievement',
                scope:'',
                xdata: [],
                ydata: [],
                ndata: [],
                achievementlist:[ {
                    consumetime:'',
                    empAcheDemos:[{
                        empId:'',
                        empName:'',
                        totalAche:''
                    }]
                }],
                queryInfo: {
                    quert: '',
                    pagenum: 1,
                    pagesize: 2,
                },
                total: '',
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
                value6: '',
                value7: '',
                radio: '1'
            };

        },
        mounted(){
            this.getAchievementList()
        },
        // activated() {
        //     //this.$nextTick(function())
        //     // this.$nextTick(function () {
        //     //     //this.$chart.line1('chart1')
        //     // });
        //   //this.$chart.line1('chart1')
        //     this.$nextTick(function () {
        //
        //   });
        // },
        methods: {
            async getAchievementList() {
                this.$axios.get('http://localhost:8090/empAchieve/achieve').then(res => {
                    if (res.data.code === 200) {
                        console.log(res.data.msg)
                        this.achievementlist = res.data.data
                        console.log(this.achievementlist)
                        this.total = res.data.total
                        this.$chart.line1('chart1',JSON.stringify(this.achievementlist))
                    } else {
                        console.log(res.data.msg + 'ccc')
                    }
                })
            },
            //监听pagesize 改变的事件
            handleSizeChange(newSize) {
                //console.log(newSize)
                this.queryInfo.pagesize = newSize
                this.getAchievementList()
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage
                this.getAchievementList()
            }
        }
}
</script>
<style scoped>
  #chart1 {
      width: 1250px;
      height: 300px;
      border: 1px #e4e4e4;
      margin-top: 20px;
  }
</style>
