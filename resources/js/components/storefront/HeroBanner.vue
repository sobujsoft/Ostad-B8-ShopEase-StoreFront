<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Slide {
    tag: string;
    headline: string;
    highlightedText: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    bgGradient: string;
    overlayAccent: string;
}

const slides: Slide[] = [
    {
        tag: 'New Collection 2026',
        headline: 'Discover Your',
        highlightedText: 'Perfect Style',
        description:
            'Explore our curated collection of premium products. Quality you can trust, prices you\'ll love.',
        ctaText: 'Shop Now',
        ctaHref: '/shop',
        bgGradient:
            'bg-[url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80")] bg-cover bg-center',
        overlayAccent: 'from-orange-600/20 via-transparent to-transparent',
    },
    {
        tag: 'Up to 40% Off',
        headline: 'Summer Sale',
        highlightedText: 'Starts Now',
        description:
            'Unbeatable deals on top brands. Limited time only — grab your favorites before they\'re gone.',
        ctaText: 'View Deals',
        ctaHref: '/shop?section=best_sellers',
        bgGradient:
            'bg-[url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80")] bg-cover bg-center',
        overlayAccent: 'from-amber-600/20 via-transparent to-transparent',
    },
    {
        tag: 'Just Arrived',
        headline: 'Fresh Finds,',
        highlightedText: 'Daily Deals',
        description:
            'Be the first to shop our latest arrivals. New products added every week just for you.',
        ctaText: 'Explore New',
        ctaHref: '/shop?section=new_arrivals',
        bgGradient:
            'bg-[url("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80")] bg-cover bg-center',
        overlayAccent: 'from-rose-600/20 via-transparent to-transparent',
    },
];

const currentSlide = ref(0);
const isTransitioning = ref(false);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

function goToSlide(index: number) {
    if (isTransitioning.value || index === currentSlide.value) return;
    isTransitioning.value = true;
    currentSlide.value = index;
    resetAutoplay();
    setTimeout(() => (isTransitioning.value = false), 700);
}

function nextSlide() {
    goToSlide((currentSlide.value + 1) % slides.length);
}

function prevSlide() {
    goToSlide((currentSlide.value - 1 + slides.length) % slides.length);
}

function resetAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 6000);
}

onMounted(() => {
    autoplayTimer = setInterval(nextSlide, 6000);
});

onUnmounted(() => {
    if (autoplayTimer) clearInterval(autoplayTimer);
});
</script>

