<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LoaderCircle, Package, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import api from '@/lib/axios';
import { useCustomerAuth } from '@/composables/useCustomerAuth';

const { isAuthenticated } = useCustomerAuth();

interface ApiOrder {
    id: number;
    order_number: string;
    customer_name: string;
    total_amount: string;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
    items_count?: number;
    order_items?: any[];
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    total: number;
}

const orders = ref<ApiOrder[]>([]);
const pagination = ref<PaginationMeta | null>(null);
const isLoading = ref(true);
const currentPage = ref(1);

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
    });
}

async function fetchOrders(page = 1) {
    isLoading.value = true;
    try {
        const { data } = await api.get('/storefront/orders', { params: { page } });
        const responseData = data.data;

        orders.value = responseData.data ?? responseData ?? [];
        pagination.value = {
            current_page: responseData.current_page ?? page,
            last_page: responseData.last_page ?? 1,
            total: responseData.total ?? orders.value.length,
        };
        currentPage.value = pagination.value.current_page;
    } catch {
        orders.value = [];
    } finally {
        isLoading.value = false;
    }
}

function goToPage(page: number) {
    fetchOrders(page);
}

const hasNext = computed(() => pagination.value && pagination.value.current_page < pagination.value.last_page);
const hasPrev = computed(() => pagination.value && pagination.value.current_page > 1);

onMounted(() => {
    if (!isAuthenticated.value) {
        router.visit('/customer/login');
        return;
    }
    fetchOrders();
});
</script>

<template>
    <Head title="My Orders" />

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
                        <BreadcrumbPage>My Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </div>

    <section class="py-6 sm:py-8 lg:py-10">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <!-- Page Title -->
            <div class="mb-6 sm:mb-8">
                <h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                    My Orders
                </h1>
                <p class="mt-1 text-sm text-muted-foreground">
                    Track and manage your orders.
                </p>
            </div>

            <!-- Loading -->
            <div
                v-if="isLoading"
                class="flex items-center justify-center py-20"
            >
                <LoaderCircle class="size-8 animate-spin text-primary" />
            </div>

            <!-- Empty state -->
            <div
                v-else-if="orders.length === 0"
                class="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed py-16 text-center"
            >
                <div class="flex size-16 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag class="size-8 text-muted-foreground" />
                </div>
                <div>
                    <p class="font-medium text-foreground">No orders yet</p>
                    <p class="mt-1 text-sm text-muted-foreground">
                        Your orders will appear here once you make a purchase.
                    </p>
                </div>
                <Link href="/shop">
                    <Button>
                        Start Shopping
                        <ArrowRight class="size-4" />
                    </Button>
                </Link>
            </div>

            <!-- Orders List -->
            <div v-else class="space-y-4">
                <div
                    v-for="order in orders"
                    :key="order.id"
                    class="rounded-xl border bg-card transition-shadow hover:shadow-md"
                >
                    <div class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                        <!-- Left: Order info -->
                        <div class="flex items-start gap-3 sm:items-center">
                            <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Package class="size-5 text-primary" />
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-semibold text-foreground">
                                    {{ order.order_number }}
                                </p>
                                <p class="mt-0.5 text-xs text-muted-foreground">
                                    {{ formatDate(order.created_at) }}
                                </p>
                            </div>
                        </div>

                        <!-- Middle: Status + Total -->
                        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                            <Badge
                                variant="secondary"
                                :class="statusClass(order.order_status)"
                                class="capitalize"
                            >
                                {{ order.order_status }}
                            </Badge>
                            <Badge variant="outline" class="capitalize">
                                {{ order.payment_method === 'cod' ? 'COD' : order.payment_method }}
                            </Badge>
                            <span class="text-sm font-bold text-foreground">
                                {{ formatPrice(order.total_amount) }}
                            </span>
                        </div>

                        <!-- Right: View button -->
                        <Link :href="`/orders/${order.order_number}`">
                            <Button variant="outline" size="sm" class="w-full sm:w-auto">
                                View Details
                                <ArrowRight class="size-3.5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <!-- Pagination -->
                <div
                    v-if="pagination && pagination.last_page > 1"
                    class="flex items-center justify-center gap-2 pt-4"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="!hasPrev"
                        @click="goToPage(currentPage - 1)"
                    >
                        <ChevronLeft class="size-4" />
                        Previous
                    </Button>
                    <span class="text-sm text-muted-foreground">
                        Page {{ currentPage }} of {{ pagination.last_page }}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="!hasNext"
                        @click="goToPage(currentPage + 1)"
                    >
                        Next
                        <ChevronRight class="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>
