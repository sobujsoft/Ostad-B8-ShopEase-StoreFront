<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-vue-next';
import CheckoutOrderSummary from '@/components/storefront/checkout/CheckoutOrderSummary.vue';
import CheckoutShippingForm from '@/components/storefront/checkout/CheckoutShippingForm.vue';
import type { ShippingData } from '@/components/storefront/checkout/CheckoutShippingForm.vue';
import CheckoutPaymentMethod from '@/components/storefront/checkout/CheckoutPaymentMethod.vue';
import type { PaymentMethod } from '@/components/storefront/checkout/CheckoutPaymentMethod.vue';
import { dummyCartItems, type CartItem } from '@/data/storefront/checkout-dummy';

const cartItems = ref<CartItem[]>(
    dummyCartItems.map((item) => ({ ...item })),
);

const shipping = reactive<ShippingData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
});

const paymentMethod = ref<PaymentMethod>('cod');

function updateQty(id: string, qty: number) {
    const item = cartItems.value.find((i) => i.id === id);
    if (item && qty >= 1 && qty <= 10) {
        item.quantity = qty;
    }
}

function removeItem(id: string) {
    cartItems.value = cartItems.value.filter((i) => i.id !== id);
}

function unitPrice(item: CartItem): number {
    return item.discountPrice != null && item.discountPrice < item.price
        ? item.discountPrice
        : item.price;
}

const total = computed(() => {
    const subtotal = cartItems.value.reduce(
        (sum, item) => sum + unitPrice(item) * item.quantity,
        0,
    );
    const shippingCost = subtotal >= 50 ? 0 : 5.99;
    return subtotal + shippingCost;
});

function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

const canPlaceOrder = computed(() => {
    return (
        cartItems.value.length > 0 &&
        shipping.fullName.trim() !== '' &&
        shipping.email.trim() !== '' &&
        shipping.phone.trim() !== '' &&
        shipping.address.trim() !== ''
    );
});
</script>

<template>
    <Head title="Checkout" />

    <!-- Breadcrumb -->
    <div class="border-b bg-muted/30">
        <div class="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 sm:py-4 lg:px-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem class="hidden sm:inline-flex">
                        <BreadcrumbLink as-child>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator class="hidden sm:block" />
                    <BreadcrumbItem class="hidden sm:inline-flex">
                        <BreadcrumbLink as-child>
                            <Link href="/shop">Shop</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator class="hidden sm:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Checkout</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </div>

    <section class="py-6 sm:py-8 lg:py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Page Title -->
            <div class="mb-6 sm:mb-8">
                <h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                    Checkout
                </h1>
                <p class="mt-1 text-sm text-muted-foreground">
                    Complete your order by filling in the details below.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                <!-- Left Column: Shipping + Payment -->
                <div class="space-y-6 lg:col-span-7 xl:col-span-8">
                    <!-- Shipping Form -->
                    <div class="rounded-xl border bg-card p-4 sm:p-6">
                        <CheckoutShippingForm v-model="shipping" />
                    </div>

                    <!-- Payment Method -->
                    <div class="rounded-xl border bg-card p-4 sm:p-6">
                        <CheckoutPaymentMethod v-model="paymentMethod" />
                    </div>

                    <!-- Back to shop link (desktop) -->
                    <div class="hidden sm:block">
                        <Link
                            href="/shop"
                            class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft class="size-4" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <!-- Right Column: Order Summary + Place Order -->
                <div class="lg:col-span-5 xl:col-span-4">
                    <div class="lg:sticky lg:top-24">
                        <div class="rounded-xl border bg-card p-4 sm:p-6">
                            <CheckoutOrderSummary
                                :items="cartItems"
                                @update-qty="updateQty"
                                @remove="removeItem"
                            />

                            <!-- Place Order Button -->
                            <template v-if="cartItems.length > 0">
                                <Separator class="my-4" />

                                <Button
                                    size="lg"
                                    class="h-12 w-full rounded-lg text-base font-semibold sm:h-11 sm:text-sm"
                                    :disabled="!canPlaceOrder"
                                >
                                    <Lock class="size-4" />
                                    Place Order — {{ formatPrice(total) }}
                                </Button>

                                <p class="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                                    <ShieldCheck class="size-3.5" />
                                    Your payment information is secure and encrypted.
                                </p>
                            </template>
                        </div>

                        <!-- Back to shop link (mobile) -->
                        <div class="mt-4 text-center sm:hidden">
                            <Link
                                href="/shop"
                                class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
                            >
                                <ArrowLeft class="size-4" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
