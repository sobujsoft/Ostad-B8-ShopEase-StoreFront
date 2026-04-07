<script setup lang="ts">
import { PackageSearch } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

defineProps<{
    hasFilters: boolean;
}>();

const emit = defineEmits<{
    'clear-filters': [];
}>();
</script>

<template>
    <div
        class="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-16 text-center sm:py-20"
    >
        <div
            class="mb-4 flex size-16 items-center justify-center rounded-full bg-muted sm:size-20"
            aria-hidden="true"
        >
            <PackageSearch class="size-8 text-muted-foreground sm:size-10" />
        </div>
        <h2 class="text-lg font-semibold text-foreground sm:text-xl">
            No products match
        </h2>
        <p class="mt-2 max-w-md text-sm text-muted-foreground">
            {{
                hasFilters
                    ? 'Try clearing filters or searching with a different name or product code.'
                    : 'There are no products to show right now.'
            }}
        </p>
        <Button
            v-if="hasFilters"
            variant="outline"
            size="sm"
            class="mt-6"
            type="button"
            @click="emit('clear-filters')"
        >
            Clear filters
        </Button>
    </div>
</template>
