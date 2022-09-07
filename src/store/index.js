import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: ''
    },
    getters: {

    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.token = token;
        },
        removeToken(state) {
            state.token = '';
            localStorage.token = '';
        }
    },
    actions: {
        register({ commit }, credentials) {
            axios.post('http://localhost:3000/admin/users/register', { username: credentials.username, name: credentials.name, email: credentials.email, password: credentials.password, phoneNumber:credentials.phoneNumber })
                .then(res => ({status: res.status, data: res.data}))
                    .then(res => {
                        if (res.status != 200) {alert('Wrong credentials!')}
                        else {
                            commit('setToken', res.data.token);
                        }
                    })

        },

        login({ commit }, credentials) {
            console.log(credentials);
            axios.post('http://localhost:3000/admin/auth/login', { username: credentials.username, password: credentials.password })
                .then(res => {
                    if (res.msg) {  
                        alert(res.msg);
                    }
                    else{
                        console.log(res.data.token);
                        commit('setToken', res.data.token);

                    }
                })
                
                    

        },

    }



})
