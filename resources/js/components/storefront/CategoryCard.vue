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
        class="group relative flex h-52 w-44 shrink-0 flex-col justify-end overflow-hidden rounded-2xl sm:h-60 sm:w-52 lg:h-64 lg:w-auto"
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
            <Grid2x2 class="size-12 text-muted-foreground/30" />
        </div>

        <!-- Gradient Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80"
        ></div>

        <!-- Content -->
        <div class="relative z-10 p-4 sm:p-5">
            <h3 class="text-sm font-semibold text-white sm:text-base">
                {{ name }}
            </h3>
            <div class="mt-1 flex items-center justify-between">
                <span
                    v-if="productCount !== undefined"
                    class="text-xs text-white/60"
                >
                    {{ productCount }} Products
                </span>
                <span
                    class="flex size-7 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                >
                    <ArrowRight class="size-3.5" />
                </span>
            </div>
        </div>
    </Link>
</template>
