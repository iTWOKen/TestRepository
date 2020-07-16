const home = ()=>import(/* webpackChunkName:'homePage' */'@/pages/home/home');

export default {
      mode:'hash',
      routes:[
          {
              path:'/',
              redirect:'/home'
          },
          {
              path:'/home',
              meta:{
                  keepAlive:true
              },
              name:'home',
              component:home
          }
      ]
}