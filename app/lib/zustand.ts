import { create }  from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {  
  token: string | null;
  setToken: (token:string) => void;
  clearToken: () => void;
}

const useTokenStore = create(
  persist<TokenState>(
      (set) => ({
          token: null,
          setToken: (token) => {              
              set({ token : token });              
          },
          clearToken: () => {
              set({ token: null });
              localStorage.clear();
          },
      }),
      {
          name: 'userLoginStatus',
      }
  )
);

interface Product {
  id: number,
  name: string,
  barcode: string,
  price: number,
  category: number
}


interface ProductState{
  products: Product[],
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({products: products}),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id)
  })),
}));

export { useTokenStore, useProductStore};