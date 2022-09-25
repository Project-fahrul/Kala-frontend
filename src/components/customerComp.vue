<template>
    <div>
        <h2>Customer</h2>
        <p class="m-0">Table list data customer</p>
    </div>
    <div class="mt-4">
        <table id="mytable" class="table table-bordred table-striped">

            <thead>
                <th>Name</th>
                <th>Nomor Hp</th>
                <th>Address</th>
                <th>Sales</th>
                <th>View</th>
            </thead>
            <tbody>
                <tr v-for="(m, i) in model" :key="i">
                    <td>{{m.name}}</td>
                    <td>{{m.no_hp}}</td>
                    <td>{{m.address}}</td>
                    <td>{{m.sales_name}}</td>
                    <td class="bx">
                        <p data-placement="top" data-toggle="tooltip" title="Edit">
                            <button class="btn btn-success btn-xs" data-title="Edit" data-toggle="modal"
                                @click="lihat(m.id)" data-target="#edit">
                                <font-awesome-icon icon="eye" />
                            </button>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form @submit.prevent="save">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Data</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
                        <div v-if="loading" class="modal-body mb-3 d-flex justify-content-center">
                            <div class="loader"></div>
                        </div>
                        <div v-else class="modal-body">
                            <div class="alert alert-danger mb-3" role="alert" v-if="errorTglAngsuran">
                                Tanggal DEC tidak valid
                            </div>
                            <div class="alert alert-danger mb-3" role="alert" v-if="errorTglDec">
                                Tanggal Angsuran tidak valid
                            </div>
                            <div class="alert alert-danger mb-3" role="alert" v-if="errorTglSTNK">
                                Tanggal Service tidak valid
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" v-model="name" class="form-control" :disabled="view" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Alamat</label>
                                <input type="text" class="form-control" :disabled="view" v-model="address" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">No HP</label>
                                <input type="text" class="form-control" :disabled="view" required v-model="phone">
                            </div>
                            <div class="mb-3" v-if="view">
                                <label class="form-label">Nama Sales</label>
                                <input type="text" class="form-control" :disabled="view" required v-model="salesName">
                            </div>
                            <div class="mb-3" v-else>
                                <label class="form-label">Nama Sales</label>
                                <select required v-model="saledIDSelected" class="form-select" aria-label="Default select example">
                                    <option selected>Pilih Sales</option>
                                    <option v-for="(s,i) in salesModel" :value="s.id" :key="i">{{s.name}}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tanggal servise selanjutnya</label>
                                <input type="date" class="form-control" :disabled="view" required v-model="dateDEC">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tanggal angsuran selanjutnya</label>
                                <input type="date" class="form-control" :disabled="view" required v-model="dateAngsuran">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tanggal STNK selanjutnya</label>
                                <input type="date" class="form-control" :disabled="view" required v-model="dateSTNK">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" :disabled="view" required v-model="dateBirthday">
                            </div>
                            <div class="mb-3" v-if="view">
                                <label class="form-label">Type Angsuran</label>
                                <input type="text" class="form-control" :disabled="view" required v-model="typeAngsuran">
                            </div>
                            <div class="mb-3" v-else>
                                <label class="form-label">Type Angsuran</label>
                                <select required v-model="typeAngsuran" class="form-select" aria-label="Default select example">
                                    <option value="Kredit">Kredit</option>
                                    <option selected value="Tunai">Tunai</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nomor Rangka</label>
                                <input type="text" class="form-control" :disabled="view" required v-model="rangka">
    </div>
                            <div class="mb-3">
                                <label class="form-label">Tipe Kendaraan</label>
                                <input type="text" class="form-control" :disabled="view" required v-model="typeKendaraan">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Leasing</label>
                                <input type="text" class="form-control" :disabled="view" required v-model="leasing">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Total Angsuran</label>
                                <input type="number" min="0" max="60"  class="form-control" :disabled="view" required v-model="totalAngsuran">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" v-if="!view" >Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="mt-3">
        <button @click="prev" class="btn" :class="[isPrevActive ? 'page-evidance' : 'disabled']">Prev</button>
        <p class="btn page-evidance">{{page}}/{{pages}}</p>
        <button @click="next" class="btn" :class="[isNextActive ? 'page-evidance' : 'disabled']">Next</button>
    </div>
