<template>
  
        <el-radio-group v-model="radio4" size="mini">
            <div>
                <el-radio label="1" border>备选项1</el-radio>
            </div>
            <div>
                <el-radio label="4" border>备选项1</el-radio>
            </div>
            <div>
                <el-radio label="3" border>备选项1</el-radio>
            </div>
            <div>
                <el-radio label="2" border>备选项1</el-radio>
            </div>
        </el-radio-group>
  
  
</template>

<script>
  export default {
    data () {
      return {
        radio4: '1'
      };
    }
  }
</script>

<style scoped>
    label{
        margin-top: 5px;
    }
</style>