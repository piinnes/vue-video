<template>
  <el-card class="box-card">
    <Search :collect='true' @find="find"></Search>
    <el-button type="primary" @click="addCollect">{{ $t("addCollect")}}</el-button>
    <!-- <HeaderSearch id="search" type="collect" @updateData="updateData" /> -->
    <!-- <el-table :data="collectList" style="width: 100%;margin-top:30px;" border ref="singleTable"> -->
    <el-table ref="singleTable" :data="collectList" highlight-current-row style="width: 100%">
      <el-table-column prop="id" width="50" label="ID"></el-table-column>
      <el-table-column prop="name" align="center" label="采集名称" width="250"></el-table-column>
      <el-table-column prop="desc" align="center" width="250" label="采集描述"></el-table-column>
      <el-table-column prop="createTime" align="center" width="200" label="创建时间"></el-table-column>
      <el-table-column prop="count" align="center" label="总计" width="50"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleCheck(scope)">{{ $t('See') }}</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('Edit') }}</el-button>
          <el-button type="primary" size="small" @click="handleChangeTo(scope)">{{ $t('ChangeTo') }}</el-button>
          <!-- <el-button type="primary" size="small" @click="handleImprot(scope)">导入</el-button> -->
          <el-button type="primary" size="small" @click="handlexport(scope)">{{ $t('Export') }}</el-button>
          <el-button v-if="isAdmin" type="danger" size="small" @click="handleDelete(scope)">{{ $t('Delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑采集':'新增采集'">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="采集名称">
          <el-input v-model="name" placeholder="Gather Name" show-word-limit maxlength="32" />
        </el-form-item>
        <el-form-item label="采集描述">
          <el-input
            v-model="desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            maxlength="64"
            show-word-limit
            placeholder="Gather Description"
          />
        </el-form-item>
        <!-- <el-form-item label="Menus">
            <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>-->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="confirmCollect">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 模态框 -->
    <el-dialog
      title="请选择"
      :visible.sync="changToDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <Radio @getCollectId="getCollectId" :collect="true"></Radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changToDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChangTo">确 定</el-button>
      </span>
    </el-dialog>
    <Pagination :total="total" @pagination="pagination" :page.sync="page" :limit.sync="limit"></Pagination>
  </el-card>
</template>

<script>
import HeaderSearch from "@/components/HeaderSearch";
import Radio from "@/views/radio";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search"

import {
  getCollectList,
  addCollect,
  deleteCollect,
  getCollect,
  editCollect,
  exportZip,
  changTo,
  getCollectByCondition
} from "@/network/collect";
import { formatDate } from "@/utils/formatDate";
import { string } from 'jszip/lib/support';

export default {
  data() {
    return {
      id: 0,
      name: "",
      desc: "",
      dialogVisible: false,
      changToDialogVisible: false,
      dialogType: "new",
      collectList: [],
      collectId: 0,
      isAdmin: false,
      total: 0,
      page: 1,
      limit: 10,
      search: {
        name: '',
        operate: '',
        timestamp: "",
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
    };
  },
  components: {
    HeaderSearch,
    Radio,
    Pagination,
    Search,
  },
  computed: {},
  created() {
    if (this.$store.getters.roles[0] == "admin") {
      this.isAdmin = true;
    }
    this.getCollectList(this.page, this.limit);
  },
  methods: {
    //查询列表
    getCollectList(page, limit, search) {
      getCollectByCondition(page, limit,this.search)
        .then(res => {
          this.collectList = []
          //  console.log(res.length)
          this.total = res.total;
          let data = res.list;
          for (let i = 0; i < data.length; i++) {
            //  console.log(res[i])
            let time = this.formatDate(data[i].createTime);
            data[i].createTime = time;
            //  console.log(time)
            this.collectList.push(data[i]);
          }
        })
        .catch(err => console.log(err));
    },
    //添加
    addCollect() {
      this.id = 0;
      this.name = "";
      this.desc = "";
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    //显示图片
    handleCheck({ $index, row }) {
      // console.log(row.id)
      this.$emit("showImage", row.id);
    },
    //导出
    handlexport({ $index, row }) {
      this.$confirm("确认要导出吗?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let a = document.createElement("a");
        a.style.display = "none";
        a.setAttribute(
          "href",
          "http://127.0.0.1:8080/zipFile?collectId=" + row.id
        );
        a.click();
        this.$message({
          type: "success",
          message: "导出成功!"
        });
        // exportZip(row.id).then(res => {
        //   let eleLink = document.createElement("a")
        //   let url = window.URL.createObjectURL(res)
        //   eleLink.href = url
        //   eleLink.download = name
        //   document.body.appendChild(eleLink)
        //   eleLink.click()
        //   window.URL.revokeObjectURL(url)
        // });

        //   if(res.success){
        //     this.$message({
        //     type: 'success',
        //     message: '导出成功!'
        //   })
        //   }else{
        //     this.$message({
        //     type: 'errpr',
        //     message: '导出失败!'
        //   })
        // }
      });
    },
    //转入
    handleChangeTo({ $index, row }) {
      this.changToDialogVisible = true;
      this.id = row.id;
    },
    //获得转入采集Id
    getCollectId(collectId) {
      this.collectId = collectId;
    },
    //确认转入
    confirmChangTo() {
      //collectId
      if (this.collectId == 0) {
        this.$message({
          type: "warning",
          message: "请选择!"
        });
        return;
      } else if (this.id == this.collectId) {
        this.$message.warning("请选择其他!");
        return;
      }
      changTo(this.id, this.collectId).then(res => {
        if (res.success) {
          this.$message.success("转出成功!");
          this.changToDialogVisible = false;
          this.collectList = [];
          this.getCollectList();
        } else {
          this.$message.error("转出失败!");
        }
      });
    },
    //关闭模态框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //删除
    handleDelete({ $index, row }) {
      this.$confirm("确认要删除吗?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // await deleteRole(row.key)
          // this.rolesList.splice($index, 1)
          deleteCollect(JSON.stringify(row.id)).then(res => {
            this.collectList = [];
            this.getCollectList(this.page, this.limit, this.search);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    //编辑回显
    handleEdit({ $index, row }) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.$nextTick(() => {
        // set checked state of a node not affects its father and child nodes
        // console.log(112)
        getCollect(row.id).then(res => {
          // console.log(res)
          this.name = res.name;
          this.id = res.id;
          this.desc = res.desc;
        });
        this.checkStrictly = false;
      });
    },
    //确认编辑/添加
    confirmCollect() {
      if (this.name.split(" ").join("").length === 0) {
        this.$message.error("名称不能为空!");
        return;
      }
      const isEdit = this.dialogType === "edit";
      let collect = { name: this.name, id: this.id, desc: this.desc };
      if (isEdit) {
        editCollect(JSON.stringify(collect)).then(res => {
          // console.log(res)
          if (!res.success) {
            this.$message({
              type: "error",
              message: res.errMsg
            });
            return;
          }
          this.collectList = [];
          this.getCollectList(this.page, this.limit, this.search);
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.dialogVisible = false;
        });
      } else {
        // console.log(JSON.stringify(rabbish))
        addCollect(JSON.stringify(collect)).then(res => {
          // console.log(res.success)
          if (!res.success) {
            this.$message({
              type: "error",
              message: res.errMsg
            });
            return;
          }
          this.collectList = [];
          this.name = "";
          this.desc = "";
          this.getCollectList(this.page, this.limit, this.search);
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogVisible = false;
        });
      }
    },
    //模糊搜索更新数据
    updateData(data) {
      this.collectList = [];
      for (let i = 0; i < data.length; i++) {
        //  console.log(res[i])
        let time = this.formatDate(data[i].createTime);
        data[i].createTime = time;
        //  console.log(time)
        this.collectList.push(data[i]);
      }
    },
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    pagination({ page, limit }) {
      getCollectByCondition(page, limit,this.search).then(res => {
        let data = res.list;
        this.collectList = [];
        for (let i = 0; i < data.length; i++) {
          //  console.log(res[i])
          let time = this.formatDate(data[i].createTime);
          data[i].createTime = time;
          //  console.log(time)
          this.collectList.push(data[i]);
        }
      });
    },
    find(search){
      this.search = search
      this.getCollectList(1, this.limit, this.search);
      // console.log(this.search);
    }
  }
};
</script>

<style lang="scss" scoped>
#search {
  display: inline;
  margin-left: 10%;
}
</style>
