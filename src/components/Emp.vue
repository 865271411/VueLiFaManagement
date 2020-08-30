<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>开店设置</el-breadcrumb-item>
      <el-breadcrumb-item>添加员工</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <el-row :gutter="15">
        <el-col :span="6">
          <el-input clearable v-model="sname" @clear="getEmpList" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="getSoloEmp"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加员工</el-button>
        </el-col>


        <!--<e-col :span="4">-->
          <!--&lt;!&ndash;服务类别选择框&ndash;&gt;-->
          <!--<el-select v-model="stype" clearable @change="getSearchStypeService" placeholder="全部类别">-->
            <!--<el-option-->
              <!--v-for="item in stypelist"-->
              <!--:key="item.stype"-->
              <!--:label="item.stype"-->
              <!--:value="item.stype">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</e-col>-->

        <!--<e-col :span="4">-->
          <!--&lt;!&ndash;上架下架选择框&ndash;&gt;-->
          <!--<el-select v-model="state"  @change="getStateService" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in statelist"-->
              <!--:key="item.state"-->
              <!--:label="item.state"-->
              <!--:value="item.state">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</e-col>-->



      </el-row>



      <!--用户表格区域-->
      <el-table :data="(emplist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe>


        <el-table-column type="index"></el-table-column>
        <el-table-column label="员工ID" prop="empId"></el-table-column>
        <el-table-column label="员工姓名" prop="empName"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="等级" prop="empLevel"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="生日" prop="birth"></el-table-column>
        <el-table-column label="雇佣日期" prop="hireDate"></el-table-column>

        <el-table-column label="操作" width="185px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
            <!--删除按钮-->
            <!--<el-popconfirm confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定删除此服务项目吗？" @onConfirm="deleteEmp(scope.row)">-->
              <!--<el-button slot="reference" size="mini" type="danger" icon="el-icon-delete">删除</el-button>-->
            <!--</el-popconfirm>-->
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 8, 10,15]"
        :page-size="queryInfo.pagesize"
        :total="emplist.length"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
    <!--添加员工-->
    <el-dialog
      title="添加员工"
      :visible.sync="addDialogVisible"
      width="35%"
      @close="addDialogClosed">
      <!--主题内容-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="员工ID" prop="empId">
          <el-input v-model="addForm.empId"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="addForm.empName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="empLevel">
          <el-input v-model="addForm.empLevel"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input  v-model="addForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="生日" prop="birth">
          <el-input :disabled="addForm.state" v-model="addForm.birth"></el-input>
        </el-form-item>
        <el-form-item label="雇佣日期" prop="hireDate">
          <el-input :disabled="addForm.state" v-model="addForm.hiredate"></el-input>
        </el-form-item>

      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertEmp">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改服务项目-->
    <el-dialog
      title="修改员工信息"
      :visible.sync="updateDialogVisible"
      width="35%">

      <!--主题内容-->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef" label-width="100px">
        <el-form-item label="项目编号" prop="empId">
          <el-input v-model="updateForm.empId" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目姓名" prop="empName">
          <el-input v-model="updateForm.empName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="updateForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="empLevel">
          <el-input v-model="updateForm.empLevel"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="updateForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-input v-model="updateForm.birth"></el-input>
        </el-form-item>
        <el-form-item label="雇佣日期" prop="hireDate">
          <el-input v-model="updateForm.hireDate"></el-input>
        </el-form-item>
      </el-form>



      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateEmp">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>


  export default {
    data () {



      return {

        sname:'',
        // 获取用户列表的参数对象
        queryInfo: {
          quert: '',
          pagenum: 1,
          pagesize:5
        },
        emplist: [] ,

        total: '',
        addDialogVisible: false,
        addForm: {
          empId: '',
          empName: '',
          sex:'',
          empLevel: '',
          phone:'',
          birth:'',
          hireDate:''

        },
        addFormRules: {
          empId: [
            { required: true, message: '请输入员工编号', trigger: 'blur' },

          ],
          empName: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },


          ],
          sex: [
            { required: true, message: '请输入员工性别', trigger: 'blur' },

          ],
          empLevel: [
            { required: true, message: '请输入员工等级', trigger: 'blur' },

          ],
          phone: [
            { required: true, message: '请输入员工电话', trigger: 'blur' },

          ],
          birth: [
            { required: true, message: '请输入员工生日', trigger: 'blur' },

          ]

        },
        updateDialogVisible: false,
        readonly:true,
        updateForm:{
          empId: '',
          empName: '',
          sex:'',
          empLevel: '',
          phone:'',
          birth:'',
          hireDate:''
        },
        updateFormRules: {
          empName: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },


          ],
          sex: [
            { required: true, message: '请输入员工性别', trigger: 'blur' },

          ],
          empLevel: [
            { required: true, message: '请输入员工等级', trigger: 'blur' },

          ],
          phone: [
            { required: true, message: '请输入员工电话', trigger: 'blur' },

          ],
          birth: [
            { required: true, message: '请输入员工生日', trigger: 'blur' },

          ],
          hireDate: [
            { required: true, message: '请输入雇佣日期', trigger: 'blur' },

          ]
        },





      }
    },
    // created () {
    //   this.getServiceTypeList()
    //   this.getStypeList()
    // },
    methods: {

      getEmpList(){
        console.log("9999999999999999999999");
        this.$axios.get('http://localhost:8090/AddEmp/getAllEmp').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.emplist = res.data.data
            console.log("hhhhhhhhhhhhh"+typeof this.emplist)
            console.log("gggggggggggg"+typeof res.data.data)
            console.log("12121212"+this.emplist)
            this.total = res.data.total
          }else{
            console.log(res.data.msg+'ccc')
          }
        })
      },
      // 点击按钮 添加新用户
      insertEmp () {
        console.log("hhhhhhhhhhhhhhjjjjjjjjjjj")

        const { data: res } = this
        this.$axios.post('http://localhost:8090/AddEmp/insertEmp', {'empId':this.addForm.empId,'empName':this.addForm.empName,'sex':this.addForm.sex,'empLevel':this.addForm.empLevel,'phone':this.addForm.phone,'birth':this.addForm.birth,'hireDate':this.addForm.hireDate}).then(res =>{
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.$message.success('添加成功')
            // 隐藏添加用户的对话框
            this.addDialogVisible = false
            //重新发起请求用户列表
            this.getEmpList()
          } else {
            console.log(res.data.msg+'添加失败）')
            //this.$message.error(res.data.msg)
          }
        })
      },
      // 点击按钮修改
      updateEmp () {
        console.log("hhhhhhhhhhhhhhjjjjjjjjjjj")

        const { data: res } = this
        this.$axios.post('http://localhost:8090/AddEmp/updateEmp', {'empId':this.updateForm.empId,'empName':this.updateForm.empName,'sex':this.updateForm.sex,'empLevel':this.updateForm.empLevel,'phone':this.updateForm.phone,'birth':this.updateForm.birth,'hireDate':this.updateForm.hireDate}).then(res =>{
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.$message.success('修改成功')
            // 隐藏添加用户的对话框
            this.updateDialogVisible = false
            //重新发起请求用户列表
            this.getEmpList()
          } else {
            console.log(res.data.msg+'修改失败）')
            this.$message.error(res.data.msg)
          }
        })
      },
      //搜索框搜索
      getSoloEmp(val) {
        val=this.sname;

        console.log("hhhhhhhhhhhhhhhhhhhh"+val);
        this.$axios.get('http://localhost:8090/AddEmp/getSoloEmp?empId=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.emplist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },

      // deleteEmp(row){
      //   console.log(row.empId);
      //   this.$axios.get('http://localhost:8080/LiFaManagement/emp/deleteEmp?empId='+ row.empId).then(res=>{
      //     if(res.data.code===200) {
      //       console.log(res.data.msg)
      //       this.getEmpList()
      //       this.emplist = res.data.data
      //       this.total = res.data.total
      //     }else{
      //       console.log(res.data.msg+'ccc')
      //     }
      //   })
      // },


      // 监听pagesize 改变的事件
      handleSizeChange (newSize) {
        //  console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getEmpList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (newPage) {
        //  console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getEmpList()
      },
      handleEdit(index,row){
        this.updateDialogVisible = true
        this.updateForm.empId = row.empId
        this.updateForm.empName = row.empName
        this.updateForm.sex = row.sex
        this.updateForm.empLevel = row.empLevel
        this.updateForm.phone = row.phone
        this.updateForm.birth = row.birth
        this.updateForm.hireDate = row.hireDate

      }


    },
    mounted() {
      this.getEmpList()


    }
  }

</script>
<style lang="less" scoped>


</style>
