<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>提成设置</el-breadcrumb-item>
      <el-breadcrumb-item>服务项目提成设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="stypevalue" @change="getSerComByStype" filterable placeholder="请选择">
            <el-option
              v-for="item in serstypelist"
              :key="item.stype"
              :label="item.stype"
              :value="item.stype">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="statevalue" @change="getSerComByState" filterable placeholder="请选择">
            <el-option
              v-for="item in serstatelist"
              :key="item.state"
              :label="item.state"
              :value="item.state">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="addDialogVisible = true">选择提成方案</el-button>
        </el-col>
        <el-col :span="6">
          <el-input clearable v-model="serviceName" @keyup.enter.native="searchEnterFun($event)" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="getsearchtype"></el-button>
          </el-input>
        </el-col>

      </el-row>
      <!--用户表格区域-->
      <el-table :data="(sercomlist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="服务编号" prop="serviceId"></el-table-column>
        <el-table-column label="服务项目" prop="serviceName"></el-table-column>
        <el-table-column label="服务提成" prop="comMoney"></el-table-column>
        <el-table-column label="服务售价" prop="price"></el-table-column>
        <el-table-column label="服务类型" prop="stype"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="185px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)"></el-button>
            <!--删除按钮-->
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="updateQingkong(scope.$index,scope.row)"></el-button>
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
        :total="sercomlist.length"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
    <!--添加用户-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="35%">
      <!--主题内容-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false" >确 定</el-button>
      </span>
    </el-dialog>

    <!--修改提成-->

    <el-dialog
      title="修改服务提成"
      :visible.sync="xiugaiDialog"
      width="35%">
      <!--主题内容-->
      <el-form :model="xiugai" :rules="xiugaiRules" ref="xiugaiFormRef" label-width="100px">
        <el-form-item label="服务编号" prop="serviceId">
          <el-input v-model="xiugai.SERVICEID" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务提成" prop="comMoney">
          <el-input v-model="xiugai.COMMONEY"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="xiugaiDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSerCom">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      }
      return {
        // 获取用户列表的参数对象
        serstatelist:[],
        statevalue:'全部类型',

        serstypelist:[],
        stypevalue:'全部类型',

        queryInfo: {
          quert: '',
          pagenum: 1,
          pagesize: 10
        },

        sercomlist: [] ,

        total: 0,

        serviceName:"",

        addDialogVisible: false,
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        addFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator: checkPhone, trigger: 'blur'}
          ]
        },

        readonly:true,
        xiugaiDialog: false,
        xiugai: {
          SERVICEID: '',
          COMMONEY: ''
        },
        xiugaiRules: {

          SERVICEID: [
            { required: true, message: '请输入服务编号', trigger: 'blur' },
          ],
          COMMONEY: [
            { required: true, message: '请输入服务提成', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
      this.getSerComList();
      //const _that = this
      /*
      this.$axios.get('http://localhost:8888/LiFaManagement/SerCom/getAllSerCom').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log("AAAAAAAAAAAAAAAAA"+res.data.msg)
          this.sercomlist = res.data.data
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      }),
      */
      this.$axios.get('http://localhost:8090/SerCom/getAllState').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log("BBBBBBBBBBBBBBBBBBBBBBB"+res.data.msg)
          this.serstatelist = res.data.data
          console.log("sjsjsjsj"+typeof this.serstatelist)
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      }),
        this.$axios.get('http://localhost:8090/SerCom/getAllStype').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("CCCCCCCCCCCCCCCCCCCCC"+res.data.msg)
            this.serstypelist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
    },
    methods: {
      // 监听pagesize 改变的事件
      handleSizeChange (newSize) {
        //  console.log(newSize)
        this.queryInfo.pagesize = newSize
        //this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (newPage) {
        //  console.log(newPage)
        this.queryInfo.pagenum = newPage
        //this.getSercomList()
      },
      handleEdit(index,row){
        this.xiugaiDialog = true
        this.xiugai.SERVICEID = row.serviceId
        this.xiugai.COMMONEY = row.comMoney
      },
      getSerComList(){
        this.$axios.get('http://localhost:8090/SerCom/getAllSerCom').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("AAAAAAAAAAAAAAAAA"+res.data.msg)
            this.sercomlist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      getSerComByStype(val) {
        var obj = {};
        obj = this.serstypelist.find(function(item) {
          return item.stype === val;
        });
        console.log(obj.stype);
        console.log(val);
        this.$axios.get('http://localhost:8090/SerCom/getSerComByStype?stype=' + val).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("DDDDDDDDDDDDDDDDDDD"+res.data.msg)
            this.sercomlist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      getSerComByState(val) {
        var obj = {};
        obj = this.serstatelist.find(function(item) {
          return item.state === val;
        });
        console.log(obj.state);
        console.log(val);
        this.$axios.get('http://localhost:8090/SerCom/getSerComByState?state=' + val).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("FFFFFFFFFFFFFFFFFFFF"+res.data.msg)
            this.sercomlist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      getsearchtype(val) {
        val=this.serviceName;
        console.log(val);
        this.$axios.get('http://localhost:8090/SerCom/getSerComByName?serviceName=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.sercomlist = res.data.data
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
          this.getsearchtype()
        }
      },
      /*
      getsearchtype(val) {
        var obj = {};
        obj = this.serstypelist.find(function(item) {
          return item.stype === val;
        });
        console.log(val);
        this.$axios.get('http://localhost:8888/LiFaManagement/SerCom/getSerComByStype?stype=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.sercomlist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      */
      updateSerCom() {
        console.log("hhhhhh");
        this.xiugaiDialog = false;
        console.log(this.xiugai.SERVICEID);
        console.log(this.xiugai.COMMONEY);
        var lop={
          serviceId:this.xiugai.SERVICEID,
          comMoney:this.xiugai.COMMONEY
        }
        var arr = new Array();
        arr.push(lop);
        var data = JSON.stringify(arr);
        console.log(data);
        console.log("1211111111111"+typeof lop);
        this.$axios.post('http://localhost:8090/SerCom/updateSerCom', lop).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            this.$message.success("修改成功！");
            console.log("hhhhhhhhhhhhhhhhhhh"+res.data.msg)
            //this.sercomlist = res.data.data
            this.getSerComList();
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      updateQingkong(index,row) {
        console.log("jjjjjj");
        console.log(index);
        console.log(row);
        console.log(row.serviceId);

        this.$axios.post('http://localhost:8090/SerCom/updateQingkongg?serviceId=' + row.serviceId ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            this.$message.success("清空成功！");
            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj"+res.data.msg)
            //this.sercomlist = res.data.data
            this.getSerComList();
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>


</style>
