<template>
        <input
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
        />
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
    },
})
</script>

<style scoped>
input {
    font-size: 16px;
    padding: 8px 12px;
    border: 0px;
    border-radius: 13px;
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid var(--button-dis-content);
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item);
}
input:focus {
    outline:none;
}

input:hover {
    border: 1px solid var(--sidebar-item-active);
    transition: 0.3s ease;
}

input:focus {
    border: 1px solid var(--sidebar-item-active);
    box-shadow: 0px 0px 3px 2px #00af4042;
    transition: 0.3s ease;
}

</style>