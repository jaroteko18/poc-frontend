<template>
  <div class="w-full">
    <div>
      <div class="card min-w-[800px]">
        <h1>Selamat datang</h1>
        <p mt-5>Silahkan pilih profile anda sebagai pengguna:</p>
        <div class="mt-5 flex flex-col gap-2">
          <div class="flex gap-5">
            <HomeButton label="Guest" @click="openModal('guest','Guest','/customer')" />
            <HomeButton label="Data Entry" @click="openModal('dataentry','Data Entry','/customer')" />
            <HomeButton label="Admin"  @click="openModal('admin','Admin','/customer')" />
          </div>
        </div>
      </div>
    </div>

    <s-modal
			title=""
			class="p-4"
			:display="false"
			ref="generateModal"
			hideButtons
			@submit="closeModal"
		>
			<h1 v-if="data.appToken == ''" class="my-5">Apakah anda ingin login menjadi {{ data.userID }} ?</h1>
			<h1 v-else class="my-5">Token : </h1>
      <div class="mt-5 w-[800px] mb-5">
        <div class="break-words">{{ data.appToken }}</div>
      </div>

      <div v-if="data.appToken == ''" class="flex gap-5">
        <s-button
          class="w-full btn_success text-center w-[200px]"
          label="Batal"
          @click="closeModal()"
        ></s-button>
        <s-button
          class="w-full btn_success text-center w-[200px]"
          label="Login"
          @click="goto()"
        ></s-button>
      </div>
      <div v-else class="flex gap-5">
        <s-button
          class="w-full btn_success text-center"
          label="Lanjut ke Halaman Customer"
          @click="goCustomer()"
        ></s-button>
      </div>
		</s-modal>
  </div>
</template>

<script setup>
import { layoutStore } from '@/stores/layout';
import { authStore } from '@/stores/auth';
import { reactive, onMounted, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import HomeButton from '@/views/widget/HomeButton.vue'
import { SInput, SModal, SButton } from "suimjs";

const layout = layoutStore();
layout.change('evs');

const auth = authStore();
const data = reactive({
  apps: [],
  token: "",
  userID: "",
  path: "",
  appToken: "",
})
const axios = inject('axios');
const router = useRouter();

const generateModal = ref(SModal);

async function doLogin(role){
    var email = role+'@'+role+'.com'
    axios.post('/api/login', {
      email: email,
      password: '12345678'
    })
    .then(function (r) {
      auth.set({
        appToken: r.data.access_token,
        appData: {
          userID: role,
          DisplayName:role,
          TenantName:''
        }
      });

      data.appToken = r.data.access_token;
    })
    .catch(function (e) {
      console.log(e);
    });
    
    // const fd = new FormData();
    // fd.append('email', role+'@'+role+'.com');
    // fd.append('password', '12345678');
    // await axios.post({
    //   method: "post",
    //   url: "/api/login",
    //   data: fd,
    //   headers: {
    //     'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    // },
    // }).then(function (r) {
    //   //handle success
    //   console.log(r);
    // })
    // .catch(function (r) {
    //   //handle error
    //   console.log(r);
    // });

    // auth.set({
    //   appToken: token,
    //   appData: {
    //     userID: userID
    //   }
    // });
    
}
async function goto() {
  await doLogin(data.token)
}

function goCustomer() {
  if (data.path!='') router.push(data.path);
}

function closeModal() {
	generateModal.value.hide();
}
function openModal(token, userID, path) {
  data.userID = userID;
  data.token = token;
  data.path = path;
	generateModal.value.show();
}

onMounted(() => {
  // console.log(auth.appToken !== '')
  if(auth.appToken !== '') {
    router.push('/customer')
  }
})

//const basePath = import.meta.env.VITE_BASE_PATH;
</script>
