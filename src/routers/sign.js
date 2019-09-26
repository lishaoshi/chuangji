import ChangePassword from "@/page/sign/ChangePassword.vue";
import Signup from "@/page/sign/Signup.vue";
import Signin from "@/page/sign/Signin.vue";
import SigninDynamic from "@/page/sign/SigninDynamic.vue";
import RegisterProtocol from "@/page/sign/RegisterProtocol.vue";
import Forgot from "@/page/sign/Forgot.vue";
import RegisterChoice from "@/page/sign/RegisterChoice.vue";
import RegisterStep2 from "@/page/sign/SignupStep2.vue";

export default [
    {
        path: "/signin",
        component: Signin,
        meta: {
            title: "登录",
            forGuest: true
        }
    },
    {
        path: "/signin/dynamic",
        component: SigninDynamic,
        meta: {
            title: "一键登录",
            forGuest: true
        }
    },
    {
        path: "/signup",
        component: Signup,
        meta: {
            title: "注册",
            forGuest: true
        }
    },
    {
        path: "/signup/protocol",
        component: RegisterProtocol,
        meta: {
            title: "用户注册协议"
        }
    },
    {
        path: "/forgot",
        component: Forgot,
        meta: {
            title: "忘记密码"
        }
    },
    {
        path: "/changePassword",
        component: ChangePassword,
        meta: {
            title: "修改密码",
            requiresAuth: true
        }
    },
    {
        path: "/register-choice",
        component: RegisterChoice,
        meta: {
            title: "注册选择",
            forGuest: true
        }
    },
    {
        path: "/register-step2",
        component: RegisterStep2,
        meta: {
            title: "注册第二步",
            forGuest: true
        }
    },
]