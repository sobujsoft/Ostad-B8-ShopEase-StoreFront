<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import {
    ShoppingCart,
    User,
    Menu,
    X,
    Search,
    Home,
    Store,
    LogOut,
    Package,
} from 'lucide-vue-next';
import { useCustomerAuth } from '@/composables/useCustomerAuth';
import { useCart } from '@/composables/useCart';

const { isAuthenticated, user, logout } = useCustomerAuth();
const { cartCount, ensureLoaded, resetCartState } = useCart();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const loggingOut = ref(false);

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

async function handleLogout() {
    loggingOut.value = true;
    await logout();
    resetCartState();
    loggingOut.value = false;
    closeMobileMenu();
    router.visit('/');
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    ensureLoaded();
});
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
            <div class="flex h-14 items-center justify-between sm:h-16 lg:h-18">
                <!-- Logo -->
                <Link href="/" class="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <div
                        class="flex size-8 items-center justify-center rounded-lg bg-primary sm:size-9"
                    >
                        <span
                            class="text-xs font-bold tracking-tight text-primary-foreground sm:text-sm"
                            >SE</span
                        >
                    </div>
                    <span
                        class="text-lg font-bold tracking-tight text-foreground sm:text-xl"
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
                            v-if="cartCount > 0"
                            class="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                        >
                            {{ cartCount > 99 ? '99+' : cartCount }}
                        </span>
                    </Link>
                    <div
                        class="mx-2 h-6 w-px bg-border"
                        aria-hidden="true"
                    ></div>

                    <!-- Authenticated state -->
                    <template v-if="isAuthenticated">
                        <Link href="/orders">
                            <Button variant="ghost" size="sm">
                                <Package class="size-4" />
                                Orders
                            </Button>
                        </Link>
                        <div class="flex items-center gap-2">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User class="size-4" />
                            </div>
                            <span class="max-w-[120px] truncate text-sm font-medium text-foreground">
                                {{ user?.name }}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            :disabled="loggingOut"
                            @click="handleLogout"
                        >
                            <LogOut class="size-4" />
                            Logout
                        </Button>
                    </template>

                    <!-- Guest state -->
                    <template v-else>
                        <Link href="/customer/login">
                            <Button variant="ghost" size="sm">
                                <User class="size-4" />
                                Login
                            </Button>
                        </Link>
                        <Link href="/customer/register">
                            <Button size="sm"> Register </Button>
                        </Link>
                    </template>
                </div>

                <!-- Mobile Actions -->
                <div class="flex items-center gap-1 lg:hidden">
                    <Button variant="ghost" size="icon-sm" aria-label="Search">
                        <Search class="size-5" />
                    </Button>
                    <Link href="/checkout" class="relative">
                        <Button variant="ghost" size="icon-sm" aria-label="Cart">
                            <ShoppingCart class="size-5" />
                        </Button>
                        <span
                            v-if="cartCount > 0"
                            class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
                        >
                            {{ cartCount > 99 ? '99+' : cartCount }}
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

        <!-- Mobile Menu Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isMobileMenuOpen"
                class="fixed inset-0 top-14 z-40 bg-black/20 backdrop-blur-sm sm:top-16 lg:hidden"
                @click="closeMobileMenu"
            ></div>
        </Transition>

        <!-- Mobile Menu Panel -->
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
                class="relative z-50 border-t bg-background shadow-lg lg:hidden"
            >
                <nav class="mx-auto max-w-7xl px-4 py-3">
                    <Link
                        href="/"
                        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                        @click="closeMobileMenu"
                    >
                        <Home class="size-4 text-muted-foreground" />
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        @click="closeMobileMenu"
                    >
                        <Store class="size-4" />
                        Shop
                    </Link>

                    <!-- Authenticated mobile menu -->
                    <template v-if="isAuthenticated">
                        <Link
                            href="/orders"
                            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            @click="closeMobileMenu"
                        >
                            <Package class="size-4" />
                            My Orders
                        </Link>

                        <div class="my-2 border-t"></div>

                        <div class="flex items-center gap-3 px-3 py-2.5">
                            <div class="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User class="size-4" />
                            </div>
                            <div class="min-w-0">
                                <p class="truncate text-sm font-medium text-foreground">{{ user?.name }}</p>
                                <p class="truncate text-xs text-muted-foreground">{{ user?.email }}</p>
                            </div>
                        </div>

                        <button
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                            :disabled="loggingOut"
                            @click="handleLogout"
                        >
                            <LogOut class="size-4" />
                            {{ loggingOut ? 'Logging out...' : 'Logout' }}
                        </button>
                    </template>

                    <!-- Guest mobile menu -->
                    <template v-else>
                        <Link
                            href="/customer/login"
                            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            @click="closeMobileMenu"
                        >
                            <User class="size-4" />
                            My Account
                        </Link>

                        <div class="my-2 border-t"></div>

                        <div class="flex gap-2">
                            <Link href="/customer/login" class="flex-1" @click="closeMobileMenu">
                                <Button variant="outline" size="sm" class="w-full">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/customer/register" class="flex-1" @click="closeMobileMenu">
                                <Button size="sm" class="w-full">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </template>
                </nav>
            </div>
        </Transition>
    </header>
</template>
