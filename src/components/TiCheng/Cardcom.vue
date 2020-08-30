<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看用户</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="cardvalue" @change="getCardComByType" filterable placeholder="请选择">
            <el-option
              v-for="item in cardtypelist"
              :key="item.cardName"
              :label="item.cardName"
              :value="item.cardName">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="addDialogVisible = true">选择提成方案</el-button>
        </el-col>
        <el-col :span="6">
          <el-input clearable v-model="cardName" @keyup.enter.native="searchEnterFun($event)" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="getsearchcardname"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--用户表格区域-->
      <el-table :data="(cardcomlist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="卡号" prop="cardId"></el-table-column>
        <el-table-column label="卡名称" prop="cardName"></el-table-column>
        <el-table-column label="开卡提成" prop="comMoney"></el-table-column>
        <el-table-column label="充值金额" prop="recharMoney"></el-table-column>
        <el-table-column label="折扣" prop="discount"></el-table-column>
        <el-table-column label="操作" width="185px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)"></el-button>
            <!--删除按钮-->
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="updateQingkong(scope.row)"></el-button>
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
        :total="cardcomlist.length"
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
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改开卡提成"
      :visible.sync="xiugaiDialog"
      width="35%">
      <!--主题内容-->

      <el-form :model="xiugai" :rules="xiugaiRules" ref="xiugaiFormRef" label-width="100px">
        <el-form-item label="卡号" prop="cardId">
          <el-input v-model="xiugai.CARDID" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务提成" prop="comMoney">
          <el-input v-model="xiugai.COMMONEY"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="xiugaiDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateCardCom">确 定</el-button>
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
        queryInfo: {
          quert: '',
          pagenum: 1,
          pagesize: 10
        },

        cardcomlist: [] ,

        cardtypelist:[],
        cardvalue:"全部类型",

        cardName:"",

        total: 0,
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
          CARDID: '',
          COMMONEY: ''
        },
        xiugaiRules: {

          SERVICEID: [
            { required: true, message: '请输入卡号', trigger: 'blur' },

          ],
          COMMONEY: [
            { required: true, message: '请输入服务提成', trigger: 'blur' },

          ]
        }
      }
    },
    mounted() {
      this.getCardComList();
      this.$axios.get('http://localhost:8090/CardCom/getAllCardtype').then(res=>{
        console.log(res.data)
        if(res.data.code===200) {
          console.log(res.data.msg)
          this.cardtypelist = res.data.data
        }else{
          console.log(res.data.code)
          console.log(res.data.msg+'ccc')
        }
      })
    },
    methods: {
      getCardComList(){
        this.$axios.get('http://localhost:8090/CardCom/getAllCardCom').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.cardcomlist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      getCardComByType(val) {
        var obj = {};
        obj = this.cardtypelist.find(function(item) {
          return item.cardName === val;
        });
        console.log(obj.cardName);
        console.log(val);
        this.$axios.get('http://localhost:8090/CardCom/getCardComByName?cardName=' + val).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("DDDDDDDDDDDDDDDDDDD"+res.data.msg)
            this.cardcomlist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      getsearchcardname(val) {
        val=this.cardName;
        console.log(val);
        this.$axios.get('http://localhost:8090/CardCom/getCardComByName?cardName=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.cardcomlist = res.data.data
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
          this.getsearchcardname()
        }
      },
      updateCardCom() {
        console.log("hhhhhh");
        this.xiugaiDialog = false;
        console.log(this.xiugai.CARDID);
        console.log(this.xiugai.COMMONEY);
        var lop={
          cardId:this.xiugai.CARDID,
          comMoney:this.xiugai.COMMONEY
        }
        var arr = new Array();
        arr.push(lop);
        var data = JSON.stringify(arr);
        console.log(data);
        console.log("1211111111111"+typeof lop);
        this.$axios.post('http://localhost:8090/CardCom/updateCardCom', lop).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            this.$message.success("修改成功！");
            console.log("hhhhhhhhhhhhhhhhhhh"+res.data.msg)
            this.getCardComList();
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      updateQingkong(row) {
        console.log("jjjjjj");
        console.log(row);
        console.log(row.cardId);

        this.$axios.post('http://localhost:8090/CardCom/updateQingkong?cardId=' + row.cardId ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            this.$message.success("清空成功！");
            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj"+res.data.msg)
            this.getCardComList();
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },
      // 监听pagesize 改变的事件
      handleSizeChange (newSize) {
        //  console.log(newSize)
        this.queryInfo.pagesize = newSize
        //this.getCardList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (newPage) {
        //  console.log(newPage)
        this.queryInfo.pagenum = newPage
        //this.getCardcomList()
      },
      handleEdit(index,row){
        this.xiugaiDialog = true
        this.xiugai.CARDID = row.cardId
        this.xiugai.COMMONEY = row.comMoney
      }
    }
  }

</script>
<style lang='less' scoped>


</style>
