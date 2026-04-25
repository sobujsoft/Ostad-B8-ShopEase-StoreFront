<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCustomerAuth } from '@/composables/useCustomerAuth';

const { register } = useCustomerAuth();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const processing = ref(false);
const errors = ref<Record<string, string[]>>({});
const generalError = ref('');

async function handleSubmit() {
    processing.value = true;
    errors.value = {};
    generalError.value = '';

    try {
        await register({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
            phone: phone.value || undefined,
        });
        router.visit('/');
    } catch (err: any) {
        if (err.response?.status === 422 && err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else {
            generalError.value =
                err.response?.data?.message || 'Registration failed. Please try again.';
        }
    } finally {
        processing.value = false;
    }
}
</script>

<template>
    <Head title="Create Account" />

    <div class="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <h1 class="text-2xl font-bold tracking-tight text-foreground">
                    Create an account
                </h1>
                <p class="mt-2 text-sm text-muted-foreground">
                    Join ShopEase and start shopping today
                </p>
            </div>

            <div
                v-if="generalError"
                class="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
            >
                {{ generalError }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
                <div class="space-y-2">
                    <Label for="name">Full name</Label>
                    <Input
                        id="name"
                        v-model="name"
                        type="text"
                        required
                        autofocus
                        autocomplete="name"
                        placeholder="John Doe"
                        :class="{ 'border-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="text-sm text-red-600">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        v-model="email"
                        type="email"
                        required
                        autocomplete="email"
                        placeholder="email@example.com"
                        :class="{ 'border-red-500': errors.email }"
                    />
                    <p v-if="errors.email" class="text-sm text-red-600">
                        {{ errors.email[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="phone">Phone number</Label>
                    <Input
                        id="phone"
                        v-model="phone"
                        type="tel"
                        autocomplete="tel"
                        placeholder="01712345678"
                        :class="{ 'border-red-500': errors.phone }"
                    />
                    <p v-if="errors.phone" class="text-sm text-red-600">
                        {{ errors.phone[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        v-model="password"
                        type="password"
                        required
                        autocomplete="new-password"
                        placeholder="Password"
                        :class="{ 'border-red-500': errors.password }"
                    />
                    <p v-if="errors.password" class="text-sm text-red-600">
                        {{ errors.password[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="password_confirmation">Confirm password</Label>
                    <Input
                        id="password_confirmation"
                        v-model="passwordConfirmation"
                        type="password"
                        required
                        autocomplete="new-password"
                        placeholder="Confirm password"
                    />
                </div>

                <Button
                    type="submit"
                    class="w-full"
                    :disabled="processing"
                >
                    <Spinner v-if="processing" class="mr-2" />
                    Create account
                </Button>
            </form>

            <p class="text-center text-sm text-muted-foreground">
                Already have an account?
                <Link
                    href="/customer/login"
                    class="font-medium text-primary underline-offset-4 hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    </div>
</template>
