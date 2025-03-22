<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="login_form_area">
    <div class="title">
      <b>{{ title }}</b>
    </div>
    <q-form @submit="loginSubmit" @reset="loginReset" class="q-form">
      <q-input
        v-model="loginForm.username"
        label="您的帳號 *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '請輸入您的帳號!']"
      />

      <q-input
        type="password"
        v-model="loginForm.password"
        label="您的密碼 *"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || '請輸入您的密碼']"
      />

      <div class="verification">
        <q-input
          type="text"
          v-model="loginForm.verification"
          label="驗證碼 *"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '請輸入驗證碼']"
        />
        <div class="codeBox">{{ code_box }}</div>
        <span @click="showCode" class="material-icons"> autorenew </span>
      </div>

      <div class="btn_group">
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="登入" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
//, computed
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { loginFormType } from '../type/type';
const router = useRouter();
const $q = useQuasar();
const title = ref<string>('請先登入');
const loginForm = ref<loginFormType>({
  username: '',
  password: '',
  verification: '',
});
const username = ref<string>('');
const password = ref<string>('');
const accept = ref(false);
/*
const checkLoginForms = computed(() => {
  if (
    loginForm.value.username == '' ||
    loginForm.value.password == '' ||
    loginForm.value.verification == ''
  ) {
    return true;
  } else if (
    loginForm.value.username != '' &&
    loginForm.value.password != '' &&
    loginForm.value.verification != ''
  ) {
    // $q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   message: 'Submitted',
    // });
    return true;
  } else {
    // $q.notify({
    //   color: 'red-5',
    //   textColor: 'white',
    //   icon: 'warning',
    //   message: 'You need to accept the license and terms first',
    // });
    return false;
  }
});
*/
// 驗證碼產生
const code_box = ref<string>('');
// 產生驗證碼
const generateCode = (length = 6) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code_box.value = code;
};
// 點擊獲得新的驗證碼
const showCode = () => {
  generateCode();
};
// 登入
const loginSubmit = () => {
  try {
    const api = `${process.env.DEFAULT_API}/test/auth/login`;
    // const headers = {
    //   'content-type': 'application/json',
    // };
    const query = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };
    axios
      .post(api, query)
      .then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          const user = {
            id: res.data.id,
            usernam: res.data.username,
            token: res.data.token,
          };
          const userString = JSON.stringify(user);
          localStorage.setItem('User', userString);
          console.log(user);
          void router.push({ path: `/admin/index` });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  } catch (err: never | unknown | null) {
    console.log(err);
  }
  // } else {
  //   console.log('驗證錯誤');
  // }
};
const loginReset = () => {
  username.value = '';
  password.value = '';
  accept.value = false;
};
onMounted(() => {
  generateCode();
  console.log($q);
  // $q.notify({
  //   // color: 'green-4',
  //   // textColor: 'white',
  //   // icon: 'cloud_done',
  //   // message: 'Submitted',
  // });
});
</script>
