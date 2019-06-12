<template>
    <div>
        <!-- 顶部 -->
        <el-row type='flex' justify='space-between'>
        <div>
            <el-button @click="handleToGoodsAdd">新增</el-button>
            <el-button type="danger" @click="handleDeleteMore">删除</el-button>
        </div>
        <!-- 搜索输入框 -->
        <div class="input-search">
            <el-input
             placeholder="请输入内容"
             class="input-with-select"
             v-model="searchValue">
            <el-button
             slot="append"
             icon="el-icon-search"
             @click="handleSearch">
             </el-button>
            </el-input>
        </div>
        </el-row>

        <!-- 商品列表的表格 -->
        <!-- data：表格的数据 -->
        <!-- tooltip-effect：工具栏的效果 -->
        <!-- selection-change：选择表格每一项时候就触发的事件 -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:20px"
            @selection-change="handleSelectionChange">
            <!-- type="selection"表格可以选择方块 -->
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
             <!-- label每一列的标题文字 -->
            <!-- width当前列的宽度 -->
            <el-table-column
            label="标题"
            width="300">
            <!-- 自定义模板 -->
                <!-- template的slot-scoped的值模板的变量名scope -->
                <!-- scope.row每一项数据的对象 -->
            <template slot-scope="scope">
                <el-row type='flex' align='middle'>
                    <img :src='scope.row.imgurl' class="goods-img"/>
                    <div>
                        {{scope.row.title}}
                    </div>
                </el-row>
            </template>
        </el-table-column>
            <!-- 显示数据的简写方式,
            指定prop属性自动读取每一项数据的prop值的属性-->
            <el-table-column
            prop="categoryname"
            label="类型"
            width="120">
            </el-table-column>

            <el-table-column
            prop="sell_price"
            label="价格"
            width="120">
            </el-table-column>

            <!-- 操作栏 -->
            <el-table-column label="操作">
                <!-- 自定义模块 -->
             <template slot-scope="scope">
                 <!-- 编辑事件 -->
                <el-button
                size="mini"
                @click="handleEdit( scope.row)">编辑</el-button>
                <!-- 删除单个商品 -->
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- size-change: 显示条数切换 -->
        <!-- current-change：页数切换 -->
        <!-- current-page: 当前的页面 -->
        <!-- page-sizes：条数的选项 -->
        <!-- page-size:当前的条数 -->
        <!-- layout:默认布局 -->
        <!-- total: 数据全部条数 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
      return {
        // 模拟数据，会被接口替换
        tableData: [
        
        ],
        selectGoods:[],
        searchValue:'',

        pageIndex: 1,
        pageSize:5,
        total:0,
      }
    },

    methods: {
        //封装
        getList(){
            this.$axios({
                url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
                method:'GET'
            }).then( res=>{
                var data=res.data
                // 商品列表的数据
                this.tableData=data.message
                // 总条数      
                this.total = data.totalcount;
            })
        },
        // 选择每一项时候就触发
        handleSelectionChange(val) {
             // 保存到选中的商品
            // console.log(val);
            this.selectGoods=val;
        },

        // 编辑商品
        handleEdit(goods){
            // console.log(goods);
            this.$router.push('/admin/goods-edit/'+goods.id)
        },

        //搜索
        handleSearch(){
            this.getList();
        },
        
        // 删除单个商品
        handleDelete(goods){
            // console.log(goods);
            var id=goods.id
             this.$axios({
                url:`http://localhost:8899/admin/goods/del/${id}`,
                method:'GET'
            }).then( res=>{
                var {message,status}=res.data
                // 删除成功
                if(status===0){
                    this.$message.success(message)
                    this.getList()
                }else{
                    this.$message.error(message)
                }
            })
        },
        // 删除多个商品
        handleDeleteMore(){
            //获取到id
            console.log(this.selectGoods);
            var arr=this.selectGoods.map(v=>{
                return v.id;
            })
            //拼接
            var ids=arr.join(',')
            this.$axios({
                url:`http://localhost:8899/admin/goods/del/${ids}`,
                method:'GET'
            }).then( res=>{
                var {message,status}=res.data
                console.log(arr);
                // 删除成功
                if(status===0){
                    this.$message.success(message)
                    this.getList()
                }else{
                    this.$message.error(message)
                }
            })

        },
        
        // 条数的切换
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize=val;
            this.getList()
        },

        // 页数切换
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
             // 保存当前的页面
             this.pageIndex=val;
             this.getList()
        },
        handleToGoodsAdd(){
            // 跳转到新增商品页
            this.$router.push('/admin/goods-add')
        }
    },
    mounted(){
     this.getList()
    }
   
}
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .input-search{
      width: 200px;
  }
  .goods-img{
      width: 60px;
      height: 60px;
      /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
      margin-right: 6px;
  }
</style>
