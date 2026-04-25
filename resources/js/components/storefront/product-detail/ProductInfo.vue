<script setup lang="ts">
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
    ShoppingCart,
    Zap,
    Plus,
    Minus,
    CircleCheck,
    CircleX,
    Truck,
    RotateCcw,
    Shield,
    Check,
} from 'lucide-vue-next';
import { useCart } from '@/composables/useCart';

const props = defineProps<{
    productId: number;
    name: string;
    code: string;
    price: number;
    discountPrice?: number | null;
    shortDescription?: string | null;
    stockStatus: 'in_stock' | 'out_of_stock';
    color?: string | null;
    size?: string | null;
}>();

const { addToCart } = useCart();
const quantity = ref(1);
const adding = ref(false);
const justAdded = ref(false);

async function handleAddToCart() {
    if (adding.value || isOutOfStock.value) return;
    adding.value = true;
    const ok = await addToCart(props.productId, quantity.value);
    adding.value = false;
    if (ok) {
        justAdded.value = true;
        setTimeout(() => { justAdded.value = false; }, 2000);
    }
}

async function handleBuyNow() {
    if (adding.value || isOutOfStock.value) return;
    adding.value = true;
    const ok = await addToCart(props.productId, quantity.value);
    adding.value = false;
    if (ok) {
        router.visit('/checkout');
    }
}

const colorOptions = computed(() => {
    if (!props.color) return [];
    return props.color.split(',').map(c => c.trim()).filter(Boolean);
});

const sizeOptions = computed(() => {
    if (!props.size) return [];
    return props.size.split(',').map(s => s.trim()).filter(Boolean);
});

const selectedColor = ref('');
const selectedSize = ref('');

if (colorOptions.value.length > 0) {
    selectedColor.value = colorOptions.value[0]!;
}
if (sizeOptions.value.length > 0) {
    selectedSize.value = sizeOptions.value[0]!;
}

const discountPercentage = computed(() => {
    if (props.discountPrice && props.discountPrice < props.price) {
        return Math.round(
            ((props.price - props.discountPrice) / props.price) * 100,
        );
    }
    return 0;
});

const displayPrice = computed(() => {
    return props.discountPrice && props.discountPrice < props.price
        ? props.discountPrice
        : props.price;
});

const isOutOfStock = computed(() => props.stockStatus === 'out_of_stock');

function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

function incrementQty() {
    if (quantity.value < 10) quantity.value++;
}

function decrementQty() {
    if (quantity.value > 1) quantity.value--;
}
</script>

