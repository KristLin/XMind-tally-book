import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataTable: [],
    catTable: [],
    typeDict: { 0: '支出', 1: '收入' },
    catDict: {},
    chosenMonth: ''
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
    setChosenMonth (state, chosenMonth) {
      state.chosenMonth = chosenMonth
    },
    addData (state, newData) {
      state.dataTable.push(newData)
    },
    addCat (state, newCat) {
      state.catTable.push(newCat)
      state.catDict[newCat.id] = newCat.name
    }
  },
  actions: {
  },
  modules: {
  }
})
