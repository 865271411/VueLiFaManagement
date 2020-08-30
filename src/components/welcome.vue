<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content1 bg-purple1">
        <h1>欢迎登录{ 新风尚 }</h1>
      </div></el-col>
    </el-row>
    <!--走马灯-->
    <!--动态将图片轮播图的容器高度设置成与图片一致-->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="url in urls" :key="urls">
        <el-image
          style="width: 100%; height: 100%"
          :key="url" :src="url"></el-image>
      </el-carousel-item>
    </el-carousel>

    <div style="margin-left: 200px">
      <el-row :gutter="20"></el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">

            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">
                <el-col :span="3">
                  <div class="iys">
                    <img src="../assets/img/sy.png" alt="" >
                  </div>
                </el-col>
              </div></el-col>
              <el-col :span="16"><div class="grid-content bg-purple">
                <el-col><div class="zt">收银台</div></el-col>
                <el-col><div class="zt1">今日单数：{{totalTodayConsume}} 单</div></el-col>

              </div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-col :span="3">
                <div class="iys">
                  <img src="../assets/img/hy.png" alt="" >
                </div>
              </el-col>
            </div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">

              <el-col><div class="zt">会员中心</div></el-col>
              <el-col><div class="zt1">会员人数：{{viptotal}} 人</div></el-col>
            </div></el-col>
          </el-row>
        </div></el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">

            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">
                <el-col :span="3">
                  <div class="iys">
                    <img src="../assets/img/kc.png" alt="" >
                  </div>
                </el-col>
              </div></el-col>
              <el-col :span="16"><div class="grid-content bg-purple">

                <el-col><div class="zt">库存中心</div></el-col>
                <el-col><div class="zt1">商品数量：10 个</div></el-col>

              </div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">

            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">
                <el-col :span="3">
                  <div class="iys">
                    <img src="../assets/img/cw.png" alt="" >
                  </div>
                </el-col>
              </div></el-col>
              <el-col :span="16"><div class="grid-content bg-purple">

                <el-col><div class="zt">财务中心</div></el-col>
                <el-col><div class="zt1">今日营收：0 元</div></el-col>

              </div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">

            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">
                <el-col :span="3">
                  <div class="iys">
                    <img src="../assets/img/sj.png" alt="" >
                  </div>
                </el-col>
              </div></el-col>
              <el-col :span="16"><div class="grid-content bg-purple">
                <el-col><div class="zt">数据中心</div></el-col>
                <el-col><div class="zt1">店面业绩：0 元</div></el-col>

              </div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">

            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">
                <el-col :span="3">
                  <div class="iys">
                    <img src="../assets/img/yx.png" alt="" >
                  </div>

                </el-col>
              </div></el-col>
              <el-col :span="16"><div class="grid-content bg-purple">

                <el-col><div class="zt">营销中心</div></el-col>
                <el-col><div class="zt1">括客人数：0 人</div></el-col>

              </div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>


</template>

<script>
  export default {
    data(){
      return{
        totalTodayConsume:0,
        viptotal:0,
        urls: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598711654531&di=4f3b74b76c4b688fe9f946ee038556b9&imgtype=0&src=http%3A%2F%2Fstatic-xiaoguotu.17house.com%2Fxgt%2Fm%2F00%2F1462724828103.jpg',
          'https://dpic.tiankong.com/lt/fr/QJ8885277426.jpg?x-oss-process=style/794ws',
          'https://dpic.tiankong.com/9g/k3/QJ8824047604.jpg?x-oss-process=style/794ws',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598711823148&di=d8325d5409f585f0128a4e5e1f86cd80&imgtype=0&src=http%3A%2F%2Fimg.zx123.cn%2FResources%2Fzx123cn%2Fuploadfile%2F2016%2F1018%2F934d2836a0cb7327763c298d3c23f81b.jpg',
          'https://dpic.tiankong.com/8c/0i/QJ7138001121.jpg?x-oss-process=style/794ws',
        ]
      }
    },
    methods: {
      totalVIP(){
        console.log("9999999999999999999999");
        this.$axios.get('http://localhost:8090/welcome/totalVIP').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.viptotal = res.data.data
            console.log(this.viptotal)



          }else{
            console.log(res.data.msg+'ccc')
          }
        })
      },
      getTotalTodayConsume(){
        console.log("9999999999999999999999");
        this.$axios.get('http://localhost:8090/welcome/totalTodayConsume').then(res=>{
          console.log(res.data)
          if(res.data.code===200) {
            console.log(res.data.msg)
            this.totalTodayConsume = res.data.data
            console.log(this.totalTodayConsume)



          }else{
            console.log(res.data.msg+'ccc')
          }
        })
      }

    },
    mounted() {

      this.totalVIP()
      this.getTotalTodayConsume()
    }
  }

</script>
<style lang='less' scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple1 {
    background: rgba(255, 255, 255, 0);
    color: rgba(111, 122, 106, 0.98);
  }
  .bg-purple {
    background: rgba(255, 255, 255, 0.62);
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content1 {
    border-radius: 4px;
    min-height: 36px;
  }
  .iys{
    margin-left: 10px;
    margin-top: 15px;
  }
  .zt{
    color: #000000;
    margin-top: 20px;

  }
  .zt1{
    color: rgba(0, 0, 0, 0.48);
    margin-top: 20px;

  }

  .grid-content {
    border-radius: 4px;
    min-height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .main{
    text-align: center; /*让div内部文字居中*/
    background-color: #fff;
    border-radius: 20px;
    width: 300px;
    height: 350px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
