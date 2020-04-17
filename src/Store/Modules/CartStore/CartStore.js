import axios from 'axios';

const state = {
    productsDtl: [],
    cartLength: 0
}

const actions = {
    // getProductsDetail({commit}) {        
    //     axios.get('/product/getAll')
    //         .then((res) => {
    //             var files = [];
    //             res.data.map((item, i) => {
    //                 files[i] = JSON.parse(item.product_img);
    //                 res.data[i].product_img = files[i];
    //                 return item.files;
    //             })
    //             commit('setProductsDtl', res.data)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // },
    getCartProducts({commit}) {
        axios.get('/cart/getAll')
            .then((res) => {
                commit('setProductsDtl', res.data)
                commit('setCartCount', res.data.length)
            })
            .catch(err => {
                console.log(err);
            })
    },
    removeProducts({dispatch}, id) {
        axios.delete('/cart/removeItem/'+id)
            .then((res) => {
                dispatch('getCartProducts');
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateQty({dispatch}, {id, qty}) {
        console.log('qty', qty)
        axios.put('/cart/editCart/'+id, {prod_qty: qty})        
            .then((res) => {
                console.log(res.data)
                dispatch('getCartProducts');
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const mutations = {
    setProductsDtl(state, payload) {
        state.productsDtl = payload;        
    },
    setCartCount(state, payload) {
        state.cartLength = payload;
        console.log('cartLength', state.cartLength);
    }
}

const getters = {

}

export default {
    state, actions, mutations, getters
}