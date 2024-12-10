<template>
  <div>
    这里放一些可视化大图：网站访问记录,借阅记录，等
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      search:'',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        }
      ]
    }
  },
  methods: {
    handleEdit() {}
  }
}
</script>
