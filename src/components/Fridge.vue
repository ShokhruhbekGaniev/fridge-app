<template>
    <div class="component-fridge">
        <div class="actions mb-2">
            <input class="
                bg-gray-50 border  border-button-grey text-gray-900 text-sm
                rounded-2xl focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500
                block w-full p-2.5" placeholder="Посик... "
               v-model="searchValue"
            >
            <div class="flex">
                <button
                    class="bg-button-green hover:bg-button-green text-white py-1 px-3 rounded-2xl mt-2"
                    @click="createProduct()"
                >
                    Добавить
                </button>
                <button
                    class="bg-black hover:bg-black text-white py-1 px-3 rounded-2xl mt-2 ml-3"
                    @click="deleteExpiredProduct()"
                    v-if="!anyExpiredProduct"
                >
                    Удалить все просроченные
                </button>
            </div>
        </div>
        <div class="products-container">
            <template v-if="searchProducts.length">
                <div class="product-container w-1/3  md:w-1/3" v-for="product in searchProducts" :key="product.id">
                    <Product
                        :class="{'expired': productIsExpired(product)}"
                        :product="product"
                        @product-deleted="refetchProducts"
                    />
                </div>
            </template>
            <template v-else-if="searchValue">
                Ничего не найдено
            </template>
            <template v-else>
                <div class="product-container w-1/2 md:w-1/3" v-for="product in products" :key="product.id">
                    <Product
                        :class="{'expired': productIsExpired(product)}"
                        :product="product"
                        @product-deleted="refetchProducts"
                    />
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import Product from './Product.vue';
    import {APIRequest} from '../helper.js'

    export default {
        components: {Product},
        data() {
            return {
                searchProducts: [],
                products: [],
                searchValue: null,
            }
        },
        computed: {
            anyExpiredProduct() {
                return !Boolean(this.products.filter(el => this.productIsExpired(el)).length);
            }
        },
        methods: {
            createProduct() {
                this.$router.push({name: 'CreateProduct'});
            },
            productIsExpired(product) {
                return (new Date()).getTime() > (new Date(product.expire_date)).getTime()
            },
            async refetchProducts() {
                this.products = await APIRequest('http://localhost:3000/products');
            },
            async deleteExpiredProduct() {
                if (confirm('Вы точно хотите удалить все просроченные продукты?')) {
                    let expired_ids = this.products.filter(el => this.productIsExpired(el)).map(el => el.id);
                    for (let i = 0; i < expired_ids.length; ++ i)
                        await APIRequest(`http://localhost:3000/products/${expired_ids[i]}`, 'DELETE')
                    await this.refetchProducts();
                }
            }
        },
        watch: {
            searchValue(value) {
                if (!value) {
                    this.searchProducts = [];
                    return;
                }
                this.searchProducts = this.products.filter(el => el.name.toLowerCase().includes(value.toLowerCase()));
            }
        },
        async mounted() {
            await this.refetchProducts();
        }
    };
</script>