<template>
    <div>
      <el-button type="primary" @click="addCollect">
        新增采集
      </el-button>
      <HeaderSearch id="search" type='collect' @updateData='updateData'/>
      <el-table :data="collectList" style="width: 100%;margin-top:30px;" border>
        <el-table-column prop="id" align="center" label="ID" width="100">
        </el-table-column>
        <el-table-column prop="name" align="center" label="采集名称" width="200">
        </el-table-column>
        <el-table-column prop="desc" align="header-center" width="200" label="采集描述">
        </el-table-column>
        <el-table-column prop="createTime" align="center" width="200" label="创建时间">
        </el-table-column>
        <el-table-column prop="count" align="center" label="总计" width="100">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleCheck(scope)">
              查看
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope)">
              编辑
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope)">
              转入
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

      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑采集':'新增采集'">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="采集名称">
            <el-input v-model="name" placeholder="Gather Name" />
          </el-form-item>
          <el-form-item label="采集描述">
            <el-input
              v-model="desc"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="Gather Description"
            />
          </el-form-item>
          <!-- <el-form-item label="Menus">
            <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
          </el-form-item> -->
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">
            {{ $t('permission.cancel') }}
          </el-button>
          <el-button type="primary" @click="confirmCollect">
            {{ $t('permission.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import {getCollectList,addCollect,deleteCollect,getCollect, editCollect} from '@/network/collect'
import {formatDate} from '@/utils/formatDate'



export default {
  data() {
    return {
      id: 0,
      name: '',
      desc: '',
      dialogVisible: false,
      dialogType: 'new',
      collectList: []
    }
  },
  components:{
    HeaderSearch
  },
  computed: {
    createTime(){
      
    }
  },
  created() {
    this.getCollectList()
  },
  methods: {
    //查询列表
    getCollectList(){
    getCollectList()
      .then(res => {
        //  console.log(res.length)
        for(let i=1;i<res.length;i++){
          //  console.log(res[i])
          let time = this.formatDate(res[i].createTime)
          res[i].createTime = time
        //  console.log(time)
          this.collectList.push(res[i])
        }
      })
      .catch(err => console.log(err))
    },
    //添加
    addCollect() {
      this.id = 0
      this.name = ''
      this.desc = ''
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    //显示图片
    handleCheck(scope){
        this.$emit('showImage')
    },
    //编辑回显
    handleEdit({ $index, row }) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        // set checked state of a node not affects its father and child nodes
        // console.log(112)
          getCollect(row.id).then(res => {
          // console.log(res)
          this.name = res.name
          this.id = res.id
          this.desc = res.desc
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
          deleteCollect(JSON.stringify(row.id)).then(res => {
            this.collectList = []
            this.getCollectList()
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
          })
        })
        .catch(err => { console.error(err) })
    },
    //确认编辑/添加
    confirmCollect(){
      const isEdit = this.dialogType === 'edit'
      let collect = {'name':this.name,'id':this.id,'desc':this.desc}
      if (isEdit) {
        editCollect(JSON.stringify(collect)).then(res => {
            // console.log(res)
            if(!res.success){
              this.$message({
                type: 'error',
                message: res.errMsg
              })
              return;
            }
            this.collectList = []
            this.getCollectList()
            this.$message({
                type: 'success',
                message: '编辑成功!'
            })
            this.dialogVisible = false
        })
      } else {
      // console.log(JSON.stringify(rabbish))
      addCollect(JSON.stringify(collect)).then(res => {
        // console.log(res.success)
        if(!res.success){
          this.$message({
            type: 'error',
            message: res.errMsg
          })
          return;
        }
        this.collectList = []
        this.name = ''
        this.desc = ''
        this.getCollectList()
         this.$message({
            type: 'success',
            message: '添加成功!'
          })
        this.dialogVisible = false
      })
      }
      
    },
    //模糊搜索更新数据
    updateData(data){
        this.collectList = data
    },
    formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
  }
    
  }
}
</script>

<style lang="scss" scoped>
#search{
  display: inline;
  margin-left: 10%;
}
</style>
