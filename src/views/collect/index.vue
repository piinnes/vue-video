<template>
  <div class="app-container">
    <transition name="el-zoom-in-center">
    <CollectList v-if="isShowCollect" @showImage="showImage"/>
    <ImageList v-if="isShowImage" @back="back()" isShow="true" :collectId="id" @toPhtot="toPhtot"></ImageList>
    </transition>
    <transition name="el-zoom-in-center">
      <photo v-if="isShowVideo" @back="back()" :collectId="id"></photo>
    </transition>
    
  </div>
</template>

<script>
import CollectList from '@/views/collect/children/CollectList'
import ImageList from '@/components/ImageList'
import photo from '@/views/collect/children/photo'
export default {
  data() {
    return {
      id: 0,
      isShowCollect: true,
      isShowImage: false,
      isShowVideo: false,
      }
    }
  ,
  components:{
    CollectList,
    ImageList,
    photo,
  },
  computed: {
  },
  created() {
  },
  methods: {
    showImage(id) {
      this.id = id
      // console.log(this.id)
      this.isShowCollect = false
      this.isShowImage = true
    },
    back(){
      this.isShowCollect = true
      this.isShowImage = false
      this.isShowUpload = false
      this.isShowVideo = false
    },
    toPhtot(){
      this.isShowImage = false
      this.isShowVideo = true
    },
    
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
</style>
