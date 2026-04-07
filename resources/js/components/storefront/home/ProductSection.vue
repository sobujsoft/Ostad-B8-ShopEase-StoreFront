<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import ProductCard from '../common/ProductCard.vue';

interface Product {
    name: string;
    slug: string;
    price: number;
    discountPrice?: number | null;
    image?: string | null;
    stockStatus?: 'in_stock' | 'out_of_stock';
}

const props = defineProps<{
    title: string;
    subtitle?: string;
    products: Product[];
    viewAllHref?: string;
}>();

const mobileProducts = computed(() => props.products.slice(0, 4));
</script>

<template>
    <section class="py-8 sm:py-12 lg:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mb-5 flex items-end justify-between sm:mb-8">
                <div>
                    <h2
                        class="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl"
                    >
                        {{ title }}
                    </h2>
                    <p
                        v-if="subtitle"
                        class="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm"
                    >
                        {{ subtitle }}
                    </p>
                </div>
                <Link
                    v-if="viewAllHref"
                    :href="viewAllHref"
                    class="group hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
                >
                    View All
                    <ArrowRight
                        class="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                </Link>
            </div>

            <!-- Mobile: show 4 products in 2-col grid -->
            <div class="grid grid-cols-2 gap-3 sm:hidden">
                <ProductCard
                    v-for="product in mobileProducts"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>

            <!-- Tablet+: show all products -->
            <div class="hidden grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                <ProductCard
                    v-for="product in products"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>

            <!-- Mobile View All -->
            <div v-if="viewAllHref" class="mt-5 text-center sm:hidden">
                <Link
                    :href="viewAllHref"
                    class="inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                    View All Products
                    <ArrowRight class="size-4" />
                </Link>
            </div>
        </div>
    </section>
</template>
