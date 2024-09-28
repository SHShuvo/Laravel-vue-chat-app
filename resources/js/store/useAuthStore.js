import { defineStore } from "pinia";
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters:{
        authenticated(){
            return (!! this.user);
        },
        getUser(){
            return this.user;
        }
    },
    actions: {
        setUser(user){
            this.user = user;
        },
        async login(form) {
            try {
                await axios.get('/sanctum/csrf-cookie');

                await axios.post('/login', form);

                const res = await this.attempt();
                return res;
            } 
            catch (e) {
                console.log(error);
                throw e;
            }
        },
        async attempt() {
            try {
                let res = await axios.get('/api/user');
                this.setUser(res.data);
                return res;
            } 
            catch (error) {
                
            }
        },
        async logout(){
            try {
                let res = await axios.post('/logout');
                this.setUser(null);
                return res;
            } 
            catch (error) {
                this.setUser(null);
            }
        }
    },
})