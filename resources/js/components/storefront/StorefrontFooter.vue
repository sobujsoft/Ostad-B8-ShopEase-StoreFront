<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const currentYear = new Date().getFullYear();

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
];

const customerService = [
    { label: 'My Account', href: '#' },
    { label: 'Order Tracking', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Return Policy', href: '#' },
    { label: 'FAQ', href: '#' },
];

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
];
</script>

<template>
    <footer class="border-t bg-muted/40">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Main Footer -->
            <div
                class="grid grid-cols-2 gap-8 py-8 sm:py-12 lg:grid-cols-4 lg:gap-10 lg:py-16"
            >
                <!-- Brand Column -->
                <div class="col-span-2 lg:col-span-1">
                    <Link href="/" class="mb-3 inline-flex items-center gap-2 sm:mb-4">
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
                    <p class="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                        Your one-stop destination for quality products at
                        unbeatable prices. Fast shipping and exceptional
                        customer service.
                    </p>
                    <div class="mt-4 flex gap-2 sm:mt-5">
                        <a
                            v-for="social in socialLinks"
                            :key="social.label"
                            :href="social.href"
                            :aria-label="social.label"
                            class="flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground sm:size-9"
                        >
                            <component :is="social.icon" class="size-3.5 sm:size-4" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="mb-3 text-xs font-semibold text-foreground sm:mb-4 sm:text-sm">
                        Quick Links
                    </h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li v-for="link in quickLinks" :key="link.label">
                            <Link
                                :href="link.href"
                                class="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                            >
                                {{ link.label }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- Customer Service -->
                <div>
                    <h3 class="mb-3 text-xs font-semibold text-foreground sm:mb-4 sm:text-sm">
                        Customer Service
                    </h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li
                            v-for="link in customerService"
                            :key="link.label"
                        >
                            <Link
                                :href="link.href"
                                class="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                            >
                                {{ link.label }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="col-span-2 sm:col-span-1">
                    <h3 class="mb-3 text-xs font-semibold text-foreground sm:mb-4 sm:text-sm">
                        Contact Us
                    </h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li class="flex items-start gap-2.5">
                            <MapPin
                                class="mt-0.5 size-3.5 shrink-0 text-muted-foreground sm:size-4"
                            />
                            <span class="text-xs text-muted-foreground sm:text-sm">
                                123 Commerce Street, Dhaka 1205, Bangladesh
                            </span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <Phone
                                class="size-3.5 shrink-0 text-muted-foreground sm:size-4"
                            />
                            <a
                                href="tel:+8801234567890"
                                class="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                            >
                                +880 1234-567890
                            </a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <Mail
                                class="size-3.5 shrink-0 text-muted-foreground sm:size-4"
                            />
                            <a
                                href="mailto:support@shopease.com"
                                class="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                            >
                                support@shopease.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Newsletter -->
            <div class="border-t py-6 sm:py-8">
                <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div class="text-center sm:text-left">
                        <h3 class="text-xs font-semibold text-foreground sm:text-sm">
                            Subscribe to our newsletter
                        </h3>
                        <p class="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                            Get the latest deals and new arrivals in your inbox.
                        </p>
                    </div>
                    <div class="flex w-full gap-2 sm:max-w-sm">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            class="h-9 flex-1 rounded-md border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        <Button size="sm">
                            <span class="hidden sm:inline">Subscribe</span>
                            <ArrowRight class="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div
                class="flex flex-col items-center gap-2 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:py-6 sm:text-sm"
            >
                <p>&copy; {{ currentYear }} ShopEase. All rights reserved.</p>
                <div class="flex gap-4">
                    <a href="#" class="transition-colors hover:text-foreground">Privacy Policy</a>
                    <a href="#" class="transition-colors hover:text-foreground">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
</template>
