<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { watchDebounced } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import ProductCard from '@/components/storefront/common/ProductCard.vue';
import ShopActiveFilterChips from '@/components/storefront/shop/ShopActiveFilterChips.vue';
import type { ActiveChip } from '@/components/storefront/shop/ShopActiveFilterChips.vue';
import ShopCategoryFilterPanel from '@/components/storefront/shop/ShopCategoryFilterPanel.vue';
import ShopEmptyState from '@/components/storefront/shop/ShopEmptyState.vue';
import type { ShopSortValue } from '@/components/storefront/shop/ShopToolbar.vue';
import ShopToolbar from '@/components/storefront/shop/ShopToolbar.vue';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import api, { storageUrl } from '@/lib/axios';
import { LoaderCircle } from 'lucide-vue-next';

interface ProductImage {
    id: number;
    image_path: string;
    sort_order: number;
    is_primary: boolean;
}

interface ApiProduct {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    code: string;
    price: string;
    discount_price: string | null;
    stock_status: 'in_stock' | 'out_of_stock';
    is_active: boolean;
    images: ProductImage[];
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    is_active: boolean;
    sort_order: number;
    products_count: number;
}

const page = usePage();

const searchInput = ref('');
const debouncedSearch = ref('');
watchDebounced(searchInput, (v) => { debouncedSearch.value = v; }, { debounce: 400 });

const selectedCategorySlugs = ref<string[]>([]);
const sortBy = ref<ShopSortValue>('newest');
const filtersOpen = ref(false);

const selectedCategoryId = computed(() => {
    if (selectedCategorySlugs.value.length === 0) return null;
    const slug = selectedCategorySlugs.value[selectedCategorySlugs.value.length - 1];
    const cat = categories.value.find(c => c.slug === slug);
    return cat?.id ?? null;
});

const products = ref<ApiProduct[]>([]);
const paginationMeta = ref<PaginationMeta | null>(null);
const isLoadingProducts = ref(true);
const isLoadingMore = ref(false);

const categories = ref<ApiCategory[]>([]);
const isLoadingCategories = ref(true);

const sortApiMap: Record<ShopSortValue, string> = {
    newest: 'newest',
    price_asc: 'price_asc',
    price_desc: 'price_desc',
    name_asc: 'newest',
    name_desc: 'newest',
};

function getPrimaryImage(images: ProductImage[]): string | null {
    const primary = images.find(img => img.is_primary);
    const img = primary ?? images[0];
    return img ? storageUrl(img.image_path) : null;
}

async function fetchCategories() {
    try {
        const { data } = await api.get<{ data: ApiCategory[] }>('/storefront/categories');
        categories.value = data.data;
    } catch {
        categories.value = [];
    } finally {
        isLoadingCategories.value = false;
    }
}

async function fetchProducts(pageNum = 1, append = false) {
    if (append) {
        isLoadingMore.value = true;
    } else {
        isLoadingProducts.value = true;
    }

    try {
        const params: Record<string, string | number> = { page: pageNum };

        if (debouncedSearch.value.trim()) {
            params.search = debouncedSearch.value.trim();
        }
        if (selectedCategoryId.value) {
            params.category_id = selectedCategoryId.value;
        }
        params.sort = sortApiMap[sortBy.value] ?? 'newest';

        const { data } = await api.get<{ data: { data: ApiProduct[]; current_page: number; last_page: number; per_page: number; total: number } }>('/storefront/products', { params });

        if (append) {
            products.value = [...products.value, ...data.data.data];
        } else {
            products.value = data.data.data;
        }

        paginationMeta.value = {
            current_page: data.data.current_page,
            last_page: data.data.last_page,
            per_page: data.data.per_page,
            total: data.data.total,
        };
    } catch {
        if (!append) {
            products.value = [];
            paginationMeta.value = null;
        }
    } finally {
        isLoadingProducts.value = false;
        isLoadingMore.value = false;
    }
}

function parseUrl(url: string) {
    const q = url.includes('?') ? url.split('?')[1] ?? '' : '';
    const params = new URLSearchParams(q);
    const catSlug = params.get('category');

    if (catSlug && categories.value.some(c => c.slug === catSlug)) {
        selectedCategorySlugs.value = [catSlug];
    }
}

const categoryRows = computed(() =>
    categories.value.map(c => ({
        name: c.name,
        slug: c.slug,
        count: c.products_count,
    })),
);

const hasMore = computed(() => {
    if (!paginationMeta.value) return false;
    return paginationMeta.value.current_page < paginationMeta.value.last_page;
});

const totalCount = computed(() => paginationMeta.value?.total ?? 0);

function loadMore() {
    if (!hasMore.value || isLoadingMore.value || !paginationMeta.value) return;
    fetchProducts(paginationMeta.value.current_page + 1, true);
}

const loadMoreSentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function setupObserver() {
    if (observer) observer.disconnect();
    if (!loadMoreSentinel.value) return;

    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry?.isIntersecting && hasMore.value) {
                loadMore();
            }
        },
        { rootMargin: '200px' },
    );
    observer.observe(loadMoreSentinel.value);
}

