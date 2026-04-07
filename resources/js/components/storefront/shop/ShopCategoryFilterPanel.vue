<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface CategoryRow {
    name: string;
    slug: string;
    count: number;
}

const props = defineProps<{
    categories: CategoryRow[];
    modelValue: string[];
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string[]];
}>();

function isChecked(slug: string): boolean {
    return props.modelValue.includes(slug);
}

function toggle(slug: string, checked: boolean) {
    const next = new Set(props.modelValue);

    if (checked) {
        next.add(slug);
    } else {
        next.delete(slug);
    }

    emit('update:modelValue', [...next]);
}

function clearCategories() {
    emit('update:modelValue', []);
}
</script>

<template>
    <div class="rounded-xl border bg-card p-4 shadow-sm sm:p-5">
        <div class="flex items-center justify-between gap-2">
            <h2 class="text-sm font-semibold tracking-tight text-foreground">
                Category
            </h2>
            <button
                v-if="modelValue.length > 0"
                type="button"
                class="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                @click="clearCategories"
            >
                Reset
            </button>
        </div>
        <p class="mt-1 text-xs text-muted-foreground">
            Narrow results by category
        </p>
        <ul class="mt-4 max-h-[min(24rem,55vh)] space-y-3 overflow-y-auto pr-1 lg:max-h-none">
            <li v-for="cat in categories" :key="cat.slug">
                <div class="flex items-center gap-3">
                    <Checkbox
                        :id="`shop-cat-${cat.slug}`"
                        :checked="isChecked(cat.slug)"
                        @update:checked="
                            (v: boolean | 'indeterminate') =>
                                toggle(cat.slug, v === true)
                        "
                    />
                    <Label
                        :for="`shop-cat-${cat.slug}`"
                        class="flex flex-1 cursor-pointer items-center justify-between gap-2 text-sm font-normal leading-none"
                    >
                        <span class="text-foreground">{{ cat.name }}</span>
                        <span class="shrink-0 text-xs text-muted-foreground tabular-nums">
                            {{ cat.count }}
                        </span>
                    </Label>
                </div>
            </li>
        </ul>
    </div>
</template>
