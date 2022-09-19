<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <router-link to="/dashboard" class="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <div class="logo">
          <img src="../assets/logo1.svg" alt="Logo1" style="width: 143px;">
          <img src="../assets/logo2.svg" alt="" style="width: 95px;">
      </div>
    </router-link>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" :class="[$route.params.slug != 'customer' && $route.params.slug != 'sales' && $route.params.slug != 'admin' ? 'active' : 'link-dark']" aria-current="page">
          <font-awesome-icon icon="house-user" class="me-2"></font-awesome-icon>
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/customer" class="nav-link" :class="[$route.params.slug == 'customer' ? 'active' : 'link-dark']" aria-current="page">
          <font-awesome-icon icon="user" class="me-2"></font-awesome-icon>
          Customer
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/sales" class="nav-link" :class="[$route.params.slug == 'sales' ? 'active' : 'link-dark']" aria-current="page">
          <font-awesome-icon icon="user-group" class="me-2"></font-awesome-icon>
          Sales
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/admin" class="nav-link" :class="[$route.params.slug == 'admin' ? 'active' : 'link-dark']" aria-current="page">
          <font-awesome-icon icon="address-book" class="me-2"></font-awesome-icon>
          Admin
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