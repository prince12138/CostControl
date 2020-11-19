import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);


var car = JSON.parse(localStorage.getItem("car") || '[]')

var store = new Vuex.Store({
    state: {
        shopcar: car
            // []
    },
    mutations: {
        addCar(state, info) {

            var flag = false;

            state.shopcar.some(item => {
                if (item.id == info.id) {
                    item.count += Number(info.count);
                    flag = true
                    return true
                }
            })

            if (!flag) {
                state.shopcar.push(info)
            }

            localStorage.setItem("car", JSON.stringify(state.shopcar));
        },

        updateGoodsInfo(state, info) {

            state.shopcar.some(item => {
                if (item.id == info.id) {
                    item.count = info.count
                    return true
                }
            })

            localStorage.setItem("car", JSON.stringify(state.shopcar));
        },

        delGoodsInfo(state, id) {
            state.shopcar.some((item, index) => {
                if (item.id == id) {
                    state.shopcar.splice(index, 1)
                    return true;
                }
            })

            localStorage.setItem("car", JSON.stringify(state.shopcar));
        },

        updateSelected(state, info) {
            state.shopcar.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })

            localStorage.setItem("car", JSON.stringify(state.shopcar));
        }
    },
    getters: {
        getAllCount(state) {
            var sum = 0

            state.shopcar.forEach(item => {
                sum += Number(item.count)
            })

            return sum
        },
        getGoodsCount(state) {
            var obj = {}

            state.shopcar.forEach(item => {
                obj[item.id] = item.count
            })

            return obj
                // {88:3,87:2}
        },
        getGoodsSelected(state) {
            var obj = {}
            state.shopcar.forEach(item => {
                obj[item.id] = item.selected
            })

            return obj
        },

        getGoodsCountAndamount(state) {
            var obj = {
                count: 0,
                amount: 0
            }

            state.shopcar.forEach(item => {
                if (item.selected) {
                    obj.count += item.count
                    obj.amount += item.price * item.count
                }
            })

            return obj
        }

    }
})


export default store