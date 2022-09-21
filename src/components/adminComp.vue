<template>
    <div>
        <h2>Admin</h2>
        <p class="m-0">Profile Admin</p>

        <div class="alert alert-danger" role="alert" v-if="error">
            {{msgError}}
        </div>
    </div>
    <div class="mt-4" v-if="newSales>0">
        <h5 class="mb-3 sub-title">Konfirmasi admin baru</h5>
        <hr>
        <table id="mytable" class="table table-bordred table-striped">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>No Hp</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr v-for="(m, i) in model" :key="i">
                    <td>{{m.name}}</td>
                    <td>{{m.email}}</td>
                    <td>{{m.phone_number}}</td>
                    <td class="bx">
                        <p data-placement="top" data-toggle="tooltip" title="Acc" class="d-inline-block">
                            <button class="btn btn-success btn-xs" data-title="Edit" data-toggle="modal"
                                @click="verif(m.id, 'acc')" data-target="#edit">
                                <font-awesome-icon icon="check" />
                            </button>
                        </p>
                        <p data-placement="top" data-toggle="tooltip" title="Delete" class="d-inline-block ms-2">
                            <button class="btn btn-danger btn-xs" data-title="Edit" data-toggle="modal"
                                @click="verif(m.id, 'del')" data-target="#edit">
                                <font-awesome-icon icon="trash" />
                            </button>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mt-4">
        <h5>
            Profile Anda
        </h5>
        <hr>
        <div class="d-flex">
            <div class="flex-grow-1">
                <div class="mb-3">
                    <p class="p-label">Name</p>
                    <p class="p-form">{{username}}</p>
                </div>
                <div class="mb-3">
                    <p class="p-label">Email</p>
                    <p class="p-form">{{useremail}}</p>
                </div>
            </div>
            <div class="devide"></div>
            <div class="flex-grow-1">
                <div>
                    <h5>Edit Profile</h5>
                    <form @submit.prevent="changeProfile">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input v-model="name" type="text" class="form-control">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-add btn-primary">Ubah</button>
                        </div>
                    </form>
                </div>
                <div class="mt-5">
                    <h5>Ubah Password</h5>
                    <form @submit.prevent="changePassword">
                        <div class="mb-3">
                            <label class="form-label">Password lama</label>
                            <input v-model="oldPassword" type="password" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password baru</label>
                            <input v-model="newPassword" type="password" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Konfirmasi password baru</label>
                            <input v-model="reNewPassword" type="password" class="form-control">
                        </div>
                        <div>
                            <button class="btn btn-add btn-primary">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import service from "@/service"
import storage from "@/storage"

const ERROR_MSG = "Terjadi kesalahan, silahkan logout dan login kembali";
const ERROR_PASSWORD = "Password baru tidak sama";

export default {
    data() {
        return {
            view: true,
            model: [],
            error: false,
            email:"",
            name:"",
            oldPassword:"",
            newPassword:"",
            reNewPassword:"",
            msgError:""
        }
    },
    methods: {
        async verif(id, action){
            this.error = !(await service.verifiedUser(id, action))
            if(!this.error){
                await this.load()
            }
        },
        async load(){
            let data = await service.userNotVerified();
            if(data.status){
                this.model = data.data
            }
        },
        async changeProfile(){
            this.error = false
            let res = await service.editMe(storage.userMe.id,this.name, storage.userMe.email)
            if(res){
                this.name = ""
                storage.userMe.setter(this.name, storage.userMe.email)
                await service.me()
                return
            }
            this.error = true
            this.msgError = ERROR_MSG
        },
        async changePassword(){
            this.error = false
            if(this.newPassword != this.reNewPassword){
                this.error = true
                this.msgError = ERROR_PASSWORD
                return
            }
            let res = await service.changePassword(this.oldPassword, this.newPassword)
            if(!res){
                this.error = true
                this.msgError = ERROR_MSG
                return
            }
            await service.me()
        }
    },
    async mounted() {
        this.load()
    },
    computed:{
        newSales(){
            return this.model.length
        },
        username(){
            return storage.userMe.name
        },
        useremail(){
            return storage.userMe.email
        }
    }
}
</script>