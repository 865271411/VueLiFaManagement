import echarts from 'echarts'
//import {render} from 'react-dom'
const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get () {
          return {
            line1: function (id,data) {
              console.log("aaaaaaaaaaaa:" + document.getElementById(id))
              this.chart = echarts.init(document.getElementById(id))
              this.achievementlist=JSON.parse(data)
              console.log(this.achievementlist)
              this.xdata=new Array()
              this.ydata=new Array()
              this.ndata=new Array()
              for (var i = 0; i < this.achievementlist.length; i++) {
                this.ydata[i] = new Array()
              }
              for (var j = 0; j < this.achievementlist[0].empAcheDemos.length; j++) {
                this.ndata[j] = this.achievementlist[0].empAcheDemos[j].empName
              }
              for (var i = 0; i < this.achievementlist.length; i++) {
                this.xdata[i] = this.achievementlist[i].consumetime
                var ttt = this.achievementlist[i].empAcheDemos
                for (var j = 0; j < ttt.length; j++) {
                  //console.log('totalcccc: ' + ttt[j].totalAche)
                  this.ydata[j][i] = ttt[j].totalAche
                }
              }
              console.log("name:" + this.ndata)
              console.log("dddddddddd"+this.ydata)

              this.chart.clear()
              const optionData = {
                title: {
                  text: '店面业绩趋势图',
                  x: 'center'// 垂直安放位置，默认为全图顶端，可选为：
                },
                color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
                  '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],
                tooltip: {
                  show: true, // 是否显示
                  trigger: 'axis'// 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
                },
                grid: {
                  x: '90px',    //组件离容器左侧的距离
                  y: '50px',   //组件离容器上边的距离
                  x2: '90px',   //组件离容器右侧的距离
                  y2: '50px',   //组件离容器下边的距离
                },
                legend: {
                  x: 'right',
                  y:'center',
                  orient:'vertical',
                  data: this.ndata,
                },
                xAxis: {
                  type: 'category',
                  data: this.xdata
                },
                yAxis: {
                  name:'单位（￥）人民币',
                  nameLocation:'middle',
                  nameTextStyle: {
                    padding: [0, 0, 30, 0]    // 四个数字分别为上右下左与原位置距离
                  },
                  type: 'value',
                  axisLine: {
                    show: false,   //显示刻度线
                  }
                },
                series: [
                  {
                    name: this.ndata[0],
                    data: this.ydata[0],
                    type: 'line',
                    smooth: false,
                    // 触发操作
                    tooltip: {
                      show: true, // 是否显示
                      trigger: 'item' // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
                    },
                    symbol:'star',
                    showSymbol: true,
                    symbolSize: 8,
                  },
                  {
                    name: this.ndata[1],
                    data: this.ydata[1],
                    type: 'line',
                    smooth: false,
                    tooltip: {
                      show: true, // 是否显示
                      trigger: 'item'// 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
                    },
                    symbol:'circle',
                    showSymbol: true,
                    symbolSize: 8,
                  },
                  {
                    name: this.ndata[2],
                    data: this.ydata[2],
                    type: 'line',
                    smooth: false,
                    tooltip: {
                      show: true, // 是否显示
                      trigger: 'item' // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
                    },
                    symbol:'diamond',
                    showSymbol: true,
                    symbolSize: 8,
                  },
                  {
                    name: this.ndata[3],
                    data: this.ydata[3],
                    type: 'line',
                    smooth: false,
                    tooltip: {
                      show: true, // 是否显示
                      trigger: 'item' // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
                    },
                    symbol:'triangle',
                    showSymbol: true,
                    symbolSize: 8,
                  }
                ]
              }
              // this.chart.setOption({
              //   legend:this.ndata,
              //   xAxis:this.xdata,
              //   series:{
              //     name:this.ndata,
              //     data:this.ydata
              //   }
              // })
              this.chart.setOption(optionData)
            }
          }
        }
      }
  })
}

export default {
  install
}
