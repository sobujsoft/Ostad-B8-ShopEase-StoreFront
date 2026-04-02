<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import CategoryCard from './CategoryCard.vue';

interface Category {
    name: string;
    slug: string;
    image?: string | null;
    productCount?: number;
}

defineProps<{
    categories: Category[];
}>();

const scrollContainer = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

function updateScrollState() {
    const el = scrollContainer.value;
    if (!el) return;
    canScrollLeft.value = el.scrollLeft > 10;
    canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
}

function scroll(direction: 'left' | 'right') {
    if (!scrollContainer.value) return;
    const amount = direction === 'left' ? -300 : 300;
    scrollContainer.value.scrollBy({ left: amount, behavior: 'smooth' });
}
</script>

<template>
    <section class="py-8 sm:py-14 lg:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="mb-5 flex items-end justify-between sm:mb-10">
                <div>
                    <span
                        class="mb-1 inline-block text-xs font-semibold tracking-wide text-primary uppercase sm:mb-2 sm:text-sm"
                    >
                        Categories
                    </span>
                    <h2
                        class="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl"
                    >
                        Shop by Category
                    </h2>
                </div>
                <div class="flex items-center gap-3">
                    <div class="hidden gap-2 sm:flex lg:hidden">
                        <Button
                            variant="outline"
                            size="icon-sm"
                            class="rounded-full"
                            :disabled="!canScrollLeft"
                            aria-label="Scroll left"
                            @click="scroll('left')"
                        >
                            <ChevronLeft class="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon-sm"
                            class="rounded-full"
                            :disabled="!canScrollRight"
                            aria-label="Scroll right"
                            @click="scroll('right')"
                        >
                            <ChevronRight class="size-4" />
                        </Button>
                    </div>
                    <Link
                        href="/shop"
                        class="group hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
                    >
                        View All
                        <ArrowRight
                            class="size-4 transition-transform group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>
            </div>

            <!-- Mobile + Tablet: Horizontal scroll -->
            <div
                ref="scrollContainer"
                class="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:gap-4 lg:hidden"
                style="
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                "
                @scroll="updateScrollState"
            >
                <div
                    v-for="category in categories"
                    :key="category.slug"
                    style="scroll-snap-align: start"
                >
                    <CategoryCard v-bind="category" />
                </div>
            </div>

            <!-- Desktop: Full grid -->
            <div class="hidden grid-cols-4 gap-5 lg:grid">
                <CategoryCard
                    v-for="category in categories"
                    :key="category.slug"
                    v-bind="category"
                />
            </div>

            <!-- Mobile View All -->
            <div class="mt-4 text-center sm:hidden">
                <Link
                    href="/shop"
                    class="inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                    View All Categories
                    <ArrowRight class="size-4" />
                </Link>
            </div>
        </div>
    </section>
</template>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
