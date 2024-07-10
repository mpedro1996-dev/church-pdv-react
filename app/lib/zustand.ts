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


interface SaleItem{
  product: Product;
  quantity: number;
}

interface SaleItemState {
  saleItems: SaleItem[];
  setSaleItems: (saleItems: SaleItem[]) => void;
  addSaleItem: (saleItem: SaleItem) => void;
  removeSaleItem: (id: number) => void;
  alterQuantity: (id: number, quantity: number) => void;
}

const useSaleItemStore = create(
  persist<SaleItemState>(
    (set) => ({
      saleItems: [],
      setSaleItems: (saleItems) => set({ saleItems }),
      addSaleItem: (saleItem) =>
        set((state) => ({ saleItems: [...state.saleItems, saleItem] })),
      removeSaleItem: (id) =>
        set((state) => ({
          saleItems: state.saleItems.filter((saleItem) => saleItem.product.id !== id),
        })),
      alterQuantity: (id, quantity) =>
        set((state) => ({
          saleItems: state.saleItems.map((saleItem) =>
            saleItem.product.id === id ? { ...saleItem, quantity } : saleItem
          ),
        })),
    }),
    {
      name: 'saleItem-storage', // Nome usado para armazenar no localStorage
    }
  )
);

interface Payment{
  value: number;
  paymentType: number;
}

interface Sale{
  saleItens: SaleItem[]; 
  payments: Payment[]; 
}

interface SaleState{
  sales:Sale[];
  sale: Sale | null;
  setSales: (sales: Sale[]) => void;
  setSale: (sale: Sale) => void;
}

const useSaleStore = create<SaleState>((set) => ({
    sales:[],
    sale: null,
    setSales: (sales) => set({sales: sales}),
    setSale:(sale) => set({sale: sale})

  })
)

export { useTokenStore, useProductStore, useSaleStore, useSaleItemStore};