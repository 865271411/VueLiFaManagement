<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input clearable v-model="phone" @keyup.enter.native="searchEnterFun($event)" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="showTable"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="getAllVip">查询</el-button>
        <el-dialog title="会员" :visible.sync="dialogTableVisible" v-if="dialogTableVisible">
          <el-table :data="viplist" border stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column property="vipId" label="卡号"></el-table-column>
            <el-table-column property="vipName" label="姓名"></el-table-column>
            <el-table-column property="phone" label="电话号码"></el-table-column>
            <el-table-column property="cardId" label="卡类型"></el-table-column>
            <el-table-column property="cardMoney" label="卡上余额"></el-table-column>
            <el-table-column property="consumeMoney" label="开卡提成"></el-table-column>
            <el-table-column property="empId" label="员工编号"></el-table-column>
            <el-table-column property="cardTime" label="开卡时间"></el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
    </el-row>
    <el-col :span="24"><div class="grid-content bg42"></div></el-col>
    <el-row>
      <el-col :span="12"><div class="grid-content bg11">服务项目</div></el-col>
      <el-col :span="12"><div class="grid-content bg12">发型师</div></el-col>

      <el-row>
        <el-col :span="4"><div class="grid-content bg21">编号</div></el-col>
        <el-col :span="4"><div class="grid-content bg21">名称</div></el-col>
        <el-col :span="4"><div class="grid-content bg21">售价</div></el-col>
        <el-col :span="4"><div class="grid-content bg22">工号</div></el-col>
        <el-col :span="4"><div class="grid-content bg22">姓名</div></el-col>
        <el-col :span="4"><div class="grid-content bg22">类型</div></el-col>
        <el-row>
          <el-col :span="4"><div class="grid-content bg21">
            <e-col :span="4">
              <!--上架下架选择框-->
              <el-select v-model="sername" value-key="serviceId" @change="currentSel" placeholder="请选择">
                <el-option
                  v-for="item in sernamelist"
                  :key="item.serviceId"
                  :label="item.serviceId"
                  :value="item">
                  <span style="float: left">{{ item.serviceId }}</span>
                  <span style="float: left">{{ item.serviceName }}</span>
                </el-option>
              </el-select>
            </e-col>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg21">
            <e-col :span="4">
              <!--上架下架选择框-->
              <el-input v-model="input1" placeholder="" readonly="true"></el-input>
            </e-col>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg21">
            <e-col :span="4">
              <el-input v-model="input2" placeholder="" readonly="true"></el-input>
            </e-col>
          </div></el-col>

          <el-col :span="4"><div class="grid-content bg22">
            <e-col :span="4">
              <!--上架下架选择框-->
              <el-select v-model="empid"  filterable placeholder="请选择" value-key="empId" @change="currentSel1">
                <el-option
                  v-for="item in empidlist"
                  :key="item.empId"
                  :label="item.empId"
                  :value="item">
                  <span style="float: left">{{ item.empId }}</span>
                  <span style="float: left">{{ item.empName }}</span>
                </el-option>
              </el-select>
            </e-col>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg22">
            <e-col :span="4">
              <!--上架下架选择框-->
              <el-input v-model="input3" placeholder="" readonly="true"></el-input>
            </e-col>
          </div></el-col>

          <el-col :span="4"><div class="grid-content bg22">
            <e-col :span="4">
              <el-input v-model="input4" placeholder="" readonly="true"></el-input>
            </e-col>
          </div></el-col>

          <el-col :span="24"><div class="grid-content bg42"></div></el-col>
        </el-row>
      </el-row>

    </el-row>
    <el-row>
      <el-col :span="24"></el-col>
    </el-row>

    <el-row>
      <el-col :span="16">
        <el-form :model="vipcom" :rules="vipcom" ref="addFormRef" :inline="true" class="demo-form-inline">
          <el-form-item label="实际业绩">
            <el-input style="width: 300px" v-model="vipcom.YEJI"></el-input>
          </el-form-item>
          <el-form-item label="迭代金券">
            <el-input style="width: 300px" v-model="vipcom.JINJUAN"></el-input>
          </el-form-item>
          <el-form-item label="流水单号">
            <el-input style="width: 300px" v-model="vipcom.ID"></el-input>
          </el-form-item>
          <el-form-item label="水单日期">
            <el-input style="width: 300px" v-model="vipcom.CONSUMETIME"></el-input>
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input style="width: 300px" v-model="vipcom.vipName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input style="width: 300px" v-model="vipcom.TELPHONE"></el-input>
          </el-form-item>
          <el-form-item label="客户性别">
            <el-input style="width: 300px" v-model="vipcom.SEX"></el-input>
          </el-form-item>
          <el-form-item label="操作员工">
            <el-input style="width: 300px" v-model="vipcom.OPERATOR" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(vipcom)">结账</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        viplist:[],

        oneviplist:[],

        phone:"",

        kehuname:"",

        serviceId:'',
        serviceName:'',
        price:'',

        empId:'',
        empName:'',
        empLevel:'',

        sernamelist:[],
        sername:'全部类型',

        sernamelist:[],
        sername1:'全部类型',

        seridlist:[],
        serid:'全部类型',

        empidlist:[],
        empid:'全部类型',

        empnamelist:[],
        empname:'全部类型',

        vipcom:{
          YEJI:'',
          JINJUAN:'',
          ID:'',
          CONSUMETIME:new Date().getFullYear()+'-0'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
          vipName:'',
          TELPHONE:'',
          SEX:'',
          OPERATOR:'HZ'
        },

        vipTable:[],

        viplist: {
          vipId: '',
          vipName: '',
          phone: '',
          cardId: '',
          cardMoney: '',
          consumeMoney: '',
          empId: '',
          cardTime:''
        },
        dialogTableVisible: false,

        formLabelWidth: '120px',
        input:'',
        input1: ''
      }
    },
    mounted() {
      this.$axios.get('http://localhost:8888/LiFaManagement/SerCom/getAllSerName').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log("ggggggggggggggggggg"+res.data.msg)
          this.seridlist = res.data.data
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      }),
      this.getMessage();
        /*
      this.$axios.get('http://localhost:8888/LiFaManagement/SerCom/getAllSerName1').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log("ggggggggggggggggggg"+res.data.msg)
          this.sernamelist = res.data.data
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      }),*/
      this.$axios.get('http://localhost:8090/Emp/getAllEmp').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log("ggggggggggggggggggg"+res.data.msg)
          this.empidlist = res.data.data
          console.log("llllllllllllllllllll"+this.empidlist);
          console.log(typeof this.empidlist)
          console.log(typeof res.data.data)
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      }),

      this.$axios.get('http://localhost:8090/Emp/getAllEmpName').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log("ggggggggggggggggggg"+res.data.msg)
          this.empnamelist = res.data.data
          console.log("llllllllllllllllllll"+this.empnamelist);
          console.log(typeof this.empnamelist)
          console.log(typeof res.data.data)
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      })
    },
    methods: {
      currentSel(selVal) {
        this.serviceId = selVal.serviceId;
        this.serviceName = selVal.serviceName;
        this.price = selVal.price;
        this.input1=selVal.serviceName;
        this.input2=selVal.price;
        console.log("选择的serviceId为：" +  this.serviceId, "选择的serviceName为:" + this.serviceName);
        console.log(selVal);
      },
      currentSel1(selVal) {
        this.empId = selVal.empId;
        this.empName = selVal.empName;
        this.empLevel=selVal.empLevel;
        this.input3=selVal.empName;
        this.input4=selVal.empLevel;
        console.log("选择的empId为：" +  this.empId, "选择的empName为:" + this.empName);
        console.log(selVal);
      },
      getMessage(val){
        this.$axios.get('http://localhost:8090/SerCom/getAllSerName1').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("Messagelllllllllllll"+res.data.msg)
            this.sernamelist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      searchEnterFun (e){
        var keyCode = window.event ? e.keyCode : e.which;
        console.log("回车搜索", keyCode, e);
        if (keyCode == 13) {
          this.showTable()
        }
      },
      showTable(val){
        this.dialogTableVisible=true;
        val=this.phone;
        console.log("qqqqqqqqqqqq"+val)
        this.$axios.get('http://localhost:8090/Vip/getVipByTel?phone=' + val).then(res => {
          console.log("11111"+res.data.data)
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.viplist = res.data.data;
            console.log("www"+this.viplist)
          }else{
            console.log('error')
            return false
          }
        })
      },
      getAllVip(){
        this.dialogTableVisible=true;
        this.$axios.get('http://localhost:8090/Vip/getAllVip').then(res => {
          console.log("111111111111111111111"+res.data)
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.viplist = res.data.data
            console.log("wwwwwwwwwwwwwwwwwwww"+this.viplist)
          }else{
            console.log('error')
            return false
          }
        })
      },
      getserviceidbyname(val) {
        var obj = {};
        obj = this.sernamelist.find(function(item) {
          return item.serviceName === val;
        });
        console.log(obj.serviceName);
        console.log(val);
        this.$axios.get('http://localhost:8090/ComRecord/getServiceId?serviceName='+val).then(res => {
          console.log("111111111111111111111"+res.data)
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.serviceId = res.data.data
            console.log("rrrrrrrrrrrrrr"+this.serviceId)
          }else{
            console.log('error')
            return false
          }
        })
      },
      getempidbyname(val) {[]
        var obj = {};
        obj = this.empnamelist.find(function(item) {
          return item.empName === val;
        });
        console.log(obj.empName);
        console.log(val);
        this.$axios.get('http://localhost:8090/ComRecord/getEmpId?empName='+val).then(res => {
          console.log("111111111111111111111"+res.data)
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.empId = res.data.data
            console.log("ggggggggggggrrrrrrr"+this.empId)
          }else{
            console.log('error')
            return false
          }
        })
      },
      onSubmit(vipcom){
        var lop;
        console.log("111111111111111111"+vipcom.ID);
        console.log("22222222222222222"+vipcom.vipName);
        console.log("3333333333333333333333"+vipcom.CONSUMETIME);
        console.log("4444444444444444"+this.empId);
        console.log("55555555555555555"+this.serviceId);
        console.log("666666666666666"+vipcom.OPERATOR);

        this.$axios.get('http://localhost:8090/ComRecord/getVipId1?vipName='+vipcom.vipName).then(res => {
          if (res.data.code === 200) {
            this.vipId = res.data.data
          }else{
            console.log('error')
            return false
          }
        }),
        lop={
            id:vipcom.ID,
            serviceId:this.serviceId,
            empId:this.empId,
            vipId:this.vipId,
            consumeTime:vipcom.CONSUMETIME,
            operator:vipcom.OPERATOR
        }
        console.log("uuuuuuuuuuuuuuu"+lop.id);
        this.$axios.post('http://localhost:8090/ComRecord/insertCom',lop).then(res => {
          console.log("eeeeeeeeeeeeeeeeeeeeeeee"+res.data)
          if (res.data.code === 200) {
            this.$message.success("结账成功！");
            console.log(res.data.msg)
            this.vipId = res.data.data
            console.log("wwwwwwwwwwwwwwwwwwww"+this.vipId)
          }else{
            console.log('error')
            return false
          }
        })
      }
    }
  }
</script>
<style scoped>
  .bg11 {
    background: rgba(230, 220, 190, 0.82);
    text-align: center;
    line-height: 36px;
  }
  .bg12 {
    background: rgba(191, 238, 158, 0.62);
    text-align: center;
    line-height: 36px;
  }
  .bg21 {
    background: #f5ecd1;
    text-align: center;
    line-height: 36px;
  }
  .bg22 {
    background: rgba(207, 252, 171, 0.43);
    text-align: center;
    line-height: 36px;
  }
  .bg42 {
    background: rgba(234, 237, 241, 0.43);

  }
  .bg41 {
    background: rgba(255, 255, 255, 0);

  }
  .bg-purple {
    background: #ebf4fe;
  }
  .grid-content {
    min-height: 36px;
  }
  .el-select-dropdown__item span{
    width:100px;
    text-align:center;
  }

</style>
