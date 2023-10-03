<template>
    <div class="w-full md:w-2/3 h-full flex justify-start flex-col page-view-product">
        <div class="font-bold cursor-pointer" @click="redirectHome()">&lt; Вернуться к холодильнику</div>
        <img :src="product.image || '/public/default.jpg'" alt="Image" />
        <div class="mt-2">ID: {{ product.id }}</div>
        <div class="mt-2">Название: {{ product.name }}</div>
        <div class="mt-2">Цена: {{ formatPrice(product.price) }}</div>
        <div class="mt-2">Кол-во: {{ product.quantity }}</div>
        <div class="mt-2">Дата просрочки: {{ product.expire_date }}</div>
    </div>
</template>
<script>
    import { APIRequest } from '../../helper';
    
    export default {
        data() {
            return {
                product: {},
            }
        },
        async mounted() {
            this.product = await APIRequest(`http://localhost:3000/products/${this.$route.params.id}`);
        }
    };
</script>