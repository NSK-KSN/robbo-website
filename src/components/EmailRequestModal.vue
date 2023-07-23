<template>
    <div class="backdrop">
        <div class="modal">
            <div class="modal-head">
                <h3>Восстановление доступа</h3>
                <div class="close-icon" @click="closeModal">
                    <i class="fas fa-solid fa-xmark" />
                </div>
            </div>
            <p>Введите ваш email, на который мы отправим Вам инструкцию для востановления доступа к аккаунту.</p>
            <div class="input-wrapper">
            <BaseInput placeholder="Email" v-model="email" @input="this.startEmailValidation=true"></BaseInput>
            <div class="invalid-input" v-if="!isValidEmail && this.startEmailValidation===true" >{{this.email === '' ? 'Пожалуйста, введите ваш email' : 'Пожалуйста, введите корректный email'}}</div>
        </div>
            <div>
                <Button type="submit" :disabled="!isFormValid">Отправить</Button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInput from './BaseInput.vue';
import Button from './Button.vue';

export default {
    components: {BaseInput, Button},
    data() {
        return {
            email: '',
            startEmailValidation: false,
        }
    },
    computed: {
    isFormValid() {
        const requiredFields = ['email'];
        return requiredFields.every(field => Boolean(this[field])) && this.isValidEmail;
      },
      isValidEmail() {
      return this.startEmailValidation ? /^[^@]+@\w+(\.\w+)+\w$/.test(this.email) : null;
    }
    },
    methods: {
        closeModal() {
            this.$emit('toggleModal')
        }
    }
}
</script>

<style>
.modal {
    width: 500px;
    padding: 20px;
    margin: 100px auto;
    background: var(--sidebar-bg-color);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap:10px
}
.backdrop {
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    z-index: 7;
}
.modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.scale-enter-active,
.scale-leave-active {
  transition: opacity 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
}
</style>