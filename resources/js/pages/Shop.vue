<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { useIntersectionObserver, watchDebounced } from '@vueuse/core';
import { computed, ref, useTemplateRef, watch } from 'vue';
import ProductCard from '@/components/storefront/ProductCard.vue';
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
import {
    shopCategories,
    shopProducts,
    categoryProductCounts,
} from '@/data/storefront/shop-dummy-products';

const page = usePage();

const searchInput = ref('');
const debouncedSearch = ref('');
watchDebounced(
    searchInput,
    (v) => {
        debouncedSearch.value = v;
    },
    { debounce: 300 },
);

const selectedCategorySlugs = ref<string[]>([]);
const sectionFilter = ref<'best_sellers' | 'new_arrivals' | null>(null);
const sortBy = ref<ShopSortValue>('newest');
const displayedCount = ref(12);
const filtersOpen = ref(false);

const categoryRows = computed(() => {
    const counts = categoryProductCounts(shopCategories, shopProducts);

    return shopCategories.map((c) => ({
        name: c.name,
        slug: c.slug,
        count: counts[c.slug] ?? 0,
    }));
});

function parseUrl(url: string) {
    const q = url.includes('?') ? url.split('?')[1] ?? '' : '';
    const params = new URLSearchParams(q);
    const cat = params.get('category');
    const sec = params.get('section');

    if (cat) {
        selectedCategorySlugs.value = shopCategories.some((c) => c.slug === cat)
            ? [cat]
            : [];
    } else {
        selectedCategorySlugs.value = [];
    }

    if (sec === 'best_sellers' || sec === 'new_arrivals') {
        sectionFilter.value = sec;
    } else {
        sectionFilter.value = null;
    }
}

watch(
    () => page.url,
    (url) => {
        parseUrl(url);
    },
    { immediate: true },
);

const filteredProducts = computed(() => {
    let list = [...shopProducts];

    if (sectionFilter.value === 'best_sellers') {
        list = list.filter((p) => p.isBestSeller);
    } else if (sectionFilter.value === 'new_arrivals') {
        list = list.filter((p) => p.isNew);
    }

    if (selectedCategorySlugs.value.length > 0) {
        const set = new Set(selectedCategorySlugs.value);
        list = list.filter((p) => set.has(p.categorySlug));
    }

    const q = debouncedSearch.value.trim().toLowerCase();

    if (q) {
        list = list.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.code.toLowerCase().includes(q),
        );
    }

    return list;
});

function sortProducts(
    list: typeof shopProducts,
    sort: ShopSortValue,
): typeof shopProducts {
    const out = [...list];
    const price = (p: (typeof shopProducts)[0]) =>
        p.discountPrice != null && p.discountPrice < p.price
            ? p.discountPrice
            : p.price;

    switch (sort) {
        case 'name_asc':
            out.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name_desc':
            out.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price_asc':
            out.sort((a, b) => price(a) - price(b));
            break;
        case 'price_desc':
            out.sort((a, b) => price(b) - price(a));
            break;
        case 'newest':
        default:
            out.sort((a, b) => b.createdAt - a.createdAt);
    }

    return out;
}

const sortedFiltered = computed(() =>
    sortProducts(filteredProducts.value, sortBy.value),
);

watch([selectedCategorySlugs, debouncedSearch, sectionFilter, sortBy], () => {
    displayedCount.value = 12;
});

const visibleProducts = computed(() =>
    sortedFiltered.value.slice(0, displayedCount.value),
);

const hasMore = computed(
    () => displayedCount.value < sortedFiltered.value.length,
);

const loadMoreSentinel = useTemplateRef('loadMoreSentinel');

useIntersectionObserver(
    loadMoreSentinel,
    ([entry]) => {
        if (entry?.isIntersecting && hasMore.value) {
            displayedCount.value = Math.min(
                displayedCount.value + 12,
                sortedFiltered.value.length,
            );
        }
    },
    { rootMargin: '120px' },
);

const activeChips = computed((): ActiveChip[] => {
    const chips: ActiveChip[] = [];

    if (sectionFilter.value === 'best_sellers') {
        chips.push({ id: 'section:best_sellers', label: 'Best sellers' });
    } else if (sectionFilter.value === 'new_arrivals') {
        chips.push({ id: 'section:new_arrivals', label: 'New arrivals' });
    }

    for (const slug of selectedCategorySlugs.value) {
        const cat = shopCategories.find((c) => c.slug === slug);

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
    () =>
        debouncedSearch.value.trim() !== '' ||
        selectedCategorySlugs.value.length > 0 ||
        sectionFilter.value !== null,
);

function removeChip(id: string) {
    if (id === 'search') {
        searchInput.value = '';
        debouncedSearch.value = '';

        return;
    }

    if (id === 'section:best_sellers' || id === 'section:new_arrivals') {
        sectionFilter.value = null;

        return;
    }

    if (id.startsWith('category:')) {
        const slug = id.slice('category:'.length);
        selectedCategorySlugs.value = selectedCategorySlugs.value.filter(
            (s) => s !== slug,
        );
    }
}

function clearAllFilters() {
    searchInput.value = '';
    debouncedSearch.value = '';
    selectedCategorySlugs.value = [];
    sectionFilter.value = null;
    sortBy.value = 'newest';
    router.get('/shop', {}, { replace: true, preserveState: true, preserveScroll: true });
}

function categoryName(slug: string): string {
    return shopCategories.find((c) => c.slug === slug)?.name ?? slug;
}
</script>

<template>
    <Head title="Shop" />

    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <!-- Desktop filters -->
            <aside class="hidden w-full max-w-xs shrink-0 lg:block">
                <ShopCategoryFilterPanel
                    v-model="selectedCategorySlugs"
                    :categories="categoryRows"
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

                <p class="text-xs text-muted-foreground sm:text-sm">
                    Showing
                    <span class="font-medium text-foreground">{{
                        visibleProducts.length
                    }}</span>
                    of
                    <span class="font-medium text-foreground">{{
                        sortedFiltered.length
                    }}</span>
                    products
                    <template v-if="selectedCategorySlugs.length === 1">
                        in
                        <span class="font-medium text-foreground">{{
                            categoryName(selectedCategorySlugs[0]!)
                        }}</span>
                    </template>
                </p>

                <ShopEmptyState
                    v-if="sortedFiltered.length === 0"
                    :has-filters="hasFilterConstraints"
                    @clear-filters="clearAllFilters"
                />

                <div
                    v-else
                    class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
                >
                    <ProductCard
                        v-for="product in visibleProducts"
                        :key="product.slug"
                        :name="product.name"
                        :slug="product.slug"
                        :price="product.price"
                        :discount-price="product.discountPrice"
                        :image="product.image"
                        :stock-status="product.stockStatus ?? 'in_stock'"
                    />
                </div>

                <div
                    v-if="sortedFiltered.length > 0"
                    ref="loadMoreSentinel"
                    class="flex min-h-8 justify-center py-4"
                    aria-hidden="true"
                />

                <p
                    v-if="sortedFiltered.length > 0 && !hasMore"
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
                v-model="selectedCategorySlugs"
                :categories="categoryRows"
            />
        </SheetContent>
    </Sheet>
</template>
