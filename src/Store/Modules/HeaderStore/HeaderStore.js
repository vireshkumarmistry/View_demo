import axios from 'axios';

const state = {
    categories: [],
    cartItems: 0
}

const actions = {
    getCategories({commit}) {
        axios.get('/category/all')
            .then((res) => {
                commit('setCategories', res.data)
            })
            .catch(err => {
                console.log(err.res.data.error);
            })
    },
    
    // Add Cart Items count from Local Storage 
    addToCart({commit}) { 
        commit('setCartItemsLocal');
    },

    // Add Items to cart (Database)
    setCartItems({dispatch}, obj ) { 
        axios.post('/cart/', obj)
            .then(response => {
                dispatch('getCartProducts');
                console.log('Add cart items', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },

}

const mutations = {
    setCategories(state, payload) {
        state.categories = payload;
    },
    setCartItemsLocal(state) {
        if (JSON.parse(localStorage.getItem('product_id'))) {
            state.cartItems = JSON.parse(localStorage.getItem('product_id')).length;
        }
        else {
            state.cartItems = 0;
        }
    }
}

const getters = {

}

export default {
    state, actions, mutations, getters
}