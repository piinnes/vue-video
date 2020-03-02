<template>
  <div class="app-container">
    <transition name="el-zoom-in-center">
      <RabbishList @toImport="toImport" v-if="isShow" @showImage="showImage" />
      <ImageList v-if="isShowImage" @back="back()" :rabbishId="rabbishId" />
    </transition>
    <transition name="el-zoom-in-center">
      <Upload v-if="isShowUpload" :rabbishId="rabbishId" @back="back()"></Upload>
    </transition>
  </div>
</template>

<script>
import RabbishList from "@/views/rabbish/children/RabbishList";
import ImageList from "@/components/ImageList";
import Upload from "@/components/Upload";

export default {
  data() {
    return {
      isShow: true,
      rabbishId: 0,
      isShowUpload: false,
      isShowImage: false
    };
  },
  components: {
    RabbishList,
    ImageList,
    Upload
  },
  computed: {},
  created() {},
  methods: {
    showImage(id) {
      this.isShow = false;
      this.isShowImage = true;
      this.isShowUpload = false;
      this.rabbishId = id;
    },
    back() {
      this.isShow = true;
      this.isShowImage = false;
      this.isShowUpload = false;
    },
    toImport(id) {
      this.isShowUpload = true;
      this.isShow = false;
      this.isShowImage = false;
      this.rabbishId = id;
    }
  }
};
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