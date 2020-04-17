import axios from 'axios';

const state = {
    products: [],
    searchProducts: []
}

const actions = {
    getProducts({commit}) {        
        axios.get('/product/getAll')
            .then((res) => {
                var files = [];
                res.data.map((item, i) => {
                    files[i] = JSON.parse(item.product_img);
                    res.data[i].product_img = files[i];
                    return item.files;
                })
                commit('setProducts', res.data)
            })
            .catch(err => {
                console.log(err.res.data.error);
            })
    },
    searchProducts({commit}) {
        axios.get('/product/getAllSearch')
            .then((res) => {
                var files = [];
                res.data.map((item, i) => {
                    files[i] = JSON.parse(item.product_img);
                    res.data[i].product_img = files[i];
                    return item.files;
                })
                commit('setSearchProducts', res.data)
            })
            .catch(err => {
                console.log(err.res.data.error);
            })
    }
}

const mutations = {
    setProducts(state, payload) {        
        state.products = payload;
        console.log(state.products);    
    },
    setSearchProducts(state, payload) {
        state.searchProducts = payload;
    }
}

const getters = {

}

export default {
    state, actions, mutations, getters
}