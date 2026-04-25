<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import ProductCard from '../common/ProductCard.vue';
import api from '@/lib/axios';
import { storageUrl } from '@/lib/axios';

interface ProductImage {
    id: number;
    image_path: string;
    sort_order: number;
    is_primary: boolean;
}

interface ApiProduct {
    id: number;
    name: string;
    slug: string;
    price: string;
    discount_price: string | null;
    stock_status: 'in_stock' | 'out_of_stock';
    images: ProductImage[];
}

interface SectionProduct {
    id: number;
    product: ApiProduct;
}

interface SectionData {
    section_name: string;
    products: SectionProduct[];
}

interface MappedProduct {
    productId: number;
    name: string;
    slug: string;
    price: number;
    discountPrice: number | null;
    image: string | null;
    stockStatus: 'in_stock' | 'out_of_stock';
}

const props = defineProps<{
    sectionName: string;
    title: string;
    subtitle?: string;
    viewAllHref?: string;
}>();

const products = ref<MappedProduct[]>([]);
const isLoading = ref(true);

function getPrimaryImage(images: ProductImage[]): string | null {
    const primary = images.find(img => img.is_primary);
    const img = primary ?? images[0];
    return img ? storageUrl(img.image_path) : null;
}

function mapProducts(sectionProducts: SectionProduct[]): MappedProduct[] {
    return sectionProducts.map(sp => ({
        productId: sp.product.id,
        name: sp.product.name,
        slug: sp.product.slug,
        price: parseFloat(sp.product.price),
        discountPrice: sp.product.discount_price ? parseFloat(sp.product.discount_price) : null,
        image: getPrimaryImage(sp.product.images),
        stockStatus: sp.product.stock_status,
    }));
}

async function fetchSection() {
    try {
        const { data } = await api.get<{ data: SectionData[] }>('/storefront/sections');
        const section = data.data.find(s => s.section_name === props.sectionName);
        if (section) {
            products.value = mapProducts(section.products);
        }
    } catch {
        products.value = [];
    } finally {
        isLoading.value = false;
    }
}

onMounted(fetchSection);

const mobileProducts = computed(() => products.value.slice(0, 4));
</script>

<template>
    <section v-if="!isLoading && products.length > 0" class="py-8 sm:py-12 lg:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mb-5 flex items-end justify-between sm:mb-8">
                <div>
                    <h2
                        class="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl"
                    >
                        {{ title }}
                    </h2>
                    <p
                        v-if="subtitle"
                        class="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm"
                    >
                        {{ subtitle }}
                    </p>
                </div>
                <Link
                    v-if="viewAllHref"
                    :href="viewAllHref"
                    class="group hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
                >
                    View All
                    <ArrowRight
                        class="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                </Link>
            </div>

            <!-- Mobile: show 4 products in 2-col grid -->
            <div class="grid grid-cols-2 gap-3 sm:hidden">
                <ProductCard
                    v-for="product in mobileProducts"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>

            <!-- Tablet+: show all products -->
            <div class="hidden grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                <ProductCard
                    v-for="product in products"
                    :key="product.slug"
                    v-bind="product"
                />
            </div>

            <!-- Mobile View All -->
            <div v-if="viewAllHref" class="mt-5 text-center sm:hidden">
                <Link
                    :href="viewAllHref"
                    class="inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                    View All Products
                    <ArrowRight class="size-4" />
                </Link>
            </div>
        </div>
    </section>
</template>