<template>
    <section class="relative h-[520px] overflow-hidden sm:h-[580px] lg:h-[640px]">
        <!-- Slides -->
        <div
            v-for="(slide, index) in slides"
            :key="index"
            :class="[
                'absolute inset-0 transition-all duration-700 ease-in-out',
                index === currentSlide
                    ? 'z-10 scale-100 opacity-100'
                    : 'z-0 scale-105 opacity-0',
            ]"
        >
            <!-- Background Image -->
            <div :class="['absolute inset-0', slide.bgGradient]">
                <!-- Fallback gradient if image fails -->
                <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
            </div>

            <!-- Dark overlay for text readability -->
            <div class="absolute inset-0 bg-black/50"></div>

            <!-- Accent gradient overlay -->
            <div
                :class="['absolute inset-0 bg-gradient-to-r', slide.overlayAccent]"
            ></div>
        </div>

        <!-- Content (stays on top of all slides) -->
        <div class="relative z-20 flex h-full items-center">
            <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid items-center gap-8 lg:grid-cols-2">
                    <!-- Text Content -->
                    <div class="max-w-xl">
                        <!-- Animated tag -->
                        <TransitionGroup
                            enter-active-class="transition-all duration-500 delay-100"
                            enter-from-class="-translate-y-3 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition-all duration-300 absolute"
                            leave-from-class="opacity-100"
                            leave-to-class="-translate-y-3 opacity-0"
                        >
                            <div
                                :key="'tag-' + currentSlide"
                                class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                            >
                                <span
                                    class="size-1.5 rounded-full bg-orange-400"
                                ></span>
                                {{ slides[currentSlide].tag }}
                            </div>
                        </TransitionGroup>

                        <!-- Animated headline -->
                        <TransitionGroup
                            enter-active-class="transition-all duration-500 delay-200"
                            enter-from-class="translate-y-4 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition-all duration-300 absolute"
                            leave-from-class="opacity-100"
                            leave-to-class="translate-y-4 opacity-0"
                        >
                            <h1
                                :key="'headline-' + currentSlide"
                                class="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
                            >
                                {{ slides[currentSlide].headline }}
                                <br />
                                <span
                                    class="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent"
                                >
                                    {{ slides[currentSlide].highlightedText }}
                                </span>
                            </h1>
                        </TransitionGroup>

                        <!-- Animated description -->
                        <TransitionGroup
                            enter-active-class="transition-all duration-500 delay-300"
                            enter-from-class="translate-y-4 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition-all duration-300 absolute"
                            leave-from-class="opacity-100"
                            leave-to-class="translate-y-4 opacity-0"
                        >
                            <p
                                :key="'desc-' + currentSlide"
                                class="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
                            >
                                {{ slides[currentSlide].description }}
                            </p>
                        </TransitionGroup>

                        <!-- Animated CTA -->
                        <TransitionGroup
                            enter-active-class="transition-all duration-500 delay-[400ms]"
                            enter-from-class="translate-y-4 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition-all duration-300 absolute"
                            leave-from-class="opacity-100"
                            leave-to-class="translate-y-4 opacity-0"
                        >
                            <div
                                :key="'cta-' + currentSlide"
                                class="mt-8 flex flex-wrap items-center gap-4"
                            >
                                <Link :href="slides[currentSlide].ctaHref">
                                    <Button
                                        size="lg"
                                        class="h-12 rounded-full bg-orange-500 px-8 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600"
                                    >
                                        {{ slides[currentSlide].ctaText }}
                                        <ArrowRight class="size-4" />
                                    </Button>
                                </Link>
                                <Link href="/shop">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        class="h-12 rounded-full border-white/20 px-8 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
                                    >
                                        Browse All
                                    </Button>
                                </Link>
                            </div>
                        </TransitionGroup>
                    </div>

                    <!-- Right side stats panel (desktop) -->
                    <div class="hidden justify-end lg:flex">
                        <div class="grid w-56 gap-3">
                            <div
                                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                            >
                                <p class="text-3xl font-bold text-white">10k+</p>
                                <p class="mt-1 text-sm text-white/50">
                                    Happy Customers
                                </p>
                            </div>
                            <div
                                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                            >
                                <p class="text-3xl font-bold text-orange-400">
                                    2k+
                                </p>
                                <p class="mt-1 text-sm text-white/50">
                                    Premium Products
                                </p>
                            </div>
                            <div
                                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                            >
                                <p class="text-3xl font-bold text-white">
                                    Free
                                </p>
                                <p class="mt-1 text-sm text-white/50">
                                    Shipping Over $50
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation Arrows -->
        <button
            class="absolute top-1/2 left-4 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 sm:left-6 sm:size-12"
            aria-label="Previous slide"
            @click="prevSlide"
        >
            <ChevronLeft class="size-5" />
        </button>
        <button
            class="absolute top-1/2 right-4 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 sm:right-6 sm:size-12"
            aria-label="Next slide"
            @click="nextSlide"
        >
            <ChevronRight class="size-5" />
        </button>

        <!-- Slide Indicators -->
        <div class="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
            <button
                v-for="(_, index) in slides"
                :key="index"
                :class="[
                    'h-2 rounded-full transition-all duration-500',
                    index === currentSlide
                        ? 'w-8 bg-orange-500'
                        : 'w-2 bg-white/40 hover:bg-white/60',
                ]"
                :aria-label="`Go to slide ${index + 1}`"
                @click="goToSlide(index)"
            />
        </div>

        <!-- Progress bar -->
        <div class="absolute bottom-0 left-0 z-30 h-0.5 w-full bg-white/10">
            <div
                class="h-full bg-orange-500 transition-all duration-300"
                :style="{ width: `${((currentSlide + 1) / slides.length) * 100}%` }"
            ></div>
        </div>
    </section>
</template>
