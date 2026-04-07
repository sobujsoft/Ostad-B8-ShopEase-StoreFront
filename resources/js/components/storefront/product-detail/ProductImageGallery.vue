<script setup lang="ts">
import { ref, computed } from 'vue';
import { ImageOff, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-vue-next';
import type { ProductImage } from '@/data/storefront/product-detail-dummy';

const props = defineProps<{
    images: ProductImage[];
}>();

const activeIndex = ref(0);
const lightboxOpen = ref(false);

const activeImage = computed(() => props.images[activeIndex.value]);

function selectImage(index: number) {
    activeIndex.value = index;
}

function prevImage() {
    activeIndex.value =
        activeIndex.value > 0 ? activeIndex.value - 1 : props.images.length - 1;
}

function nextImage() {
    activeIndex.value =
        activeIndex.value < props.images.length - 1 ? activeIndex.value + 1 : 0;
}

function openLightbox() {
    lightboxOpen.value = true;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxOpen.value = false;
    document.body.style.overflow = '';
}

function handleKeydown(e: KeyboardEvent) {
    if (!lightboxOpen.value) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
}
</script>

<template>
    <div class="sm:space-y-4" @keydown="handleKeydown" tabindex="0">
        <!-- Main Image -->
        <div
            class="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted sm:aspect-square sm:rounded-xl sm:border"
            @click="openLightbox"
        >
            <img
                v-if="activeImage"
                :src="activeImage.src"
                :alt="activeImage.alt"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
                v-else
                class="flex size-full items-center justify-center"
            >
                <ImageOff class="size-12 text-muted-foreground/30 sm:size-16" />
            </div>

            <!-- Zoom hint (desktop only) -->
            <div
                class="absolute right-3 bottom-3 hidden items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:flex"
            >
                <ZoomIn class="size-3.5" />
                Click to zoom
            </div>

            <!-- Mobile navigation arrows -->
            <button
                v-if="images.length > 1"
                class="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm transition-colors active:bg-white sm:hidden"
                @click.stop="prevImage"
                aria-label="Previous image"
            >
                <ChevronLeft class="size-5" />
            </button>
            <button
                v-if="images.length > 1"
                class="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm transition-colors active:bg-white sm:hidden"
                @click.stop="nextImage"
                aria-label="Next image"
            >
                <ChevronRight class="size-5" />
            </button>

            <!-- Mobile dots indicator -->
            <div
                v-if="images.length > 1"
                class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur-sm sm:hidden"
            >
                <button
                    v-for="(_, index) in images"
                    :key="index"
                    :class="[
                        'rounded-full transition-all',
                        index === activeIndex
                            ? 'h-2 w-5 bg-white'
                            : 'size-2 bg-white/50',
                    ]"
                    @click.stop="selectImage(index)"
                    :aria-label="`View image ${index + 1}`"
                />
            </div>

            <!-- Image counter badge (mobile) -->
            <div
                v-if="images.length > 1"
                class="absolute top-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm sm:hidden"
            >
                {{ activeIndex + 1 }}/{{ images.length }}
            </div>
        </div>

        <!-- Thumbnail Strip (desktop/tablet) -->
        <div v-if="images.length > 1" class="hidden gap-2 sm:flex sm:gap-3">
            <button
                v-for="(image, index) in images"
                :key="image.id"
                :class="[
                    'relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:w-20',
                    index === activeIndex
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent opacity-60 hover:opacity-100',
                ]"
                @click="selectImage(index)"
                :aria-label="`View image ${index + 1}`"
            >
                <img
                    :src="image.src"
                    :alt="image.alt"
                    class="size-full object-cover"
                />
            </button>
        </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="lightboxOpen"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                @click.self="closeLightbox"
                @keydown.escape="closeLightbox"
                @keydown.left="prevImage"
                @keydown.right="nextImage"
                tabindex="0"
                ref="lightboxRef"
            >
                <!-- Close button -->
                <button
                    class="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    @click="closeLightbox"
                    aria-label="Close lightbox"
                >
                    <X class="size-5" />
                </button>

                <!-- Navigation arrows -->
                <button
                    v-if="images.length > 1"
                    class="absolute top-1/2 left-4 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:size-12"
                    @click="prevImage"
                    aria-label="Previous image"
                >
                    <ChevronLeft class="size-5 sm:size-6" />
                </button>
                <button
                    v-if="images.length > 1"
                    class="absolute top-1/2 right-4 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:size-12"
                    @click="nextImage"
                    aria-label="Next image"
                >
                    <ChevronRight class="size-5 sm:size-6" />
                </button>

                <!-- Image -->
                <img
                    v-if="activeImage"
                    :src="activeImage.src"
                    :alt="activeImage.alt"
                    class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
                />

                <!-- Counter -->
                <div
                    class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm"
                >
                    {{ activeIndex + 1 }} / {{ images.length }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
