<template>
    <div class="backdrop">
        <div class="confirmModal">
            <div class="confirmModal-head">
                <i class="fa-solid fa-circle-exclamation fa-xl" style="color:#ffd60a"/><h3>Вы точно хотите удалить?</h3>
            </div>
            <div class="confirmModal-body">
                <button @click="closeConfirmModal">Отмена</button>
                <button @click="confirmationClick">Да</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeConfirmModal() {
            this.$emit('closeConfirmModal')
        },
        confirmationClick() {
            this.$emit('confirmationClick')
        },
    }
}
</script>

<style>
.confirmModal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: var(--sidebar-bg-color);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap:10px
}
.confirmModal-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
}

.confirmModal-body {
    display: flex;
    justify-content: flex-end;
    gap:8px
}
.confirmModal-body button {
    padding:8px 14px;
    border-radius: 8px;
    border: 1px solid var(--sidebar-item-hover);
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item)
}
</style>