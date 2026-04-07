export interface ShopCategory {
    name: string;
    slug: string;
}

export interface ShopProduct {
    name: string;
    slug: string;
    code: string;
    price: number;
    discountPrice?: number | null;
    image?: string | null;
    stockStatus?: 'in_stock' | 'out_of_stock';
    categorySlug: string;
    isBestSeller?: boolean;
    isNew?: boolean;
    /** Unix ms for "newest" sort */
    createdAt: number;
}

export const shopCategories: ShopCategory[] = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home & Garden', slug: 'home-garden' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Books', slug: 'books' },
    { name: 'Toys', slug: 'toys' },
    { name: 'Jewelry', slug: 'jewelry' },
];

export const shopProducts: ShopProduct[] = [
    {
        name: 'Wireless Bluetooth Headphones Pro',
        slug: 'wireless-bluetooth-headphones-pro',
        code: 'PRD-E01',
        price: 129.99,
        discountPrice: 89.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        categorySlug: 'electronics',
        isBestSeller: true,
        createdAt: 1_704_000_000_000,
    },
    {
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-tshirt',
        code: 'PRD-F02',
        price: 49.99,
        discountPrice: 34.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
        categorySlug: 'fashion',
        isBestSeller: true,
        createdAt: 1_703_500_000_000,
    },
    {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        code: 'PRD-E03',
        price: 299.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        categorySlug: 'electronics',
        isBestSeller: true,
        createdAt: 1_702_800_000_000,
    },
    {
        name: 'Organic Green Tea Collection',
        slug: 'organic-green-tea-collection',
        code: 'PRD-B04',
        price: 24.99,
        discountPrice: 19.99,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
        categorySlug: 'books',
        isBestSeller: true,
        createdAt: 1_703_200_000_000,
    },
    {
        name: 'Running Shoes Ultra Comfort',
        slug: 'running-shoes-ultra-comfort',
        code: 'PRD-S05',
        price: 159.99,
        discountPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
        categorySlug: 'sports',
        isBestSeller: true,
        createdAt: 1_702_500_000_000,
    },
    {
        name: 'Leather Crossbody Bag',
        slug: 'leather-crossbody-bag',
        code: 'PRD-F06',
        price: 89.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
        categorySlug: 'fashion',
        isBestSeller: true,
        createdAt: 1_701_900_000_000,
    },
    {
        name: 'Stainless Steel Water Bottle',
        slug: 'stainless-steel-water-bottle',
        code: 'PRD-H07',
        price: 34.99,
        discountPrice: 24.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
        categorySlug: 'home-garden',
        isBestSeller: true,
        createdAt: 1_703_800_000_000,
    },
    {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        code: 'PRD-E08',
        price: 79.99,
        discountPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
        categorySlug: 'electronics',
        isBestSeller: true,
        createdAt: 1_702_200_000_000,
    },
    {
        name: 'Minimalist Desk Lamp LED',
        slug: 'minimalist-desk-lamp-led',
        code: 'PRD-H09',
        price: 69.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80',
        categorySlug: 'home-garden',
        isNew: true,
        createdAt: 1_704_200_000_000,
    },
    {
        name: 'Silk Scarf Floral Print',
        slug: 'silk-scarf-floral-print',
        code: 'PRD-F10',
        price: 59.99,
        discountPrice: 44.99,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
        categorySlug: 'fashion',
        isNew: true,
        createdAt: 1_704_150_000_000,
    },
    {
        name: 'Ceramic Plant Pot Set',
        slug: 'ceramic-plant-pot-set',
        code: 'PRD-H11',
        price: 45.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
        categorySlug: 'home-garden',
        isNew: true,
        createdAt: 1_704_100_000_000,
    },
    {
        name: 'Noise Cancelling Earbuds',
        slug: 'noise-cancelling-earbuds',
        code: 'PRD-E12',
        price: 199.99,
        discountPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80',
        categorySlug: 'electronics',
        isNew: true,
        createdAt: 1_704_050_000_000,
    },
    {
        name: 'Yoga Mat Premium Non-Slip',
        slug: 'yoga-mat-premium-non-slip',
        code: 'PRD-S13',
        price: 39.99,
        discountPrice: 29.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
        categorySlug: 'sports',
        isNew: true,
        createdAt: 1_704_020_000_000,
    },
    {
        name: 'Bamboo Cutting Board Set',
        slug: 'bamboo-cutting-board-set',
        code: 'PRD-H14',
        price: 54.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=400&q=80',
        categorySlug: 'home-garden',
        isNew: true,
        createdAt: 1_703_990_000_000,
    },
    {
        name: 'Vintage Canvas Backpack',
        slug: 'vintage-canvas-backpack',
        code: 'PRD-F15',
        price: 79.99,
        discountPrice: 64.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
        categorySlug: 'fashion',
        isNew: true,
        createdAt: 1_703_960_000_000,
    },
    {
        name: 'Aroma Diffuser & Essential Oil Set',
        slug: 'aroma-diffuser-essential-oil-set',
        code: 'PRD-BY16',
        price: 49.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&q=80',
        categorySlug: 'beauty',
        isNew: true,
        stockStatus: 'out_of_stock',
        createdAt: 1_703_930_000_000,
    },
    {
        name: 'Gold Plated Hoop Earrings',
        slug: 'gold-plated-hoop-earrings',
        code: 'PRD-J17',
        price: 42.0,
        discountPrice: 35.99,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
        categorySlug: 'jewelry',
        createdAt: 1_703_400_000_000,
    },
    {
        name: 'STEM Robot Building Kit',
        slug: 'stem-robot-building-kit',
        code: 'PRD-T18',
        price: 89.0,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80',
        categorySlug: 'toys',
        createdAt: 1_703_350_000_000,
    },
    {
        name: 'Cookbook: Modern Kitchen',
        slug: 'cookbook-modern-kitchen',
        code: 'PRD-B19',
        price: 28.5,
        discountPrice: 22.0,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
        categorySlug: 'books',
        createdAt: 1_703_300_000_000,
    },
    {
        name: '4K Action Camera Kit',
        slug: '4k-action-camera-kit',
        code: 'PRD-E20',
        price: 249.0,
        discountPrice: 199.0,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
        categorySlug: 'electronics',
        createdAt: 1_704_180_000_000,
    },
    {
        name: 'Hydrating Face Serum',
        slug: 'hydrating-face-serum',
        code: 'PRD-BY21',
        price: 36.0,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
        categorySlug: 'beauty',
        createdAt: 1_703_100_000_000,
    },
    {
        name: 'Adjustable Dumbbells Pair',
        slug: 'adjustable-dumbbells-pair',
        code: 'PRD-S22',
        price: 189.0,
        discountPrice: 159.0,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
        categorySlug: 'sports',
        createdAt: 1_702_900_000_000,
    },
    {
        name: 'Ceramic Table Vase',
        slug: 'ceramic-table-vase',
        code: 'PRD-H23',
        price: 32.0,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80',
        categorySlug: 'home-garden',
        createdAt: 1_702_700_000_000,
    },
    {
        name: 'Leather Wallet Slim',
        slug: 'leather-wallet-slim',
        code: 'PRD-F24',
        price: 55.0,
        discountPrice: 45.0,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80',
        categorySlug: 'fashion',
        createdAt: 1_702_600_000_000,
    },
];

export function categoryProductCounts(
    categories: ShopCategory[],
    products: ShopProduct[],
): Record<string, number> {
    const counts: Record<string, number> = {};

    for (const c of categories) {
        counts[c.slug] = products.filter((p) => p.categorySlug === c.slug).length;
    }

    return counts;
}
