<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface ShippingData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

const model = defineModel<ShippingData>({ required: true });
</script>

<template>
    <div class="space-y-4">
        <h2 class="text-base font-semibold text-foreground sm:text-lg">
            Shipping Information
        </h2>

        <div class="space-y-4">
            <!-- Full Name -->
            <div class="space-y-1.5">
                <Label for="fullName">Full Name <span class="text-destructive">*</span></Label>
                <Input
                    id="fullName"
                    v-model="model.fullName"
                    placeholder="Enter your full name"
                    class="h-10 sm:h-9"
                />
            </div>

            <!-- Email & Phone -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-1.5">
                    <Label for="email">Email <span class="text-destructive">*</span></Label>
                    <Input
                        id="email"
                        v-model="model.email"
                        type="email"
                        placeholder="you@example.com"
                        class="h-10 sm:h-9"
                    />
                </div>
                <div class="space-y-1.5">
                    <Label for="phone">Phone <span class="text-destructive">*</span></Label>
                    <Input
                        id="phone"
                        v-model="model.phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        class="h-10 sm:h-9"
                    />
                </div>
            </div>

            <!-- Address -->
            <div class="space-y-1.5">
                <Label for="address">Address <span class="text-destructive">*</span></Label>
                <Input
                    id="address"
                    v-model="model.address"
                    placeholder="House, Road, Area"
                    class="h-10 sm:h-9"
                />
            </div>
        </div>
    </div>
</template>
