<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-light" style="background-color: #e3f2fd;">
            <div class="container">
                <a class="navbar-brand" href="#">Chat App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <template v-if="authenticated">
                            <li class="nav-item">
                                <a href="#" class="nav-link">{{ user.name }}</a>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'dashboard'}" class="nav-link">Dashboard</router-link>
                            </li>
                            <li class="nav-item">
                                <a role="button" @click.prevent="handleLogout" class="nav-link">Logout</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item">
                                <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/useAuthStore';
import router from '../../router/router';
const {logout} = useAuthStore();

const {authenticated, getUser:user} = storeToRefs(useAuthStore());

const handleLogout = ()=>{
    logout().then(()=>{
        router.push({ name: 'home' });
    }).catch((e)=>{
    });
}
</script>


