<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ShieldCheck, ArrowLeft, Lock, LoaderCircle } from 'lucide-vue-next';
import CheckoutOrderSummary from '@/components/storefront/checkout/CheckoutOrderSummary.vue';
import CheckoutShippingForm from '@/components/storefront/checkout/CheckoutShippingForm.vue';
import type { ShippingData } from '@/components/storefront/checkout/CheckoutShippingForm.vue';
import CheckoutPaymentMethod from '@/components/storefront/checkout/CheckoutPaymentMethod.vue';
import type { PaymentMethod } from '@/components/storefront/checkout/CheckoutPaymentMethod.vue';
import api from '@/lib/axios';
import { useCart } from '@/composables/useCart';
import { useCustomerAuth } from '@/composables/useCustomerAuth';

const { isAuthenticated, user, customer } = useCustomerAuth();
const { items, isLoading, isUpdating, fetchCart, updateQuantity, removeItem, resetCartState } = useCart();

const shipping = reactive<ShippingData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
});

const paymentMethod = ref<PaymentMethod>('cod');
const placingOrder = ref(false);
const orderError = ref('');
const fieldErrors = ref<Record<string, string[]>>({});

function prefillShipping() {
    if (user.value) {
        shipping.fullName = shipping.fullName || user.value.name || '';
        shipping.email = shipping.email || user.value.email || '';
        shipping.phone = shipping.phone || user.value.phone || '';
    }
    if (customer.value?.shipping_address) {
        shipping.address = shipping.address || customer.value.shipping_address;
    }
}

function handleUpdateQty(cartItemId: number, qty: number) {
    if (qty >= 1 && qty <= 10) {
        updateQuantity(cartItemId, qty);
    }
}

function handleRemove(cartItemId: number) {
    removeItem(cartItemId);
}

function unitPrice(item: typeof items.value[number]): number {
    return item.discountPrice != null && item.discountPrice < item.price
        ? item.discountPrice
        : item.price;
}

const computedSubtotal = computed(() =>
    items.value.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0),
);

const shippingCost = computed(() => (computedSubtotal.value >= 50 ? 0 : 5.99));

const total = computed(() => computedSubtotal.value + shippingCost.value);

function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

const canPlaceOrder = computed(() => {
    return (
        items.value.length > 0 &&
        shipping.fullName.trim() !== '' &&
        shipping.email.trim() !== '' &&
        shipping.phone.trim() !== '' &&
        shipping.address.trim() !== '' &&
        !placingOrder.value
    );
});

async function handlePlaceOrder() {
    if (!canPlaceOrder.value) return;

    placingOrder.value = true;
    orderError.value = '';
    fieldErrors.value = {};

    try {
        const { data } = await api.post('/storefront/checkout', {
            customer_name: shipping.fullName,
            customer_email: shipping.email,
            customer_phone: shipping.phone,
            shipping_address: shipping.address,
            payment_method: paymentMethod.value,
        });

        resetCartState();

        const orderNumber = data.data?.order?.order_number ?? data.data?.order_number ?? '';
        router.visit(`/order-success?order=${orderNumber}`);
    } catch (err: any) {
        if (err.response?.status === 422 && err.response?.data?.errors) {
            fieldErrors.value = err.response.data.errors;
        } else if (err.response?.status === 401) {
            router.visit('/customer/login');
        } else {
            orderError.value = err.response?.data?.message || 'Failed to place order. Please try again.';
        }
    } finally {
        placingOrder.value = false;
    }
}

onMounted(() => {
    if (!isAuthenticated.value) {
        router.visit('/customer/login');
        return;
    }
    fetchCart().then(prefillShipping);
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

    <!-- Loading -->
    <div
        v-if="isLoading"
        class="flex min-h-[40vh] items-center justify-center"
    >
        <LoaderCircle class="size-10 animate-spin text-primary" />
    </div>

    <section v-else class="py-6 sm:py-8 lg:py-10">
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

            <!-- Order Error -->
            <div
                v-if="orderError"
                class="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
            >
                {{ orderError }}
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                <!-- Left Column: Shipping + Payment -->
                <div class="space-y-6 lg:col-span-7 xl:col-span-8">
                    <!-- Shipping Form -->
                    <div class="rounded-xl border bg-card p-4 sm:p-6">
                        <CheckoutShippingForm v-model="shipping" />
                        <!-- Field errors from API -->
                        <div v-if="Object.keys(fieldErrors).length > 0" class="mt-3 space-y-1">
                            <p
                                v-for="(msgs, field) in fieldErrors"
                                :key="field"
                                class="text-sm text-red-600"
                            >
                                {{ msgs[0] }}
                            </p>
                        </div>
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
                                :items="items"
                                :is-updating="isUpdating"
                                @update-qty="handleUpdateQty"
                                @remove="handleRemove"
                            />

                            <!-- Place Order Button -->
                            <template v-if="items.length > 0">
                                <Separator class="my-4" />

                                <Button
                                    size="lg"
                                    class="h-12 w-full rounded-lg text-base font-semibold sm:h-11 sm:text-sm"
                                    :disabled="!canPlaceOrder || isUpdating"
                                    @click="handlePlaceOrder"
                                >
                                    <Spinner v-if="placingOrder" class="size-4" />
                                    <Lock v-else class="size-4" />
                                    {{ placingOrder ? 'Placing Order...' : `Place Order — ${formatPrice(total)}` }}
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
