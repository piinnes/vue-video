<template>
  <el-card class="box-card">
    <el-radio-group v-if="rabbish" v-model="rabbishId" @change="getRabbishId" size="mini">
      <div v-for="item of rabbishList" :key="item.id">
        <el-radio :label="item.id" border>{{item.name}}</el-radio>
      </div>
    </el-radio-group>
    <el-radio-group v-else v-model="collectId" @change="getCollectId" size="mini">
      <div v-for="item of collectList" :key="item.id">
        <el-radio :label="item.id" border>{{item.name}}</el-radio>
      </div>
    </el-radio-group>
    <Pagination :total="total" layout="prev, pager, next, jumper" @pagination="pagination" :page.sync="page" :limit.sync="limit"></Pagination>
  </el-card>
</template>

<script>
import { getRabbishList } from "@/network/rabbish"
import { getCollectList } from "@/network/collect"
import Pagination from "@/components/Pagination"

export default {
  props: {
    rabbish: {
      default: false,
      type: Boolean,
      required: false
    },
    collect: {
      default: false,
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      rabbishId: 0,
      collectId: 0,
      rabbishList: [],
      collectList: [],
      total: 0,
      page: 1,
      limit: 10
    };
  },
  components: {
    Pagination
  },
  created() {
    if (this.rabbish) {
      this.getRabbishList(this.page, this.limit)
    } else {
      this.getCollectList(this.page, this.limit)
    }
  },
  methods: {
    getRabbishList(page, limit) {
      getRabbishList(page, limit)
        .then(res => {
          //  console.log(res.length)
          this.total = res.total
          this.rabbishList = res.list
          // console.log(res)
        })
        .catch(err => console.log(err))
    },
    getRabbishId() {
      this.$emit("getRabbishId", this.rabbishId)
    },
    getCollectList(page, limit) {
      getCollectList(page, limit)
        .then(res => {
          this.total = res.total
          //  console.log(res.length)
          this.collectList = res.list
          // console.log(res)
        })
        .catch(err => console.log(err))
    },
    getCollectId() {
      this.$emit("getCollectId", this.collectId)
    },
    pagination({ page, limit }) {
      if (this.rabbish) {
        getRabbishList(page, limit).then(res => {
          this.rabbishList = res.list
        })
      } else {
        getCollectList(page, limit).then(res => {
          this.collectList = res.list
        })
      }
    }
  }
};
</script>

<style scoped>
label {
  margin-top: 5px;
}
</style>