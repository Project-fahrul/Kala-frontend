<template>
    <div class="dash-wrapper">
        <EvidanceListComp v-if="$route.params.slug == undefined"></EvidanceListComp>
        <CustomerComp v-else-if="$route.params.slug == 'customer'"></CustomerComp>
        <SalesComp v-else-if="$route.params.slug == 'sales'"></SalesComp>
        <AdminComp v-else-if="$route.params.slug == 'admin'"></AdminComp>
    </div>
</template>

<script>
import EvidanceListComp from './evidanceListComp.vue';
import CustomerComp from './customerComp.vue';
import SalesComp from './salesComp.vue';
import AdminComp from './adminComp.vue';
    export default{
    components: {
    EvidanceListComp,
    CustomerComp,
    SalesComp,
    AdminComp
}
}
</script>