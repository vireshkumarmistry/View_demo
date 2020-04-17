import axios from 'axios';

const state = {
    searchRes: []
}

const actions = {
    search({commit}, searchText) {

        axios.get('/search/searchProduct/'+searchText)
            .then((res) => {               
                commit('setSearchResult', res.data)
            })
            .catch(err => {
                console.log(err.res.data.error);
            })
    }
}

const mutations = {
    setSearchResult(state, payload) {
        state.searchRes = payload;
    }
}

const getters = {

}

export default {
    state, actions, mutations, getters
}