<template>
  <div class="app-container">
    <transition name="el-zoom-in-center">
    <CollectList v-if="isShowCollect" @showImage="showImage()"/>
    <ImageList v-if="isShowImage" @back="back()" isShow="true" @toPhtot="toPhtot"></ImageList>
    </transition>
    <transition name="el-zoom-in-center">
      <photo v-if="isShowVideo" @back="VideoBack()"></photo>
    </transition>
  </div>
</template>

<script>
import CollectList from '@/views/collect/children/CollectList'
import ImageList from '@/components/ImageList'
import photo from '@/views/collect/children/video'

export default {
  data() {
    return {
      isShowCollect: true,
      isShowImage: false,
      isShowVideo: false
      }
    }
  ,
  components:{
    CollectList,
    ImageList,
    photo
  },
  computed: {
  },
  created() {
  },
  methods: {
    showImage(){
      this.isShowCollect = false
      this.isShowImage = true
    },
    back(){
      this.isShowCollect = true
      this.isShowImage = false
    },
    toPhtot(){
      this.isShowImage = false
      this.isShowVideo = true
    },
    VideoBack(){
      this.isShowCollect = true
      this.isShowVideo = false
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
</style>
