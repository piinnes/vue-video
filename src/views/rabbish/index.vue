<template>
  <div class="app-container">
    <transition name="el-zoom-in-center">
      <RabbishList v-if="isShow" @showImage="showImage()"/>
      <ImageList v-else @back="back()"/>
    </transition>
    
  </div>
</template>

<script>
import RabbishList from '@/views/rabbish/children/RabbishList'
import ImageList from '@/components/ImageList'

export default {
  data() {
    return {
      isShow: true
    }
  },
  components:{
    RabbishList,
    ImageList
  },
  computed: {
  },
  created() {
  },
  methods: {
    showImage(){
      this.isShow = !this.isShow
    },
    back(){
      this.isShow = !this.isShow
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