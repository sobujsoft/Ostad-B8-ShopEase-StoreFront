<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import {
    ShoppingCart,
    User,
    Menu,
    X,
    Search,
} from 'lucide-vue-next';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

function handleScroll() {
    isScrolled.value = window.scrollY > 20;
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
}

function closeMobileMenu() {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
}

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
    <header
        :class="[
            'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
            isScrolled
                ? 'bg-background/95 shadow-sm backdrop-blur-md'
                : 'bg-background',
        ]"
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between lg:h-18">
                <!-- Logo -->
                <Link href="/" class="flex shrink-0 items-center gap-2">
                    <div
                        class="flex size-9 items-center justify-center rounded-lg bg-primary"
                    >
                        <span
                            class="text-sm font-bold tracking-tight text-primary-foreground"
                            >SE</span
                        >
                    </div>
                    <span
                        class="text-xl font-bold tracking-tight text-foreground"
                    >
                        Shop<span class="text-primary">Ease</span>
                    </span>
                </Link>

                <!-- Desktop Navigation -->
                <nav class="hidden items-center gap-1 lg:flex">
                    <Link
                        href="/"
                        class="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        class="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Shop
                    </Link>
                </nav>

                <!-- Desktop Actions -->
                <div class="hidden items-center gap-2 lg:flex">
                    <Button variant="ghost" size="icon" aria-label="Search">
                        <Search class="size-5" />
                    </Button>
                    <Link href="/checkout" class="relative">
                        <Button variant="ghost" size="icon" aria-label="Cart">
                            <ShoppingCart class="size-5" />
                        </Button>
                        <span
                            class="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                        >
                            3
                        </span>
                    </Link>
                    <div
                        class="mx-2 h-6 w-px bg-border"
                        aria-hidden="true"
                    ></div>
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            <User class="size-4" />
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm"> Register </Button>
                    </Link>
                </div>

                <!-- Mobile Actions -->
                <div class="flex items-center gap-2 lg:hidden">
                    <Link href="/checkout" class="relative">
                        <Button variant="ghost" size="icon-sm" aria-label="Cart">
                            <ShoppingCart class="size-5" />
                        </Button>
                        <span
                            class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
                        >
                            3
                        </span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Menu"
                        @click="toggleMobileMenu"
                    >
                        <Menu v-if="!isMobileMenuOpen" class="size-5" />
                        <X v-else class="size-5" />
                    </Button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="-translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-2 opacity-0"
        >
            <div
                v-if="isMobileMenuOpen"
                class="border-t bg-background lg:hidden"
            >
                <nav class="mx-auto max-w-7xl space-y-1 px-4 py-4">
                    <Link
                        href="/"
                        class="block rounded-md px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                        @click="closeMobileMenu"
                    >
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        class="block rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent"
                        @click="closeMobileMenu"
                    >
                        Shop
                    </Link>
                    <div class="my-3 border-t"></div>
                    <div class="flex gap-2 px-4">
                        <Link href="/login" class="flex-1" @click="closeMobileMenu">
                            <Button variant="outline" class="w-full"> Login </Button>
                        </Link>
                        <Link href="/register" class="flex-1" @click="closeMobileMenu">
                            <Button class="w-full"> Register </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </Transition>
    </header>
</template>
