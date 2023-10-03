<template>
    <router-view v-slot="{ Component }">
        <Component :is="Component" :key="$route.path" />
    </router-view>
</template>
<script>
    export default {};
</script>
