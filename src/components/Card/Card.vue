<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>开店设置</el-breadcrumb-item>
      <el-breadcrumb-item>添加卡类型</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加会员卡类型</el-button>
        </el-col>
      </el-row>
      <!--用户表格区域-->
      <el-table :data="(cardlist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe :default-sort="{prop:'cardId',order:['ascending','descending']}">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column label="会员卡号" prop="cardId" sortable></el-table-column>
        <el-table-column label="会员卡类型" prop="cardName"></el-table-column>
        <el-table-column label="会员卡提成" prop="comMoney"></el-table-column>
        <el-table-column label="需充值金额" prop="recharMoney"></el-table-column>
        <el-table-column label="折扣" prop="discount" sortable></el-table-column>
        <el-table-column label="操作" width="185px" align="center">

          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
            <!--删除按钮-->
            <el-popconfirm confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定删除此会员卡类型吗？" @onConfirm="deleteCardType(scope.row)">
              <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="cardlist.length">
      </el-pagination>
    </el-card>
    <!--添加用户-->
    <el-dialog
      title="添加会员卡类型"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed">
      <!--主题内容-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="会员卡号" prop="cardid">
          <el-input v-model="addForm.cardId"></el-input>
        </el-form-item>
        <el-form-item label="会员卡类型" prop="cardname">
          <el-input v-model="addForm.cardName"></el-input>
        </el-form-item>
        <el-form-item label="开卡提成金额" prop="commoney">
          <el-input v-model="addForm.comMoney"></el-input>
        </el-form-item>
        <el-form-item label="需充值金额" prop="recharmoney">
          <el-input v-model="addForm.recharMoney"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input v-model="addForm.discount"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCardType">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改会员卡类型-->
    <el-dialog
      title="修改会员卡类型" :visible.sync="editDialogVisible" width="30%">
      <!--主题内容-->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="会员卡号" prop="cardid">
          <el-input v-model="editForm.cardId" readonly></el-input>
        </el-form-item>
        <el-form-item label="会员卡类型" prop="cardname">
          <el-input v-model="editForm.cardName"></el-input>
        </el-form-item>
        <el-form-item label="开卡提成金额" prop="commoney">
          <el-input v-model="editForm.comMoney"></el-input>
        </el-form-item>
        <el-form-item label="需充值金额" prop="recharmoney">
          <el-input v-model="editForm.recharMoney"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input v-model="editForm.discount"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCardType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 获取用户列表的参数对象
        queryInfo: {
          quert: '',
          pagenum: 1,
          pagesize: 10,
        },
        cardlist: [] ,
        total: 0,
        addDialogVisible: false,
        addForm: {
          cardId:'',
          cardName:'',
          comMoney:'',
          recharMoney:'',
          discount:'',
        },
        addFormRules: {
          cardId: [
            { required: true, message: '请输入会员卡号', trigger: 'blur' },
          ],
          cardName: [
            { required: true, message: '请输入会员卡类型', trigger: 'blur' },
          ],
          comMoney: [
            { required: true, message: '请输入办此会员卡的提成金额', trigger: 'blur' },
          ],
          recharMoney: [
            { required: true, message: '请输入此会员卡需要充值的最低金额', trigger: 'blur' },
          ],
          discount: [
            { required: true, message: '请输入此会员卡的折扣', trigger: 'blur' },
          ]
        },
        readonly: true,
        editDialogVisible: false,
        editForm: {
          cardId:'',
          cardName:'',
          comMoney:'',
          recharMoney:'',
          discount:'',
        },
        editFormRules: {
          cardId: [
            { required: true, message: '请输入会员卡号', trigger: 'blur' },
          ],
          cardName: [
            { required: true, message: '请输入会员卡类型', trigger: 'blur' },
          ],
          comMoney: [
            { required: true, message: '请输入办此会员卡的提成金额', trigger: 'blur' },
          ],
          recharMoney: [
            { required: true, message: '请输入此会员卡需要充值的最低金额', trigger: 'blur' },
          ],
          discount: [
            { required: true, message: '请输入此会员卡的折扣', trigger: 'blur' },
          ]
        },
      }
    },
    mounted () {
      this.getCardList()
    },

    methods: {
      async getCardList() {
        this.$axios.get('http://localhost:8090/card/getAllCardType').then(res => {
          // console.log(res.data.data)
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.cardlist = res.data.data
            this.total = res.data.total
          } else {
            console.log(res.data.msg + 'ccc')
          }
        })
      },
      // 监听pagesize 改变的事件
      handleSizeChange(newSize) {
        //  console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getCardList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        //  console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getCardList()
      },
      handleEdit(index,row){
        this.editDialogVisible = true
        this.editForm.cardId = row.cardId
        this.editForm.cardName = row.cardName
        this.editForm.comMoney = row.comMoney
        this.editForm.recharMoney = row.recharMoney
        this.editForm.discount = row.discount
      },
      // 监听 添加会员卡类型对话框的关闭事件
      addDialogClosed() {
        // 表单内容重置为空
        this.$refs.addFormRef.resetFields() // 通过ref引用调用resetFields方法
      },
      // editDialogClosed() {
      //   // 表单内容重置为空
      //   this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
      // },


  // 点击按钮 添加新会员卡类型
      saveCardType() {
        // var lop={
        // cardId:this.addForm.cardId,
        // cardName:this.addForm.cardName,
        // comMoney:this.addForm.comMoney,
        // recharMoney:this.addForm.recharMoney,
        // discount:this.addForm.discount
        // }
        // var arr = new Array();
        // arr.push(lop);
        // var data = JSON.stringify(arr);
            // 可以发起添加的网络请求
        this.$axios.post('http://localhost:8090/card/saveCardType', {
          'cardId': this.addForm.cardId,
          'cardName': this.addForm.cardName,
          'comMoney': this.addForm.comMoney,
          'recharMoney': this.addForm.recharMoney,
          'discount': this.addForm.discount
        }).then(res => {
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.$message.success('添加会员卡类型成功')
            // 隐藏添加的对话框
            this.addDialogVisible = false
            //重新发起请求会员卡类型列表
            this.getCardList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      deleteCardType(row) {
        console.log(row.serviceId);
        this.$axios.get('http://localhost:8090/card/deleteCardType?cardId=' + row.cardId).then(res => {
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.getCardList()
            this.cardlist = res.data.data
            this.total = res.data.total
          } else {
            console.log(res.data.msg)
          }
        })
      },
      updateCardType() {
        this.$axios.post('http://localhost:8090/card/updateCardType', {
          'cardId': this.editForm.cardId,
          'cardName': this.editForm.cardName,
          'comMoney': this.editForm.comMoney,
          'recharMoney': this.editForm.recharMoney,
          'discount': this.editForm.discount
        }).then(res => {
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.$message.success('修改会员卡类型成功')
            // 隐藏对话框
            this.editDialogVisible = false
            //重新发起请求会员卡类型列表
            this.getCardList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>


</style>
