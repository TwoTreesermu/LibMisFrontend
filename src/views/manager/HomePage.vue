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
        title: {
          text: '最近一周借阅数据', // 设置标题文本
          subtext: '数据来源：内部统计', // 可选的副标题
          left: 'center', // 标题居中
          top: '10', // 标题距离顶部的距离
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: 'bold', // 标题字体粗细
            color: '#333', // 标题文字颜色
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: "近一周借阅量",
            data: [82.0, 93.2, 90.1, 93.4, 129.0, 133.0, 132.0],
            type: 'line',
            smooth: true,
          }
        ]
      };
      lineChart.setOption(lineOption);

      // 初始化柱状图
      const barChart = echarts.init(this.$refs.barChart);
      const barOption = {
        title: {
          text: '最近一周归还数据', // 设置标题文本
          subtext: '数据来源：内部统计', // 可选的副标题
          left: 'center', // 标题居中
          top: '10', // 标题距离顶部的距离
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: 'bold', // 标题字体粗细
            color: '#333', // 标题文字颜色
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [61, 42, 51, 43, 61, 72, 83],
            type: 'bar',
          }
        ]
      };
      barChart.setOption(barOption);

      // 初始化饼图
      const pieChart = echarts.init(this.$refs.pieChart);
      const pieOption = {
        title: {
          text: '最近一年最热图书分类', // 设置标题文本
          subtext: '数据来源：内部统计', // 可选的副标题
          left: 'center', // 标题居中
          top: '10', // 标题距离顶部的距离
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: 'bold', // 标题字体粗细
            color: '#333', // 标题文字颜色
          }
        },
        series: [
          {
            name: '出借图书种类分布图',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 335, name: '教材' },
              { value: 310, name: '艺术' },
              { value: 234, name: '生活' },
              { value: 135, name: '其它' },
              { value: 1548, name: '文学' }
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