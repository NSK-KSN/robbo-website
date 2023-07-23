<template>
  <Transition name="scale">
      <div v-if="showModal">
        <EmailRequestModal @toggleModal="toggleModal"></EmailRequestModal>
      </div>
    </Transition>
    <form class="login-form">
      <div class="input-wrapper">
        <BaseInput placeholder="Email" v-model="email" id="email" @input="this.startEmailValidation=true"/>
        <div class="invalid-input" v-if="!isValidEmail && this.startEmailValidation===true" >{{this.email === '' ? 'Пожалуйста, введите ваш email' : 'Пожалуйста, введите корректный email'}}</div>
      </div>
      <div class="input-wrapper">
        <BaseInput placeholder="Пароль" v-model="password" type="password" @input="this.startPassValidation=true"/>
        <div class="invalid-input" v-if="this.password === '' && this.startPassValidation===true">Пожалуйста, введите ваш пароль</div>
      </div>
      <div>
          <Button type="submit" :disabled="!isFormValid" @click.prevent="loginUser">Войти</Button>
      </div>
      <div class="forgot-password">
        <span @click="toggleModal">Забыли пароль?</span>
      </div>
    </form>
</template>
  
<script>
import {toggleLoggedIn, loggedIn} from './logged.js'
import BaseInput from '../BaseInput.vue'
import Button from '../Button.vue';
import EmailRequestModal from "@/components/EmailRequestModal.vue"
import {ref} from 'vue'

export default {
    data() {
        return {
            email: "",
            password: "",
            loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || false,
            showModal: false,
            startEmailValidation: false,
        };
    },
    computed: {
    isFormValid() {
        const requiredFields = ['password', 'email'];
        return requiredFields.every(field => Boolean(this[field])) && this.isValidEmail;
      },
    isValidEmail() {
      return this.startEmailValidation ? /^[^@]+@\w+(\.\w+)+\w$/.test(this.email) : null;
    }
    },
    methods: {
        loginUser() {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.email === this.email && user.password === this.password);
            if (user) {
              localStorage.setItem('user', JSON.stringify(user))
              this.$router.push("profile");
              localStorage.setItem('loggedIn', JSON.stringify(true))
              toggleLoggedIn();
            }
            else {
                alert("Invalid email or password.");
            }
        },
        toggleModal() {
          this.showModal = !this.showModal
        }
    },
    components: { BaseInput, Button, EmailRequestModal },
}
</script>

<style>
.input-wrapper {
  height: 67px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.forgot-password {
  margin-top: 10px;
}
.forgot-password span {
  cursor: pointer;
}

.invalid-input {
  color:#ff4d4f;
  position:relative;
}
</style>