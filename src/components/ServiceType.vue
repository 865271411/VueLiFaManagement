<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>开店设置</el-breadcrumb-item>
      <el-breadcrumb-item>添加服务项目</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <el-row :gutter="15">
        <el-col :span="6">
          <el-input clearable v-model="sname" @clear="getServiceTypeList" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="selectServiceType"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加项目</el-button>
        </el-col>


        <e-col :span="4">
          <!--服务类别选择框-->
          <el-select v-model="stype" clearable @change="getSearchStypeService" placeholder="全部类别">
            <el-option
              v-for="item in stypelist"
              :key="item.stype"
              :label="item.stype"
              :value="item.stype">
            </el-option>
          </el-select>
        </e-col>

        <e-col :span="4">
          <!--上架下架选择框-->
          <el-select v-model="state"  @change="getStateService" placeholder="请选择">
            <el-option
              v-for="item in statelist"
              :key="item.state"
              :label="item.state"
              :value="item.state">
            </el-option>
          </el-select>
        </e-col>



      </el-row>



      <!--用户表格区域-->
      <el-table :data="(serviceTypelist || '').slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)" border stripe>


        <el-table-column type="index"></el-table-column>
        <el-table-column label="编号" prop="serviceId"></el-table-column>
        <el-table-column label="名称" prop="serviceName"></el-table-column>
        <el-table-column label="类型" prop="stype"></el-table-column>
        <el-table-column label="售价" prop="price"></el-table-column>
        <el-table-column label="提成" prop="comMoney"></el-table-column>
        <el-table-column label="状态" prop="state">

        </el-table-column>

        <el-table-column label="操作" width="185px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
            <!--删除按钮-->
            <el-popconfirm confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定删除此服务项目吗？" @onConfirm="deleteServiceType(scope.row)">
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
        :page-sizes="[1, 2, 5, 8, 10,15]"
        :page-size="queryInfo.pagesize"
        :total="serviceTypelist.length"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
    <!--添加用户-->
    <el-dialog
      title="添加服务项目"
      :visible.sync="addDialogVisible"
      width="35%"
      @close="addDialogClosed">
      <!--主题内容-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="项目编号" prop="serviceId">
          <el-input v-model="addForm.serviceId"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="serviceName">
          <el-input v-model="addForm.serviceName"></el-input>
        </el-form-item>
        <el-form-item label="项目类别" prop="stype">
          <!--服务类别选择框-->
          <el-select v-model="addForm.stype" placeholder="全部类别">
            <el-option
              v-for="item in stypelist"
              :key="item.stype"
              :label="item.stype"
              :value="item.stype">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>

        <el-form-item label="项目状态" prop="state">
          <el-input :disabled="addForm.state" v-model="addForm.state"></el-input>
        </el-form-item>

      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveServiceType">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改服务项目-->
    <el-dialog
      title="修改服务项目"
      :visible.sync="updateDialogVisible"
      width="35%">

      <!--主题内容-->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef" label-width="100px">
        <el-form-item label="项目编号" prop="serviceId">
          <el-input v-model="updateForm.serviceId" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="serviceName">
          <el-input v-model="updateForm.serviceName"></el-input>
        </el-form-item>
        <el-form-item label="项目类别" prop="stype">
          <!--服务类别选择框-->
          <el-select v-model="updateForm.stype" placeholder="全部类别">
            <el-option
              v-for="item in stypelist"
              :key="item.stype"
              :label="item.stype"
              :value="item.stype">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目价格" prop="price">
          <el-input v-model="updateForm.price"></el-input>
        </el-form-item>
      </el-form>



      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateServiceType">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>


  export default {
    data () {
      var checkServiceId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('项目编号不能为空'));
        }
      }


      return {
        sname: '',


        stypelist: [],
        stype: '',

        tstype: '',
        statelist: [
          {
            "id":0,
            "state":"已下架"
          },{
            "id":1,
            "state":"上架"
          }
        ],
        state: '上架',
        // 获取用户列表的参数对象
        queryInfo: {
          quert: '',
          pagenum: 1,
          pagesize: 8
        },
        serviceTypelist: [] ,
        total: '',
        updateDialogVisible: false,
        addDialogVisible: false,
        readonly:true,
        updateForm:{
          serviceId:'',
          serviceName:'',
          stype:'',
          price:''
        },
        updateFormRules: {
          serviceId: [
            { required: true, message: '请输入项目编号', trigger: 'blur' },

          ],
          serviceName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },


          ],
          stype: [
            { required: true, message: '请选择项目类别', trigger: 'blur' },

          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },

          ]
        },
        addForm: {
          serviceId: '',
          serviceName: '',
          stype:'',
          price: '',
          state:'上架'

        },
        addFormRules: {
          serviceId: [
            { required: true, message: '请输入项目编号', trigger: 'blur' },

          ],
          serviceName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },


          ],
          stype: [
            { required: true, message: '请选择项目类别', trigger: 'blur' },

          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },

          ]
        }
      }
    },
    // created () {
    //   this.getServiceTypeList()
    //   this.getStypeList()
    // },
    methods: {
      // async getServiceTypeList () {
      //  const {data: res } = await this.$http.get('serviceTypes', {
      //    params: this.queryInfo
      //    })
      //    this.serviceTypelist = res.data.serviceTypes
      //    this.total = res.data.total
      //    console.log(res.data.total)
      // },
      async getServiceTypeList(){
        console.log("9999999999999999999999");
        this.$axios.get('http://localhost:8090/serviceType/getAllServiceType').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.serviceTypelist = res.data.data
            console.log("12121212"+this.serviceTypelist)
            this.total = res.data.total
          }else{
            console.log(res.data.msg+'ccc')
          }
        })
      },

      deleteServiceType(row){
        console.log(row.serviceId);
        this.$axios.post('http://localhost:8090/serviceType/deleteServiceType?serviceId='+ row.serviceId).then(res=>{
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.getServiceTypeList()
            this.serviceTypelist = res.data.data
            this.total = res.data.total
          }else{
            console.log(res.data.msg+'ccc')
          }
        })
      },

      //获得服务项目类别
      async getAllStypeList(){
        console.log("dfdfdfsdfsdf")
        this.$axios.get('http://localhost:8090/serviceType/getAllStype').then(res=>{
          console.log(res.data.data)
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.stypelist = res.data.data
          }else{
            console.log(res.data.msg+'ccc')
          }
        })
      },
      //服务类别下拉框查找
      getSearchStypeService(val) {
        var obj = {};
        obj = this.stypelist.find(function(item) {
          return item.stype === val;
        });

        console.log(val);
        this.$axios.get('http://localhost:8090/serviceType/searchStypeService?stype=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.serviceTypelist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })

      },
      //搜索框搜索
      selectServiceType(val) {
        val=this.sname;

        console.log("hhhhhhhhhhhhhhhhhhhh"+val);
        this.$axios.get('http://localhost:8090/serviceType/selectServiceType?serviceName=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.serviceTypelist = res.data.data
          }else{
            console.log(res.data.code)
            console.log(res.data.msg+'ccc')
          }
        })
      },

      // 监听 添加用户对话框的关闭事件
      addDialogClosed() {
        // 表单内容重置为空
        this.$refs.addFormRef.resetFields() // 通过ref引用调用resetFields方法
      },

      // 点击按钮 添加新用户
      saveServiceType () {
        console.log("hhhhhhhhhhhhhhjjjjjjjjjjj")

        const { data: res } = this
        this.$axios.post('http://localhost:8090/serviceType/saveServiceType', {'serviceId':this.addForm.serviceId,'serviceName':this.addForm.serviceName,'price':this.addForm.price,'stype':this.addForm.stype,'state':this.addForm.state}).then(res =>{
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.$message.success('添加成功')
            // 隐藏添加用户的对话框
            this.addDialogVisible = false
            //重新发起请求用户列表
            this.getServiceTypeList()
          } else {
            console.log(res.data.msg+'添加失败）')
            this.$message.error(res.data.msg)
          }
        })
      },

      // 点击按钮修改
      updateServiceType () {
        console.log("hhhhhhhhhhhhhhjjjjjjjjjjj")

        const { data: res } = this
        this.$axios.post('http://localhost:8090/serviceType/updateServiceType', {'serviceId':this.updateForm.serviceId,'serviceName':this.updateForm.serviceName,'price':this.updateForm.price,'stype':this.updateForm.stype}).then(res =>{
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.msg)
            this.$message.success('修改成功')
            // 隐藏添加用户的对话框
            this.updateDialogVisible = false
            //重新发起请求用户列表
            this.getServiceTypeList()
          } else {
            console.log(res.data.msg+'修改失败）')
            this.$message.error(res.data.msg)
          }
        })
      },

      //上架下架下拉框查找
      getStateService(val) {
        var obj = {};
        obj = this.statelist.find(function(item) {
          return item.state === val;
        });
        console.log(val);
        this.$axios.get('http://localhost:8090/serviceType/getStateService?state=' + val ).then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log("ggggggggggggggggggg"+res.data.msg)
            this.serviceTypelist = res.data.data
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
        this.getServiceTypeList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (newPage) {
        //  console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getServiceTypeList()
      },
      handleEdit(index,row){
        this.updateDialogVisible = true
        this.updateForm.serviceId = row.serviceId
        this.updateForm.serviceName = row.serviceName
        this.updateForm.stype = row.stype
        this.updateForm.price = row.price
      },

    },
    mounted() {
      this.getServiceTypeList(),
        this.getAllStypeList()

    }
  }

</script>
<style lang="less" scoped>


</style>
