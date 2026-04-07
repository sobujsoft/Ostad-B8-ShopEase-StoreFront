export interface ProductVariantOption {
    label: string;
    value: string;
    available?: boolean;
}

export interface ProductVariant {
    name: string;
    type: 'button' | 'dropdown';
    options: ProductVariantOption[];
}

export interface ProductImage {
    id: string;
    src: string;
    alt: string;
}

export interface ProductDetail {
    name: string;
    slug: string;
    code: string;
    price: number;
    discountPrice?: number | null;
    shortDescription: string;
    description: string;
    images: ProductImage[];
    variants: ProductVariant[];
    stockStatus: 'in_stock' | 'out_of_stock';
    categorySlug: string;
    categoryName: string;
}

export const dummyProduct: ProductDetail = {
    name: 'Wireless Bluetooth Headphones Pro',
    slug: 'wireless-bluetooth-headphones-pro',
    code: 'PRD-E01',
    price: 129.99,
    discountPrice: 89.99,
    stockStatus: 'in_stock',
    categorySlug: 'electronics',
    categoryName: 'Electronics',
    shortDescription:
        'Experience crystal-clear audio with active noise cancellation. These premium wireless headphones feature 40-hour battery life, ultra-comfortable memory foam ear cushions, and seamless Bluetooth 5.3 connectivity.',
    description: `
        <h3>Premium Sound, Unmatched Comfort</h3>
        <p>The Wireless Bluetooth Headphones Pro delivers studio-quality sound with deep bass, clear mids, and crisp highs. Equipped with <strong>40mm custom-tuned drivers</strong>, every note is rendered with stunning clarity and precision.</p>

        <h3>Active Noise Cancellation</h3>
        <p>Block out the world with our advanced ANC technology. Whether you're commuting, working, or relaxing, enjoy your music without distractions. Three adjustable levels let you control how much ambient sound you want to let in.</p>

        <h3>All-Day Battery</h3>
        <p>With up to <strong>40 hours of battery life</strong> (ANC off) and 30 hours with ANC on, these headphones keep up with your busiest days. A quick 10-minute charge gives you 3 hours of playback when you're in a hurry.</p>

        <h3>Built for Comfort</h3>
        <p>Ultra-soft memory foam ear cushions and an adjustable headband ensure a perfect fit for any head size. Lightweight at just 250g, you'll forget you're wearing them.</p>

        <h3>Specifications</h3>
        <ul>
            <li>Driver Size: 40mm</li>
            <li>Frequency Response: 20Hz – 20kHz</li>
            <li>Bluetooth: 5.3</li>
            <li>Battery Life: Up to 40 hours</li>
            <li>Charging: USB-C (Fast Charge)</li>
            <li>Weight: 250g</li>
            <li>Colors Available: Matte Black, Silver, Navy</li>
        </ul>

        <h3>What's in the Box</h3>
        <ul>
            <li>1x Wireless Bluetooth Headphones Pro</li>
            <li>1x USB-C Charging Cable</li>
            <li>1x 3.5mm Audio Cable</li>
            <li>1x Carrying Case</li>
            <li>1x Quick Start Guide</li>
        </ul>
    `,
    images: [
        {
            id: 'img-1',
            src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            alt: 'Wireless Bluetooth Headphones Pro - Front View',
        },
        {
            id: 'img-2',
            src: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
            alt: 'Wireless Bluetooth Headphones Pro - Side View',
        },
        {
            id: 'img-3',
            src: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80',
            alt: 'Wireless Bluetooth Headphones Pro - On Desk',
        },
        {
            id: 'img-4',
            src: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
            alt: 'Wireless Bluetooth Headphones Pro - Detail',
        },
        {
            id: 'img-5',
            src: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80',
            alt: 'Wireless Bluetooth Headphones Pro - Lifestyle',
        },
    ],
    variants: [
        {
            name: 'Size',
            type: 'button',
            options: [
                { label: 'S', value: 's', available: true },
                { label: 'M', value: 'm', available: true },
                { label: 'L', value: 'l', available: true },
                { label: 'XL', value: 'xl', available: false },
            ],
        },
        {
            name: 'Color',
            type: 'dropdown',
            options: [
                { label: 'Matte Black', value: 'matte-black', available: true },
                { label: 'Silver', value: 'silver', available: true },
                { label: 'Navy', value: 'navy', available: true },
            ],
        },
    ],
};

export interface RelatedProduct {
    name: string;
    slug: string;
    price: number;
    discountPrice?: number | null;
    image?: string | null;
    stockStatus?: 'in_stock' | 'out_of_stock';
}

export const relatedProducts: RelatedProduct[] = [
    {
        name: 'Noise Cancelling Earbuds',
        slug: 'noise-cancelling-earbuds',
        price: 199.99,
        discountPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80',
    },
    {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        price: 79.99,
        discountPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    },
    {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        price: 299.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    },
    {
        name: '4K Action Camera Kit',
        slug: '4k-action-camera-kit',
        price: 249.0,
        discountPrice: 199.0,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
    },
];
