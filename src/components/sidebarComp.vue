<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">KALA Admin</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" :class="[$route.params.slug != 'customer' && $route.params.slug != 'sales' ? 'active' : 'link-dark']" aria-current="page">
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/customer" class="nav-link" :class="[$route.params.slug == 'customer' ? 'active' : 'link-dark']" aria-current="page">
          Customer
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/sales" class="nav-link" :class="[$route.params.slug == 'sales' ? 'active' : 'link-dark']" aria-current="page">
          Sales
        </router-link>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <!-- <font-awesome-icon icon="person" class="icon" /> -->
        <strong>Admin</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><button class="dropdown-item" @click="logout">Sign out</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import service from "@/service"

  export default {
    methods:{
      async logout(){
        console.log("aas");
        await service.logout()
        this.$router.push("/")
      }
    },
    async mounted(){
       let response = await service.me()
       if(!response){
        this.$router.push("/")
       }
    }
  }
</script>