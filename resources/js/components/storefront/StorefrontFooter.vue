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
                class="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16"
            >
                <!-- Brand Column -->
                <div class="sm:col-span-2 lg:col-span-1">
                    <Link href="/" class="mb-4 inline-flex items-center gap-2">
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
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Your one-stop destination for quality products at
                        unbeatable prices. Fast shipping and exceptional
                        customer service.
                    </p>
                    <div class="mt-5 flex gap-2">
                        <a
                            v-for="social in socialLinks"
                            :key="social.label"
                            :href="social.href"
                            :aria-label="social.label"
                            class="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                            <component :is="social.icon" class="size-4" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="mb-4 text-sm font-semibold text-foreground">
                        Quick Links
                    </h3>
                    <ul class="space-y-3">
                        <li v-for="link in quickLinks" :key="link.label">
                            <Link
                                :href="link.href"
                                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {{ link.label }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- Customer Service -->
                <div>
                    <h3 class="mb-4 text-sm font-semibold text-foreground">
                        Customer Service
                    </h3>
                    <ul class="space-y-3">
                        <li
                            v-for="link in customerService"
                            :key="link.label"
                        >
                            <Link
                                :href="link.href"
                                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {{ link.label }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="mb-4 text-sm font-semibold text-foreground">
                        Contact Us
                    </h3>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <MapPin
                                class="mt-0.5 size-4 shrink-0 text-muted-foreground"
                            />
                            <span class="text-sm text-muted-foreground">
                                123 Commerce Street, Dhaka 1205, Bangladesh
                            </span>
                        </li>
                        <li class="flex items-center gap-3">
                            <Phone
                                class="size-4 shrink-0 text-muted-foreground"
                            />
                            <a
                                href="tel:+8801234567890"
                                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                +880 1234-567890
                            </a>
                        </li>
                        <li class="flex items-center gap-3">
                            <Mail
                                class="size-4 shrink-0 text-muted-foreground"
                            />
                            <a
                                href="mailto:support@shopease.com"
                                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                support@shopease.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Newsletter -->
            <div class="border-t py-8">
                <div
                    class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
                >
                    <div>
                        <h3 class="text-sm font-semibold text-foreground">
                            Subscribe to our newsletter
                        </h3>
                        <p class="mt-1 text-sm text-muted-foreground">
                            Get the latest deals and new arrivals in your inbox.
                        </p>
                    </div>
                    <div class="flex w-full max-w-sm gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            class="h-9 flex-1 rounded-md border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        <Button size="sm">
                            Subscribe
                            <ArrowRight class="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div
                class="flex flex-col items-center gap-3 border-t py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between"
            >
                <p>&copy; {{ currentYear }} ShopEase. All rights reserved.</p>
                <div class="flex gap-4">
                    <a href="#" class="transition-colors hover:text-foreground"
                        >Privacy Policy</a
                    >
                    <a href="#" class="transition-colors hover:text-foreground"
                        >Terms of Service</a
                    >
                </div>
            </div>
        </div>
    </footer>
</template>
