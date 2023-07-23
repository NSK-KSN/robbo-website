<template>
    <router-link :to="to" class="link" :class="{active: isActive}">
        <span v-if="!collapsed">
            <i class="icon" :class="icon" />
            <slot />
        </span>
    </router-link>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collapsed } from './state'

export default {
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = useRoute()
        const isActive = computed(() => route.path === props.to)
        return {isActive, collapsed}
    }
}
</script>

<style>
.link {
    display: flex;
    align-items: center;
    

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 4px;
    padding-left: 18px;
    border-radius: 15px;
    height: 40px;

    color: var(--sidebar-item);
    text-decoration: none;
}

.link:hover {
    background-color: var(--sidebar-item-hover);
    transition: 0.3s ease;
    color: var(--sidebar-item);
}

.link:focus {
    background-color: var(--sidebar-item-active);
    transition: 0.3s ease;
    color: #fff;
}

.link .icon {
    flex-shrink: 0;
    width: 25px;
    margin-right: 0px;
}
</style>