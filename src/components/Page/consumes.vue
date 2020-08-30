<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">收银台</el-breadcrumb-item>
      <el-breadcrumb-item>消费记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-row :gutter=20>
        <el-col :span="4">

        <el-select v-model="value" placeholder="选择时间">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onSearch(value)">查询</el-button>
        </el-col>

      </el-row>



      <!--用户表格区域-->
      <el-table :data="(consumelist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单号" prop="id"></el-table-column>
        <el-table-column label="vip姓名" prop="vipName"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="服务项目" prop="serviceName"></el-table-column>
        <el-table-column label="消费时间" prop="consumeTime"></el-table-column>
        <el-table-column label="操作人" prop="operAtor"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button size="mini" type="primary" icon="el-icon-edit" v-model="scope.row.mg_state"></el-button>
            <!--删除按钮-->
            <el-popconfirm confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定删除此记录吗？"  @onConfirm="deleteConsume(scope.row)">
              <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" ></el-button>
            </el-popconfirm>

            <!--其他操作按钮-->
            <el-tooltip effect="dark" content="其他" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        :total="consumelist.length"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
   data() {
    return {
     consumelist:[],
    // 获取用户列表的参数对象
      queryInfo: {
        quert: '',
        pagenum: 1,
        pagesize: 5
      },
      total: '',
      visible: false,
      updateDialogVisible: false,
      addDialogVisible: false,

        options: [ {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '今天'
        }, {
          value: '2',
          label: '昨天'
        }, {
          value: '3',
          label: '两天前'
        }],
        value: '',
    }
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 监听pagesize 改变的事件
    handleSizeChange (newSize) {
    //  console.log(newSize)
      this.queryInfo.pagesize = newSize
      //this.getAllConsumeList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      //  console.log(newPage)
      this.queryInfo.pagenum = newPage
      //this.getAllConsumeList()
    },

    getAllConsumeList(){
      console.log("9999999999999999999999");
      this.$axios.get('http://localhost:8090/host/Consume').then(res => {
        console.log(res.data)
        if(res.data.code===200) {
          console.log(res.data.msg)
          this.consumelist = res.data.data
          //console.log("12121212"+this.serviceTypelist)
          this.total = res.data.total
        }else{
          console.log(res.data.msg+'ccc')
        }
      })
    },

    //删除消费记录
    deleteConsume(row){
      console.log(row.id);
      this.$axios.get('http://localhost:8090/host/deleteConsume?id='+ row.id).then(res=>{
        //console.log("AAAAABBBBBBccccc"+res.data.code)
        if(res.data.code===200) {
          console.log(res.data.msg)
          this.getAllConsumeList()
          this.consumelist = res.data.data
          //console.log("AAAAAAAAAAAAAAAAAAAAAA"+this.consumelist)
          this.total = res.data.total
          
        }else{
          console.log(res.data.msg+'cccAAAA')
        }
      })
    },

    //查询今日昨日消费记录 
    onSearch(value) {
      console.log("999999999999999AAAAAAAAAA："+value);
      this.$axios.get('http://localhost:8090/host/getConsumeByDay?day='+value).then(res => {
        console.log(res.data)
        if(res.data.code===200) {
          console.log(res.data.msg)
          this.consumelist = res.data.data
          //console.log("12121212"+this.serviceTypelist)
          this.total = res.data.total
        }else{
          console.log(res.data.msg+'ccc')
        }
      })
    }
  },
  

  mounted () {
    this.getAllConsumeList() 
  }
};
</script>
