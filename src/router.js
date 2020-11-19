import VueRouter from "vue-router";

import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"

// 新闻组件
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"

// 图片组件
import PhotoList from "./components/photos/PhotoList.vue"
import PhotoInfo from "./components/photos/PhotoInfo.vue"

// 商品组件
import GoodsList from "./components/goods/GoodsList.vue"
import GoodsInfo from "./components/goods/GoodsInfo.vue"
import GoodsDesc from "./components/goods/GoodsDesc.vue"
import GoodsComment from "./components/goods/GoodsComment.vue"

var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        {
            path: "/member",
            component: MemberContainer,
            meta: { requireAuth: true }
        },
        {
            path: "/shopcar",
            component: ShopcarContainer,
        },
        { path: "/search", component: SearchContainer },
        { path: "/home/newslist", component: NewsList },
        { path: "/home/newsinfo/:id", component: NewsInfo },
        { path: "/home/photolist", component: PhotoList },
        { path: "/home/photoinfo/:id", component: PhotoInfo },
        { path: "/home/goodslist", component: GoodsList },
        { path: "/home/goodsinfo/:id", component: GoodsInfo },
        { path: "/home/goodsdesc/:id", component: GoodsDesc },
        { path: "/home/goodscomment/:id", component: GoodsComment }
    ],
    linkActiveClass: "mui-active",
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (localStorage.getItem("token")) { // 通过vuex state获取当前的token是否存在
            next();
        } else {
            // console.log(111)
            next({
                path: '/search',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }

    // console.log(to);
    // console.log(from)
    // next()
})


export default router