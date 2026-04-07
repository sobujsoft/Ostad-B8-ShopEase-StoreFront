<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ActiveChip {
    id: string;
    label: string;
}

defineProps<{
    chips: ActiveChip[];
}>();

const emit = defineEmits<{
    remove: [id: string];
    'clear-all': [];
}>();
</script>

<template>
    <div
        v-if="chips.length > 0"
        class="flex flex-wrap items-center gap-2 border-b border-border/60 pb-4"
    >
        <span class="w-full text-xs font-medium text-muted-foreground sm:w-auto">
            Active filters
        </span>
        <div class="flex flex-1 flex-wrap items-center gap-2">
            <Badge
                v-for="chip in chips"
                :key="chip.id"
                variant="secondary"
                class="gap-1 pr-1 pl-2.5 text-xs font-normal"
            >
                {{ chip.label }}
                <button
                    type="button"
                    class="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    :aria-label="`Remove ${chip.label}`"
                    @click="emit('remove', chip.id)"
                >
                    <X class="size-3.5" />
                </button>
            </Badge>
        </div>
        <Button
            variant="ghost"
            size="sm"
            class="h-8 text-xs text-muted-foreground hover:text-foreground"
            type="button"
            @click="emit('clear-all')"
        >
            Clear all
        </Button>
    </div>
</template>
