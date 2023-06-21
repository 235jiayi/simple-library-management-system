import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const setLocalUser = (state) => {
  const { user } = state;
  const userString = JSON.stringify(user);
  localStorage.user = userString;
};
const getLocalUser = () => {
  if (localStorage.user) return JSON.parse(localStorage.user);
  return {};
};
const setLocalLogin = (state) => {
  const { login } = state;
  const loginString = JSON.stringify(login);
  localStorage.login = loginString;
};
const getLocalLogin = () => {
  if (localStorage.login) return JSON.parse(localStorage.login);
  return false;
};
const setLocalRemember = (state) => {
  const { remember } = state;
  const rememberString = JSON.stringify(remember);
  localStorage.remember = rememberString;
};
const getLocalRemember = () => {
  if (localStorage.remember) return JSON.parse(localStorage.remember);
  return false;
};

export default new Vuex.Store({
  state: {
    user: getLocalUser(),
    login: getLocalLogin(),
    remember: getLocalRemember(),
  },
  getters: {},
  mutations: {
    Login(state, payload) {
      state.user = payload;
      state.remember = false;
      state.login = true;
      setLocalLogin(state);
      setLocalRemember(state);
      setLocalUser(state);
    },
    Logout(state, payload) {
      state.login = false;
      state.user = {};
      setLocalLogin(state);
    },
    Remember(state, payload) {
      state.remember = true;
      setLocalRemember(state);
    },
  },
  actions: {},
  modules: {},
});
