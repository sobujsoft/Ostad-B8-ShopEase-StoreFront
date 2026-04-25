<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Head, Link, usePage, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    LoaderCircle,
    Package,
    ArrowLeft,
    MapPin,
    Phone,
    Mail,
    User,
    ImageOff,
    Clock,
    CircleCheck,
} from 'lucide-vue-next';
import api from '@/lib/axios';
import { storageUrl } from '@/lib/axios';
import { useCustomerAuth } from '@/composables/useCustomerAuth';

const { isAuthenticated } = useCustomerAuth();
const page = usePage();

interface OrderItemImage {
    id: number;
    image_path: string;
    is_primary: boolean;
}

interface OrderItem {
    id: number;
    product_id: number;
    product_name: string;
    product_code: string;
    quantity: number;
    unit_price: string;
    total_price: string;
    product?: {
        slug?: string;
        images?: OrderItemImage[];
    };
}

interface StatusLog {
    id: number;
    status: string;
    note: string | null;
    created_at: string;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    total_amount: string;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
    order_items: OrderItem[];
    status_logs?: StatusLog[];
}

const order = ref<Order | null>(null);
const isLoading = ref(true);
const notFound = ref(false);

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    processing: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function statusClass(status: string): string {
    return statusColors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
}

function getOrderNumber(): string {
    const url = page.url;
    const parts = url.split('?')[0]!.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? '';
}

function getItemImage(item: OrderItem): string | null {
    const images = item.product?.images ?? [];
    const primary = images.find(img => img.is_primary) ?? images[0];
    return primary?.image_path ? storageUrl(primary.image_path) : null;
}

