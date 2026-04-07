<script setup lang="ts">
import StorefrontHeader from '@/components/storefront/common/StorefrontHeader.vue';
import StorefrontFooter from '@/components/storefront/common/StorefrontFooter.vue';
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <StorefrontHeader />
        <main class="flex-1 pt-14 sm:pt-16 lg:pt-18">
            <slot />
        </main>
        <StorefrontFooter />
    </div>
</template>
