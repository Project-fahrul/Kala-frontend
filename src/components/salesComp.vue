<template>
    <div>
        <h2>Sales</h2>
        <p class="m-0">Table list data sales</p>
    </div>
    <div class="mt-4 d-flex">
        <button class="btn-add btn btn-primary me-3" @click="tambah">+Sales</button>
        <!-- <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                All
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Sales ToDo</a></li>
            </ul>
        </div> -->
    </div>
    <div class="mt-4">
        <table id="mytable" class="table table-bordred table-striped">

            <thead>
                <th>Name</th>
                <th>Nomor Hp</th>
                <th>Email</th>
                <th>Progress</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <tr v-for="(d, i) in model" :key="i">
                    <td>{{d.name}}</td>
                    <td>{{d.phone_number}}</td>
                    <td>{{d.email}}</td>
                    <td>{{d.total == 0 ? '100' : Math.ceil(d.progress * 100 / d.total)}}%</td>
                    <td class="bx">
                        <p data-placement="top" data-toggle="tooltip" title="Edit"><button
                                class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal"
                                @click="edit(d.id, 'a')" data-target="#edit">
                                <font-awesome-icon icon="pen" />
                            </button></p>
                    </td>
                    <td class="bx">
                        <p data-placement="top" data-toggle="tooltip" title="Delete"><button
                                class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" @click="del(d.id)"
                                data-target="#delete">
                                <font-awesome-icon icon="trash" />
                        </button></p>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
    <div class="mt-3">
        <button class="btn disabled">Prev</button>
        <p class="btn page-evidance">1/1</p>
        <button class="btn disabled">Next</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Data</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="alert alert-warning" role="alert" v-if="error">
                    Tidak bisa melakukan operasi. Terjadi kesalahan atau email sudah digunakan
                </div>
                <form>
                    <div v-if="loading" class="modal-body mb-3 d-flex justify-content-center">
                        <div class="loader"></div>
                    </div>
                    <div v-else class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" v-model="name" class="form-control" :disabled="view" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" v-model="email" class="form-control"  required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nomor Hp</label>
                            <input type="text" class="form-control" v-model="phoneNumber" :disabled="view" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-if="!view" @click="save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import service from "@/service"
import bootstrap from "bootstrap/dist/js/bootstrap";
export default {
    data() {
        return {
            view: true,
            loading: false,
            email: "",
            phoneNumber: "",
            name: "",
            model: [],
            bootModel: null,
            isCreate: false,
            selectedUser: null,
            error: false
        }
    },
    methods: {
        async lihat(id) {
            this.view = true
            let res = await service.getSales(id)
            console.log(res.data);
            this.email = res.data.email
            this.name = res.data.name
            this.phoneNumber = res.phone_number
            this.bootModel.toggle()
        },
        async del(id) {
            let res = await confirm("Are you sure?");
            if(res){
                await service.deleteSales(id)
            }

            let data = await service.allSales(0)
            this.model = data.data
        },
        async edit(id) {
            this.error = false
            this.selectedUser = id
            this.isCreate = false
            this.view = false
            this.bootModel.toggle()
            let sales = await service.getSales(id)

            this.email = sales.data.email
            this.phoneNumber = sales.data.phone_number
            this.name = sales.data.name
        },
        tambah() {
            this.error = false
            this.isCreate = true
            this.view = false
            this.bootModel.toggle()
        },
        async save() {
            let res = true;
            if (this.isCreate) {
                res = await service.createSales({
                    role: "sales",
                    name: this.name,
                    email: this.email,
                    "phone_number": this.phoneNumber
                })
            } else {
                res = await service.editSales(this.selectedUser, {
                    name: this.name,
                    email: this.email,
                    "phone_number": this.phoneNumber
                })
            }
            if(!res){
                this.error = true
                return
            }
            this.bootModel.toggle()
            let data = await service.allSales(0)
            this.model = data.data
        }
    },
    async mounted() {
        let data = await service.allSales(0)
        this.model = data.data
        this.bootModel = new bootstrap.Modal("#exampleModal")
    },
}
</script>