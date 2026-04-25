<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import HeroBanner from '@/components/storefront/home/HeroBanner.vue';
import CategorySection from '@/components/storefront/home/CategorySection.vue';
import ProductSection from '@/components/storefront/home/ProductSection.vue';
</script>

<template>
    <Head title="Home" />

    <HeroBanner />

    <CategorySection />

    <div class="border-t">
        <ProductSection
            section-name="best_sellers"
            title="Best Sellers"
            subtitle="Our most popular products loved by customers"
            view-all-href="/shop?section=best_sellers"
        />
    </div>

    <div class="bg-muted/30">
        <ProductSection
            section-name="new_arrivals"
            title="New Arrivals"
            subtitle="Fresh picks just added to our collection"
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
