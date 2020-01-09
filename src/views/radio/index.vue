<template>
        <el-radio-group v-model="rabbishId" @change="getRabbishId" size="mini">
            <div v-for="item of rabbishList" :key="item.id">
                <el-radio :label="item.id" border>{{item.name}}</el-radio>
            </div>
        </el-radio-group>
</template>

<script>

import {getRabbishList} from '@/network/rabbish'
  export default {
    data () {
      return {
        rabbishId: 0,
        rabbishList: []
      }
    },
    created(){
      this.getRabbishList()
    },
    methods: {
      getRabbishList(){
        getRabbishList()
        .then(res => {
        //  console.log(res.length)
        for(let i=0;i<res.length;i++){
          //  console.log(res[i])
          this.rabbishList.push(res[i])
        }
        // console.log(res)
      })
      .catch(err => console.log(err)
      )
      },
      getRabbishId(){
        this.$emit('')
      }
    }
  }
</script>

<style scoped>
    label{
        margin-top: 5px;
    }
</style>