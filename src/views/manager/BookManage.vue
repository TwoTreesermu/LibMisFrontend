<template>
  <div>
    <!--查询栏开始-->
    <div style="margin: 10px 0" class="card">
      <el-input v-model="search" :prefix-icon="Search" placeholder="请输入图书关键字" style="width:240px">
      </el-input>
      <el-button style="margin-left: 10px" type="primary">查询</el-button>
    </div>
    <!--查询栏结束-->
    <!--操作栏开始-->
    <div style="margin: 5px 0" class="card">
    <el-button type="primary" @click="openAddBookDialog">新增</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <!--操作栏结束-->

    <div class="card" style="margin-bottom: 5px;height:600px">
      <!--表格区域开始-->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column sortable prop="publishDate" label="出版日期"></el-table-column>
        <el-table-column prop="name" label="书名"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="isbn" label="ISBN"></el-table-column>
        <el-table-column prop="publisher" label="出版社"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--表格区域结束-->
      <!--分页组件开始-->
      <div style="margin-top: 15px">
        <el-pagination
          v-model:current-page="data.pageNum"
          v-model:page-size="data.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.total"/>
      </div>
      <!--分页组件结束-->
    </div>


    <!--对话框组件开始-->
    <el-dialog
        title="新增图书"
        v-model="dialogVisible"
        width="80%" height="80%"
        @close="resetForm">
      <el-form :model="bookForm">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="bookForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="bookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期"  :label-width="formLabelWidth">
          <el-date-picker v-model="bookForm.publishDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input v-model="bookForm.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="bookForm.publisher" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBook">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--对话框组件结束-->
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker } from 'element-plus';
import { Search } from "@element-plus/icons-vue";

// 使用 reactive 创建响应式数据对象
const data = reactive({
  search: '',
  dialogVisible: false, // 控制弹出框显示
  formLabelWidth: '100px', // 表单项的 label 宽度
  pageNum: 1,
  pageSize: 10,
  total: 47,
  tableData: [
    {"name": "追风筝的人", "author": "卡勒德·胡赛尼", "publishDate": "2003-05-29", "isbn": "978-0-553-80153-2", "publisher": "上海人民出版社"
    },
    {"name": "解忧杂货店", "author": "东野圭吾", "publishDate": "2009-09-03", "isbn": "978-7-5442-6348-4", "publisher": "南海出版公司"
    },
    {"name": "百年孤独", "author": "加西亚·马尔克斯", "publishDate": "1967-05-30", "isbn": "978-0-374-52850-2", "publisher": "南海出版公司"
    },
    {"name": "霍乱时期的爱情", "author": "加西亚·马尔克斯", "publishDate": "1985-04-05", "isbn": "978-0-374-52851-9", "publisher": "南海出版公司"
    },
    {"name": "挪威的森林", "author": "村上春树", "publishDate": "1987-04-04", "isbn": "978-4-06-149339-0", "publisher": "讲谈社"
    },
    {"name": "围城", "author": "钱钟书", "publishDate": "1947-03-10", "isbn": "978-7-02-003600-8", "publisher": "人民文学出版社"
    },{"name": "三体", "author": "刘慈欣", "publishDate": "2008-05-01", "isbn": "978-7-229-00301-1", "publisher": "重庆出版社"
    },{"name": "1984", "author": "乔治·奥威尔", "publishDate": "1949-06-08", "isbn": "978-0-14-118280-4", "publisher": "Secker & Warburg"
    },
    {"name": "动物农场", "author": "乔治·奥威尔", "publishDate": "1945-08-17", "isbn": "978-0-14-043784-3", "publisher": "Viking Press"
    }

  ],

  bookForm: { // 绑定到表单的数据
    name: '',
    author: '',
    publishDate: '',
    isbn: '',
    publisher: ''
  },
});

// 将 reactive 对象的属性转化为 refs，以便在模板中使用
const { search, tableData, dialogVisible, bookForm, formLabelWidth } = toRefs(data);

// 设置对话框为可见
const openAddBookDialog = () => {
  data.dialogVisible = true;
};

const handleEdit = (row) => {
  // 编辑图书的逻辑
};

const handleDelete = (row) => {
  // 删除图书的逻辑
  const index = data.tableData.indexOf(row);
  if (index !== -1) {
    data.tableData.splice(index, 1);
  }
};

const addBook = () => {
  // 将新图书添加到 tableData 中
  data.tableData.push({
    name: data.bookForm.name,
    author: data.bookForm.author,
    publishDate: data.bookForm.publishDate,
    isbn: data.bookForm.isbn,
    publisher: data.bookForm.publisher
  });
  // 清空表单
  resetForm();
  // 关闭弹出框
  data.dialogVisible = false;
};

const resetForm = () => {
  data.bookForm = {
    name: '',
    author: '',
    publishDate: '',
    isbn: '',
    publisher: ''
  };
};
</script>

<style>
.dialog-footer {
  text-align: right;
}
</style>