<template>
  <div class="manager-data-analysis">
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <!-- 折线图 -->
      <div class="card" id="line" style="flex: 1 1 0%; height: 400px; padding: 20px; position: relative;">
        <div ref="lineChart" style="width: 100%; height: 100%;"></div>
      </div>

      <!-- 柱状图 -->
      <div class="card" id="bar" style="flex: 1 1 0%; height: 400px; padding: 20px; position: relative;">
        <div ref="barChart" style="width: 100%; height: 100%;"></div>
      </div>
    </div>

    <div style="display: flex; gap: 20px;">
      <!-- 饼图 -->
      <div class="card" id="pie" style="flex: 1 1 0%; height: 400px; padding: 20px; position: relative;">
        <div ref="pieChart" style="width: 100%; height: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "HomePage",
  data() {
    return {};
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      // 初始化折线图
      const lineChart = echarts.init(this.$refs.lineChart);
      const lineOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          }
        ]
      };
      lineChart.setOption(lineOption);

      // 初始化柱状图
      const barChart = echarts.init(this.$refs.barChart);
      const barOption = {
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 232, 201, 154, 190],
            type: 'bar',
          }
        ]
      };
      barChart.setOption(barOption);

      // 初始化饼图
      const pieChart = echarts.init(this.$refs.pieChart);
      const pieOption = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            }
          }
        ]
      };
      pieChart.setOption(pieOption);
    }
  }
};
</script>

<style scoped>
  .manager-home-page {
  padding: 20px;
}

  .card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>