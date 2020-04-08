<template>
    <div class="echart">
        <!-- <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram> -->
        <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
</template>

<script>
export default {
  props: {
    echartsData: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ''
    }
  },
    data () {
      return {
        isPromerte: this.$props.title=="厂商对接人"?['厂商数','收益']:['终端数','收益']
      }
    },
    mounted() {
      this.initEcharts();
    },
    methods: {
      initEcharts() {
        let myChart = this.$echarts.init(document.getElementById('myChart'));
         // 指定图表的配置项和数据
        var option = {
            tooltip: {},
            legend: {
                data:this.isPromerte
            },
            xAxis: {
                data: this.echartsData.userName
            },
            yAxis: {
              axisLine: {
                show: true
              }
            },
            series: [{
                name: this.$props.title=="厂商对接人"?"厂商数":"终端数",
                type: 'bar',
                data: this.echartsData.numData,
                barMaxWidth: '10',
                barGap: '0%',
                color: '#01A5FF'
            },
            {
                name: '收益',
                type: 'bar',
                barMaxWidth: '10',
                data: this.echartsData.priceData,
                barGap: '0%',
                color: '#FF6666'

            }]
        };
        myChart.setOption(option);
      }
    }
}
</script>

<style lang="scss" scoped>
.echart {
  background: #fff;
  margin-top: .2rem;
  padding-top: .2rem;
}
</style>