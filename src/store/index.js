import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    billTable: [],
    catTable: [],
    typeDict: { 0: '支出', 1: '收入' },
    catDict: {},
    chosenMonth: ''
  },
  mutations: {
    setBillTable (state, billTable) {
      state.billTable = billTable
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
    addBill (state, newBill) {
      state.billTable.push(newBill)
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
