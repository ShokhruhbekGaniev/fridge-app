export const GlobalMixin = {
    methods: {
        redirectHome() {
            this.$router.push({ name: 'Home' });
        },
        formatPrice(price) {
            return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
}