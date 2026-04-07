<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ImageOff } from 'lucide-vue-next';
import type { CartItem } from '@/data/storefront/checkout-dummy';

const props = defineProps<{
    items: CartItem[];
}>();

const emit = defineEmits<{
    updateQty: [id: string, qty: number];
    remove: [id: string];
}>();

function unitPrice(item: CartItem): number {
    return item.discountPrice != null && item.discountPrice < item.price
        ? item.discountPrice
        : item.price;
}

const subtotal = computed(() =>
    props.items.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0),
);

const shippingCost = computed(() => (subtotal.value >= 50 ? 0 : 5.99));

const total = computed(() => subtotal.value + shippingCost.value);

function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
</script>

<template>
    <div class="space-y-4">
        <h2 class="text-base font-semibold text-foreground sm:text-lg">
            Order Summary
            <span class="text-sm font-normal text-muted-foreground">
                ({{ items.length }} {{ items.length === 1 ? 'item' : 'items' }})
            </span>
        </h2>

        <!-- Cart Items -->
        <div class="space-y-3">
            <div
                v-for="item in items"
                :key="item.id"
                class="flex gap-3 rounded-lg border bg-card p-3"
            >
                <!-- Image -->
                <Link
                    :href="`/products/${item.slug}`"
                    class="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted sm:size-20"
                >
                    <img
                        v-if="item.image"
                        :src="item.image"
                        :alt="item.name"
                        class="size-full object-cover"
                    />
                    <div v-else class="flex size-full items-center justify-center">
                        <ImageOff class="size-5 text-muted-foreground/30" />
                    </div>
                </Link>

                <!-- Details -->
                <div class="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                        <Link
                            :href="`/products/${item.slug}`"
                            class="line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                            {{ item.name }}
                        </Link>
                        <p v-if="item.variant" class="mt-0.5 text-xs text-muted-foreground">
                            {{ item.variant }}
                        </p>
                    </div>

                    <div class="mt-2 flex items-end justify-between">
                        <!-- Qty stepper -->
                        <div class="flex items-center gap-1">
                            <button
                                class="flex size-7 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent disabled:opacity-40"
                                :disabled="item.quantity <= 1"
                                @click="emit('updateQty', item.id, item.quantity - 1)"
                                aria-label="Decrease quantity"
                            >
                                <Minus class="size-3.5" />
                            </button>
                            <span
                                class="flex h-7 w-8 items-center justify-center text-xs font-semibold tabular-nums"
                            >
                                {{ item.quantity }}
                            </span>
                            <button
                                class="flex size-7 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent disabled:opacity-40"
                                :disabled="item.quantity >= 10"
                                @click="emit('updateQty', item.id, item.quantity + 1)"
                                aria-label="Increase quantity"
                            >
                                <Plus class="size-3.5" />
                            </button>
                        </div>

                        <!-- Price + Remove -->
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-semibold text-foreground">
                                {{ formatPrice(unitPrice(item) * item.quantity) }}
                            </span>
                            <button
                                class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                @click="emit('remove', item.id)"
                                aria-label="Remove item"
                            >
                                <Trash2 class="size-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div
            v-if="items.length === 0"
            class="rounded-lg border border-dashed py-10 text-center"
        >
            <p class="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link href="/shop">
                <Button variant="link" size="sm" class="mt-2">Continue Shopping</Button>
            </Link>
        </div>

        <!-- Totals -->
        <template v-if="items.length > 0">
            <Separator />
            <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-muted-foreground">Subtotal</span>
                    <span class="font-medium text-foreground">{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-muted-foreground">Shipping</span>
                    <span class="font-medium text-foreground">
                        {{ shippingCost === 0 ? 'Free' : formatPrice(shippingCost) }}
                    </span>
                </div>
            </div>
            <Separator />
            <div class="flex justify-between">
                <span class="text-base font-semibold text-foreground">Total</span>
                <span class="text-lg font-bold text-foreground">{{ formatPrice(total) }}</span>
            </div>

            <p
                v-if="shippingCost === 0"
                class="text-center text-xs text-green-600 dark:text-green-400"
            >
                You qualified for free shipping!
            </p>
        </template>
    </div>
</template>
