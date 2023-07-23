<template>
    <button class="main-button">
        <slot />
    </button>
</template>

<script setup>

</script>

<style>
.main-button {
    background: var(--sidebar-item-active);
    color: white;
    min-height: 32px;
    padding: 1px 15px;
    border-radius: 12px;
    border: 1px solid var(--sidebar-item-active);
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0px 6px 0px -4px rgba(150, 150, 150, 0.3);
    margin-bottom: 8px;
}
.main-button:disabled {
    background: var(--button-dis-bg);
    cursor: not-allowed;
    color: var(--button-dis-content);
    border: 1px solid var(--button-dis-content);
    transition: 0.3s ease;
}

.main-button:focus {
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item-active);
    border: 1px solid var(--sidebar-item-active);
}

.main-button:disabled:hover {
    background: var(--button-dis-bg);
    cursor: not-allowed;
    color: var(--button-dis-content);
    border: 1px solid var(--button-dis-content);
}

.main-button:disabled:focus {
    transition: 0.3s ease;
}

.main-button:hover {
    transition: 0.3s ease;
    background: #2ac262;
}
</style>