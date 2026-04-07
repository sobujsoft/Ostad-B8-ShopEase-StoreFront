<script setup lang="ts">
import { computed } from 'vue';
import ProductCard from '@/components/storefront/common/ProductCard.vue';
import type { RelatedProduct } from '@/data/storefront/product-detail-dummy';

const props = defineProps<{
    products: RelatedProduct[];
}>();

const mobileProducts = computed(() => props.products.slice(0, 4));
</script>

<template>
    <section class="border-t bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
                class="mb-5 text-lg font-bold tracking-tight text-foreground sm:mb-8 sm:text-xl lg:text-2xl"
            >
                You May Also Like
            </h2>

            <!-- Mobile: 2-col grid -->
            <div class="grid grid-cols-2 gap-3 sm:hidden">
                <ProductCard
                    v-for="product in mobileProducts"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>

            <!-- Tablet+: 4-col grid -->
            <div class="hidden grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                <ProductCard
                    v-for="product in products"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>
        </div>
    </section>
</template>
