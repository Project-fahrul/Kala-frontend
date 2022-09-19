import {createRouter, createWebHistory} from "vue-router"

import LoginPage from "@/page/loginPage"
import RegisterPage from "@/page/registerPage"
import DashboardPage from "@/page/dashboardPage"
import ForgotPasswordPage from '@/page/forgotPasswordPage'

const routes = [
    {
        path: "/",
        name: "Index",
        component: LoginPage
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage
    },
    {
        path: "/dashboard/:slug",
        name: "Customer",
        component: DashboardPage
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPasswordPage
    },

]

export default createRouter({
    history: createWebHistory(),
    routes
})