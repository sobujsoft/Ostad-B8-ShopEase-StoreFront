<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import HeroBanner from '@/components/storefront/home/HeroBanner.vue';
import CategorySection from '@/components/storefront/home/CategorySection.vue';
import ProductSection from '@/components/storefront/home/ProductSection.vue';

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
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    },
    {
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-tshirt',
        price: 49.99,
        discountPrice: 34.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    },
    {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        price: 299.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    },
    {
        name: 'Organic Green Tea Collection',
        slug: 'organic-green-tea-collection',
        price: 24.99,
        discountPrice: 19.99,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    },
    {
        name: 'Running Shoes Ultra Comfort',
        slug: 'running-shoes-ultra-comfort',
        price: 159.99,
        discountPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    },
    {
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        price: 89.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    },
    {
        name: 'Stainless Steel Water Bottle',
        slug: 'stainless-steel-water-bottle',
        price: 34.99,
        discountPrice: 24.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
    },
    {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        price: 79.99,
        discountPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    },
];

const newArrivals = [
    {
        name: 'Minimalist Desk Lamp LED',
        slug: 'minimalist-desk-lamp-led',
        price: 69.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80',
    },
    {
        name: 'Silk Scarf Floral Print',
        slug: 'silk-scarf-floral-print',
        price: 59.99,
        discountPrice: 44.99,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    },
    {
        name: 'Ceramic Plant Pot Set',
        slug: 'ceramic-plant-pot-set',
        price: 45.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
    },
    {
        name: 'Noise Cancelling Earbuds',
        slug: 'noise-cancelling-earbuds',
        price: 199.99,
        discountPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80',
    },
    {
        name: 'Yoga Mat Premium Non-Slip',
        slug: 'yoga-mat-premium-non-slip',
        price: 39.99,
        discountPrice: 29.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
    },
    {
        name: 'Bamboo Cutting Board Set',
        slug: 'bamboo-cutting-board-set',
        price: 54.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=400&q=80',
    },
    {
        name: 'Vintage Canvas Backpack',
        slug: 'vintage-canvas-backpack',
        price: 79.99,
        discountPrice: 64.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    },
    {
        name: 'Aroma Diffuser & Essential Oil Set',
        slug: 'aroma-diffuser-essential-oil-set',
        price: 49.99,
        discountPrice: null,
        stockStatus: 'out_of_stock' as const,
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&q=80',
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
    <section class="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div class="mx-auto max-w-7xl">
            <div
                class="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 px-5 py-8 text-center sm:rounded-2xl sm:px-16 sm:py-16"
            >
                <div class="absolute inset-0 opacity-10" aria-hidden="true">
                    <div class="absolute -top-20 -left-20 size-60 rounded-full bg-white blur-3xl"></div>
                    <div class="absolute -right-20 -bottom-20 size-80 rounded-full bg-white blur-3xl"></div>
                </div>
                <div class="relative">
                    <h2 class="text-lg font-bold text-primary-foreground sm:text-2xl lg:text-3xl">
                        Free Shipping on Orders Over $50
                    </h2>
                    <p class="mx-auto mt-2 max-w-xl text-xs text-primary-foreground/80 sm:mt-3 sm:text-sm lg:text-base">
                        Enjoy free standard shipping on all orders over $50.
                        No coupon needed — it's automatically applied at checkout.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
