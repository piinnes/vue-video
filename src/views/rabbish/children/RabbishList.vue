<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRabbish">
      新增类别
    </el-button>
    <HeaderSearch id="search" type='rabbish' @updateData='updateData' />
    <el-table :data="rabbishList" style="width: 100%;margin-top:30px;" border>
      <el-table-column prop="id" align="center" label="ID" width="220">
      </el-table-column>
      <el-table-column prop="name" align="center" label="类别名称" width="220">
      </el-table-column>
      <el-table-column prop="count" align="center" label="总计" width="220">
      </el-table-column>
      <!-- <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleCheck(scope)">
            查看
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="primary" size="small" @click="handlexport(scope)">
            导出
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑类别':'新增类别'">
      <el-form  label-width="80px" label-position="left">
        <el-form-item label="类别名称">
          <el-input v-model="name"  placeholder="Rabbish Name" />
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
  </div>
</template>

<script>
// import path from 'path'
import i18n from '@/lang'
import HeaderSearch from '@/components/HeaderSearch'
import {getRabbishList,addRabbish,deleteRabbish,getRabbish, editRabbish} from '@/network/rabbish'


export default {
  data() {
    return {
      id: 0,
      name: '',
      dialogVisible: false,
      dialogType: 'new',
      rabbishList:[]
    }
  },
  components:{
    HeaderSearch
  },
  computed: {
    
  },
  created() {
   this.getRabbishList()
  },
  methods: {
    //查询列表
    getRabbishList(){
    getRabbishList()
      .then(res => {
        //  console.log(res.length)
        for(let i=0;i<res.length;i++){
          //  console.log(res[i])
          this.rabbishList.push(res[i])
        }
        // console.log(res)
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
    handleCheck(scope){
        this.$emit('showImage')
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
    //导出
    handlexport(scope) {
      this.$confirm('确认要导出吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // await deleteRole(row.key)
          // this.rolesList.splice($index, 1)
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
            this.getRabbishList()
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
      const isEdit = this.dialogType === 'edit'
      let rabbish = {'name':this.name,'id':this.id}
      if (isEdit) {
        editRabbish(JSON.stringify(rabbish)).then(res => {
            // console.log(res)
            this.rabbishList = []
            this.getRabbishList()
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
        this.getRabbishList()
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
