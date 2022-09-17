<template>
    <main class="container-fluid">
        <SidebarComp></SidebarComp>
        <DashboardComp></DashboardComp>
    </main>
</template>

<script>
import SidebarComp from "@/components/sidebarComp.vue";
import DashboardComp from "@/components/dashboardComp.vue";
export default{
    components:{
    SidebarComp,
    DashboardComp
}
}
</script>