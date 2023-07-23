<template>
    <div>
      <form class="register-form" @submit.prevent="registerUser">
        <div class="input-wrapper">
          <BaseInput placeholder="Email" v-model="email" @input="this.startEmailValidation=true"/>
          <div class="invalid-input" v-if="!isValidEmail && this.startEmailValidation===true">{{this.email === '' ? 'Пожалуйста, введите ваш email' : 'Пожалуйста, введите корректный email'}}</div>
        </div>
        <div class="input-wrapper">
          <BaseInput placeholder="Пароль" v-model="password" type="password" @input="this.startPassValidation=true"/>
          <div class="invalid-input" v-if="password.length < 8 && this.startPassValidation===true">{{this.password === '' ? 'Пожалуйста, введите ваш пароль' : 'Пароль должен содержать не меньше 8 символов'}}</div>
        </div>
        <div class="input-wrapper">
          <BaseInput placeholder="Повторите пароль" v-model="confirmPassword" type="password" @input="this.startCPassValidation=true"/>
          <div class="invalid-input" v-if="!isPasswordConfirmed && this.startCPassValidation===true">{{this.confirmPassword === '' ? 'Пожалуйста, повторите пароль' : 'Пароли не совпадают!'}}</div>
        </div>
        <div class="input-wrapper">
          <BaseInput placeholder="Фамилия" v-model="secondName" @input="this.startSNameValidation=true"/>
          <div class="invalid-input" v-if="this.secondName === '' && this.startSNameValidation===true">Пожалуйста, введите вашу Фамилию</div>
        </div>
        <div class="input-wrapper">
          <BaseInput placeholder="Имя" v-model="name" @input="this.startNameValidation=true"/>
          <div class="invalid-input" v-if="this.name === '' && this.startNameValidation===true">Пожалуйста, введите ваше Имя</div>
        </div>
        <div class="input-wrapper">
          <BaseInput placeholder="Отчество" v-model="patronymic"/>
        </div>
        <div class="input-wrapper">
          <BaseInput placeholder="Никнейм" v-model="nickname" @input="this.startNicknameValidation=true"/>
          <div class="invalid-input" v-if="this.nickname === '' && this.startNicknameValidation===true">Пожалуйста, введите ваш никнейм</div>
        </div>
        <div class="input-wrapper">
          <input type="checkbox" v-model="userAgreement" @click="this.startUserAgreementValidation=true"><span> Я прочитал условия <RouterLink to="/">пользователького соглашения</RouterLink></span>
          <div class="invalid-input" v-if="this.userAgreement === false && this.startUserAgreementValidation===true">Ознакомьтесь с пользовательким соглашением!</div>
        </div>
        <div>
          <Button type="submit" :disabled="!isFormValid">Зарегистрироваться</Button>
        </div>
      </form>
    </div>
  </template>

<script>
import BaseInput from '../BaseInput.vue'
import Button from '../Button.vue'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      secondName: '',
      patronymic: '',
      nickname: '',
      userAgreement: false,
      startEmailValidation: false,
      startCPassValidation: false,
    }
  },
  computed: {
    isFormValid() {
        const requiredFields = ['email', 'password', 'secondName', 'name', 'patronymic', 'nickname'];
        return requiredFields.every(field => Boolean(this[field])) && this.isUserAgreementChecked && this.isValidEmail && this.isPasswordConfirmed && this.password.length >= 8;
      },
      isUserAgreementChecked() {
      return this.userAgreement;
    },
    isValidEmail() {
      return this.startEmailValidation ? /^[^@]+@\w+(\.\w+)+\w$/.test(this.email) : null;
    },
    isPasswordConfirmed() {
      return this.startCPassValidation ? this.password == this.confirmPassword : null;
    }
    },
  components: { BaseInput, Button },
  methods: {
    registerUser() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        secondName: this.secondName,
        patronymic: this.patronymic,
        nickname: this.nickname,
      }

      const users = JSON.parse(localStorage.getItem('users')) || []
      users.push(userData)
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}
</script>

<style>
.register-form {
  display: flex;
  flex-direction: column;
}
</style>