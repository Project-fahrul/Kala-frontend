import axios from "axios";
import VueCookies  from "vue-cookies";
import storage from "./storage";


const instance = axios.create({
    // baseURL: "http://103.63.25.154:8080",
    baseURL: "http://localhost:8080"
,    timeout: 2000,
    headers:{
        'Content-Type': 'application/json'
    }
})

export {instance}

const api = {
    verifiedUser: async (id, action) => {
        let token = await VueCookies.get("token")
        if(!token || token == null){
            return false
        }
        let res = {
            status : true
        }
        await instance.get(`user/verified/${id}/${action}`, {
            headers: {
                "Authorization": token
            }
        }).catch(()=>{
            res.status =  false
        })
        return res.status
    },
    changePassword: async (old, newPassword)=>{
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.patch(`/user/changePassword/self`,{
            "oldPassword": old,
            "newPassword": newPassword
        }, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    userNotVerified: async ()=>{
        let token = await VueCookies.get("token")
        if(!token || token == null){
            return false
        }
        let res = {
            status : true
        }
        let data = await instance.get("/user/sales-not-verified", {
            headers: {
                "Authorization": token
            }
        }).catch(()=>{
            res.status =  false
        })

        if(res.status){
           res.data = data.data.data 
        }
        return res
    },
    forgotPassword: async (email)=>{
        let data = {
            status: true
        };

         await instance.post("/user/forgot-password", {
            email: email,
        }).catch((err)=>{
            data.status = false
            data.message = err.response.data.message
        })

        return data  
    },
    login: async (email, password)=>{
        let data = {
            status: true
        };

        let response = await instance.post("/auth", {
            email: email,
            password: password
        }).catch((err)=>{
            if(err.response.status == 403){
                data.message = "Akun anda belum di verifikasi, hubungi admin yang telah diverifikasi"
                data.status = false
                console.log("sini");
                return
            }
            data.status = false
            data.message = err.response.data.message
        })

        if (data.status == false){
            return data
        }
        else if(response.data.data.role != "admin")
        {
            return {
                status: false,
                message: "Not allowed"
            }
        }

        await VueCookies.set("token", response.data.data.token)

        return data
    },
    logout: async ()=>{
        await VueCookies.remove("token")
    },
    registration: async (name, email, password, hp)=>{
        let res = {
            status: true
        };
        await instance.post("/user/registration", {
            email: email,
            password: password,
            name: name,
            phone: hp
        }).catch((e)=>{
            console.log(e.response.data);
            if(e.response.data.includes("duplicate key"))
            {
                res.message = "Email sudah terdaftar"
            }else{
                res.message = "Jaringan bermasalah"
            }
            res.status =  false
        })
        return res
    },
    me: async()=>{
        let token = await VueCookies.get("token")
        if(!token || token == null){
            return false
        }
        let res = true;
        let data = await instance.get("/me", {
            headers: {
                "Authorization": token
            }
        }).catch(()=>{
            res =  false
        })
        if(res)
            storage.userMe.setter(data.data.data.id, data.data.data.name, data.data.data.email)
        return res
    },
    async listCustomer(page){
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            return {
                status: false
            }
        }
        let customer = await instance.get(`/customer?page=${page}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res.status){
            res.data = customer.data.data
        }

        return res
    },
    async lihatCustomer(id){
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            return {
                status: false
            }
        }
        let customer = await instance.get(`/customer/${id}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res.status){
            res.data = customer.data.data
        }

        return res
    },
    async allSales(page){
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            return {
                status: false
            }
        }
        let customer = await instance.get(`/user/sales?page=${page}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res.status){
            res.data = customer.data.data
        }

        return res
    },
    async createCustomer(data){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.post(`/customer`,data, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    async editCustomer(id, data){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.patch(`/customer/${id}`,data, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    async deleteCustomer(id){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.delete(`/customer/${id}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    async deleteSales(id){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.delete(`/user/${id}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    async listAllSales(page){
        console.log(page);
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            return false
        }
        let data = await instance.delete(`/user/sales`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res){
            res.data = data.data
        }

        return res
    },
    async getSales(id){
        console.log(id)
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            res.status = false
            return res
        }
        let data = await instance.get(`/user/${id}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res){
            res.data = data.data.data
        }

        return res
    },
    async createSales(data){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.post(`/user`,data, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    async editSales(id, data){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.put(`/user/${id}`,data, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
    async listEvidance(page){
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            res.status = false
            return res
        }
        let data = await instance.get(`/evidance?page=${page}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res.status){
            res.data = data.data.data
        }

        return res
    },
    async getEvidance(sales, customer, due,type){
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            res.status = false
            return res
        }
        let dd = new Date(due).toISOString().split('T')[0]
        let data = await instance.get(`/evidance/${type}?sales=${sales}&customer=${customer}&due=${dd}`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res.status){
            res.data = data.data.data
        }

        return res
    },
    async count(){
        let token = await VueCookies.get("token")
        let res = {
            status: true
        }
        if(!token || token == null){
            res.status = false
            return res
        }
        let data = await instance.get(`/evidance/count`, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res.status = false
        })

        if(res.status){
            res.data = data.data.data
        }

        return res
    },
    async editMe(id,name, email){
        let token = await VueCookies.get("token")
        let res = true
        if(!token || token == null){
            return false
        }
        await instance.put(`/user/${id}`,{
            name: name,
            email: email
        }, {
            headers:{
                "Authorization": token
            }
        }).catch(()=>{
            res = false
        })

        return res
    },
}

export default api