<!--<template>-->
<!--    <div class="slideCharts">-->
<!--        <div class="chartBox">-->
<!--            <div class="btns">-->
<!--                <el-button-->
<!--                        :class="{ active: shows === 1 }"-->
<!--                        size="small"-->
<!--                        @click="-->
<!--            setChartData(10)-->
<!--            shows = 1-->
<!--          "-->
<!--                >10天</el-button-->
<!--                >-->
<!--                <el-button-->
<!--                        :class="{ active: shows === 2 }"-->
<!--                        size="small"-->
<!--                        @click="-->
<!--            setChartData(30)-->
<!--            shows = 2-->
<!--          "-->
<!--                >30天</el-button-->
<!--                >-->
<!--                <el-button-->
<!--                        :class="{ active: shows === 3 }"-->
<!--                        size="small"-->
<!--                        @click="-->
<!--            setChartData(60)-->
<!--            shows = 3-->
<!--          "-->
<!--                >60天</el-button-->
<!--                >-->
<!--                <el-button-->
<!--                        :class="{ active: shows === 4 }"-->
<!--                        size="small"-->
<!--                        @click="-->
<!--            setChartData(180)-->
<!--            shows = 4-->
<!--          "-->
<!--                >180天</el-button-->
<!--                >-->
<!--            </div>-->
<!--            <div ref="myCharts" class="chartBox_d"></div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import echarts from 'echarts'-->
<!--    //import resize from '@/mixins/resize'-->
<!--    require('echarts/theme/macarons')-->
<!--    export default {-->
<!--        //mixins: [resize],-->
<!--        data() {-->
<!--            return {-->
<!--                mycharts: null,-->
<!--                shows: 1,-->
<!--                date: [],-->
<!--                price: [],-->
<!--                chartData: {-->
<!--                    date: [],-->
<!--                    price: []-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            this.mockData()-->
<!--            this.$nextTick().then(() => {-->
<!--                this.initEcharts()-->
<!--            })-->
<!--        },-->
<!--        methods: {-->
<!--            // mock data-->
<!--            mockData() {-->
<!--                let base = +new Date('2019/1/1')-->
<!--                let oneDay = 24 * 3600 * 1000-->
<!--                let date = []-->
<!--                let data = []-->
<!--                let len = Math.ceil((+new Date() - base) / oneDay)-->
<!--                for (let i = 0; i < len; i++) {-->
<!--                    let item = new Date(base)-->
<!--                    base += oneDay-->
<!--                    date.push(-->
<!--                        item.getFullYear() +-->
<!--                        '/' +-->
<!--                        (item.getMonth() + 1) +-->
<!--                        '/' +-->
<!--                        item.getDate()-->
<!--                    )-->
<!--                    data.push(Math.floor(Math.random() * (1000 - 500 + 1) + 500))-->
<!--                }-->
<!--                this.date = date-->
<!--                this.price = data-->
<!--                // this.chartData.date = date-->
<!--                // this.chartData.price = data-->
<!--            },-->
<!--            setChartData(num) {-->
<!--                let len = this.date.length-->
<!--                this.chartData.date = this.date.slice(len - num)-->
<!--                this.chartData.price = this.price.slice(len - num)-->
<!--                this._setOption(this.chartData)-->
<!--            },-->
<!--            initEcharts() {-->
<!--                this.mycharts = echarts.init(this.$refs.myCharts, 'macarons')-->
<!--                this.setChartData(10)-->
<!--                // this._setOption(this.chartData)-->
<!--            },-->
<!--            _setOption(chartData) {-->
<!--                this.mycharts.setOption({-->
<!--                    title: {-->
<!--                        text: '测试',-->
<!--                        left: '16'-->
<!--                    },-->
<!--                    tooltip: {-->
<!--                        trigger: 'axis',-->
<!--                        axisPointer: {-->
<!--                            type: 'cross',-->
<!--                            label: {-->
<!--                                background: '#6a7985'-->
<!--                            }-->
<!--                        }-->
<!--                    },-->
<!--                    grid: {-->
<!--                        left: '20',-->
<!--                        right: '20',-->
<!--                        bottom: '3',-->
<!--                        containLabel: true-->
<!--                    },-->
<!--                    xAxis: [-->
<!--                        {-->
<!--                            type: 'category',-->
<!--                            boundaryGap: false,-->
<!--                            data: chartData.date-->
<!--                        }-->
<!--                    ],-->
<!--                    yAxis: [-->
<!--                        {-->
<!--                            type: 'value',-->
<!--                            boundaryGap: [0, '100%']-->
<!--                        }-->
<!--                    ],-->
<!--                    series: [-->
<!--                        {-->
<!--                            name: '商品价格',-->
<!--                            type: 'line',-->
<!--                            areaStyle: {-->
<!--                                color: '#55a8fd',-->
<!--                                opacity: 0.3-->
<!--                            },-->
<!--                            itemStyle: {-->
<!--                                color: '#55a8fd'-->
<!--                            },-->
<!--                            lineStyle: {-->
<!--                                color: '#55a8fd'-->
<!--                            },-->
<!--                            smooth: true,-->
<!--                            data: chartData.price,-->
<!--                            animationDuration: 2800,-->
<!--                            animationEasing: 'quadraticOut'-->
<!--                        }-->
<!--                    ]-->
<!--                })-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--    .slideCharts {-->
<!--        height: calc(100% - 72px);-->
<!--    }-->
<!--    .chartBox {-->
<!--        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);-->
<!--        background: #fff;-->
<!--        height: 100%;-->
<!--        position: relative;-->
<!--        .chartBox_d {-->
<!--            height: 100%;-->
<!--            box-sizing: border-box;-->
<!--            padding: 30px 20px 30px 20px;-->
<!--        }-->
<!--        .btns {-->
<!--            position: absolute;-->
<!--            right: 40px;-->
<!--            top: 20px;-->
<!--            z-index: 99;-->
<!--            .el-button.active {-->
<!--                color: #3a8ee6;-->
<!--                background: #ddeeff;-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->

<template>
    <div class="dashboard" ref="dashboard">
        <el-row>
            <el-col :span="24">
                <div id="gotobedbar"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';
    //import macarons from 'echarts/theme/macarons';
    import {getChart} from '../../api/chart'
    // import data from '../../static/data/data.json';
    import {mapGetters} from 'vuex'


    // const getBeforeDate = (n) => {
    //     var list = [];
    //     var d = new Date();
    //     var s = '';
    //     var i = 0;
    //     while (i < n) {
    //         d.setDate(d.getDate() - 1);
    //         var year = d.getFullYear();
    //         var mon = d.getMonth() + 1;
    //         var day = d.getDate();
    //         list.push(year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day));
    //         i++;
    //     }
    //     return list.reverse();
    // }

    export default {
        data() {
            return {
                chart: null,
                option : {
                    title: {
                        text: '测试',
                        left:'left',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['指标1', '指标2', '指标3', '指标4'],
                        orient:'vertical',
                        left:'right',
                        top:'middle',//如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐。
                        itemGap:20
                    },
                    toolbox: {
                        show: true,
                        orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                        // 'horizontal' ¦ 'vertical'
                        x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                                   // 'center' ¦ 'left' ¦ 'right'
                                                   // ¦ {number}（x坐标，单位px）
                        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                                   // 'top' ¦ 'bottom' ¦ 'center'
                                                   // ¦ {number}（y坐标，单位px）
                        color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    dataZoom: {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '指标1',
                            type: 'line',
                            tiled : '总量',
                            areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '指标2',
                            type: 'line',
                            tiled : '总量',
                            areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '指标3',
                            type: 'line',
                            tiled : '总量',
                            areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '指标4',
                            type: 'line',
                            tiled : '总量',
                            areaStyle: {normal: {}},
                            data: []
                        }
                    ]
                }
            }
        },
        created() {
            this._getChartData()
        },
        computed: {
            ...mapGetters({
                sidebar: 'sidebar',
                device: 'device',
            }),
        },
        methods: {
            _getChartData(){
                getChart().then(res =>{
                    this.option.xAxis[0].data  = res.xTime
                    this.option.series[0].data = res.data1
                    this.option.series[1].data = res.data2
                    this.option.series[2].data = res.data3
                    this.option.series[3].data = res.data4
                    // eslint-disable-next-line no-console
                    console.log(res.xTime)
                }).catch(error => {
                    this.$message.error(error.message)
                })

            },
            drawbar(id) {
                let o = document.getElementById(id);
                let height = document.documentElement.clientHeight;
                height -= 120;
                o.style.height= height+"px";
                this.chart = echarts.init(o,'macarons');
                this.chart.setOption(this.option);
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.drawbar('gotobedbar');
                var that = this;
                var resizeTimer = null;
                window.onresize = function () {
                    if (resizeTimer) clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function () {
                        that.drawbar('gotobedbar');
                    }, 300);
                }
            });
        },
        watch: {
            'sidebar.collapsed': function (val) {
                this.chart = {}
                var that = this;
                setTimeout(function () {
                    that.drawbar('gotobedbar');
                }, 300);
            },
        }
    }
</script>

<style scoped>
    #gotobedbar {
        width: 100%;
        min-height: 500px;
        margin-right: 15px;
    }
</style>
