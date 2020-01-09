<template>
  <div>
    <el-button type="primary" class="el-icon-back" @click="back()"></el-button>
    <el-button type="primary"  @click="photo()" v-if="isShow">去拍照</el-button>
    <el-carousel indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
import CollectList from '@/views/collect/children/CollectList'
import ImageList from '@/components/ImageList'

export default {
  props:{
    isShow: false
  },
  data() {
    return {
      }
    },
  components:{
  },
  computed: {
  },
  created() {
  },
  methods: {
    back(){
      this.$emit('back')
    },
    photo(){
      this.$emit('toPhtot')
    }
  }
}
</script>

<style>
.el-carousel__container{
  height: 540px;
  margin: 0 200px
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    width: 100%
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>