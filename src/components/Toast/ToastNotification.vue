<template>
    <li class="notification" :class="{show: visible}">
        <div class="notification-head">
            <div class="column" v-if="type === 'success'">
                <i class="fas fa-solid fa-circle-check fa-xl" style="color:var(--sidebar-item-active)" />
                <span>Успешно!</span>
            </div>
            <div class="column" v-else>
                <i class="fas fa-solid fa-circle-xmark fa-xl" style="color:#ff4040" />
                <span>Ошибка</span>
            </div>
            <div class="close-icon" @click="killToast">
                <i class="fas fa-solid fa-xmark" />
            </div>
        </div>
        <div class="notification-message">
            <slot />
        </div>
      </li>
</template>

<script>

export default {
    props: {
        type: String
    },
    data() {
    return {
      visible: false
    }
    },
    mounted() {
    this.visible = true
    setTimeout(() => {
      this.visible = false
      this.$emit('close')
    }, 3000)
    },
    methods: {
        killToast() {
            this.$emit('close')
        }
    }
}
</script>

<style>

.notification {
    position: relative;
    right: 20px;
    width: 400px;
    border-radius: 8px;
    box-shadow: 0px 7px 8px 2px rgba(34, 60, 80, 0.2);
    padding: 25px;
    margin-bottom: 10px;
    background: var(--sidebar-bg-color); 
    top: 1rem;
    list-style: none;
}
.notification + .notification {
  top: 1rem;
}
.notification-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.notification-message {
    padding-left: 35px;
    margin-top: 10px;
}

.column span {
    margin-left: 12px;
}

.close-icon {
    color: #aeb0d7;
    cursor: pointer;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.close-icon:hover {
    color: black;
    background: #eaeaea;
}

.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}


.list-leave-active {
  position: absolute;
}
</style>