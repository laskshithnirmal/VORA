// Details that should be included in a product
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// The format of the full response from the API
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}