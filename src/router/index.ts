import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// {
//   alias:"xxx"//别名
//   props:true//是否将param作为props传输
//   children:xxx//子组件列表
//   component: () => import('./views/UserDetails.vue')//动态导入
// }
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true, // >/user ok  >/user/ not ok
  sensitive: true,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: "/home",
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthView.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("../views/LoginView.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("../views/RegisterView.vue"),
        },
      ],
    },
    {
      path: "/user/:uid",
      name: "user",
      component: () => import("../views/UserView.vue"),
      props: true,
      children: [
        {
          path: "published_list",
          name: "published_list",
          alias: "", //默认显示用户的文章列表
          component: () => import("../views/MyPubList.vue"),
          props: true,
        },
        {
          path: "follower_list",
          name: "follower_list",
          component: () => import("../views/MyFollowList.vue"),
          props: true,
          meta: { type: "follower" },
        },
        {
          path: "following_list",
          name: "following_list",
          component: () => import("../views/MyFollowList.vue"),
          props: true,
          meta: { type: "following" },
        },
      ],
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("../views/DetailView.vue"),
      props: (route) => ({ aid: route.query.aid, uid: route.query.uid }),
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("../views/SettingView.vue"),
      children: [
        {
          path: "profile_modify",
          name: "profile_modify",
          alias: "",
          component: () => import("../views/ProfileMod.vue"),
        },
        {
          path: "pwd_modify",
          name: "pwd_modify",
          component: () => import("../views/PwdModView.vue"),
        },
      ],
    },
    {
      path: "/publish",
      name: "publish",
      component: () => import("../views/PublishView.vue"),
      children: [
        {
          path: "create",
          name: "publish_create",
          component: () => import("../views/PublishCreate.vue"),
        },
        {
          path: "modify",
          name: "publish_modify",
          component: () => import("../views/PublishMod.vue"),
          props: (route) => ({ aid: route.query.aid, uid: route.query.uid }),
        },
      ],
    },
    //404路由
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotfFound.vue"),
    },
  ],
});

export default router;
