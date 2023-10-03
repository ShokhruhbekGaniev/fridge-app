<template>
    <div class="w-full md:w-2/3 h-full flex justify-start flex-col page-edit-product">
        <div class="font-bold cursor-pointer" @click="redirectHome()">&lt; Вернуться к холодильнику</div>
        <div class="mt-2 flex items-center">
            <label class="mr-3">Название:</label>
            <input class="
                bg-gray-50 border  border-button-grey text-gray-900 text-sm
                rounded-2xl focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500
                block p-2.5" placeholder="Название" v-model="product.name" />
        </div>
        <div class="mt-2">
            <label class="mr-3">Изображение:</label>
            <img class="mt-3" :src="product.image" alt="Предпросмотр изображения" />
            <input class="
            bg-gray-50 border  border-button-grey text-gray-900 text-sm
            rounded-2xl focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500
            block p-2.5" placeholder="Изображение" v-model="product.image" />
        </div>
        <div class="mt-2 flex items-center">
            <label class="mr-3">Цена:</label>
            <input class="
            bg-gray-50 border  border-button-grey text-gray-900 text-sm
            rounded-2xl focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500
            block p-2.5" placeholder="Цена" v-model="product.price" />
        </div>
        <div class="mt-2 flex items-center">
            <label class="mr-3">Кол-во:</label>
            <input class="
            bg-gray-50 border  border-button-grey text-gray-900 text-sm
            rounded-2xl focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500
            block p-2.5" placeholder="Кол-во" v-model="product.quantity" />
        </div>
        <div class="mt-2 flex items-center">
            <label class="mr-3">Дата просрочки:</label>
            <input class="
            bg-gray-50 border  border-button-grey text-gray-900 text-sm
            rounded-2xl focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500
            block p-2.5" placeholder="Дата просрочки" v-model="product.expire_date" />
        </div>
        <div class="mt-3">
            <button
            class="bg-button-blue hover:bg-button-blue text-white py-3 px-3 rounded-2xl"
            @click="submit()"
        >
            Создать
        </button>
        </div>
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
        methods: {
            async submit() {
                this.product.created_at = (new Date()).toISOString();
                this.product.updated_at = (new Date()).toISOString();
                if (confirm('Вы действительно хотите создать продукт?')) {
                    await APIRequest(`http://localhost:3000/products`, 'POST', this.product);
                    this.redirectHome();
                }
            }
        }
    };
</script>