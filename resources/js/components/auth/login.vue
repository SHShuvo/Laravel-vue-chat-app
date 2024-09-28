<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
        <div class="col-md-4">
            <div class="card">
            <div class="card-header text-center">
                <h4>Login</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="handleLogin">
                    <div class="form-group mb-3">
                        <label for="email">Email</label>
                        <input
                        v-model="form.email"
                        type="email"
                        id="email"
                        class="form-control"
                        placeholder="Enter your email"
                        required
                        />
                    </div>

                    <div class="form-group mb-3">
                        <label for="password">Password</label>
                        <input
                        v-model="form.password"
                        type="password"
                        id="password"
                        class="form-control"
                        placeholder="Enter your password"
                        required
                        />
                    </div>

                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
            <div v-if="error" class="card-footer text-danger text-center">
                {{ error }}
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../store/useAuthStore';
import router from '../../router/router';
const {login} = useAuthStore();

const form = reactive({
    email:null,
    password:null
});
const error = ref(null);

const handleLogin = ()=>{
    login(form).then(()=>{
        router.push({ name: 'dashboard' });
    })
    .catch((e)=>{

    });
}

</script>

<style scoped>
.card-header h4 {
    margin: 0;
}
</style>
  