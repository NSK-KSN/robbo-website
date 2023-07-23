<template>
  <div class="tab-wrapper">
    <div class="tab-nav">
      <span
        v-for="tab in names"
        :key="tab.name"
        :class="['tab-nav__item', {'selected': tab.name === selectedTab}]"
        @click="clickOnTab(tab.name)">{{tab.label}}
      </span>
    </div>
    <div class="tab-content">
      <slot/>
    </div>
  </div>
  </template>

<script setup>
const props = defineProps({
  names: {
    type: Array,
    required: true
  },
  selectedTab: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['changeTab'])

const clickOnTab = (tabName) => {
  emit('changeTab', tabName)
}
</script>

<style>
.tab-wrapper {
  min-width: 0%;
}

.tab-nav {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(98, 98, 98, 0.15);
}

.tab-nav__item {
    min-width: 0%;
    margin-right: 40px;
    padding-bottom: 20px;
    position: relative;
    border-bottom: 3px solid transparent;
    
    transition: 0.4s;

    font-size: 30px;
    font-weight: bold;
}

.tab-nav__item.selected {
    border-bottom-color: #00af41;
    transition: 0.4s ease-in-out;
  }

  .tab-content {
    width: 100%;
  }

  
</style>