<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ArrowRight, Grid2x2 } from 'lucide-vue-next';

interface Props {
    name: string;
    slug: string;
    image?: string | null;
    productCount?: number;
}

defineProps<Props>();
</script>

<template>
    <Link
        :href="`/shop?category=${slug}`"
        class="group relative flex h-40 w-32 shrink-0 flex-col justify-end overflow-hidden rounded-xl sm:h-56 sm:w-44 md:w-48 lg:h-64 lg:w-auto lg:rounded-2xl"
    >
        <!-- Background Image -->
        <img
            v-if="image"
            :src="image"
            :alt="name"
            class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <!-- Placeholder when no image -->
        <div
            v-else
            class="absolute inset-0 flex items-center justify-center bg-muted"
        >
            <Grid2x2 class="size-8 text-muted-foreground/30 sm:size-12" />
        </div>

        <!-- Gradient Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80"
        ></div>

        <!-- Content -->
        <div class="relative z-10 p-3 sm:p-4 lg:p-5">
            <h3 class="text-xs font-semibold text-white sm:text-sm lg:text-base">
                {{ name }}
            </h3>
            <div class="mt-0.5 flex items-center justify-between sm:mt-1">
                <span
                    v-if="productCount !== undefined"
                    class="text-[10px] text-white/60 sm:text-xs"
                >
                    {{ productCount }} Products
                </span>
                <span
                    class="hidden size-7 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:flex"
                >
                    <ArrowRight class="size-3.5" />
                </span>
            </div>
        </div>
    </Link>
</template>