watch(loadMoreSentinel, () => setupObserver());

watch(debouncedSearch, () => fetchProducts(1, false));
watch(sortBy, () => fetchProducts(1, false));

const activeChips = computed((): ActiveChip[] => {
    const chips: ActiveChip[] = [];

    for (const slug of selectedCategorySlugs.value) {
        const cat = categories.value.find(c => c.slug === slug);
        if (cat) {
            chips.push({ id: `category:${slug}`, label: cat.name });
        }
    }

    const q = debouncedSearch.value.trim();
    if (q) {
        chips.push({ id: 'search', label: `Search: ${q}` });
    }

    return chips;
});

const hasFilterConstraints = computed(
    () => debouncedSearch.value.trim() !== '' || selectedCategorySlugs.value.length > 0,
);

function removeChip(id: string) {
    if (id === 'search') {
        searchInput.value = '';
        debouncedSearch.value = '';
        return;
    }
    if (id.startsWith('category:')) {
        const slug = id.slice('category:'.length);
        selectedCategorySlugs.value = selectedCategorySlugs.value.filter(s => s !== slug);
    }
}

function clearAllFilters() {
    searchInput.value = '';
    debouncedSearch.value = '';
    selectedCategorySlugs.value = [];
    sortBy.value = 'newest';
    router.get('/shop', {}, { replace: true, preserveState: true, preserveScroll: true });
}

function onCategoryChange(slugs: string[]) {
    selectedCategorySlugs.value = slugs;
    fetchProducts(1, false);
}

function categoryName(slug: string): string {
    return categories.value.find(c => c.slug === slug)?.name ?? slug;
}

onMounted(async () => {
    await fetchCategories();
    parseUrl(page.url);
    await fetchProducts();
});
</script>

<template>
    <Head title="Shop" />

    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <!-- Desktop filters -->
            <aside class="hidden w-full max-w-xs shrink-0 lg:block">
                <ShopCategoryFilterPanel
                    :model-value="selectedCategorySlugs"
                    :categories="categoryRows"
                    @update:model-value="onCategoryChange"
                />
            </aside>

            <div class="min-w-0 flex-1 space-y-4">
                <ShopToolbar
                    v-model:search="searchInput"
                    v-model:sort="sortBy"
                    show-mobile-filter-button
                    @open-filters="filtersOpen = true"
                />

                <ShopActiveFilterChips
                    :chips="activeChips"
                    @remove="removeChip"
                    @clear-all="clearAllFilters"
                />

                <p v-if="!isLoadingProducts" class="text-xs text-muted-foreground sm:text-sm">
                    Showing
                    <span class="font-medium text-foreground">{{ products.length }}</span>
                    of
                    <span class="font-medium text-foreground">{{ totalCount }}</span>
                    products
                    <template v-if="selectedCategorySlugs.length === 1">
                        in
                        <span class="font-medium text-foreground">{{
                            categoryName(selectedCategorySlugs[0]!)
                        }}</span>
                    </template>
                </p>

                <!-- Loading state -->
                <div
                    v-if="isLoadingProducts"
                    class="flex items-center justify-center py-20"
                >
                    <LoaderCircle class="size-8 animate-spin text-primary" />
                </div>

                <ShopEmptyState
                    v-else-if="products.length === 0"
                    :has-filters="hasFilterConstraints"
                    @clear-filters="clearAllFilters"
                />

                <div
                    v-else
                    class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
                >
                    <ProductCard
                        v-for="product in products"
                        :key="product.slug"
                        :product-id="product.id"
                        :name="product.name"
                        :slug="product.slug"
                        :price="parseFloat(product.price)"
                        :discount-price="product.discount_price ? parseFloat(product.discount_price) : null"
                        :image="getPrimaryImage(product.images)"
                        :stock-status="product.stock_status ?? 'in_stock'"
                    />
                </div>

                <!-- Load more sentinel -->
                <div
                    v-if="products.length > 0"
                    ref="loadMoreSentinel"
                    class="flex min-h-8 justify-center py-4"
                    aria-hidden="true"
                >
                    <LoaderCircle v-if="isLoadingMore" class="size-6 animate-spin text-primary" />
                </div>

                <p
                    v-if="products.length > 0 && !hasMore && !isLoadingProducts"
                    class="text-center text-xs text-muted-foreground"
                >
                    You've reached the end of the list.
                </p>
            </div>
        </div>
    </div>

    <!-- Mobile / tablet filter drawer -->
    <Sheet v-model:open="filtersOpen">
        <SheetContent side="left" class="flex w-[min(100%,22rem)] flex-col gap-4">
            <SheetHeader class="text-left">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                    Choose one or more categories. Combine with search and sort in the main
                    view.
                </SheetDescription>
            </SheetHeader>
            <ShopCategoryFilterPanel
                :model-value="selectedCategorySlugs"
                :categories="categoryRows"
                @update:model-value="onCategoryChange"
            />
        </SheetContent>
    </Sheet>
</template>
