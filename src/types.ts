export type ProductCategory = 
  | 'Cannabis Flower' 
  | 'Pre-Rolls' 
  | 'Concentrates' 
  | 'Edibles' 
  | 'Vapes' 
  | 'Accessories';

export type ProductStrainType = 
  | 'Hybrid' 
  | 'Sativa' 
  | '80% Indica' 
  | 'Indica' 
  | 'Sativa Dominant Hybrid' 
  | 'Indoor Hybrid'
  | 'Indoor Sativa'
  | 'Indoor Indica'
  | 'Greenhouse Sativa'
  | 'Greenhouse Indica'
  | 'Outdoor Hybrid'
  | 'N/A';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  weight: string;
  availability: 'In Stock' | 'Out of Stock';
  sku: string;
  strainType: ProductStrainType;
  image: string;
  stockCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
