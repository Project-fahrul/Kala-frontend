import {createRouter, createWebHistory} from "vue-router"

import LoginPage from "@/page/loginPage"
import DashboardPage from "@/page/dashboardPage"

const routes = [
    {
        path: "/",
        name: "Index",
        component: LoginPage
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

]

export default createRouter({
    history: createWebHistory(),
    routes
})