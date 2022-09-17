<template>
    <div class="container-fluid auth">
        <div class="wrapper">
            <div class="hero">
                <img src="../assets/splash.jpg" alt="splash">
                <div class="splash">Sign In</div>
            </div>
            <div class="form">
                <div class="alert alert-danger" role="alert" v-if="error">
                    {{message}}
                </div>
                <form @submit.prevent="login">
                    <div class="mb-4 form-box">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <label for="exampleInputEmail1" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-4 form-box">
                        <div></div>
                        <div class="btnn">
                            <button class="btn">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import service from "@/service"
    export default {
        data(){
            return {
                email: "",
                password: "",
                message: "",
                error: false
            }
        },
        methods: {
            async login(){
                this.error = false
                let data = await service.login(this.email, this.password)
                console.log(data);
                if(data.status == false){
                    this.error = true
                    this.message = data.message
                }else{
                    this.$router.push("/dashboard")
                }
            }
        },
        async mounted(){
            let response = await service.me()
            if(response){
                this.$router.push("/dashboard")
            }
        }
    }
</script>