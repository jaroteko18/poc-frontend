<template>
  <div class="w-full">
    <div>
      <div class="card min-w-[800px]">
        <h1>Selamat datang</h1>
        <p mt-5>Silahkan pilih profile anda sebagai pengguna:</p>
        <div class="mt-5 flex flex-col gap-2">
          <div class="flex gap-5">
            <HomeButton label="Guest" @click="goto('guest','Guest','/customer')" />
            <HomeButton label="Data Entry" @click="goto('dataentry','Data Entry','/customer')" />
            <HomeButton label="Admin"  @click="goto('admin','Admin','/customer')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { layoutStore } from '@/stores/layout';
import { authStore } from '@/stores/auth';
import { reactive, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import HomeButton from '@/views/widget/HomeButton.vue'

const layout = layoutStore();
layout.change('evs');

const auth = authStore();
const data = reactive({
  apps: []
})
const axios = inject('axios');
const router = useRouter();

function goto(token, userID, path) {
  if (auth.appToken=="") {
    auth.set({
      appToken: token,
      appData: {
        userID: userID
      }
    });
  };

  if (path!='') router.push(path);
}

onMounted(() => {
})

//const basePath = import.meta.env.VITE_BASE_PATH;
</script>
