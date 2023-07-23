<template>
  <div class="profile-page">
    <div class="profile-info">
      <div class="profile-picture">
        <i class="fa-regular fa-user fa-9x" />
      </div>
      <form class="profile-form" @submit.prevent="showNotification()">
        <BaseInput placeholder="email" v-model="user.email" />
        <BaseInput placeholder="nickname" v-model="user.nickname" />
        <BaseInput placeholder="secondName" v-model="user.secondName" />
        <BaseInput placeholder="name" v-model="user.name" />
        <BaseInput placeholder="patronymic" v-model="user.patronymic" />
        <span>Роль: {{ role }}</span>
        <span>Создан: {{ createdDate }}</span>
        <span>Последнее обновление: {{ updatedDate }}</span>
        <Toggle @toggle="showNotification">Активен: </Toggle>
        <Button :style="{width:'100px'}" type="submit">Сохранить</Button>

      </form>
    </div>
    <div class="project-listing" v-if="showAdditionalContent">
      <Projects page="profile" />
    </div>
    
      <div class="notification-container">
        <TransitionGroup name="list" tag="ul">
      <ToastNotification type="error" v-for="(notification, index) in notifications" :key="index" @close="removeNotification(index)">
        {{ notification.message }}
      </ToastNotification>
    </TransitionGroup>
    </div>
  
  </div>    
</template>

<script>
import BaseInput from '../components/BaseInput.vue';
import Button from '@/components/Button.vue';
import Toggle from '@/components/Toggle.vue';
import ToastNotification from '@/components/Toast/ToastNotification.vue';
import {showToast, triggerToast, duplicateCount, totalCount} from '@/components/Toast/toast.js';
import Projects from './Projects.vue';


export default {
  data() {
    return {
      user: {name: "", email: "", secondName: "", patronymic: "", nickname: ""},
      role: "Student",
      createdDate: "2023-07-05 15:02:17",
      updatedDate: "2023-07-05 15:12:24",
      showAdditionalContent: false,
      notifications: []
    }
  },
  components: { BaseInput, Button, Toggle, ToastNotification, Projects },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const showAdditionalContent = this.$route.query.showAdditionalContent;
    this.showAdditionalContent = showAdditionalContent === 'true';
  },
  setup() {
    return { showToast, triggerToast, duplicateCount, totalCount }
  },
  methods: {
  showNotification() {
    this.notifications.push({ message: 'Access Denied'})
  },
  removeNotification(index) {
    this.notifications.splice(index, 1)
  }
  },
  watch: {
    loggedIn(newVal) {
      this.loggedInn = newVal
    },
  },
}
</script>

<style>
.profile-page {
  display:flex;
  flex-direction: row;
  gap: 100px;
}

.profile-info {
  width: 350px;
  display: flex;
  flex-direction: column;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 16px
}

.profile-picture {
    background: rgb(198, 198, 198);
    color: #fff;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}

.project-listing {
  width: 800px
}

.notification-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

</style>