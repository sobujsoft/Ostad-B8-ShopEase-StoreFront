export interface CartItem {
    id: string;
    name: string;
    slug: string;
    code: string;
    price: number;
    discountPrice?: number | null;
    image?: string | null;
    quantity: number;
    variant?: string;
}

export const dummyCartItems: CartItem[] = [
    {
        id: 'ci-1',
        name: 'Wireless Bluetooth Headphones Pro',
        slug: 'wireless-bluetooth-headphones-pro',
        code: 'PRD-E01',
        price: 129.99,
        discountPrice: 89.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
        quantity: 1,
        variant: 'Color: Matte Black',
    },
    {
        id: 'ci-2',
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-tshirt',
        code: 'PRD-F02',
        price: 49.99,
        discountPrice: 34.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
        quantity: 2,
        variant: 'Size: M, Color: White',
    },
    {
        id: 'ci-3',
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        code: 'PRD-E03',
        price: 299.99,
        discountPrice: null,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
        quantity: 1,
        variant: 'Color: Silver',
    },
];

export const districts = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Khulna',
    'Sylhet',
    'Barisal',
    'Rangpur',
    'Mymensingh',
    'Comilla',
    'Gazipur',
    'Narayanganj',
];

export const upazilas: Record<string, string[]> = {
    Dhaka: ['Dhanmondi', 'Gulshan', 'Mirpur', 'Mohammadpur', 'Uttara', 'Banani', 'Tejgaon'],
    Chittagong: ['Agrabad', 'Halishahar', 'Kotwali', 'Pahartali', 'Patenga'],
    Rajshahi: ['Boalia', 'Motihar', 'Rajpara', 'Shah Makhdum'],
    Khulna: ['Daulatpur', 'Khalishpur', 'Khan Jahan Ali', 'Sonadanga'],
    Sylhet: ['Kotwali', 'Jalalabad', 'Moglabazar', 'Shah Poran'],
    Barisal: ['Kotwali', 'Airport', 'Barisal Sadar'],
    Rangpur: ['Kotwali', 'Rangpur Sadar', 'Gangachara'],
    Mymensingh: ['Kotwali', 'Mymensingh Sadar'],
    Comilla: ['Comilla Sadar', 'Kotwali', 'Comilla Adarsha Sadar'],
    Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'],
    Narayanganj: ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'],
};
