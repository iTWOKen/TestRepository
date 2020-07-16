import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterTable from './router';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as MockData from './mock-data/mockData';
import { test } from './api';

Vue.use(ElementUI);
Vue.use(VueRouter);
const router = new VueRouter({
    mode:RouterTable.mode,
    routes:RouterTable.routes
});
router.beforeEach((from,to,next)=>{
      next();
});
new Vue({
    el:'#app',
    router,
    render:h=>h(App)
});
//api test
(async function apiTest() {
    const response = await test('hello iBlog');
    console.log(response);
}())