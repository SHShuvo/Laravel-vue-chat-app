<template>
    <div>
        <header style="margin-top: -1.48rem">
            <navbar></navbar>
        </header>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import Navbar from './home/Navbar.vue';
</script>
