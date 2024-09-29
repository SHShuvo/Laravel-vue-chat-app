<template>
    <div>
        <div class="row mx-0">
            <div class="col-md-12" style="height: 2px; background-color: #a0e2ef;"></div>
        </div>
        <div>
            <div>

            </div>
            <div class="chat-bar">
                <div class="d-flex justify-content-between p-3 pb-1" style="color:#606770; font-size: 18px;">
                    <div>Contacts</div>
                    <div style="cursor: pointer;">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div class="chat-contact-list">
                    <div @click.prevent="loadChat(fr)" class="chat-contact" v-for="(fr, index) in friends" :key="'fr'+index">
                        <img src="https://via.placeholder.com/40" alt="Profile">
                        <span class="chat-contact-name">{{ fr.name }}</span>
                    </div>
                </div>
            </div>
            <div v-if="current_chat && show_chat_box" class="chat-box">
                <div class="chat-box-header">
                    <span>{{ current_chat.name }}</span>
                    <button type="button" class="btn-close btn-close-white" @click.prevent="show_chat_box = false"></button>
                </div>
                
                <div ref="messagesContainer" class="chat-box-body">
                    <!-- Receiver's message -->
                    <div v-for="(msg, index) in messages" :key="'msg'+index" class="message-bubble"
                        :class="user.id == msg.sender_id?'sender':'receiver'">
                        {{ msg.message }}
                    </div>
                </div>
                
                <div class="chat-box-footer">
                    <input @keydown.enter="sendMessage" v-model="current_msg" type="text" placeholder="Type a message..." />
                    <button @click.prevent="sendMessage">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch, nextTick } from 'vue';
    import { useAuthStore } from '../../store/useAuthStore';
    import { storeToRefs } from 'pinia';

    const {getUser:user} = storeToRefs(useAuthStore()); 

    const friends = ref([]);
    const messages = ref([]);
    const current_chat = ref(null);
    const current_msg = ref('');
    const messagesContainer = ref(null);
    const show_chat_box = ref(false);

    const audio = new Audio('/audio/chat.mp3');

    watch(messages, async ()=>{
        await nextTick();
        if(messagesContainer.value){
            messagesContainer.value.scrollTo({
                top:messagesContainer.value.scrollHeight,
                behavior: "smooth"
            });
        }
    }, {deep:true});

    const sendMessage = async ()=>{
        if (current_msg.value.trim() === '')return;
        try {
            const res = await axios.post('/send-message', {
                sender_id:user.value.id,
                recciver_id:current_chat.value.id,
                message:current_msg.value
            });

            if(res.status === 201){
                messages.value.push(res.data.message);
                current_msg.value = '';
            }
        } 
        catch (error) {
            
        }
    }

    const loadUsers = async ()=>{
        const res = await axios.get('/users');
        friends.value = res.data;
    }

    const loadChat = async (fr)=>{
        current_chat.value = fr;
        const res = await axios.get(`/messages/${fr.id}`);
        await (show_chat_box.value = true);
        messages.value = res.data;
    }
    const checkChatBox = (message)=>{        
        if(!show_chat_box.value || (current_chat.value.id !== message.sender_id)){
            const friend = friends.value.find((el)=> el.id === message.sender_id);
            loadChat(friend);
        }
    }

    const chatNotification = ()=>{
        if (!audio) {
            audio = new Audio('/audio/song.mp3'); // Create the audio object only on user interaction
        }
        audio.play()
        .catch(error => {});
    }

    onMounted(()=>{
        loadUsers();
        
        Echo.private(`chat.${user.value.id}`)
        .listen('MessageSent', (response)=>{
            messages.value.push(response.message);
            checkChatBox(response.message);
            chatNotification();
        })
    });
</script>
