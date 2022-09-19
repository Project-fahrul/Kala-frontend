<template>
    <div class="container-fluid auth">
        <div class="wrapper">
            <div class="hero">
                <img src="../assets/splash.jpg" alt="splash">
                <div class="splash">Sign Up</div>
            </div>
            <div class="form">

            <div class="form-box mb-3">
                <div></div>
                <div class="logo">
                    <img src="../assets/logo1.svg" alt="Logo1">
                    <img src="../assets/logo2.svg" alt="">
                </div>
            </div>
            <div class="form-box" v-if="error">
                <div></div>
                <div class="alert alert-danger alert-form" role="alert">
                    <font-awesome-icon icon="triangle-exclamation" class="me-1"/>
                    {{message}}
                </div>
            </div>
                <form @submit.prevent="login">
                    <div class="mb-4 form-box">
                        <label class="form-label">Name</label>
                        <input v-model="name" type="text" class="form-control" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <label class="form-label">Email address</label>
                        <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <label class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <div></div>
                        <div class="btnn">
                            <button class="btn">Sign Up</button>
                            <router-link to="/" class="btn ms-3 back">Back</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    // import service from "@/service"
    export default {
       data(){
        return {
            name: "",
            email: "",
            password: ""
        }
       }
    }
</script>