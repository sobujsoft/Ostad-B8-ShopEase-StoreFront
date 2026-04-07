<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductImageGallery from '@/components/storefront/product-detail/ProductImageGallery.vue';
import ProductInfo from '@/components/storefront/product-detail/ProductInfo.vue';
import ProductDescription from '@/components/storefront/product-detail/ProductDescription.vue';
import RelatedProducts from '@/components/storefront/product-detail/RelatedProducts.vue';
import {
    dummyProduct,
    relatedProducts,
} from '@/data/storefront/product-detail-dummy';
</script>

<template>
    <Head :title="dummyProduct.name" />

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
                            <Link
                                :href="`/shop?category=${dummyProduct.categorySlug}`"
                            >
                                {{ dummyProduct.categoryName }}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator class="hidden sm:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage class="line-clamp-1">{{ dummyProduct.name }}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </div>

    <!-- Product Detail Section -->
    <section>
        <div class="mx-auto max-w-7xl sm:px-6 sm:py-8 lg:px-8 lg:py-12">
            <div
                class="grid grid-cols-1 gap-0 sm:gap-8 lg:grid-cols-2 lg:gap-12"
            >
                <!-- Left: Image Gallery -->
                <ProductImageGallery :images="dummyProduct.images" />

                <!-- Right: Product Info -->
                <div class="px-4 py-5 sm:px-0 sm:py-0">
                    <ProductInfo
                        :name="dummyProduct.name"
                        :code="dummyProduct.code"
                        :price="dummyProduct.price"
                        :discount-price="dummyProduct.discountPrice"
                        :short-description="dummyProduct.shortDescription"
                        :stock-status="dummyProduct.stockStatus"
                        :variants="dummyProduct.variants"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Product Description -->
    <div class="border-t">
        <ProductDescription :description="dummyProduct.description" />
    </div>

    <!-- Related Products -->
    <RelatedProducts :products="relatedProducts" />
</template>
