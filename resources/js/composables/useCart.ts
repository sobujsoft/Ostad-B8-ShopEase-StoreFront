import { reactive, toRefs, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import api, { storageUrl } from '@/lib/axios';
import { useCustomerAuth } from './useCustomerAuth';

export interface CartItem {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    code: string;
    price: number;
    discountPrice: number | null;
    image: string | null;
    quantity: number;
    stockStatus: 'in_stock' | 'out_of_stock';
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    isLoading: boolean;
    isUpdating: boolean;
}

const state = reactive<CartState>({
    items: [],
    totalItems: 0,
    subtotal: 0,
    isLoading: false,
    isUpdating: false,
});

function requireAuth(): boolean {
    const { isAuthenticated } = useCustomerAuth();
    if (!isAuthenticated.value) {
        router.visit('/customer/login');
        return false;
    }
    return true;
}

function mapCartItems(apiItems: any[]): CartItem[] {
    return apiItems.map((item: any) => {
        const product = item.product ?? {};
        const images = product.images ?? [];
        const primary = images.find((img: any) => img.is_primary) ?? images[0];
        const imagePath = primary?.image_path ? storageUrl(primary.image_path) : null;

        return {
            id: item.id,
            product_id: item.product_id,
            name: product.name ?? 'Unknown Product',
            slug: product.slug ?? '',
            code: product.code ?? '',
            price: parseFloat(product.price ?? '0'),
            discountPrice: product.discount_price ? parseFloat(product.discount_price) : null,
            image: imagePath,
            quantity: item.quantity,
            stockStatus: product.stock_status ?? 'in_stock',
        };
    });
}

let fetched = false;

export function useCart() {
    const cartCount = computed(() => state.totalItems);

    async function fetchCart() {
        if (!requireAuth()) return;

        state.isLoading = true;
        try {
            const { data } = await api.get('/storefront/cart');
            state.items = mapCartItems(data.data?.items ?? data.data ?? []);
            state.totalItems = data.data?.total_items ?? state.items.reduce((s, i) => s + i.quantity, 0);
            state.subtotal = parseFloat(data.data?.subtotal ?? '0');
            fetched = true;
        } catch {
            state.items = [];
            state.totalItems = 0;
            state.subtotal = 0;
        } finally {
            state.isLoading = false;
        }
    }

    async function ensureLoaded() {
        const { isAuthenticated } = useCustomerAuth();
        if (isAuthenticated.value && !fetched && !state.isLoading) {
            await fetchCart();
        }
    }

    async function addToCart(productId: number, quantity = 1): Promise<boolean> {
        if (!requireAuth()) return false;

        state.isUpdating = true;
        try {
            await api.post('/storefront/cart', { product_id: productId, quantity });
            await fetchCart();
            return true;
        } catch (err: any) {
            if (err.response?.status === 401) {
                const { clearAuth } = useCustomerAuth();
                clearAuth();
                router.visit('/customer/login');
            }
            return false;
        } finally {
            state.isUpdating = false;
        }
    }

    async function updateQuantity(cartItemId: number, quantity: number): Promise<boolean> {
        if (!requireAuth()) return false;

        state.isUpdating = true;
        try {
            await api.patch(`/storefront/cart/${cartItemId}`, { quantity });
            await fetchCart();
            return true;
        } catch {
            return false;
        } finally {
            state.isUpdating = false;
        }
    }

    async function removeItem(cartItemId: number): Promise<boolean> {
        if (!requireAuth()) return false;

        state.isUpdating = true;
        try {
            await api.delete(`/storefront/cart/${cartItemId}`);
            await fetchCart();
            return true;
        } catch {
            return false;
        } finally {
            state.isUpdating = false;
        }
    }

    async function clearCart(): Promise<boolean> {
        if (!requireAuth()) return false;

        state.isUpdating = true;
        try {
            await api.delete('/storefront/cart');
            state.items = [];
            state.totalItems = 0;
            state.subtotal = 0;
            return true;
        } catch {
            return false;
        } finally {
            state.isUpdating = false;
        }
    }

    function resetCartState() {
        state.items = [];
        state.totalItems = 0;
        state.subtotal = 0;
        fetched = false;
    }

    return {
        ...toRefs(state),
        cartCount,
        fetchCart,
        ensureLoaded,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        resetCartState,
    };
}
