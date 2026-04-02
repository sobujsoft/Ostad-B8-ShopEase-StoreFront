<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-vue-next';

interface Props {
    name: string;
    slug: string;
    price: number;
    discountPrice?: number | null;
    image?: string;
    stockStatus?: 'in_stock' | 'out_of_stock';
    gradient?: string;
}

const props = withDefaults(defineProps<Props>(), {
    stockStatus: 'in_stock',
    gradient: 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700',
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
        <Link :href="`/products/${slug}`" class="relative aspect-square overflow-hidden">
            <div
                class="flex size-full items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-105"
                :class="gradient"
            >
                <ShoppingCart class="size-12 text-muted-foreground/30" />
            </div>

            <!-- Discount Badge -->
            <Badge
                v-if="discountPercentage > 0"
                class="absolute top-3 left-3 bg-red-500 text-white hover:bg-red-500"
            >
                {{ discountPercentage }}% OFF
            </Badge>

            <!-- Out of Stock Overlay -->
            <div
                v-if="isOutOfStock"
                class="absolute inset-0 flex items-center justify-center bg-black/40"
            >
                <Badge variant="secondary" class="text-sm">Out of Stock</Badge>
            </div>

            <!-- Quick View -->
            <div
                class="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
                <Button
                    variant="secondary"
                    size="sm"
                    class="rounded-full"
                >
                    <Eye class="size-4" />
                    Quick View
                </Button>
            </div>
        </Link>

        <!-- Info -->
        <div class="flex flex-1 flex-col gap-2 p-4">
            <Link
                :href="`/products/${slug}`"
                class="line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
                {{ name }}
            </Link>

            <!-- Price -->
            <div class="flex items-center gap-2">
                <span class="text-base font-bold text-foreground">
                    {{ formatPrice(displayPrice) }}
                </span>
                <span
                    v-if="discountPercentage > 0"
                    class="text-sm text-muted-foreground line-through"
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
                {{ isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}
            </Button>
        </div>
    </div>
</template>
