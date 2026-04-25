<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCustomerAuth } from '@/composables/useCustomerAuth';

const { login } = useCustomerAuth();

const email = ref('');
const password = ref('');
const processing = ref(false);
const errors = ref<Record<string, string[]>>({});
const generalError = ref('');

async function handleSubmit() {
    processing.value = true;
    errors.value = {};
    generalError.value = '';

    try {
        await login(email.value, password.value);
        router.visit('/');
    } catch (err: any) {
        if (err.response?.status === 422 && err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else if (err.response?.status === 401) {
            generalError.value = err.response.data?.message || 'Invalid credentials.';
        } else if (err.response?.status === 403) {
            generalError.value = err.response.data?.message || 'Your account has been deactivated.';
        } else {
            generalError.value = 'Something went wrong. Please try again.';
        }
    } finally {
        processing.value = false;
    }
}
</script>

<template>
    <Head title="Customer Login" />

    <div class="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <h1 class="text-2xl font-bold tracking-tight text-foreground">
                    Welcome back
                </h1>
                <p class="mt-2 text-sm text-muted-foreground">
                    Sign in to your account to continue shopping
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
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        v-model="email"
                        type="email"
                        required
                        autofocus
                        autocomplete="email"
                        placeholder="email@example.com"
                        :class="{ 'border-red-500': errors.email }"
                    />
                    <p v-if="errors.email" class="text-sm text-red-600">
                        {{ errors.email[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        v-model="password"
                        type="password"
                        required
                        autocomplete="current-password"
                        placeholder="Password"
                        :class="{ 'border-red-500': errors.password }"
                    />
                    <p v-if="errors.password" class="text-sm text-red-600">
                        {{ errors.password[0] }}
                    </p>
                </div>

                <Button
                    type="submit"
                    class="w-full"
                    :disabled="processing"
                >
                    <Spinner v-if="processing" class="mr-2" />
                    Sign in
                </Button>
            </form>

            <p class="text-center text-sm text-muted-foreground">
                Don't have an account?
                <Link
                    href="/customer/register"
                    class="font-medium text-primary underline-offset-4 hover:underline"
                >
                    Create account
                </Link>
            </p>
        </div>
    </div>
</template>