</template>


<script>
import service from "@/service"
import bootstrap from "bootstrap/dist/js/bootstrap"


function diffDate(n,dt){
    let x = new Date(dt) - new Date(n)
    return Math.ceil(x / (1000 * 3600 * 24));
}

export default {
    data() {
        return {
            view: true,
            model: [],
            name: "",
            address: "",
            phone: "",
            salesName: "",
            dateDEC: "",
            dateBirthday: "",
            dateSTNK: "",
            dateAngsuran: "",
            typeAngsuran: "",
            rangka: "",
            typeKendaraan: "",
            leasing: "",
            totalAngsuran: 0,
            loading: true,
            bootModal: null,
            salesModel: [],
            saledIDSelected: -1,
            now: null,
            errorTglDec: false,
            errorTglAngsuran: false,
            errorTglSTNK: false,
            isCreate: true,
            idd: -1,
            pages: 1,
                page: 1,
        }
    },
    computed:{
            isNextActive(){
                return this.page < this.pages
            },
            isPrevActive(){
                return this.page > 1
            }
        },  
    methods: {
        async next(){
                if(!this.isNextActive){
                    return
                }
                this.page++
                let data = await service.listCustomer(this.page)
                if (data){
                    this.model = data.data.Customer
                    this.pages = data.data.TotalPage
                }
            },
            async prev(){
                if(!this.isPrevActive){
                    return
                }
                this.page--
                let data = await service.listCustomer(this.page)
                if (data){
                    this.model = data.data.Customer
                    this.pages = data.data.TotalPage
                }
            },
        async save(){
            this.errorTglAngsuran = false
            this.errorTglDec = false
            this.errorTglSTNK = false
            const res = this.dateValidation()
            if(res && this.isCreate){
                this.loading = true
                let post = await service.createCustomer({
                    name: this.name,
                    address: this.address,
                    "no_hp": this.phone,
                    "tgl_dec": new Date(this.dateDEC),
                    "tgl_lahir": new Date(this.dateBirthday),
                    "tgl_stnk": new Date(this.dateSTNK),
                    "tgl_angsuran": new Date(this.dateAngsuran),
                    "no_rangka": this.rangka,
                    "type_kendaraan": this.typeKendaraan,
                    "leasing": this.leasing,
                    "sales_id": this.saledIDSelected,
                    "type_angsuran": this.typeAngsuran,
                    "total_angsuran": this.totalAngsuran
                })
                if(post){
                    this.bootModal.toggle()
                }
                this.loading = false
            }else if(res){
                this.loading = true
                let post = await service.editCustomer(this.idd, {
                    name: this.name,
                    address: this.address,
                    "no_hp": this.phone,
                    "tgl_dec": new Date(this.dateDEC),
                    "tgl_lahir": new Date(this.dateBirthday),
                    "tgl_stnk": new Date(this.dateSTNK),
                    "tgl_angsuran": new Date(this.dateAngsuran),
                    "no_rangka": this.rangka,
                    "type_kendaraan": this.typeKendaraan,
                    "leasing": this.leasing,
                    "sales_id": this.saledIDSelected,
                    "type_angsuran": this.typeAngsuran,
                    "total_angsuran": this.totalAngsuran
                })
                if(post){
                    this.bootModal.toggle()
                }
                this.loading = false
            }
            let data = await service.listCustomer(1)
            if (data.status)
                this.model = data.data
        },
        async edit(id) {
            this.isCreate = false
            this.idd = id
            this.view = false
            this.loading = true
            const data = await service.lihatCustomer(id)
            this.bootModal.toggle()
            if (data.status) {
                const d = data.data
                this.name = d.name
                this.address = d.address
                this.phone = d.no_hp
                this.salesName = d.sales_name
                this.dateDEC = new Date(d.tgl_dec).toISOString().split('T')[0]
                this.dateBirthday = new Date(d.tgl_lahir).toISOString().split('T')[0]
                this.dateSTNK = new Date(d.tgl_stnk).toISOString().split('T')[0]
                this.dateAngsuran = new Date(d.tgl_angsuran).toISOString().split('T')[0]
                this.typeAngsuran = d.angsuran
                this.rangka = d.no_rangka
                this.typeKendaraan = d.type_kendaraan
                this.leasing = d.leasing
                this.totalAngsuran = d.total_angsuran
                this.loading = false
                this.saledIDSelected = d.sales_id
            }
        },
        async lihat(id) {
            this.view = true
            this.name = ""
            this.address = ""
            this.phone = ""
            this.salesName = ""
            this.dateDEC = ""
            this.dateBirthday = ""
            this.dateSTNK = ""
            this.dateAngsuran = ""
            this.typeAngsuran = ""
            this.rangka = ""
            this.typeKendaraan = ""
            this.leasing = ""
            this.totalAngsuran = 0
            this.loading = true
            const data = await service.lihatCustomer(id)
            this.bootModal.toggle()
            if (data.status) {
                const d = data.data
                this.name = d.name
                this.address = d.address
                this.phone = d.no_hp
                this.salesName = d.sales_name
                this.dateDEC = new Date(d.tgl_dec).toISOString().split('T')[0]
                this.dateBirthday = new Date(d.tgl_lahir).toISOString().split('T')[0]
                this.dateSTNK = new Date(d.tgl_stnk).toISOString().split('T')[0]
                this.dateAngsuran = new Date(d.tgl_angsuran).toISOString().split('T')[0]
                this.typeAngsuran = d.angsuran
                this.rangka = d.no_rangka
                this.typeKendaraan = d.type_kendaraan
                this.leasing = d.leasing
                this.totalAngsuran = d.total_angsuran
                this.loading = false
            }
        },
        async tambah() {
            this.isCreate = true
            this.errorTglAngsuran = false
            this.errorTglDec = false
            this.errorTglSTNK = false
            this.view = false
            this.name = ""
            this.address = ""
            this.phone = ""
            this.salesName = ""
            this.dateDEC =this.now
            this.dateBirthday = ""
            this.dateSTNK = this.now
            this.dateAngsuran = this.now
            this.typeAngsuran = "Tunai"
            this.rangka = ""
            this.typeKendaraan = ""
            this.leasing = ""
            this.totalAngsuran = 0
            this.loading = false
            this.bootModal.toggle()
        },
        async del(id, name){
            const res = await confirm(`Delete customer ${name}`)
            if(res){
                await service.deleteCustomer(id)
                let data = await service.listCustomer(1)
                if (data.status)
                    this.model = data.data
                data = await service.allSales()
                if (data.status) {
                    this.salesModel = data.data
                }
            }
        },
        dateValidation(){
            let res = true
            console.log(diffDate(this.now, this.dateAngsuran));
            if(diffDate(this.now, this.dateAngsuran) <= 0){
                res = false
                this.errorTglAngsuran = true
            }
            if(diffDate(this.now, this.dateDEC) <= 0){
                res = false
                this.errorTglDec = true
            }
            if(diffDate(this.now, this.dateSTNK) <= 0){
                res = false
                this.errorTglSTNK = true
            }

            return res

        }
    },
    async mounted() {
        this.bootModal = new bootstrap.Modal("#exampleModal", {
            keyboard: false
        })
        let data = await service.listCustomer(1)
        if (data.status){
            this.model = data.data.Customer
            this.pages = data.data.TotalPage
        }
        data = await service.allSales()
        if (data.status) {
            this.salesModel = data.data
        }
    }
}
</script>