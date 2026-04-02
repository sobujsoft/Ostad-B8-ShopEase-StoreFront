<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import ProductCard from './ProductCard.vue';

interface Product {
    name: string;
    slug: string;
    price: number;
    discountPrice?: number | null;
    image?: string;
    stockStatus?: 'in_stock' | 'out_of_stock';
    gradient?: string;
}

defineProps<{
    title: string;
    subtitle?: string;
    products: Product[];
    viewAllHref?: string;
}>();
</script>

<template>
    <section class="py-12 lg:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mb-8 flex items-end justify-between">
                <div>
                    <h2
                        class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                    >
                        {{ title }}
                    </h2>
                    <p
                        v-if="subtitle"
                        class="mt-1 text-sm text-muted-foreground"
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

            <!-- Product Grid -->
            <div
                class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
            >
                <ProductCard
                    v-for="product in products"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>

            <!-- Mobile View All -->
            <div v-if="viewAllHref" class="mt-8 text-center sm:hidden">
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
