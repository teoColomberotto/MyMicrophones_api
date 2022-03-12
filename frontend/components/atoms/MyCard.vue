<template>
    <div>
        <header>
            <slot name="header"></slot>
        </header>
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
    margin: 2rem auto;
    padding: 1rem;
    max-width: 40rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
header {
    padding-top: 0px;
    padding-bottom: 10px;
}
</style>
