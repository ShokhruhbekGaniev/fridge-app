<template>
    <div class="component-product" :title="product.name">
        <div class="product-wrapper" @click.stop="viewProduct(product)">
            <div class="img" :style="{backgroundImage: 'url(' + product.image || '/default.jpg'  + ')'}" />
            <div class="flex items-center">
                <div class="flex flex-col mini-info-wrapper">
                    <span class="title">{{ product.name }}</span>
                    <span class="price">{{ formatPrice(product.price) }}</span>
                </div>
                <div class="edit-icon-container" @click.stop="editProduct(product)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M454.6 45.3l12.1 12.1c12.5 12.5 12.5 32.8 0 45.3L440 129.4 382.6 72l26.7-26.7c12.5-12.5 32.8-12.5 45.3 0zM189 265.6l171-171L417.4 152l-171 171c-4.2 4.2-9.6 7.2-15.4 8.6l-65.6 15.1L180.5 281c1.3-5.8 4.3-11.2 8.6-15.4zm197.7-243L166.4 243c-8.5 8.5-14.4 19.2-17.1 30.9l-20.9 90.6c-1.2 5.4 .4 11 4.3 14.9s9.5 5.5 14.9 4.3l90.6-20.9c11.7-2.7 22.4-8.6 30.9-17.1L489.4 125.3c25-25 25-65.5 0-90.5L477.3 22.6c-25-25-65.5-25-90.5 0zM80 64C35.8 64 0 99.8 0 144V432c0 44.2 35.8 80 80 80H368c44.2 0 80-35.8 80-80V304c0-8.8-7.2-16-16-16s-16 7.2-16 16V432c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48H208c8.8 0 16-7.2 16-16s-7.2-16-16-16H80z"/>
                    </svg>
                </div>
            </div>
            <button
                class="bg-button-blue hover:bg-button-blue text-white py-1 px-2 rounded-2xl mt-2 w-full"
                @click.stop="() => isOpen = true"
            >
                Информация
            </button>
            <button
                class="bg-button-grey hover:bg-button-grey text-delete-button py-1 px-2 rounded-2xl mt-2 font-bold w-full"
                @click.stop="deleteProduct(product)"
            >
                Удалить
            </button>
        </div>
        <div class="info " :class="{'active': isOpen}">
            <div class="w-full flex justify-end">
                <div class="times" @click.stop="() => isOpen = false">&#215;</div>
            </div>
            <span class="mt-2">ID: {{ product.id }}</span>
            <span class="mt-2">Название:<br>{{ product.name }}</span>
            <span class="mt-2">Цена: {{ formatPrice(product.price) }}</span>
            <span class="mt-2">Кол-во: {{ product.quantity }}</span>
            <span class="mt-2">Дата просрочки:<br>{{ product.expire_date }}</span>
        </div>
    </div>
</template>
<script>
    import {APIRequest} from '../helper.js';

    export default {
        props: {product: Object},
        emits: ['product-deleted'],
        data() {
            return {
                isOpen: false,
            }
        },
        methods: {
            viewProduct(product) {
                this.$router.push({name: 'ViewProduct', params: {id: product.id}});
            },
            editProduct(product) {
                this.$router.push({name: 'EditProduct', params: {id: product.id}});
            },
            async deleteProduct(product) {
                if (confirm('Вы точно хотите удалить этот продукт?')) {
                    await APIRequest(`http://localhost:3000/products/${product.id}`, 'DELETE');
                    this.$emit('product-deleted');
                }
            }
        }
    };
</script>