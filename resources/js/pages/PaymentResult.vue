<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    CircleCheck,
    CircleX,
    Ban,
    Package,
    ShoppingBag,
    ArrowRight,
    CreditCard,
    RefreshCw,
} from 'lucide-vue-next';

const page = usePage();

const params = computed(() => {
    const url = page.url;
    const q = url.includes('?') ? url.split('?')[1] ?? '' : '';
    const sp = new URLSearchParams(q);
    return {
        status: sp.get('status') || 'failed',
        orderNumber: sp.get('order_number') || '',
        message: sp.get('message') || '',
    };
});

const isSuccess = computed(() => params.value.status === 'success');
const isCancelled = computed(() => params.value.status === 'cancelled');
const isFailed = computed(() => !isSuccess.value && !isCancelled.value);

const statusConfig = computed(() => {
    if (isSuccess.value) {
        return {
            icon: CircleCheck,
            iconBg: 'bg-green-100 dark:bg-green-900/30',
            iconColor: 'text-green-600 dark:text-green-400',
            title: 'Payment Successful!',
            subtitle: 'Your payment has been processed and your order is confirmed.',
            badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            badgeText: 'Paid',
        };
    }
    if (isCancelled.value) {
        return {
            icon: Ban,
            iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            title: 'Payment Cancelled',
            subtitle: 'You cancelled the payment. Your order is still pending.',
            badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            badgeText: 'Cancelled',
        };
    }
    return {
        icon: CircleX,
        iconBg: 'bg-red-100 dark:bg-red-900/30',
        iconColor: 'text-red-600 dark:text-red-400',
        title: 'Payment Failed',
        subtitle: 'Something went wrong with your payment. Please try again.',
        badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        badgeText: 'Failed',
    };
});
</script>

<template>
    <Head :title="statusConfig.title" />

    <div class="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div class="w-full max-w-md space-y-6 text-center">
            <!-- Status Icon -->
            <div
                class="mx-auto flex size-20 items-center justify-center rounded-full"
                :class="statusConfig.iconBg"
            >
                <component
                    :is="statusConfig.icon"
                    class="size-10"
                    :class="statusConfig.iconColor"
                />
            </div>

            <!-- Heading -->
            <div class="space-y-2">
                <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {{ statusConfig.title }}
                </h1>
                <p class="text-sm text-muted-foreground sm:text-base">
                    {{ statusConfig.subtitle }}
                </p>
            </div>

            <!-- Order Number -->
            <div
                v-if="params.orderNumber"
                class="rounded-lg border bg-muted/30 p-4"
            >
                <p class="text-xs text-muted-foreground">Order Number</p>
                <p class="mt-1 text-lg font-bold tracking-wide text-foreground">
                    {{ params.orderNumber }}
                </p>
                <Badge
                    variant="secondary"
                    :class="statusConfig.badgeClass"
                    class="mt-2"
                >
                    {{ statusConfig.badgeText }}
                </Badge>
            </div>

            <!-- Error Message -->
            <div
                v-if="params.message && !isSuccess"
                class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
            >
                {{ params.message }}
            </div>

            <!-- Info Card -->
            <div class="space-y-3 rounded-lg border p-4 text-left">
                <div class="flex items-start gap-3">
                    <CreditCard class="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                        <p class="text-sm font-medium text-foreground">SSLCommerz Payment</p>
                        <p class="text-xs text-muted-foreground">
                            <template v-if="isSuccess">
                                Payment was successfully completed via SSLCommerz.
                            </template>
                            <template v-else-if="isCancelled">
                                You can retry the payment or choose a different payment method.
                            </template>
                            <template v-else>
                                The payment could not be processed. Please try again or contact support.
                            </template>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 sm:flex-row">
                <Link
                    v-if="params.orderNumber"
                    :href="`/orders/${params.orderNumber}`"
                    class="flex-1"
                >
                    <Button variant="outline" class="w-full">
                        <Package class="size-4" />
                        View Order
                    </Button>
                </Link>

                <Link
                    v-if="!isSuccess"
                    href="/checkout"
                    class="flex-1"
                >
                    <Button class="w-full">
                        <RefreshCw class="size-4" />
                        Try Again
                    </Button>
                </Link>

                <Link href="/orders" class="flex-1">
                    <Button :variant="isSuccess ? 'outline' : 'secondary'" class="w-full">
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
