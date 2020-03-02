<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
  
    <panel-group :gatherTotal="gatherTotal" :rubbishTotal="rubbishTotal" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import {CollectList} from '@/network/collect'
import {rabbishList} from '@/network/rabbish'

const lineChartData = {
  rubbish: {
    // expectedData: [100, 120, 161, 134, 105, 160, 165],
    nameData:[],
    actualData: []
  },
  gather: {
    // expectedData: [200, 192, 120, 144, 160, 130, 140],
    nameData:[],
    actualData: []
  }
  // purchases: {
  //   // expectedData: [80, 100, 121, 104, 105, 90, 100],
  //   actualData: [120, 90, 100, 138, 142, 130, 130]
  // },
  // shoppings: {
  //   // expectedData: [130, 140, 141, 142, 145, 150, 160],
  //   actualData: [120, 82, 91, 154, 162, 140, 130]
  // }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: {}
    }
  },
  created() {
    this.getRabbishList()
    this.getCollectList()
  },
  activated(){
    this.getRabbishList()
    this.getCollectList()
  },
  methods: {
    handleSetLineChartData(type) {
      if(type=='rubbish'){
        this.getRabbishList()
      }else{
        this.getCollectList()
      }
    },
    getCollectList(){
      this.lineChartData = {}
      lineChartData.gather.nameData = []
      lineChartData.gather.actualData = []
      CollectList().then(res => {
          for(let item of res){
            lineChartData.gather.nameData.push(item.name)
            lineChartData.gather.actualData.push(item.count)
          }
        })
        this.lineChartData = lineChartData.gather
    },
    getRabbishList(){
      this.lineChartData = {}
      lineChartData.rubbish.nameData = []
      lineChartData.rubbish.actualData = []
      rabbishList().then(res => {
          for(let item of res){
            lineChartData.rubbish.nameData.push(item.name)
            lineChartData.rubbish.actualData.push(item.count)
          }
        })
        this.lineChartData = lineChartData.rubbish
    },
  },
  computed: {
      gatherTotal(){
        var total = 0
        for(let item of lineChartData.gather.actualData){
          total += item
        }
        return total
      },
      rubbishTotal(){
        let total = 0
        for(let item of lineChartData.rubbish.actualData){
          total += item
        }
        return total
      }
    },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
