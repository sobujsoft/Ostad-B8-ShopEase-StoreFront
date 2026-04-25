<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductImageGallery from '@/components/storefront/product-detail/ProductImageGallery.vue';
import type { GalleryImage } from '@/components/storefront/product-detail/ProductImageGallery.vue';
import ProductInfo from '@/components/storefront/product-detail/ProductInfo.vue';
import ProductDescription from '@/components/storefront/product-detail/ProductDescription.vue';
import RelatedProducts from '@/components/storefront/product-detail/RelatedProducts.vue';
import type { RelatedProduct } from '@/components/storefront/product-detail/RelatedProducts.vue';
import api, { storageUrl } from '@/lib/axios';
import { LoaderCircle } from 'lucide-vue-next';

interface ProductImage {
    id: number;
    image_path: string;
    sort_order: number;
    is_primary: boolean;
}

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
}

interface ApiProduct {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    code: string;
    color: string | null;
    size: string | null;
    short_description: string | null;
    description: string | null;
    price: string;
    discount_price: string | null;
    stock_status: 'in_stock' | 'out_of_stock';
    is_active: boolean;
    images: ProductImage[];
    category: ApiCategory;
}

interface ApiRelatedProduct {
    id: number;
    name: string;
    slug: string;
    price: string;
    discount_price: string | null;
    stock_status: 'in_stock' | 'out_of_stock';
    images: ProductImage[];
}

const page = usePage();

const product = ref<ApiProduct | null>(null);
const relatedProducts = ref<RelatedProduct[]>([]);
const galleryImages = ref<GalleryImage[]>([]);
const isLoading = ref(true);
const notFound = ref(false);

function getSlugFromUrl(): string {
    const url = page.url;
    const parts = url.split('?')[0]!.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? '';
}

function getPrimaryImage(images: ProductImage[]): string | null {
    const primary = images.find(img => img.is_primary);
    const img = primary ?? images[0];
    return img ? storageUrl(img.image_path) : null;
}

function mapGalleryImages(images: ProductImage[]): GalleryImage[] {
    return images
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(img => ({
            id: img.id,
            src: storageUrl(img.image_path),
            alt: product.value?.name ?? 'Product image',
        }));
}

function mapRelatedProducts(items: ApiRelatedProduct[]): RelatedProduct[] {
    return items.map(p => ({
        productId: p.id,
        name: p.name,
        slug: p.slug,
        price: parseFloat(p.price),
        discountPrice: p.discount_price ? parseFloat(p.discount_price) : null,
        image: getPrimaryImage(p.images),
        stockStatus: p.stock_status,
    }));
}

async function fetchProduct() {
    const slug = getSlugFromUrl();
    if (!slug) {
        notFound.value = true;
        isLoading.value = false;
        return;
    }

    try {
        const { data } = await api.get<{
            data: { product: ApiProduct; related_products: ApiRelatedProduct[] };
        }>(`/storefront/products/${slug}`);

        product.value = data.data.product;
        galleryImages.value = mapGalleryImages(data.data.product.images);
        relatedProducts.value = mapRelatedProducts(data.data.related_products);
    } catch {
        notFound.value = true;
    } finally {
        isLoading.value = false;
    }
}

onMounted(fetchProduct);
</script>

<template>
    <!-- Loading -->
    <div
        v-if="isLoading"
        class="flex min-h-[60vh] items-center justify-center"
    >
        <LoaderCircle class="size-10 animate-spin text-primary" />
    </div>

    <!-- Not Found -->
    <div
        v-else-if="notFound || !product"
        class="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center"
    >
        <h1 class="text-2xl font-bold text-foreground">Product Not Found</h1>
        <p class="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/shop" class="text-sm font-medium text-primary hover:text-primary/80">
            Back to Shop
        </Link>
    </div>

    <!-- Product Detail -->
    <template v-else>
        <Head :title="product.name" />

        <!-- Breadcrumb -->
        <div class="border-b bg-muted/30">
            <div class="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 sm:py-4 lg:px-8">
                <Breadcrumb>
                    <BreadcrumbList class="flex-nowrap">
                        <BreadcrumbItem class="hidden sm:inline-flex">
                            <BreadcrumbLink as-child>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator class="hidden sm:block" />
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <Link href="/shop">Shop</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem class="hidden sm:inline-flex">
                            <BreadcrumbLink as-child>
                                <Link :href="`/shop?category=${product.category.slug}`">
                                    {{ product.category.name }}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator class="hidden sm:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage class="line-clamp-1">{{ product.name }}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>

        <!-- Product Detail Section -->
        <section>
            <div class="mx-auto max-w-7xl sm:px-6 sm:py-8 lg:px-8 lg:py-12">
                <div class="grid grid-cols-1 gap-0 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                    <ProductImageGallery :images="galleryImages" />

                    <div class="px-4 py-5 sm:px-0 sm:py-0">
                        <ProductInfo
                            :product-id="product.id"
                            :name="product.name"
                            :code="product.code"
                            :price="parseFloat(product.price)"
                            :discount-price="product.discount_price ? parseFloat(product.discount_price) : null"
                            :short-description="product.short_description"
                            :stock-status="product.stock_status"
                            :color="product.color"
                            :size="product.size"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Product Description -->
        <div v-if="product.description" class="border-t">
            <ProductDescription :description="product.description" />
        </div>

        <!-- Related Products -->
        <RelatedProducts v-if="relatedProducts.length > 0" :products="relatedProducts" />
    </template>
</template>