<template>
    <div class="space-y-4 sm:space-y-5">
        <!-- Product Name -->
        <div>
            <h1
                class="text-lg font-bold leading-tight tracking-tight text-foreground sm:text-2xl lg:text-3xl"
            >
                {{ name }}
            </h1>

            <!-- Code & Stock -->
            <div class="mt-1.5 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
                <span class="text-xs text-muted-foreground sm:text-sm">
                    Code: <span class="font-medium text-foreground">{{ code }}</span>
                </span>
                <span class="text-muted-foreground">·</span>
                <Badge
                    v-if="!isOutOfStock"
                    class="bg-green-500/10 text-green-600 hover:bg-green-500/10 dark:text-green-400"
                    variant="outline"
                >
                    <CircleCheck class="size-3" />
                    In Stock
                </Badge>
                <Badge
                    v-else
                    class="bg-red-500/10 text-red-600 hover:bg-red-500/10 dark:text-red-400"
                    variant="outline"
                >
                    <CircleX class="size-3" />
                    Out of Stock
                </Badge>
            </div>
        </div>

        <!-- Price -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
                class="text-xl font-bold text-foreground sm:text-3xl"
            >
                {{ formatPrice(displayPrice) }}
            </span>
            <span
                v-if="discountPercentage > 0"
                class="text-sm text-muted-foreground line-through sm:text-lg"
            >
                {{ formatPrice(price) }}
            </span>
            <Badge
                v-if="discountPercentage > 0"
                class="bg-red-500 px-2 text-[10px] text-white hover:bg-red-500 sm:text-xs"
            >
                {{ discountPercentage }}% OFF
            </Badge>
        </div>

        <Separator />

        <!-- Color -->
        <div v-if="colorOptions.length > 0" class="space-y-2.5">
            <label class="text-sm font-medium text-foreground">
                Color:
                <span class="font-normal text-muted-foreground">{{ selectedColor }}</span>
            </label>
            <div class="flex flex-wrap gap-2.5 sm:gap-2">
                <button
                    v-for="c in colorOptions"
                    :key="c"
                    :class="[
                        'flex items-center justify-center rounded-lg border px-4 text-sm font-medium transition-all h-10 sm:h-9 sm:rounded-md sm:px-3',
                        selectedColor === c
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-input bg-background text-foreground hover:border-primary/50',
                    ]"
                    @click="selectedColor = c"
                >
                    {{ c }}
                </button>
            </div>
        </div>

        <!-- Size -->
        <div v-if="sizeOptions.length > 0" class="space-y-2.5">
            <label class="text-sm font-medium text-foreground">
                Size:
                <span class="font-normal text-muted-foreground">{{ selectedSize }}</span>
            </label>
            <div class="flex flex-wrap gap-2.5 sm:gap-2">
                <button
                    v-for="s in sizeOptions"
                    :key="s"
                    :class="[
                        'flex items-center justify-center rounded-lg border px-4 text-sm font-medium transition-all h-10 min-w-[2.75rem] sm:h-9 sm:min-w-[2.5rem] sm:rounded-md sm:px-3',
                        selectedSize === s
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-input bg-background text-foreground hover:border-primary/50',
                    ]"
                    @click="selectedSize = s"
                >
                    {{ s }}
                </button>
            </div>
        </div>

        <!-- Quantity -->
        <div class="space-y-2.5">
            <label class="text-sm font-medium text-foreground">Quantity</label>
            <div class="flex items-center gap-1.5 sm:gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    class="size-10 rounded-lg sm:size-8 sm:rounded-md"
                    :disabled="quantity <= 1 || isOutOfStock"
                    @click="decrementQty"
                    aria-label="Decrease quantity"
                >
                    <Minus class="size-4" />
                </Button>
                <span
                    class="flex h-10 w-14 items-center justify-center rounded-lg border bg-background text-sm font-semibold tabular-nums sm:h-8 sm:w-12 sm:rounded-md"
                >
                    {{ quantity }}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    class="size-10 rounded-lg sm:size-8 sm:rounded-md"
                    :disabled="quantity >= 10 || isOutOfStock"
                    @click="incrementQty"
                    aria-label="Increase quantity"
                >
                    <Plus class="size-4" />
                </Button>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 pt-1 sm:gap-3">
            <Button
                size="lg"
                class="h-11 flex-1 rounded-lg text-sm font-semibold sm:h-10 sm:rounded-md"
                :disabled="isOutOfStock || adding"
                @click="handleAddToCart"
            >
                <Spinner v-if="adding" class="size-4 sm:size-5" />
                <Check v-else-if="justAdded" class="size-4 sm:size-5" />
                <ShoppingCart v-else class="size-4 sm:size-5" />
                {{ isOutOfStock ? 'Out of Stock' : justAdded ? 'Added to Cart!' : 'Add to Cart' }}
            </Button>
            <Button
                variant="outline"
                size="lg"
                class="h-11 flex-1 rounded-lg text-sm font-semibold sm:h-10 sm:rounded-md"
                :disabled="isOutOfStock || adding"
                @click="handleBuyNow"
            >
                <Zap class="size-4 sm:size-5" />
                Buy Now
            </Button>
        </div>

        <Separator />

        <!-- Short Description -->
        <p class="text-sm leading-relaxed text-muted-foreground">
            {{ shortDescription }}
        </p>

        <!-- Trust Badges -->
        <div
            class="grid grid-cols-3 gap-3 rounded-lg border bg-muted/30 p-3 sm:p-4"
        >
            <div class="flex flex-col items-center gap-1.5 text-center">
                <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <Truck class="size-4 text-primary" />
                </div>
                <span class="text-[10px] leading-tight font-medium text-muted-foreground sm:text-xs">
                    Free Shipping
                </span>
            </div>
            <div class="flex flex-col items-center gap-1.5 text-center">
                <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <RotateCcw class="size-4 text-primary" />
                </div>
                <span class="text-[10px] leading-tight font-medium text-muted-foreground sm:text-xs">
                    Easy Returns
                </span>
            </div>
            <div class="flex flex-col items-center gap-1.5 text-center">
                <div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <Shield class="size-4 text-primary" />
                </div>
                <span class="text-[10px] leading-tight font-medium text-muted-foreground sm:text-xs">
                    Secure Payment
                </span>
            </div>
        </div>
    </div>
</template>
