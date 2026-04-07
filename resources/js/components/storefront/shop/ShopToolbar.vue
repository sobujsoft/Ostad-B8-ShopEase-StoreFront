<script setup lang="ts">
import { Filter, Search } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export type ShopSortValue =
    | 'name_asc'
    | 'name_desc'
    | 'price_asc'
    | 'price_desc'
    | 'newest';

defineProps<{
    showMobileFilterButton?: boolean;
}>();

const searchModel = defineModel<string>('search', { required: true });
const sortModel = defineModel<ShopSortValue>('sort', { required: true });

const emit = defineEmits<{
    'open-filters': [];
}>();
</script>

<template>
    <div
        class="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-4"
    >
        <div class="relative min-w-0 flex-1">
            <Search
                class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
            />
            <Input
                v-model="searchModel"
                type="search"
                autocomplete="off"
                placeholder="Search by name or code…"
                class="h-10 border-0 bg-muted/50 pl-9 shadow-none focus-visible:bg-background"
                aria-label="Search products by name or code"
            />
        </div>

        <div class="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
                v-if="showMobileFilterButton"
                variant="outline"
                size="sm"
                class="h-10 gap-1.5 lg:hidden"
                type="button"
                @click="emit('open-filters')"
            >
                <Filter class="size-4" />
                Filters
            </Button>

            <Select v-model="sortModel">
                <SelectTrigger
                    class="h-10 w-full min-w-[10.5rem] border-0 bg-muted/50 shadow-none sm:w-[13.5rem]"
                    aria-label="Sort products"
                >
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectItem value="newest"> Newest first </SelectItem>
                    <SelectItem value="name_asc"> Name (A → Z) </SelectItem>
                    <SelectItem value="name_desc"> Name (Z → A) </SelectItem>
                    <SelectItem value="price_asc"> Price (Low → High) </SelectItem>
                    <SelectItem value="price_desc"> Price (High → Low) </SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>
