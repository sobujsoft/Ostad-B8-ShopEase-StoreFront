<script setup lang="ts">
import { ref, computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
} from 'lucide-vue-next';
import type { ProductVariant } from '@/data/storefront/product-detail-dummy';

const props = defineProps<{
    name: string;
    code: string;
    price: number;
    discountPrice?: number | null;
    shortDescription: string;
    stockStatus: 'in_stock' | 'out_of_stock';
    variants: ProductVariant[];
}>();

const quantity = ref(1);
const selectedVariants = ref<Record<string, string>>({});

for (const variant of props.variants) {
    const firstAvailable = variant.options.find((o) => o.available !== false);
    if (firstAvailable) {
        selectedVariants.value[variant.name] = firstAvailable.value;
    }
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

function selectButtonVariant(variantName: string, optionValue: string) {
    selectedVariants.value[variantName] = optionValue;
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

        <!-- Variants -->
        <div
            v-for="variant in variants"
            :key="variant.name"
            class="space-y-2.5"
        >
            <label class="text-sm font-medium text-foreground">
                {{ variant.name }}:
                <span class="font-normal text-muted-foreground">
                    {{
                        variant.options.find(
                            (o) => o.value === selectedVariants[variant.name],
                        )?.label
                    }}
                </span>
            </label>

            <!-- Button-style variant (e.g., Size) -->
            <div v-if="variant.type === 'button'" class="flex flex-wrap gap-2.5 sm:gap-2">
                <button
                    v-for="option in variant.options"
                    :key="option.value"
                    :class="[
                        'flex items-center justify-center rounded-lg border px-4 text-sm font-medium transition-all h-10 min-w-[2.75rem] sm:h-9 sm:min-w-[2.5rem] sm:rounded-md sm:px-3',
                        selectedVariants[variant.name] === option.value
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : option.available !== false
                              ? 'border-input bg-background text-foreground hover:border-primary/50'
                              : 'cursor-not-allowed border-input bg-muted text-muted-foreground line-through opacity-50',
                    ]"
                    :disabled="option.available === false"
                    @click="selectButtonVariant(variant.name, option.value)"
                >
                    {{ option.label }}
                </button>
            </div>

            <!-- Dropdown-style variant (e.g., Color) -->
            <Select
                v-else
                :model-value="selectedVariants[variant.name]"
                @update:model-value="(v) => (selectedVariants[variant.name] = String(v))"
            >
                <SelectTrigger class="h-10 w-full sm:h-9 sm:w-56">
                    <SelectValue :placeholder="`Select ${variant.name}`" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        v-for="option in variant.options"
                        :key="option.value"
                        :value="option.value"
                        :disabled="option.available === false"
                    >
                        {{ option.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
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
                :disabled="isOutOfStock"
            >
                <ShoppingCart class="size-4 sm:size-5" />
                {{ isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}
            </Button>
            <Button
                variant="outline"
                size="lg"
                class="h-11 flex-1 rounded-lg text-sm font-semibold sm:h-10 sm:rounded-md"
                :disabled="isOutOfStock"
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
