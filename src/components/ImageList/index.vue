<template>
  <div>
    <div>
      <el-button type="primary" class="el-icon-back" @click="back()"></el-button>
      <el-button type="primary" @click="photo()" v-if="isShow">{{ $t("Photograph")}}</el-button>
      <!-- <el-button type="primary" @click="Import()">导入</el-button> -->
      <!-- <Upload></Upload> -->
    </div>
    <el-carousel @change="getId" indicator-position="none" v-if="ImageEncodeList.length>0">
      <el-carousel-item v-for="(item, index) in ImageEncodeList" :key="index">
        <!-- <h3>{{ item }}</h3> -->
        <i id="index">第 {{index + 1}} 张</i>
        <el-image :src="getUrl(item)" alt="图片溜走了~">
          <!-- <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
          </div>-->
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <ImageNull v-else></ImageNull>
    <div id="delect" v-if="isAdmin">
      <el-button v-if="ImageEncodeList.length>0" type="danger" @click="deleteImage">{{ $t("Delete")}}</el-button>
    </div>
  </div>
</template>

<script>
import ImageNull from "@/views/error-page/ImageNull";
import { getRabbishImageList, delRabbishImage } from "@/network/rabbishImage";
import { getCollectImageList, delCollectImage } from "@/network/collectImage";

export default {
  props: {
    collectId: 0,
    rabbishId: 0,
    isShow: false
  },
  data() {
    return {
      index: 0,
      idList: [],
      ImageEncodeList: [],
      isAdmin: false
    };
  },
  components: {
    ImageNull,
  },
  computed: {
    getUrl() {
      return function(baseUrl) {
        return "data:img/png;base64," + baseUrl;
      };
    }
  },
  created() {
    if(this.$store.getters.roles[0] == 'admin'){
     this.isAdmin = true
   }
    if (this.rabbishId != undefined) {
      this.getRabbishImageList();
    } else {
      this.getCollectImageList();
    }
  },
  methods: {
    getRabbishImageList() {
      getRabbishImageList(this.rabbishId)
        .then(res => {
          // console.log(res);
          if (res.success) {
            for (let item of res.encodeList) {
              // console.log(item);
              this.ImageEncodeList.push(item.encode);
              this.idList.push(item.id);
            }
          } else {
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCollectImageList() {
      getCollectImageList(this.collectId).then(res => {
        // console.log(res);
        if (res.success) {
          for (let item of res.encodeList) {
            // console.log(item);
            this.ImageEncodeList.push(item.encode);
            this.idList.push(item.id);
          }
        } else {
          return;
        }
      });
    },
    back() {
      this.$emit("back");
    },
    photo() {
      this.$emit("toPhtot");
    },
    deleteImage() {
      let id = this.idList[this.index];
      // console.log(id);
      this.$confirm("确认要删除吗?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (this.rabbishId != undefined) {
            delRabbishImage(id).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.ImageEncodeList = [];
                this.idList = [];
                this.getRabbishImageList();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
          } else {
            delCollectImage(id).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.ImageEncodeList = [];
                this.idList = [];
                this.getCollectImageList();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getId(index) {
      // console.log(index);
      this.index = index;
    }
  }
};
</script>

<style>
.el-carousel__container {
  height: 540px;
  margin: 0 300px;
}

.el-image {
  width: 100%;
  height: 100%;
}

#delect {
  text-align: center;
  margin-top: 10px;
}
#index {
  margin-left: 50%;
}
</style>