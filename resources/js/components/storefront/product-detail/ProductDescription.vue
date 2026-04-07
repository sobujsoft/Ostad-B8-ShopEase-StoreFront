<script setup lang="ts">
defineProps<{
    description: string;
}>();
</script>

<template>
    <section class="py-8 sm:py-10 lg:py-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
                class="mb-4 text-lg font-bold tracking-tight text-foreground sm:mb-6 sm:text-xl lg:text-2xl"
            >
                Product Description
            </h2>
            <div
                class="prose prose-sm max-w-none text-muted-foreground sm:prose-base prose-headings:font-semibold prose-headings:text-foreground prose-h3:text-base prose-h3:sm:text-lg prose-strong:text-foreground prose-li:marker:text-primary"
                v-html="description"
            />
        </div>
    </section>
</template>
