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
      >
        <template v-slot:prepend>
          <q-icon name="account_circle" />
        </template>
      </q-input>

      <q-input
        class="password"
        v-model="loginForm.password"
        :type="passwordVisible ? 'password' : 'text'"
        label="您的密碼 *"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || '請輸入您的密碼']"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="passwordVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="passwordVisible = !passwordVisible"
          />
        </template>
      </q-input>
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
        <q-btn label="重置" type="reset" color="primary" flat />
        <q-btn label="登入" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { loginFormType } from '../type/type';
const router = useRouter();
const title = ref<string>('請先登入');
const loginForm = ref<loginFormType>({
  username: '',
  password: '',
  verification: '',
});
const username = ref<string>('');
const password = ref<string>('');
const accept = ref(false);

const passwordVisible = ref(true);

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
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const user = {
            id: res.data.id,
            username: res.data.username,
            token: res.data.token,
          };
          const userString = JSON.stringify(user);
          localStorage.setItem('User', userString);
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
};
const loginReset = () => {
  username.value = '';
  password.value = '';
  accept.value = false;
};
onMounted(() => {
  generateCode();
});
</script>
