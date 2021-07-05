import { BlogApi } from '../../services/BlogApi';

const state = () => ({
    post: [],
    errors: [],
    post_id: 1,
    parent_id: null,
    user: '',
    description: ''
})

//to handle state
const getters = {
    getPostData(state) {
        return state.post
    }
}

//to handle actions
const actions = {
    async getPosts({ commit }) {
        // get only the first post
        await BlogApi.get(`posts/1`)
        .then(response => {    
            commit('SET_POST', response.data.data)
        });
    },

    async createComment({ commit, state }) {
        let params = {
            name: state.user,
            description: state.description,
            post_id: state.post_id,
            parent_id: state.parent_id,
        }

        await BlogApi.post(`posts/1/comment`, params)
        .then(response => { 
            // TODO: setup error handling   
            commit('SET_POST', response.data.data)
        });
    },

    setUser ({ commit }, user) {
        commit('SET_USER', user)
    }, 

    setDescription ({ commit }, description) {
        commit('SET_DESCRIPTION', description)
    },

    setParentId ({ commit }, parent_id) {
        console.log(parent_id);
        commit('SET_PARENT_ID', parent_id)
    },
}

//to handle mutations
const mutations = {
    SET_POST(state, post) {
        state.post = post
    },
    SET_USER(state, user) {
        state.user = user
    },
    SET_DESCRIPTION(state, description) {
        state.description = description
    },
    SET_PARENT_ID(state, parent_id) {
        state.parent_id = parent_id
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}

//export store module
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}