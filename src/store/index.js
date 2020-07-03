import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataTable: [],
    catTable: [],
    typeDict: { 0: '支出', 1: '收入' },
    catDict: {}
  },
  mutations: {
    setDataTable (state, dataTable) {
      state.dataTable = dataTable
    },
    setCatTable (state, catTable) {
      state.catTable = catTable
    },
    setCatDict (state, catDict) {
      state.catDict = catDict
    },
    addData (state, newData) {
      state.dataTable.push(newData)
    }
  },
  actions: {
  },
  modules: {
  }
})
