<template>
    <div>
        <h2>Dashboard</h2>
    </div>
    <div class="row mt-4 dash-card">
        <div class="col-4">
            <div class="card">
                <div class="card-body row">
                    <div class="col-8">
                        <h5 class="card-title">Jumlah Evidance</h5>
                        <p class="card-text">Jumlah Evidance hari ini tersedia</p>
                    </div>
                    <div class="col-4 d-flex justify-content-center align-items-center">
                        <h3 class="total-evidance">{{totalEvidance}}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card">
                <div class="card-body row">
                    <div class="col-8">
                        <h5 class="card-title">Evidance Dikirim</h5>
                        <p class="card-text">Jumlah evidance yang telah dikirim ke customer</p>
                    </div>
                    <div class="col-4 d-flex justify-content-center align-items-center">
                        <h3 class="total-evidance">{{send}}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-4">
            <div class="card">
                <div class="card-body row">
                    <div class="col-8">
                        <h5 class="card-title">Evidance tidak dikirim</h5>
                        <p class="card-text">Jumlah evidance yang tidak dikirimkan ke customer</p>
                    </div>
                    <div class="col-4 d-flex justify-content-center align-items-center">
                        <h3 class="total-evidance">{{notsend}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <div>
            <h4>Evidance</h4>
        </div>
        <div v-for="(e,i) in model" :key="i" class="dash-evidance mt-3">
            <div class="card mb-3">
                <div class="card-body row">
                    <div class="col-6">
                        <h5 class="m-0">{{e.name}}</h5>
                        <p class="m-0">{{e.type}}</p>
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        {{isSubmit(e.submit) ? `Sudah dikirim oleh ${e.sales_name}` : `Belum dikirim oleh ${e.sales_name}`}}
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center" :class="[isSubmit(e.submit) ? '' : 'text-muted']">
                        <p class="view-evidance" @click="lihat(1,isSubmit(e.submit), e.sales_id, e.customer_id, e.due, e.type)">Lihat Evidance</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-3">
        <button @click="prev" class="btn" :class="[isPrevActive ? 'page-evidance' : 'disabled']">Prev</button>
        <p class="btn page-evidance">{{page}}/{{pages}}</p>
        <button @click="next" class="btn" :class="[isNextActive ? 'page-evidance' : 'disabled']">Next</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                    <h5 class="modal-title" id="exampleModalLabel">Data Evidance</h5>
                    <p class="m-0">sales ke customer</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div v-if="loading" class="modal-body mb-3 d-flex justify-content-center">
                        <div class="loader"></div>
                    </div>
                    <div v-else class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Message</label>
                            <input type="text" v-model="message" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Bukti Evidance</label>
                            <div style="width: 100%;">
                                <img :src="src" alt="" style="width: 100%;">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import service, {instance} from '@/service'
    import bootstrap from 'bootstrap/dist/js/bootstrap'
    export default{
        data(){
            return{ 
                loading: false,
                name: "",
                model: [],
                bootModel: null,
                message: "",
                send: 0,
                src: "",
                notsend: 0,
                pages: 1,
                page: 1,
                totalEvidance: 0
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
                let data = await service.listEvidance(this.page)
                if (data){
                    this.model = data.data.Evidance
                    this.pages = data.data.TotalPage
                }
            },
            async prev(){
                if(!this.isPrevActive){
                    return
                }
                this.page--
                let data = await service.listEvidance(this.page)
                if (data){
                    this.model = data.data.Evidance
                    this.pages = data.data.TotalPage
                }
            },
            async lihat(id, status, sales, cus, due, type){
                console.log(due, type);
                if(!status)
                    return
                    console.log(id);
               let data = await service.getEvidance(sales, cus, due, type)
                if (data.status) {
                    this.bootModel.toggle()
                    console.log(data.data);
                    this.message = data.data.comment
                    this.src = instance.getUri() + "/attachment/"+data.data.content
                }
            },
            isSubmit(dt){
                return dt
            }
        },
        async mounted(){
            let data = await service.listEvidance()
            if (data){
                this.model = data.data.Evidance
                this.pages = data.data.TotalPage
            }
            this.bootModel = new bootstrap.Modal("#exampleModal")

            data = await service.count()

            this.send = data.data.Send
            this.notsend = data.data.Notsend
            this.totalEvidance = data.data.Total
        }
    }
</script>