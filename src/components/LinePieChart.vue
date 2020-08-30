<template>
  <div id="centerid" :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import resize from './mixins/resize'
    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '600px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            chartData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                chart: null
            }
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    console.log("监听：", val)
                    this.setOptions(val)
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
                this.chart.on('updateAxisPointer', event => {
                    let xAxisInfo = event.axesInfo[0];
                    if (xAxisInfo) {
                        let dimension = xAxisInfo.value + 1;
                        this.chart.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        });
                    }
                });
                this.chart.on('click', event => {
                    if (event.seriesType == 'pie') {
                        this.$emit('func', event.data[0])
                    }
                })
            },
            setOptions(newVisitis) {
                console.log('setoptions：', newVisitis)
                this.chart.setOption({
                    legend: {},
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        showContent: false
                    },
                    dataset: {
                        source: newVisitis.source
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        gridIndex: 0
                    },
                    grid: {
                        top: '55%'
                    },
                    series: [{
                        type: 'line',
                        seriesLayoutBy: 'row'
                    },
                        {
                            type: 'line',
                            seriesLayoutBy: 'row'
                        },
                        {
                            type: 'line',
                            seriesLayoutBy: 'row'
                        },
                        {
                            type: 'line',
                            seriesLayoutBy: 'row'
                        },
                        {
                            type: 'pie',
                            id: 'pie',
                            radius: '30%',
                            center: ['50%', '25%'],
                            label: {
                                formatter: '{b}: {@2012} ({d}%)'
                            },
                            encode: {
                                itemName: 'product',
                                value: '2012',
                                tooltip: '2012'
                            }
                        }
                    ]
                })
            },
        },
    }
</script>
