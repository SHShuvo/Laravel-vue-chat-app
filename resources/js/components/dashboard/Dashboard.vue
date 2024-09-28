<template>
    <div>
        <div class="row mx-0">
            <div class="col-md-12" style="height: 2px; background-color: #0dcaf0;"></div>
        </div>
        <div>
            <h4 class="fw-bold text-info">Dashboard</h4>
            <div class="chat-bar">
                <div class="d-flex justify-content-between p-3 pb-1" style="color:#606770; font-size: 18px;">
                    <div>Contacts</div>
                    <div style="cursor: pointer;">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div class="chat-contact-list">
                    <div class="chat-contact" v-for="(fr, index) in friends" :key="'fr'+index">
                        <img src="https://via.placeholder.com/40" alt="Profile">
                        <span class="chat-contact-name">{{ fr.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    let friends = ref([]);
    const loadUsers = async ()=>{
        const res = await axios.get('/users');
        friends.value = res.data;
    }
    onMounted(()=>{
        loadUsers();
    });
</script>
