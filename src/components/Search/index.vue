<template>
  <div class="search">
      {{ $t('Name') }}:<el-input placeholder="请输入名称" v-model="search.name" prefix-icon="el-icon-search" clearable></el-input>&nbsp&nbsp
      <div class="datepicker" v-if="showDatePicker">
        <span class="demonstration">{{ $t('DateRange') }}:</span>
    <el-date-picker
      v-model="search.timestamp"
      :clearable="true"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      value-format="timestamp"
      end-placeholder="结束日期">
    </el-date-picker>
      </div>&nbsp&nbsp
      {{ $t('Total') }}:<el-select v-model="search.operate" class="operate" placeholder="请选择">
              <el-option
                v-for="item in search.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      <el-input placeholder="请输入总计" v-model="search.total" type="text" oninput = "value=value.replace(/[^\d]/g,'')" class="total" prefix-icon="el-icon-search" clearable></el-input>&nbsp&nbsp
      <el-button type="primary" @click="find">{{ $t('Search') }}</el-button>
      <el-button type="primary" @click="reset">{{ $t('Reset') }}</el-button>
  </div>
</template>

<script>

import {getCollectByCondition} from "@/network/collect"

var search = {
        name: '',
        operate: '',
        timestamp: "",
        total: '',
        options: [{
          value: '0',
          label: '<'
        }, {
          value: '1',
          label: '<='
        }, {
          value: '2',
          label: '='
        }, {
          value: '3',
          label: '>'
        }, {
          value: '4',
          label: '>='
        }],
      }
export default {
  name: 'Search',
  props: {
    collect: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      search,
      showDatePicker: false
    }
  },
  components: {
  },
  created(){
    if(this.collect){
      this.showDatePicker = true
    }
  },
  activated(){
    // console.log("11");
  },
  mounted(){},
  methods: {
    reset(){
      this.search.name = this.search.operate = this.search.timestamp =this.search.total = ''
      this.options = [{
          value: '0',
          label: '<'
        }, {
          value: '1',
          label: '<='
        }, {
          value: '2',
          label: '='
        }, {
          value: '3',
          label: '>'
        }, {
          value: '4',
          label: '>='
        }]
    },
    find(){

      if((this.search.operate==''&&this.search.total=='')||(this.search.operate!=''&&this.search.total!='') ){
        this.$emit("find",this.search)
        }else{
          this.$message.warning("请选择比较符或总计！")
      }
      // if((this.search.operate==''&&this.search.total=='')||(this.search.operate!=''&&this.search.total!='') ){
      //   if(this.search.timestamp.length>0){
      //     getCollectByCondition1(search).then( res => {
      //     console.log(res);
      // })
      //   }else{
      //     getCollectByCondition2(search).then( res => {
      //     console.log(res);
      // })
      //   }
      // }
      
    }
  }
}
</script>
<style lang='scss' scoped>
.search{
    margin-bottom: 10px
}
    .el-input{
        display: inline-block;
        width: 15%;
    }
    .datepicker{
      display: inline-block;
    }
    .operate{
      width: 95px;
    }
   .total{
     width: 150px;
   }
</style>