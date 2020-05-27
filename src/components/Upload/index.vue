<template>
  <div>
    <el-button type="primary" class="el-icon-back" @click="back()"></el-button>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8080/importFile"
      :before-remove="beforeRemove"
      multiple
      accept="image/jpeg,image/png"
      :limit="1000"
      :http-request="uploadFile"
      list-type="picture"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">点击导入</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import { upload } from "@/network/upload";


export default {
  name: 'Upload',
  props: {
    rabbishId: 0,
  },
  data() {
      return {
        fileList: [],
        fileData: {},
      };
    },
    methods: {
      submitUpload() {
        if (this.fileList.length == 0) {
          this.$message.warning("上传文件为空！")
        return false
      }
        this.$refs.upload.submit();
      },
      uploadFile:function(file){
        var fileReader = new FileReader()
        if (file.file) {
        fileReader.readAsDataURL(file.file)
        // console.log(this.fileReader.result);
        }
        fileReader.onload = () => {
        let base64Str = fileReader.result
        let data = {
        base64Str: base64Str,
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
        this.fileList.splice(0,1)
        this.$refs.upload.clearFiles();
        }else{
          this.$message({
          type: "error",
          message: "上传失败!"
          })
        }
      }).catch(res => {
        this.$message({
          type: "error",
          message: "上传失败!"
          })
      });
        }
      },
      back(){
        this.$emit("back")
      },
      beforeUpload (file) {
      const isLt5M = file.size < 5 * 1024 * 1024
      
      if (!isLt5M) {
        this.$message.warning("The max size is 5MB！")
        return false
      }
    },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1000 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleRemove(file, fileList){
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i].name===file.name){
            this.fileList.splice(i,1)
          }
        }
      },
      handleChange(file, fileList){
        let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
        if(existFile){
          this.$message.error("当前文件已经存在!")
          fileList.pop()
        }else{
        this.fileList.push(file)
        }
      }
    },
  components: {},
  created(){},
  mounted () {
    if (!window.FileReader) {
      console.error('Your browser does not support FileReader API!')
    }
    this.fileReader = new FileReader()
  }
}
</script>
<style lang='scss' scoped>
div{
  // display: inline-block;
  margin-top: 5px
}
</style>
