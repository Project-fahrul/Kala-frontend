import { reactive } from "vue";

const userMe = reactive({
    name: "",
    email: "",
    id: 0,
    setter(id, name, email){
        this.name = name
        this.email = email
        this.id = id
    }
})

export default {
    userMe
}