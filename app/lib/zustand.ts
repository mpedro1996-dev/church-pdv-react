import { create }  from 'zustand';
import { persist } from 'zustand/middleware';
import PaymentType from '../components/payment-type-button';

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
  receivedValue: number;
  changeValue: number | null;
  value: number;
  paymentType: number | null;
  guid: string
}

interface PaymentState {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  addPayment: (payment: Payment) => void;
  removePayment: (guid: string) => void;
}

const usePaymentStore = create(
  persist<PaymentState>(
    (set) => ({
      payments: [],
      setPayments: (payments:Payment[]) => set({ payments }),
      addPayment: (payment:Payment) => set((state) => ({ payments: [...state.payments, payment] })),
      removePayment: (guid:string) => set((state) => ({
        payments: state.payments.filter((payment) => payment.guid !== guid)
      }))      
    }),
    {
      name: 'payment-storage', // Nome usado para armazenar no localStorage
    }
  )
);


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

interface PaymentTypeState{
  paymentType:number | null,
  setPaymentType: (paymentType:number | null) => void;
}

const usePaymentTypeStore = create<PaymentTypeState>((set) => ({
  paymentType: null,
  setPaymentType: (paymentType) => set({paymentType: paymentType})
}))


interface PayValueState{
  payValue:number,
  setPayValue:(payValue:number) => void
}

const usePayValueStore = create<PayValueState>((set) => ({
  payValue:0,
  setPayValue: (payValue) => set({payValue: payValue})
}))

interface Ministry{
  id: number,
  name: string,
  acronym: string
}

interface MinistryState{
  ministries:Ministry[]
  setMinistries:(ministries:Ministry[]) => void
}

const useMinistryStore = create<MinistryState>((set)=>({
  ministries:[],
  setMinistries:(ministries) => set({ministries: ministries}) 
}))


interface Courtesy{
  id: number,
  ministry: string,
  product:string,
  quantity: number,
  creationDate: Date
}

interface CourtesyState{
  courtesies: Courtesy[],
  setCourtesies: (courtesies:Courtesy[]) => void 
}

const useCourtesyStore = create<CourtesyState>((set) => ({
  courtesies:[],
  setCourtesies:(courtesies)=>set({courtesies:courtesies})
}))

export { useTokenStore, useProductStore, useSaleStore, useSaleItemStore, usePaymentTypeStore, usePayValueStore, usePaymentStore, useMinistryStore, useCourtesyStore};