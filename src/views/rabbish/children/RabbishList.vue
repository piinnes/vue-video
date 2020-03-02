<template>
<el-card class="box-card">
    <Search @find="find"></Search>
    <el-button type="primary" @click="handleAddRabbish">
      {{ $t('addRubbish') }}
    </el-button>
    <!-- <HeaderSearch id="search" type='rabbish' @updateData='updateData' /> -->
    <!-- <el-table :data="rabbishList" style="width: 100%;margin-top:30px;" border> -->
      <el-table
    ref="singleTable"
    :data="rabbishList"
    highlight-current-row
    style="width: 100%">
      <el-table-column prop="id" align="center" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="name" align="center" label="类别名称" width="400">
      </el-table-column>
      <el-table-column prop="count" align="center" label="总计" width="100">
      </el-table-column>
      <!-- <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleCheck(scope)">
            {{ $t('See') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('Edit') }}
          </el-button>
          <el-button type="primary" size="small" @click="handlImport(scope)">
            {{ $t('Import') }}
          </el-button>
          <el-button type="primary" size="small" @click="handlexport(scope)">
            {{ $t('Export') }}
          </el-button>
          <el-button v-if="isAdmin" type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('Delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑类别':'{{新增类别}}'">
      <el-form  label-width="80px" label-position="left">
        <el-form-item label="类别名称">
          <el-input v-model="name" show-word-limit maxlength="16" placeholder="Rabbish Name" />
        </el-form-item>
        <!-- <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('permission.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRabbish()">
          {{ $t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  <Pagination :total="total" @pagination="pagination" :page.sync="page" :limit.sync="limit"></Pagination>
</el-card>
</template>

<script>
// import path from 'path'
import i18n from '@/lang'
import HeaderSearch from '@/components/HeaderSearch'
import {getRabbishList,addRabbish,deleteRabbish,getRabbish, editRabbish,exportZip,getRubbishByCondition} from '@/network/rabbish'
import Pagination from '@/components/Pagination'
import Search from "@/components/Search"



export default {
  data() {
    return {
      id: 0,
      name: '',
      dialogVisible: false,
      dialogType: 'new',
      rabbishList:[],
      isAdmin: false,
      total: 0,
      page: 1,
      limit: 10,
      search: {
        name: '',
        operate: '',
        timestamp: '',
        total: '',
        options: [{
          value: '0',
          label: '<'
        }, {
          value: '1',
          label: '<='
        }, {
          value: '2',
          label: '='
        }, {
          value: '3',
          label: '>'
        }, {
          value: '4',
          label: '>='
        }],
      }
    }
  },
  components:{
    HeaderSearch,
    Pagination,
    Search
  },
  computed: {
    
  },
  created() {
    // console.log(this.$store.getters.roles[0]);
   if(this.$store.getters.roles[0] == 'admin'){
     this.isAdmin = true
   }
   this.getRabbishList(this.page,this.limit)
  },
  methods: {
    //查询列表
    getRabbishList(page, limit, search){
    getRubbishByCondition(page,limit,this.search)
      .then(res => {
        // console.log(res);
        this.total = res.total
        this.rabbishList = res.list
      })
      .catch(err => console.log(err))
    },
    //添加
    handleAddRabbish() {
      this.name = ''
      this.id = 0
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    //查看图片
    handleCheck({ $index, row }){
        this.$emit('showImage',row.id)
    },
    //编辑获取信息
    handleEdit({ $index, row }) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        // set checked state of a node not affects its father and child nodes
        // console.log(112)
        getRabbish(row.id).then(res => {
          // console.log(res)
          this.name = res.name
          this.id = res.id
        })
        this.checkStrictly = false
      })
    },
    //导入
    handlImport({ $index, row }){
        this.$emit("toImport",row.id);
    },
    //导出
    handlexport({ $index, row }) {
      this.$confirm('确认要导出吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // await deleteRole(row.key)
          // this.rolesList.splice($index, 1)
          let a = document.createElement("a")
          a.style.display = 'none';
          a.setAttribute("href","http://localhost:8080/zipFile?rabbishId="+row.id);
          a.click();
          this.$message({
          type: 'success',
          message: '导出成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    //删除
    handleDelete({ $index, row }) {
      this.$confirm('确认要删除吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // await deleteRole(row.key)
          // this.rolesList.splice($index, 1)
          let json = {'id':row.id}
          deleteRabbish(JSON.stringify(json)).then(res => {
            this.rabbishList = []
            this.getRabbishList(this.page,this.limit,this.search)
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
          })
        })
        .catch(err => { console.error(err) })
    },
    //确定添加/修改
    confirmRabbish(){
      if(this.name.split(" ").join("").length === 0){
        this.$message.error("名称不能为空!")
        return
      }
      const isEdit = this.dialogType === 'edit'
      let rabbish = {'name':this.name,'id':this.id}
      if (isEdit) {
        editRabbish(JSON.stringify(rabbish)).then(res => {
            // console.log(res)
            this.rabbishList = []
            this.getRabbishList(this.page,this.limit,this.search)
            this.$message({
                type: 'success',
                message: '编辑成功!'
            })
            this.dialogVisible = false
        })
      } else {
      // console.log(JSON.stringify(rabbish))
      addRabbish(JSON.stringify(rabbish)).then(res => {
        this.rabbishList = []
        this.name =''
        this.getRabbishList(this.page,this.limit,this.search)
         this.$message({
            type: 'success',
            message: '添加成功!'
          })
        this.dialogVisible = false
      })
      }
      
    },
    updateData(data){
        this.rabbishList = data
    },
    pagination({page,limit}){
      getRubbishByCondition(page,limit,this.search).then(res => {
        this.rabbishList = res.list
      })
    },
    find(search){
      this.search = search
      this.getRabbishList(this.page, this.limit, this.search);
      // console.log(this.search);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
#search{
  display: inline;
  margin-left: 10%;
}
</style>
