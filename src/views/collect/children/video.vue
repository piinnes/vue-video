<template>
    <div>
        <!--开启摄像头-->
        <el-button id="back" type="primary" class="el-icon-back" @click="back()"></el-button>
        <el-button id="camera" type="primary" @click="callCamera" class="el-icon-camera-solid"></el-button>
        <!--图片展示-->
        <video ref="video" width="600" height="440" autoplay></video>
        <!--canvas截取流-->
        <canvas ref="canvas" width="600" height="440"></canvas>
        <!--确认-->
        <el-button id="sure" size="mini" type="primary" @click="photograph">确认</el-button>
        <!--上传-->
        <el-button id="upload" size="mini" type="primary" @click="upload()">上传</el-button>
        <el-dialog
            title="请选择所属类别"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <Radio></Radio>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>   
<script>
import Radio from '@/views/radio'

export default {
  data () {
    return {
        dialogVisible: false
    }
  },
  components:{
      Radio
  },
  methods: {
    // 调用摄像头
    callCamera () {
      // H5调用电脑摄像头API
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(success => {
        // 摄像头开启成功
        this.$refs['video'].srcObject = success
        // 实时拍照效果
        this.$refs['video'].play()
      }).catch(error => {
        console.error('摄像头开启失败，请检查摄像头是否可用！')
      })
    },
    // 拍照
    photograph () {
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0, 600, 440)
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
      
　　　 // 由字节转换为KB 判断大小
      let str = imgBase64.replace('data:image/jpeg;base64,', '')
      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2)
　　　 // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2)
    //   console.log(size)

 　　  // 上传拍照信息  调用接口上传图片 .........

      // 保存到本地
    //   let ADOM = document.createElement('a')
    //   ADOM.href = this.headImgSrc
    //   ADOM.download = new Date().getTime() + '.jpeg'
    //   ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
      if (!this.$refs['video'].srcObject) return
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    back(){
        this.$emit('back')
    },
    upload(){
      this.dialogVisible = true
    },
  }
}
</script>

<style scoped>
#camera{
    position: relative;
    top: -365px;
    left: -10px;
}
#sure{
    width: 56px;
    height: 40px;
    position: absolute;
    top: 480px;
    left: 630px;
}
#upload{
    width: 56px;
    height: 40px;
    position: absolute;
    top: 480px;
    left: 686px;
}
#back{
    display: inline;
    position: absolute;
}
</style>