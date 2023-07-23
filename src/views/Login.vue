<template>
    <div class="login-wrapper">
    <Tabs
      :names="tabs"
      :selectedTab="selectedTab"
      @changeTab="changeTab">
      <div v-if="selectedTab === 'Login'">
        <Login></Login>
      </div>
      <div v-if="selectedTab === 'Register'">
        <Registration></Registration>
      </div>
    </Tabs>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import Tabs from '@/components/Tabs.vue'

const tabs = [
  {name: 'Login', label: 'Вход'},
  {name: 'Register', label: 'Регистрация'},
]
const selectedTab = ref('Login')

const changeTab = (tabName) => {
  selectedTab.value = tabName
}
</script>

<script>
import Registration from "@/components/Login/Registration.vue";
import Login from "@/components/Login/Login.vue";

export default {
  components: {
    Registration, Login
  },
};
</script>

<style>
.login-wrapper {
    display: grid;
    padding:  5% 30%;
    height: 100vh;
}
</style>