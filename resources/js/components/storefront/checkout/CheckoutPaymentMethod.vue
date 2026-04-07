<script setup lang="ts">
import { Banknote, CreditCard } from 'lucide-vue-next';

export type PaymentMethod = 'cod' | 'sslcommerz';

const model = defineModel<PaymentMethod>({ required: true });

const methods: { value: PaymentMethod; label: string; description: string; icon: typeof Banknote }[] = [
    {
        value: 'cod',
        label: 'Cash on Delivery',
        description: 'Pay when your order arrives',
        icon: Banknote,
    },
    {
        value: 'sslcommerz',
        label: 'SSLCommerz',
        description: 'Pay securely with card, mobile banking, or net banking',
        icon: CreditCard,
    },
];
</script>

<template>
    <div class="space-y-4">
        <h2 class="text-base font-semibold text-foreground sm:text-lg">
            Payment Method
        </h2>

        <div class="space-y-2.5">
            <label
                v-for="method in methods"
                :key="method.value"
                :class="[
                    'flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-all sm:p-4',
                    model === method.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-input hover:border-muted-foreground/30',
                ]"
            >
                <input
                    type="radio"
                    name="payment-method"
                    :value="method.value"
                    :checked="model === method.value"
                    class="mt-0.5 size-4 accent-primary"
                    @change="model = method.value"
                />
                <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg"
                    :class="model === method.value ? 'bg-primary/10' : 'bg-muted'"
                >
                    <component
                        :is="method.icon"
                        class="size-5"
                        :class="model === method.value ? 'text-primary' : 'text-muted-foreground'"
                    />
                </div>
                <div class="min-w-0">
                    <p class="text-sm font-medium text-foreground">{{ method.label }}</p>
                    <p class="text-xs text-muted-foreground">{{ method.description }}</p>
                </div>
            </label>
        </div>
    </div>
</template>
