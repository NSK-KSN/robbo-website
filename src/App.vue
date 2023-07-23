<template>
  <div class="main-body" :style="{'margin-left': sidebarWidth, 'width': mainBodyWidth, 'height': bodyHeight}" :class="mode">
    <router-view />
  </div>
  <Sidebar :mode="mode" @toggle="toggle" @sidebarCollapse="sideBarCollapse()"/>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar'
import { collapsed, sidebarWidth, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from './components/sidebar/state';

export default {
  components: {Sidebar},
  setup() {
    return {collapsed, sidebarWidth, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED}
  },
  data () {
    return {
      mode: JSON.parse(localStorage.getItem('mode')) || [],
      mainBodyWidth: `${window.innerWidth - SIDEBAR_WIDTH}px`,
      bodyHeight: window.innerHeight
    }
  },
  mounted()  {
      this.mainBodyWidth = window.innerWidth;
      this.bodyHeight = window.innerHeight;
    },
  created()  {
      window.addEventListener("resize", this.resizeHandler);
    },
    destroyed()  {
      window.removeEventListener("resize", this.resizeHandler);
    },
  methods: {
    toggle () {
      if (this.mode === "dark") {
        this.mode = "light"
        localStorage.setItem('mode', JSON.stringify(this.mode))

      } else {
        this.mode = "dark"
        localStorage.setItem('mode', JSON.stringify(this.mode))
      }
    },
    resizeHandler(e)  {
        if (window.innerWidth > 1000) {
          collapsed.value = false
          this.mainBodyWidth =  `${window.innerWidth - SIDEBAR_WIDTH}px`;
        }
        else {
          collapsed.value = true
          this.mainBodyWidth =  `${window.innerWidth - SIDEBAR_WIDTH_COLLAPSED}px`;
        }
      },
      sideBarCollapse() {
        collapsed.value = !collapsed.value;
        if (collapsed.value === true) {
            this.mainBodyWidth =  `${window.innerWidth - SIDEBAR_WIDTH_COLLAPSED}px`;
          }
          else {
            this.mainBodyWidth =  `${window.innerWidth - SIDEBAR_WIDTH}px`;
          }
      },
  },
  watch: {
    loggedIn(newVal) {
      this.loggedInn = newVal
    },
  },
}
</script>

<style>
.main-body{
 transition: 0.3s ease;
 position: absolute;
 background: #F6F5FF;
 color: #152028;
 padding: 24px 16px 0px;
}

a {
  text-decoration: none;
  color: blue;
}
a:hover {
  color: lightblue;
  transition: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

.dark {
  background: #18171E;
  color: #F3F3F3;
}
</style>
