<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye, ImageOff } from 'lucide-vue-next';

interface Props {
    name: string;
    slug: string;
    price: number;
    discountPrice?: number | null;
    image?: string | null;
    stockStatus?: 'in_stock' | 'out_of_stock';
}

const props = withDefaults(defineProps<Props>(), {
    stockStatus: 'in_stock',
});

const discountPercentage = computed(() => {
    if (props.discountPrice && props.discountPrice < props.price) {
        return Math.round(
            ((props.price - props.discountPrice) / props.price) * 100,
        );
    }
    return 0;
});

const displayPrice = computed(() => {
    return props.discountPrice && props.discountPrice < props.price
        ? props.discountPrice
        : props.price;
});

const isOutOfStock = computed(() => props.stockStatus === 'out_of_stock');

function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
</script>

<template>
    <div
        class="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg"
    >
        <!-- Image -->
        <Link :href="`/products/${slug}`" class="relative aspect-[4/5] overflow-hidden sm:aspect-square">
            <!-- Product image -->
            <img
                v-if="image"
                :src="image"
                :alt="name"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <!-- Placeholder -->
            <div
                v-else
                class="flex size-full items-center justify-center bg-muted"
            >
                <ImageOff class="size-8 text-muted-foreground/30 sm:size-12" />
            </div>

            <!-- Discount Badge -->
            <Badge
                v-if="discountPercentage > 0"
                class="absolute top-2 left-2 bg-red-500 px-1.5 text-[10px] text-white hover:bg-red-500 sm:top-3 sm:left-3 sm:px-2 sm:text-xs"
            >
                {{ discountPercentage }}% OFF
            </Badge>

            <!-- Out of Stock Overlay -->
            <div
                v-if="isOutOfStock"
                class="absolute inset-0 flex items-center justify-center bg-black/40"
            >
                <Badge variant="secondary" class="text-xs sm:text-sm">Out of Stock</Badge>
            </div>

            <!-- Quick View (desktop hover only) -->
            <div
                class="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
            >
                <Button variant="secondary" size="sm" class="rounded-full">
                    <Eye class="size-4" />
                    Quick View
                </Button>
            </div>
        </Link>

        <!-- Info -->
        <div class="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
            <Link
                :href="`/products/${slug}`"
                class="line-clamp-2 text-xs font-medium leading-snug text-foreground transition-colors hover:text-primary sm:text-sm"
            >
                {{ name }}
            </Link>

            <!-- Price -->
            <div class="flex flex-wrap items-baseline gap-1 sm:gap-2">
                <span class="text-sm font-bold text-foreground sm:text-base">
                    {{ formatPrice(displayPrice) }}
                </span>
                <span
                    v-if="discountPercentage > 0"
                    class="text-[11px] text-muted-foreground line-through sm:text-sm"
                >
                    {{ formatPrice(price) }}
                </span>
            </div>

            <!-- Add to Cart -->
            <Button
                class="mt-auto w-full"
                size="sm"
                :disabled="isOutOfStock"
            >
                <ShoppingCart class="size-4" />
                <span class="hidden sm:inline">
                    {{ isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}
                </span>
                <span class="sm:hidden">
                    {{ isOutOfStock ? 'Unavailable' : 'Add' }}
                </span>
            </Button>
        </div>
    </div>
</template>