function formatPrice(amount: string | number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

async function fetchOrder() {
    const orderNum = getOrderNumber();
    if (!orderNum) {
        notFound.value = true;
        isLoading.value = false;
        return;
    }

    try {
        const { data } = await api.get(`/storefront/orders/${orderNum}`);
        order.value = data.data;
    } catch {
        notFound.value = true;
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    if (!isAuthenticated.value) {
        router.visit('/customer/login');
        return;
    }
    fetchOrder();
});
</script>

<template>
    <Head :title="order ? `Order ${order.order_number}` : 'Order Details'" />

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
                    <BreadcrumbItem>
                        <BreadcrumbLink as-child>
                            <Link href="/orders">My Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{{ order?.order_number ?? 'Order Details' }}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </div>

    <!-- Loading -->
    <div
        v-if="isLoading"
        class="flex min-h-[50vh] items-center justify-center"
    >
        <LoaderCircle class="size-10 animate-spin text-primary" />
    </div>

    <!-- Not Found -->
    <div
        v-else-if="notFound || !order"
        class="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center"
    >
        <h1 class="text-2xl font-bold text-foreground">Order Not Found</h1>
        <p class="text-muted-foreground">The order you're looking for doesn't exist.</p>
        <Link href="/orders">
            <Button variant="outline">
                <ArrowLeft class="size-4" />
                Back to Orders
            </Button>
        </Link>
    </div>

    <!-- Order Detail -->
    <section v-else class="py-6 sm:py-8 lg:py-10">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div class="flex flex-wrap items-center gap-2">
                        <h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                            {{ order.order_number }}
                        </h1>
                        <Badge
                            variant="secondary"
                            :class="statusClass(order.order_status)"
                            class="capitalize"
                        >
                            {{ order.order_status }}
                        </Badge>
                    </div>
                    <p class="mt-1 text-sm text-muted-foreground">
                        Placed on {{ formatDate(order.created_at) }}
                    </p>
                </div>
                <Link href="/orders">
                    <Button variant="outline" size="sm">
                        <ArrowLeft class="size-4" />
                        All Orders
                    </Button>
                </Link>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Left Column: Items + Status -->
                <div class="space-y-6 lg:col-span-2">
                    <!-- Order Items -->
                    <div class="rounded-xl border bg-card p-4 sm:p-5">
                        <h2 class="mb-4 text-base font-semibold text-foreground">
                            Items ({{ order.order_items.length }})
                        </h2>
                        <div class="space-y-3">
                            <div
                                v-for="item in order.order_items"
                                :key="item.id"
                                class="flex gap-3 rounded-lg border p-3"
                            >
                                <Link
                                    :href="item.product?.slug ? `/products/${item.product.slug}` : '#'"
                                    class="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted sm:size-20"
                                >
                                    <img
                                        v-if="getItemImage(item)"
                                        :src="getItemImage(item)!"
                                        :alt="item.product_name"
                                        class="size-full object-cover"
                                    />
                                    <div v-else class="flex size-full items-center justify-center">
                                        <ImageOff class="size-5 text-muted-foreground/30" />
                                    </div>
                                </Link>

                                <div class="flex min-w-0 flex-1 flex-col justify-between">
                                    <div>
                                        <p class="line-clamp-1 text-sm font-medium text-foreground">
                                            {{ item.product_name }}
                                        </p>
                                        <p class="mt-0.5 text-xs text-muted-foreground">
                                            {{ item.product_code }}
                                        </p>
                                    </div>
                                    <div class="mt-2 flex items-end justify-between">
                                        <span class="text-xs text-muted-foreground">
                                            {{ formatPrice(item.unit_price) }} x {{ item.quantity }}
                                        </span>
                                        <span class="text-sm font-semibold text-foreground">
                                            {{ formatPrice(item.total_price) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator class="my-4" />

                        <div class="flex justify-between">
                            <span class="text-base font-semibold text-foreground">Total</span>
                            <span class="text-lg font-bold text-foreground">
                                {{ formatPrice(order.total_amount) }}
                            </span>
                        </div>
                    </div>

                    <!-- Status Timeline -->
                    <div
                        v-if="order.status_logs && order.status_logs.length > 0"
                        class="rounded-xl border bg-card p-4 sm:p-5"
                    >
                        <h2 class="mb-4 text-base font-semibold text-foreground">
                            Order Timeline
                        </h2>
                        <div class="space-y-4">
                            <div
                                v-for="(log, idx) in order.status_logs"
                                :key="log.id"
                                class="relative flex gap-3 pl-6"
                            >
                                <div
                                    class="absolute left-0 flex size-5 items-center justify-center rounded-full"
                                    :class="idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
                                >
                                    <CircleCheck v-if="idx === 0" class="size-3" />
                                    <Clock v-else class="size-3" />
                                </div>
                                <div
                                    v-if="idx < order.status_logs!.length - 1"
                                    class="absolute left-2.5 top-5 h-full w-px -translate-x-px bg-border"
                                ></div>
                                <div class="min-w-0 pb-4">
                                    <p class="text-sm font-medium capitalize text-foreground">
                                        {{ log.status }}
                                    </p>
                                    <p v-if="log.note" class="mt-0.5 text-xs text-muted-foreground">
                                        {{ log.note }}
                                    </p>
                                    <p class="mt-0.5 text-xs text-muted-foreground">
                                        {{ formatDate(log.created_at) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Shipping & Payment -->
                <div class="space-y-6">
                    <!-- Shipping Info -->
                    <div class="rounded-xl border bg-card p-4 sm:p-5">
                        <h2 class="mb-3 text-base font-semibold text-foreground">
                            Shipping Details
                        </h2>
                        <div class="space-y-2.5 text-sm">
                            <div class="flex items-start gap-2.5">
                                <User class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span class="text-foreground">{{ order.customer_name }}</span>
                            </div>
                            <div class="flex items-start gap-2.5">
                                <Mail class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span class="text-foreground">{{ order.customer_email }}</span>
                            </div>
                            <div class="flex items-start gap-2.5">
                                <Phone class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span class="text-foreground">{{ order.customer_phone }}</span>
                            </div>
                            <div class="flex items-start gap-2.5">
                                <MapPin class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span class="text-foreground">{{ order.shipping_address }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Info -->
                    <div class="rounded-xl border bg-card p-4 sm:p-5">
                        <h2 class="mb-3 text-base font-semibold text-foreground">
                            Payment
                        </h2>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-muted-foreground">Method</span>
                                <span class="font-medium capitalize text-foreground">
                                    {{ order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method }}
                                </span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground">Status</span>
                                <Badge
                                    variant="secondary"
                                    class="capitalize"
                                    :class="order.payment_status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'"
                                >
                                    {{ order.payment_status }}
                                </Badge>
                            </div>
                            <Separator />
                            <div class="flex justify-between">
                                <span class="font-semibold text-foreground">Total</span>
                                <span class="font-bold text-foreground">
                                    {{ formatPrice(order.total_amount) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
