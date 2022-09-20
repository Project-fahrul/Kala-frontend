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
                    <div class="alert alert-form" :class="classAlert" role="alert">
                        <font-awesome-icon icon="triangle-exclamation" class="me-1" />
                        {{message}}
                    </div>
                </div>
                <form @submit.prevent="login">
                    <div class="mb-4 form-box">
                        <label class="form-label">Name</label>
                        <input v-model="name" type="text" class="form-control" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <label class="form-label">Nomor Hp</label>
                        <input v-model="hp" type="text" class="form-control" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <label class="form-label">Email address</label>
                        <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <label class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" aria-describedby="emailHelp"
                            required>
                    </div>
                    <div class="mb-4 form-box">
                        <div></div>
                        <div class="btnn">
                            <button class="btn" @click="registerUser">Sign Up</button>
                            <router-link to="/" class="btn ms-3 back">Back</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import service from "@/service"
const DANGER_CLASS = "alert-danger", INFO_CLASS = "alert-primary"

export default {
    methods: {
        async registerUser(){
            this.error = false
            this.classAlert = INFO_CLASS
            if(!/^[0-9]+$/.test(this.hp)){
                this.message = "Error validasi nomor hp"
                this.error = true
                return
            }
            let data;
            data = await service.registration(this.name, this.email, this.password, this.hp)
            if(!data.status){
                this.classAlert = DANGER_CLASS
                this.error = true
                this.message = data.message
                return
            }
            this.error = true
            this.message = "Berhasil registrasi, tunggu konfirmasi admin lalu login"
            
            setTimeout(() => {
                this.$router.push("/")
            }, 2000);
        }
    },
    data(){
        return {
            name:"",
            email: "",
            password: "",
            message: "",
            hp: "",
            classAlert: "",
            error: false
        }
    }
}
</script>