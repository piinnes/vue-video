<template>
  <div>
    <el-button id="back" type="primary" class="el-icon-back" @click="back()"></el-button>
    <!--开启摄像头-->
    <el-button id="camera" type="primary" @click="callCamera" class="el-icon-camera-solid"></el-button>
    <!--图片展示-->
    <video ref="video" width="600" height="440" autoplay></video>
    <!--canvas截取流-->
    <canvas ref="canvas" width="600" height="440"></canvas>
    <!--确认-->
    <el-button id="sure" size="mini" type="primary" @click="photograph">{{ $t('Confirm') }}</el-button>
    <!--上传-->
    <el-button id="upload" size="mini" type="primary" @click="upload()">{{ $t('upLoad') }}</el-button>
    <!-- 模态框 -->
    <el-dialog
      title="请选择所属类别"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <Radio @getRabbishId="getRabbishId" :rabbish="true"></Radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="confirmUpload">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>   
<script>
import Radio from "@/views/radio";
import { upload } from "@/network/upload";

export default {
  props: {
    collectId: {
      default: 0,
      required: true
    }
  },
  data() {
    return {
      video: false,
      imgBase64: "",
      dialogVisible: false,
      rabbishId: 0
    };
  },
  components: {
    Radio
  },
  created() {
    this.callCamera()
  },
  methods: {
    // 调用摄像头
    callCamera() {
      if (!this.video) {
        // H5调用电脑摄像头API
        navigator.mediaDevices
          .getUserMedia({
            video: true
          })
          .then(success => {
            // 摄像头开启成功
            this.$refs["video"].srcObject = success;
            // 实时拍照效果
            this.$refs["video"].play();
          })
          .catch(error => {
            console.error("摄像头开启失败，请检查摄像头是否可用！");
          });
        this.video = true;
      } else {
        if (!this.$refs["video"].srcObject) return;
        let stream = this.$refs["video"].srcObject;
        let tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
        this.$refs["video"].srcObject = null;
        let c = this.$refs["canvas"];
        c.height = c.height;
        this.video = false;
      }
    },
    // 拍照
    photograph() {
      let ctx = this.$refs["canvas"].getContext("2d");
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs["video"], 0, 0, 600, 440);
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7); // 由字节转换为KB 判断大小

      let str = imgBase64.replace("data:image/jpeg;base64,", "");
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2);
      //   console.log(size)
      this.imgBase64 = imgBase64; // 上传拍照信息  调用接口上传图片 .........

      // 保存到本地
      //   let ADOM = document.createElement('a')
      //   ADOM.href = this.headImgSrc
      //   ADOM.download = new Date().getTime() + '.jpeg'
      //   ADOM.click()
    },
    // 关闭摄像头
    // closeCamera () {

    // },
    //关闭radio
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //返回列表
    back() {
      this.$emit("back");
    },
    //上传弹出垃圾类别模态框
    upload() {
      this.dialogVisible = true;
    },
    //上传图片
    confirmUpload() {
      //判断imgBase64是否为空
      if (this.imgBase64 == "") {
        this.$message({
          type: "warning",
          message: "请拍照!"
        });
        return;
      }
      //rabbishId
      if (this.rabbishId == 0) {
        this.$message({
          type: "warning",
          message: "请选择类别!"
        });
        return;
      }
      // console.log(this.imgBase64,this.collectId,this.rabbishId)
      let data = {
        base64Str: this.imgBase64,
        collectId: this.collectId,
        rab_id: this.rabbishId
      };
      //发送上传请求
      upload(JSON.stringify(data)).then(res => {
        // console.log(res);
        if (res.success) {
          this.$message({
          type: "success",
          message: "上传成功!"
        })
        this.dialogVisible = false
        }else{
          this.$message({
          type: "error",
          message: "上传失败!"
          })
          this.dialogVisible = false
        }
      });
    },
    //获得选中垃圾类别
    getRabbishId(rabbishId) {
      this.rabbishId = rabbishId;
    }
  }
};
</script>

<style scoped>
#camera {
  position: relative;
  top: -365px;
  left: -10px;
}
#sure {
  width: 56px;
  height: 40px;
  position: absolute;
  top: 480px;
  left: 630px;
}
#upload {
  width: 56px;
  height: 40px;
  position: absolute;
  top: 480px;
  left: 686px;
}
#back {
  display: inline;
  position: absolute;
}

</style>