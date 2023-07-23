<template>
    <div class="toggle-wrapper">
    <slot />
      <label class="toggle">
        <input 
          type="checkbox" 
          :checked="(mode === 'dark') ? 'checked' : false" 
          @change="$emit('toggle')"
        />
        <span class="toggler round"></span>
      </label>
    </div>
  </template>

<script>
export default {
    props: ['mode']
}
</script>

<style>
.toggle-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:6px;
}

.toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggler {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #a5a7a9;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.toggler:before{
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: #FFF;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .toggler {
    background: var(--sidebar-item-active);
}

input:focus + toggler {
    box-shadow: 0 0 2px var(--sidebar-item-active);
}

input:checked + .toggler:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.toggler.round {
    border-radius: 34px;
}

.toggler.round:before {
    border-radius: 50%;
}
</style>