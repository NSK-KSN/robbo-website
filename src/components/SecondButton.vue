<template>
    <button class="second-button">
        <slot />
    </button>
</template>

<script setup>

</script>

<style>
.second-button {
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item);
    min-height: 32px;
    padding: 1px 15px;
    border-radius: 12px;
    border: 1px solid var(--sidebar-item-hover);
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0px 6px 0px -4px rgba(150, 150, 150, 0.3);
    margin-bottom: 8px;
}
.second-button:disabled {
    background: var(--button-dis-bg);
    color: var(--button-dis-content);
    border: 1px solid var(--button-dis-content);
    transition: 0.3s ease;
}

.second-button:focus {
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item-active);
    border: 1px solid var(--sidebar-item-active);
}

.second-button:disabled:hover {
    background: var(--button-dis-bg);
    color: var(--button-dis-content);
    border: 1px solid var(--button-dis-content);
}

.second-button:disabled:focus {
    transition: 0.3s ease;
}

.second-button:hover {
    transition: 0.3s ease;
    background: var(--sidebar-item-hover);
}
</style>