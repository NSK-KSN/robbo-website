<template>
  <div v-if="loggedIn === true">
    <div class="sidebar" :style="{width: sidebarWidth}" :class="mode">
      <span class="logo" v-if="!collapsed">LOGO</span>
      <div class="divider"></div>
      <SidebarLink to="/projects" icon="fa-regular fa-chart-bar fa-rotate-90">Проекты</SidebarLink>
      <div class="divider"></div>
      <SidebarLink to="/profile" icon="fas fa-regular fa-user">Профиль</SidebarLink>
      <SidebarLink to="/login" icon="fa-solid fa-arrow-right-from-bracket" @click="logOut(); toggleLoggedIn()">Выйти</SidebarLink>
      <div v-if="!collapsed" class="toggle-item">
        <Toggle :mode="mode" @toggle="$emit('toggle')">Тема </Toggle>
      </div>
    </div>
    <div class="collapse-icon"
      :style="{left:sidebarWidth}"
      @click="toggleSidebar">
      <i class="fas fa-solid fa-bars" />
    </div>
  </div>
  <div v-else>
    <div class="sidebar" :style="{width: sidebarWidth}" :class="mode">
      <span class="logo" v-if="!collapsed">LOGO</span>
      <div class="divider"></div>
      <SidebarLink to="/" icon="fas fa-solid fa-house">Главная</SidebarLink>
      <div class="divider"></div>
      <SidebarLink to="/login" icon="fas fa-solid fa-user">Войти</SidebarLink>
      <div v-if="!collapsed" class="toggle-item">
        <Toggle :mode="mode" @toggle="$emit('toggle')">Тема </Toggle>
      </div>
    </div>
    <div class="collapse-icon"
      :style="{left:sidebarWidth}"
      @click="toggleSidebar">
      <i class="fas fa-solid fa-bars" />
    </div>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import {collapsed, sidebarWidth} from './state'
import {toggleLoggedIn, loggedIn} from '../Login/logged.js'
import Toggle from '../Toggle'

export default {
    props:  ['mode'],
    data() {
      return {
        width: 0,
        loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || [],
      };
    },
    methods:  {
      logOut () {
        localStorage.setItem('loggedIn', JSON.stringify(false))
      },
      toggleSidebar() {
            this.$emit('sidebarCollapse')
        }
    },
    components: {SidebarLink, Toggle},
    setup() {
        return {collapsed, sidebarWidth, loggedIn, toggleLoggedIn}
    },
    watch: {
    loggedIn(newVal) {
      this.loggedIn = newVal
    },
  },
}
</script>

<style>
:root {
  --sidebar-bg-color: #fff;
  --sidebar-item-hover: #c4c4c4;
  --sidebar-item-active: #00af41;
  --sidebar-item: black;
  --button-dis-bg: #eaeaea;
  --button-dis-content: #b5b5b5;
}

.dark {
  --sidebar-bg-color: #26282b;
  --sidebar-item-hover: #445563;
  --sidebar-item-active: #00af41;
  --sidebar-item: #fff;
  --button-dis-bg: #26282b;
  --button-dis-content: rgba(196, 196, 196, 0.273);
}
</style>

<style scoped>
.sidebar {
    
    background-color: var(--sidebar-bg-color);
    
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
    
}

.collapse-icon {
  background: #1a0d45;
  color: #fff;
  position:absolute;
  margin: 70px 0;
  transition: 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 30% 30% 0;
}

@media screen and (min-width: 1000px){ 
  .collapse-icon{
    display:none;
  }
}

.divider {
  height: 0.8px;
  background: #686868;
  opacity: 0.15;
  margin: 12px 0px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  width: 63px;
  height: 41px;
  background-color: var(--sidebar-item-active);
  margin-left: auto;
  margin-right: auto;
  border-radius: 150px/100px;
}

.toggle-item {
  margin: 4px;
  padding-left: 10px;
}
</style>