<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import HeroBanner from '@/components/storefront/HeroBanner.vue';
import CategorySection from '@/components/storefront/CategorySection.vue';
import ProductSection from '@/components/storefront/ProductSection.vue';

const categories = [
    {
        name: 'Electronics',
        slug: 'electronics',
        productCount: 156,
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
    },
    {
        name: 'Fashion',
        slug: 'fashion',
        productCount: 243,
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
    },
    {
        name: 'Home & Garden',
        slug: 'home-garden',
        productCount: 89,
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80',
    },
    {
        name: 'Sports',
        slug: 'sports',
        productCount: 67,
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba48bda5?w=400&q=80',
    },
    {
        name: 'Beauty',
        slug: 'beauty',
        productCount: 134,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    },
    {
        name: 'Books',
        slug: 'books',
        productCount: 312,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
    },
    {
        name: 'Toys',
        slug: 'toys',
        productCount: 78,
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80',
    },
    {
        name: 'Jewelry',
        slug: 'jewelry',
        productCount: 45,
        image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c2?w=400&q=80',
    },
];

const bestSellers = [
    {
        name: 'Wireless Bluetooth Headphones Pro',
        slug: 'wireless-bluetooth-headphones-pro',
        price: 129.99,
        discountPrice: 89.99,
        gradient: 'from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40',
    },
    {
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-tshirt',
        price: 49.99,
        discountPrice: 34.99,
        gradient: 'from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40',
    },
    {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        price: 299.99,
        discountPrice: null,
        gradient: 'from-slate-100 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/40',
    },
    {
        name: 'Organic Green Tea Collection',
        slug: 'organic-green-tea-collection',
        price: 24.99,
        discountPrice: 19.99,
        gradient: 'from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40',
    },
    {
        name: 'Running Shoes Ultra Comfort',
        slug: 'running-shoes-ultra-comfort',
        price: 159.99,
        discountPrice: 119.99,
        gradient: 'from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40',
    },
    {
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        price: 89.99,
        discountPrice: null,
        gradient: 'from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40',
    },
    {
        name: 'Stainless Steel Water Bottle',
        slug: 'stainless-steel-water-bottle',
        price: 34.99,
        discountPrice: 24.99,
        gradient: 'from-cyan-100 to-sky-100 dark:from-cyan-900/40 dark:to-sky-900/40',
    },
    {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        price: 79.99,
        discountPrice: 59.99,
        gradient: 'from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40',
    },
];

const newArrivals = [
    {
        name: 'Minimalist Desk Lamp LED',
        slug: 'minimalist-desk-lamp-led',
        price: 69.99,
        discountPrice: null,
        gradient: 'from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40',
    },
    {
        name: 'Silk Scarf Floral Print',
        slug: 'silk-scarf-floral-print',
        price: 59.99,
        discountPrice: 44.99,
        gradient: 'from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40',
    },
    {
        name: 'Ceramic Plant Pot Set',
        slug: 'ceramic-plant-pot-set',
        price: 45.99,
        discountPrice: null,
        gradient: 'from-teal-100 to-green-100 dark:from-teal-900/40 dark:to-green-900/40',
    },
    {
        name: 'Noise Cancelling Earbuds',
        slug: 'noise-cancelling-earbuds',
        price: 199.99,
        discountPrice: 149.99,
        gradient: 'from-gray-100 to-slate-100 dark:from-gray-900/40 dark:to-slate-900/40',
    },
    {
        name: 'Yoga Mat Premium Non-Slip',
        slug: 'yoga-mat-premium-non-slip',
        price: 39.99,
        discountPrice: 29.99,
        stockStatus: 'in_stock' as const,
        gradient: 'from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40',
    },
    {
        name: 'Bamboo Cutting Board Set',
        slug: 'bamboo-cutting-board-set',
        price: 54.99,
        discountPrice: null,
        gradient: 'from-lime-100 to-green-100 dark:from-lime-900/40 dark:to-green-900/40',
    },
    {
        name: 'Vintage Canvas Backpack',
        slug: 'vintage-canvas-backpack',
        price: 79.99,
        discountPrice: 64.99,
        gradient: 'from-stone-100 to-amber-100 dark:from-stone-900/40 dark:to-amber-900/40',
    },
    {
        name: 'Aroma Diffuser & Essential Oil Set',
        slug: 'aroma-diffuser-essential-oil-set',
        price: 49.99,
        discountPrice: null,
        stockStatus: 'out_of_stock' as const,
        gradient: 'from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
    },
];
</script>

<template>
    <Head title="Home" />

    <HeroBanner />

    <CategorySection :categories="categories" />

    <div class="border-t">
        <ProductSection
            title="Best Sellers"
            subtitle="Our most popular products loved by customers"
            :products="bestSellers"
            view-all-href="/shop?section=best_sellers"
        />
    </div>

    <div class="bg-muted/30">
        <ProductSection
            title="New Arrivals"
            subtitle="Fresh picks just added to our collection"
            :products="newArrivals"
            view-all-href="/shop?section=new_arrivals"
        />
    </div>

    <!-- Promo Banner -->
    <section class="py-12 lg:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-8 py-12 text-center sm:px-16 sm:py-16"
            >
                <div class="absolute inset-0 opacity-10" aria-hidden="true">
                    <div class="absolute -top-20 -left-20 size-60 rounded-full bg-white blur-3xl"></div>
                    <div class="absolute -right-20 -bottom-20 size-80 rounded-full bg-white blur-3xl"></div>
                </div>
                <div class="relative">
                    <h2 class="text-2xl font-bold text-primary-foreground sm:text-3xl">
                        Free Shipping on Orders Over $50
                    </h2>
                    <p class="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
                        Enjoy free standard shipping on all orders over $50.
                        No coupon needed — it's automatically applied at checkout.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
