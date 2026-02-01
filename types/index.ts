// Database Models
export interface Contact {
    id: number;
    phone_label: string;
    phone_number: string;
    email_label: string;
    email_address: string;
    location_label: string;
    location: string;
    facebook_account?: string;
    x_account?: string;
    instagram_account?: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    images?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    category_id: number;
    image_url: string;
    images?: string;
    slug?: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    image_path?: string;
    video_path?: string;
    title: string;
}

export interface Certificate {
    id: number;
    name: string;
    file_path: string;
}

export interface Catalog {
    id: number;
    name: string;
    description: string;
    file_path: string;
    icon?: string;
}

export interface WelcomeImage {
    id: number;
    image_url: string;
    order_index: number;
}

// Form Data Types
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// Component Props Types
export interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

export interface StatItemProps {
    value: string;
    label: string;
}

// API Response Types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}
