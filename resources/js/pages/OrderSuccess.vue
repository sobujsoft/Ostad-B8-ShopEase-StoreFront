<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { CircleCheck, Package, ShoppingBag, ArrowRight } from 'lucide-vue-next';

const page = usePage();

const orderNumber = computed(() => {
    const url = page.url;
    const q = url.includes('?') ? url.split('?')[1] ?? '' : '';
    return new URLSearchParams(q).get('order') || '';
});
</script>

<template>
    <Head title="Order Placed" />

    <div class="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div class="w-full max-w-md space-y-6 text-center">
            <!-- Success Icon -->
            <div class="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CircleCheck class="size-10 text-green-600 dark:text-green-400" />
            </div>

            <!-- Heading -->
            <div class="space-y-2">
                <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Order Placed Successfully!
                </h1>
                <p class="text-sm text-muted-foreground sm:text-base">
                    Thank you for your order. We'll process it shortly.
                </p>
            </div>

            <!-- Order Number -->
            <div
                v-if="orderNumber"
                class="rounded-lg border bg-muted/30 p-4"
            >
                <p class="text-xs text-muted-foreground">Order Number</p>
                <p class="mt-1 text-lg font-bold tracking-wide text-foreground">
                    {{ orderNumber }}
                </p>
            </div>

            <!-- Info -->
            <div class="space-y-3 rounded-lg border p-4 text-left">
                <div class="flex items-start gap-3">
                    <Package class="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                        <p class="text-sm font-medium text-foreground">Cash on Delivery</p>
                        <p class="text-xs text-muted-foreground">
                            Pay when your order arrives at your doorstep.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 sm:flex-row">
                <Link
                    v-if="orderNumber"
                    :href="`/orders/${orderNumber}`"
                    class="flex-1"
                >
                    <Button variant="outline" class="w-full">
                        <Package class="size-4" />
                        View Order
                    </Button>
                </Link>
                <Link href="/orders" class="flex-1">
                    <Button variant="outline" class="w-full">
                        <ShoppingBag class="size-4" />
                        My Orders
                    </Button>
                </Link>
            </div>

            <Link
                href="/shop"
                class="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
                Continue Shopping
                <ArrowRight class="size-4" />
            </Link>
        </div>
    </div>
</template>
