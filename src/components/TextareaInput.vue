<template>
    <textarea
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
    default: "",
}
})
</script>

<style scoped>
textarea {
    padding: 8px 12px;
    font-size: 16px;
    margin-bottom: 12px;
    border-radius: 10px;
    border: 1px solid gray;
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item);
}

textarea:hover {
    border: 1px solid green;
}

textarea:focus {
    border: 1px solid green;
    box-shadow: 0px 0px 3px 2px green;
}
</style>